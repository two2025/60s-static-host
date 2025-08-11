import path from 'node:path'
import { PATHS } from '../config'
import { ensureDir, fileExists, readJsonFile, writeJsonFile, getProjectRoot } from '../utils'

import type { SavedData } from '../types'

export class StorageService {
  private readonly projectRoot: string
  private readonly static60sPath: string
  private readonly staticImagesPath: string

  constructor() {
    this.projectRoot = getProjectRoot()
    this.static60sPath = path.resolve(this.projectRoot, PATHS.STATIC_60S)
    this.staticImagesPath = path.resolve(this.projectRoot, PATHS.STATIC_IMAGES)

    ensureDir(this.static60sPath)
    ensureDir(this.staticImagesPath)
  }

  getDataFilePath(date: string): string {
    return path.resolve(this.static60sPath, `${date}.json`)
  }

  getImageFilePath(date: string): string {
    return path.resolve(this.staticImagesPath, `${date}.png`)
  }

  hasData(date: string): boolean {
    return fileExists(this.getDataFilePath(date))
  }

  hasImage(date: string): boolean {
    return fileExists(this.getImageFilePath(date))
  }

  saveData(date: string, data: SavedData): void {
    const filePath = this.getDataFilePath(date)
    writeJsonFile(filePath, data)
    console.log(`Data of [${date}] saved`)
  }

  loadData(date: string): SavedData | null {
    const filePath = this.getDataFilePath(date)
    if (!fileExists(filePath)) {
      return null
    }
    return readJsonFile<SavedData>(filePath)
  }
}
