// @/core/api/api-server.ts

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { AUTH_TOKEN_COOKIE } from '@/core/constants/auth.constants'
import { extractErrorMessage } from '@/core/utils/extract-error-message'

const getApiUrl = (): string => {
  const apiUrl = process.env.API_URL

  if (!apiUrl) {
    throw new Error('API_URL is not configured')
  }

  return apiUrl.replace(/\/$/, '')
}

export const fetchServer = async (
  endpoint: string,
  options: RequestInit = {},
): Promise<Response> => {
  const cookieStore = await cookies()

  const token = cookieStore.get(AUTH_TOKEN_COOKIE)?.value

  if (!token) {
    redirect('/login')
  }

  const normalizedEndpoint = endpoint.startsWith('/')
    ? endpoint
    : `/${endpoint}`

  const headers = new Headers(options.headers)

  headers.set('Authorization', `Bearer ${token}`)

  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(`${getApiUrl()}${normalizedEndpoint}`, {
    ...options,
    headers,
    cache: 'no-store',
  })

  if (response.status === 401 || response.status === 403) {
    redirect('/login')
  }

  if (!response.ok) {
    const message = await extractErrorMessage(response)

    throw new Error(message)
  }

  return response
}
