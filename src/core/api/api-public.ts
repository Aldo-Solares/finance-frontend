// @/core/api/api-public.ts

import { extractErrorMessage } from '@/core/utils/extract-error-message'

const getApiUrl = (): string => {
  const apiUrl = process.env.API_URL

  if (!apiUrl) {
    throw new Error('API_URL is not configured')
  }

  return apiUrl.replace(/\/$/, '')
}

export const fetchPublic = async (
  endpoint: string,
  options: RequestInit = {},
): Promise<Response> => {
  const normalizedEndpoint = endpoint.startsWith('/')
    ? endpoint
    : `/${endpoint}`

  const headers = new Headers(options.headers)

  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(`${getApiUrl()}${normalizedEndpoint}`, {
    ...options,
    headers,
    cache: 'no-store',
  })

  if (!response.ok) {
    const message = await extractErrorMessage(response)

    throw new Error(message)
  }

  return response
}
