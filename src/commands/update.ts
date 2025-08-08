import { fetchAndProcessArticle } from '../core/fetcher.js'
import { StorageService } from '../services/storage.js'
import { debug, localeDate, isValidDateFormat } from '../utils/index.js'

export async function runUpdateCommand(): Promise<void> {
  debug('process.argv', process.argv)

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
  const storage = new StorageService()

  debug('date', date)

  if (storage.hasData(date)) {
    console.log(`Data of [${date}] already exists, skipped`)
    process.exit(0)
  }

  try {
    const data = await fetchAndProcessArticle(date)
    storage.saveData(date, data)
  } catch (error) {
    console.error('Error updating data:', error)
    process.exit(1)
  }
}