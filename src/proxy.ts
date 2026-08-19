// @/proxy.ts

import { NextRequest, NextResponse } from 'next/server'
import { AUTH_TOKEN_COOKIE } from '@/core/constants/auth.constants'
const AUTH_ROUTES = [
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/verify-email',
  '/auth/resend-verification',
]

const PRIVATE_ROUTES = [
  '/dashboard',
  '/debts',
  '/investments',
  '/trading',
  '/settings',
]

// ===================
// PROXY
// ===================

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const token = request.cookies.get(AUTH_TOKEN_COOKIE)?.value

  const isAuthRoute = AUTH_ROUTES.some((route) => pathname === route)

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
  // AUTH ROUTES
  // ===================

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.redirect(new URL('/unauthorized', request.url))
}

// ===================
// MATCHER
// ===================

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/debts/:path*',
    '/investments/:path*',
    '/trading/:path*',
    '/settings/:path*',
    '/auth/:path*',
  ],
}
