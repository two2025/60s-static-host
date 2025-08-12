import { load } from 'cheerio'
import { debug } from '../utils'
import { REGEX_PATTERNS, USER_AGENT } from '../config'

import type { ParsedArticle } from '../types'

export async function parseArticleUrl(url: string): Promise<ParsedArticle> {
  debug('url', url)

  const html = await fetch(url, { headers: { 'User-Agent': USER_AGENT } })
    .then(e => e.text())
    .catch(() => fetch(url).then(e => e.text()))

  const $ = load(html)
  const news: string[] = []

  let tip = ''

  const data = $('div.rich_media_content section p, section')
    .toArray()
    .map(e => $(e).text())
    .filter(e => e.length >= 6)
    .filter(text => !/；\d+、/.test(text))

  debug('data', data)

  for (const line of data) {
    if (REGEX_PATTERNS.NEWS.test(line)) {
      news.push(line.replace(REGEX_PATTERNS.NEWS, '').replace(REGEX_PATTERNS.END, ''))
    } else if (REGEX_PATTERNS.TIP.test(line)) {
      tip = line.replace(REGEX_PATTERNS.TIP, '').replace(REGEX_PATTERNS.END, '')
    }
  }

  const images = $('img')
    .map((_, e) => $(e).attr('data-src') || '')
    .toArray()
    .filter(e => !!e)

  debug('images', images)

  const image = images.at(-3) || images.at(0) || ''

  const cover =
    $('img')
      .map((_, e) => ({
        src: $(e).attr('data-src') || '',
        dataS: $(e).attr('data-s') || '',
      }))
      .toArray()
      .filter(e => e.dataS === '300,640')
      .at(0)?.src || ''

  debug('news', news)
  debug('tip', tip)
  debug('image', image)
  debug('cover', cover)

  return {
    news,
    image,
    tip,
    cover,
    audio: { music: '', news: '' },
  }
}

export async function parseArticleUrlViaLLM(url: string): Promise<ParsedArticle> {
  const html = await fetch(url, { headers: { 'User-Agent': USER_AGENT } })
    .then(e => e.text())
    .catch(() => fetch(url).then(e => e.text()))

  const $ = load(html)

  const model = 'gemini-2.5-flash'
  const baseURL = 'https://google-ai.deno.dev/v1beta/models'
  const apiKey = process.env.GEMINI_API_KEY

  const contents = [$('#page-content').html()].map(prompt => {
    const parts: any[] = []
    if (typeof prompt === 'string') parts.push({ text: prompt })
    return { role: 'user', parts }
  })

  const response = await (
    await fetch(`${baseURL}/${model}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [
            {
              text: `
              你是一个 HTML 结构解析工具，能够熟练、完美的完成 HTML 内容解析目标。接下来你需要解析一个微信公众号文章的 HTML，并按照要求通过指定的格式返回指定的内容。
              
              返回 JSON 字段说明： 
              
              - news: 新闻列表，string[] 类型，大概 15 条，以具实际况决定，是 html 里正文的主要内容。
              - cover: 新闻封面图片 URL，string 类型，在 “今日简报” 标题下面方、农历等信息的上面的 640x300 的封面图片，如果不存在则返回空字符串。
              - image: 图片版本新闻的 URL，string 类型，在 “简报图片版” 标题下方的图片，如果不存在则返回空字符串。
              - tip: 每日一句，string 类型，可能是【微语】、【每日一句】、【每日金句】 等 prefix 文本的后面，通常是文章的最后一段。
              
              请注意，新闻列表中的每条新闻都应该是一个字符串，且不包含前缀序号和标点，或其他标记和末尾的标点符号。

              你完全遵循原始 HTML 文本内容，不会添加、构造任何不存在的新闻和 URL 链接。 以下是示例解析结果的格式和 URL 格式，仅供参考请以实际 HTML 为准。

              // 示例格式。 请不要返回示例数据或基于这个数据进行生成。 请遵循原文进行解析。
              {
                "news": [
                  "中央气象台：25日至29日寒潮来袭，我国大部地区降温剧烈，大部地区气温下降8～12℃，局地最高降幅超20℃",
                  "海南10岁小孩哥出海钓鱼从陵水漂流一夜到三亚，邻居：捕鱼遇风浪被漂走，系疍家人水性好，家长：回家怕挨打又躲起来了",
                  "加拿大、德国、英国、芬兰、丹麦等国提醒本国赴美公民：小心被捕",
                  "当地23日，以方确认哈马斯政治局高层夫妇被以军炸死！以色列连续三周禁止援助物资进入加沙，联合国官员发文警告：援助物资的分发大幅减少，面粉仅够6天分发",
                  // ... 更多新闻
                ],
                "image": "https://mmbiz.qpic.cn/sz_mmbiz_png/O3P1rGdfJibIX7H04XgRWzlvibEHuj3rBS3OOjTjygibMpuekbndnWCWiccJ4vsrjak8wJv3VpVicwiaUXFInnyB0s9w/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1",
                "cover": "https://mmbiz.qpic.cn/sz_mmbiz_png/O3P1rGdfJibIX7H04XgRWzlvibEHuj3rBSEoIElyBGOumg51zy9okALUEia96Ezqc66jccSzgNnUPBNHvnXKSowqg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1",
                "tip": "人生中有些事，不竭尽全力，你永远无法知晓自己的出色"
              }
              `,
            },
          ],
        },
        contents,
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: 'object',
            properties: {
              news: { type: 'array', items: { type: 'string' } },
              cover: { type: 'string' },
              image: { type: 'string' },
              tip: { type: 'string' },
            },
            propertyOrdering: ['news', 'cover', 'image', 'tip'],
            required: ['news', 'cover', 'image', 'tip'],
          },
        },
      }),
    })
  ).json()

  // console.log('Gemini response:', JSON.stringify(response, null, 2))
  try {
    const data = JSON.parse(response?.candidates?.[0]?.content?.parts?.[0]?.text || '{}')

    if (!('news' in data) || !('cover' in data) || !('image' in data) || !('tip' in data)) {
      console.error('Invalid Gemini response format:', data)

      return { news: [], cover: '', image: '', tip: '', audio: { music: '', news: '' } }
    }

    return {
      news: data.news || [],
      cover: data.cover || '',
      image: data.image || '',
      tip: data.tip || '',
      audio: { music: '', news: '' },
    }
  } catch {
    console.error('Failed to parse Gemini response:', response)

    return { news: [], cover: '', image: '', tip: '', audio: { music: '', news: '' } }
  }
}

// parseArticleUrl(
//   'http://mp.weixin.qq.com/s?__biz=Mzk3NTMzOTU1Mg==&mid=2247486384&idx=2&sn=b737ac572f301ce208a4f7ca051c22e9&chksm=c4cc62fff3bbebe90448d7f9d0da47a34c081abc9dd6b88f766e9925ded39ec2fe8958a5b401#rd'
// )
//   .then(console.log)
//   .catch(console.error)
