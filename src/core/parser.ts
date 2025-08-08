import { load } from 'cheerio'
import { ParsedArticle } from '../types/index.js'
import { debug } from '../utils/index.js'
import { REGEX_PATTERNS, USER_AGENT } from '../config/index.js'

export async function parseArticleUrl(url: string): Promise<ParsedArticle> {
  debug('url', url)

  const html = await fetch(url, {
    headers: {
      'User-Agent': USER_AGENT,
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