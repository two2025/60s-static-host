import fs from 'node:fs'

export function ensureDir(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

export function fileExists(filePath: string): boolean {
  return fs.existsSync(filePath)
}

export function readJsonFile<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}

export function writeJsonFile<T>(filePath: string, data: T): void {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

export function getProjectRoot(): string {
  return new URL('../..', import.meta.url).pathname
}
