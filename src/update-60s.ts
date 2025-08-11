import { runUpdateCommand } from './commands/update'

runUpdateCommand().catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})
