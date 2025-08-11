import { StorageService } from '../services/storage'
import { takeScreenshot } from '../services/screenshot'

export async function generateScreenshot(date: string): Promise<void> {
  const storage = new StorageService()

  if (!storage.hasData(date)) {
    throw new Error(`Data of [${date}] not exists`)
  }

  if (storage.hasImage(date)) {
    console.log(`Screenshot of [${date}] already exists, skipped`)
    return
  }

  const data = storage.loadData(date)
  if (!data) {
    throw new Error(`Failed to load data for [${date}]`)
  }

  const imageFilePath = storage.getImageFilePath(date)
  await takeScreenshot(data.link, imageFilePath)
}
