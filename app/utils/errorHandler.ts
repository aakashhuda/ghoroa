function cleanMessage(msg: string): string {
  // Prisma errors have a verbose prefix like:
  // "\nInvalid `prisma.user.create()` invocation:\n\n\nUnique constraint failed on the fields: (`email`)"
  // Extract the meaningful part after the last colon-newline
  const prismaMatch = msg.match(/:\n+(.+)$/)
  if (prismaMatch) return prismaMatch[1].trim()
  return msg.trim()
}

export function extractApiError(err: unknown): { message: string } {
  if (err && typeof err === 'object' && 'response' in err) {
    const axiosErr = err as { response?: { data?: { message?: string } } }
    if (axiosErr.response?.data?.message) {
      return { message: cleanMessage(axiosErr.response.data.message) }
    }
  }
  if (err instanceof Error) {
    return { message: err.message }
  }
  return { message: 'An unexpected error occurred' }
}
