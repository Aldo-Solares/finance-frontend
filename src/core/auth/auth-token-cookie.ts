// @/core/auth/auth-token-cookie.ts
import { cookies } from 'next/headers'

import { AUTH_TOKEN_COOKIE } from '@/core/constants/auth.constants'

const DEFAULT_TOKEN_LIFETIME_SECONDS = 60 * 60 * 24 * 30

export async function setAuthTokenCookie(token: string): Promise<void> {
  const cookieStore = await cookies()

  cookieStore.set(AUTH_TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: getTokenLifetimeSeconds(token),
  })
}

function getTokenLifetimeSeconds(token: string): number {
  const payload = token.split('.')[1]
  if (!payload) return DEFAULT_TOKEN_LIFETIME_SECONDS

  try {
    const claims = JSON.parse(
      Buffer.from(payload, 'base64url').toString('utf8'),
    ) as { exp?: unknown }

    if (typeof claims.exp === 'number') {
      return Math.max(0, claims.exp - Math.floor(Date.now() / 1000))
    }
  } catch {
    // Keep the configured default if the token payload cannot be decoded.
  }

  return DEFAULT_TOKEN_LIFETIME_SECONDS
}
