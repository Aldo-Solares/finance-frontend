// @/proxy.ts

import { NextRequest, NextResponse } from 'next/server'

import { AUTH_TOKEN_COOKIE } from '@/core/constants/auth.constants'

const PRIVATE_ROUTES = [
  '/main',
  '/dashboard',
  '/debts',
  '/investments',
  '/trading',
  '/settings',
  '/admin',
]

// ===================
// PROXY
// ===================

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const token = request.cookies.get(AUTH_TOKEN_COOKIE)?.value

  const isPrivateRoute = PRIVATE_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  )

  // ===================
  // PRIVATE ROUTES
  // ===================

  if (isPrivateRoute && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // ===================
  // CONTINUE
  // ===================

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
