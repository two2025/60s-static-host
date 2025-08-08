import { runUpdateCommand } from './commands/update.js'

runUpdateCommand().catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})