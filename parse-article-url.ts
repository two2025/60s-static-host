import { load } from 'cheerio'

const TAG_NAME = 'mp-common-mpaudio'
const ATTR_NAME = 'voice_encode_fileid'

const TIP_REG = /^【微语】/
const NEWS_REG = /^\d+、/
const END_REG = /[；！～。，]\s*$/

export async function paseArticleUrl(url: string) {
  console.log('=== url ===\n\n', url, '\n\n=== url ===\n\n')

  const html = await fetch(url)
    .then(e => e.text())
    .catch(() => fetch(url).then(e => e.text()))

  const $ = load(html)
  const news: string[] = []

  let tip = ''

  const data = $('div.rich_media_content section p span')
    .filter((_, e) => e.children.length === 1)
    .toArray()
    .map(e => $(e).text())
    .filter(e => e.length >= 6)

  console.log('=== span data ===\n\n', data, '\n\n=== span data ===\n\n')

  for (const line of data) {
    if (NEWS_REG.test(line)) {
      news.push(line.replace(NEWS_REG, '').replace(END_REG, ''))
    } else if (TIP_REG.test(line)) {
      tip = line.replace(TIP_REG, '').replace(END_REG, '')
    }
  }

  const musicAudioId =
    $(TAG_NAME)
      .filter((_, e) => !$(e).attr('name')?.includes('读懂世界'))
      .first()
      .attr(ATTR_NAME) || ''

  const audioId =
    $(TAG_NAME)
      .filter((_, e) => !!$(e).attr('name')?.includes('读懂世界'))
      .first()
      .attr(ATTR_NAME) || ''

  console.log('=== html ===\n\n', html.slice(0, 3000), '\n\n=== html ===\n\n')
  console.log('=== news ===\n\n', news, '\n\n=== news ===\n\n')
  console.log('=== tip ===\n\n', tip, '\n\n=== tip ===\n\n')
  console.log('=== musicAudioId ===\n\n', musicAudioId, '\n\n=== musicAudioId ===\n\n')
  console.log('=== audioId ===\n\n', audioId, '\n\n=== audioId ===\n\n')

  return {
    news,
    audio: {
      music: musicAudioId ? `https://res.wx.qq.com/voice/getvoice?mediaid=${musicAudioId}` : '',
      news: audioId ? `https://res.wx.qq.com/voice/getvoice?mediaid=${audioId}` : '',
    },
    tip,
  }
}
