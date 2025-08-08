import { generateScreenshot } from '../core/generator.js'
import { debug, localeDate, isValidDateFormat } from '../utils/index.js'

export async function runScreenshotCommand(): Promise<void> {
  const inputDate = process.argv
    .slice(2)
    .find(e => e.includes('--date='))
    ?.replace('--date=', '')

  debug('inputDate', inputDate)

  if (inputDate && !isValidDateFormat(inputDate)) {
    console.error('Invalid date format, expect: YYYY-MM-DD')
    process.exit(1)
  }

  const date = (inputDate || localeDate()).replace(/\//g, '-')

  try {
    await generateScreenshot(date)
  } catch (error) {
    console.error('Error generating screenshot:', error)
    process.exit(1)
  }
}