interface ZodFieldError {
  field: string
  message: string
}

interface ApiErrorResult {
  message: string
  errors?: ZodFieldError[]
}

function cleanMessage(msg: string): string {
  const prismaMatch = msg.match(/:\n+(.+)$/)
  if (prismaMatch) return prismaMatch[1].trim()
  return msg.trim()
}

export function extractApiError(err: unknown): ApiErrorResult {
  if (err && typeof err === 'object' && 'response' in err) {
    const axiosErr = err as {
      response?: { data?: { message?: string; errors?: ZodFieldError[] } }
    }
    const data = axiosErr.response?.data
    if (data) {
      const result: ApiErrorResult = {
        message: data.message ? cleanMessage(data.message) : 'An unexpected error occurred',
      }
      if (data.errors && Array.isArray(data.errors)) {
        result.errors = data.errors
      }
      return result
    }
  }
  if (err instanceof Error) {
    return { message: err.message }
  }
  return { message: 'An unexpected error occurred' }
}
