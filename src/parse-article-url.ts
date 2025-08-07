import { load } from 'cheerio'
import { debug } from './fetch-articles.ts'

const TIP_REG = /^【((微语)|(每日金句))】/
const NEWS_REG = /^\d+、/
const END_REG = /[；！～。，]\s*$/

export async function paseArticleUrl(url: string) {
  debug('url', url)

  const html = await fetch(url, {
    headers: {
      'User-Agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36`,
    },
  })
    .then(e => e.text())
    .catch(() => fetch(url).then(e => e.text()))

  const $ = load(html)
  const news: string[] = []

  let tip = ''

  const data = $('div.rich_media_content section p, section')
    .toArray()
    .map(e => $(e).text())
    .filter(e => e.length >= 6)

  debug('data', data)

  for (const line of data) {
    if (NEWS_REG.test(line)) {
      news.push(line.replace(NEWS_REG, '').replace(END_REG, ''))
    } else if (TIP_REG.test(line)) {
      tip = line.replace(TIP_REG, '').replace(END_REG, '')
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

    // 仅做兼容保留
    audio: { music: '', news: '' },
  }
}
