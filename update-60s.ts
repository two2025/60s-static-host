import fs from 'node:fs'
import path from 'node:path'
import { fetchArticles } from './fetch-articles'
import { paseArticleUrl } from './parse-article-url'

const __dirname = new URL('.', import.meta.url).pathname

const today = localeDate().replace(/\//g, '-')
const static60sBase = path.resolve(__dirname, 'static/60s')

if (!fs.existsSync(static60sBase)) {
  fs.mkdirSync(static60sBase, { recursive: true })
}

const todayFilepath = path.resolve(static60sBase, `${today}.json`)
const hasToday = fs.existsSync(todayFilepath)

if (hasToday) {
  console.log(`data of [${today}] already exists, skipped`)
  process.exit(0)
}

const fakeid = process.env.WECHAT_FAKEID || 'MzU2MDU4NDE1MQ=='
const token = process.env.WECHAT_TOKEN || ''
const cookie = process.env.WECHAT_COOKIE || ''

if (!fakeid || !token || !cookie) {
  console.error('missing env: WECHAT_FAKEID, WECHAT_TOKEN, WECHAT_COOKIE')
  process.exit(1)
}

fetchArticles({ fakeid, token, cookie }).then(({ isOK, list, count, error }) => {
  if (isOK) {
    const [_, month, day] = today.split('-').map(Number)
    const todayTitle = `${month}月${day}日`
    const targetArticle = list.find(e => [todayTitle, '读懂世界'].every(t => e.title.includes(t)))

    if (!targetArticle) {
      console.error(`expected article not update, need title: '${todayTitle}' && '读懂世界'`)
      process.exit(0)
    }

    const detailLink = targetArticle.link

    paseArticleUrl(detailLink).then(item => {
      if (!item.news.length) {
        console.log('no news found, data: ', JSON.stringify(item, null, 2))
        process.exit(0)
      }

      const data = {
        date: today,
        ...item,
        cover: targetArticle.cover,
        link: detailLink.split('&chksm=')[0] || '',
        created: localeTime(targetArticle.create_time * 1000),
        created_at: targetArticle.create_time * 1000,
        updated: localeTime(targetArticle.update_time * 1000),
        updated_at: targetArticle.update_time * 1000,
      }

      fs.writeFileSync(todayFilepath, JSON.stringify(data, null, 2))

      console.log(`data of [${today}] saved`)
    })
  } else {
    throw new Error(error)
  }
})

function localeDate(ts: number | string | Date = Date.now()) {
  const today = ts instanceof Date ? ts : new Date(ts)

  const formatter = new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Asia/Shanghai',
  })

  return formatter.format(today)
}

function localeTime(ts: number | string | Date = Date.now()) {
  const now = ts instanceof Date ? ts : new Date(ts)

  const formatter = new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    hourCycle: 'h23',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Shanghai',
  })

  return formatter.format(now)
}
