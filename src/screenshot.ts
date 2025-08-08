import { runScreenshotCommand } from './commands/screenshot.js'

runScreenshotCommand().catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})