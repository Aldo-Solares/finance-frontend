// @/proxy.ts

import { NextRequest, NextResponse } from 'next/server'

import { AUTH_TOKEN_COOKIE } from '@/core/constants/auth.constants'

// ===================
// PROXY
// ===================

export function proxy(request: NextRequest) {
  const token = request.cookies.get(AUTH_TOKEN_COOKIE)?.value

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return NextResponse.next()
}

// ===================
// MATCHER
// ===================

export const config = {
  matcher: [
    '/main/:path*',
    '/dashboard/:path*',
    '/debts/:path*',
    '/investments/:path*',
    '/trading/:path*',
    '/settings/:path*',
    '/admin/:path*',
  ],
}
