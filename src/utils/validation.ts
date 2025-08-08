export function isValidDateFormat(dateString: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateString)
}

export function validateRequiredEnv(envVars: Record<string, string | undefined>): void {
  const missing: string[] = []
  
  for (const [key, value] of Object.entries(envVars)) {
    if (!value) {
      missing.push(key)
    }
  }
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}