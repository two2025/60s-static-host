import puppeteer from 'puppeteer'
import { debug } from '../utils/index.js'

export async function takeScreenshot(url: string, outputPath: string): Promise<void> {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--single-process',
      '--mute-audio',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--no-sandbox',
      '--no-first-run',
      '--no-zygote',
    ],
  })

  const page = await browser.newPage()
  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }])
  await page.setViewport({ width: 1600, height: 800, deviceScaleFactor: 2 })
  await page.goto(url, { waitUntil: 'networkidle0' })

  await new Promise(resolve => setTimeout(resolve, 30_000))

  const doms = (await page.$$('section')) || (await page.$$('body'))
  const dom = doms[3] || doms[0]

  if (!dom) {
    throw new Error('No DOM element found for screenshot')
  }

  await dom.screenshot({ path: outputPath })
  await browser.close()

  console.log(`Screenshot saved to ${outputPath}`)
}