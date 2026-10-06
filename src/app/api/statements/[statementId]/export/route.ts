import { cookies } from 'next/headers'

import { AUTH_TOKEN_COOKIE } from '@/core/constants/auth.constants'

type StatementExportRouteContext = {
  params: Promise<{
    statementId: string
  }>
}

export async function GET(
  _request: Request,
  { params }: StatementExportRouteContext,
) {
  const { statementId } = await params

  if (!/^\d+$/.test(statementId)) {
    return Response.json(
      { success: false, message: 'El identificador no es válido', data: null },
      { status: 400 },
    )
  }

  const token = (await cookies()).get(AUTH_TOKEN_COOKIE)?.value
  if (!token) {
    return Response.json(
      { success: false, message: 'Autenticación requerida', data: null },
      { status: 401 },
    )
  }

  const apiUrl = process.env.API_URL
  if (!apiUrl) {
    return Response.json(
      { success: false, message: 'La URL del API no está configurada', data: null },
      { status: 500 },
    )
  }

  let upstream: Response
  try {
    upstream = await fetch(
      `${apiUrl.replace(/\/$/, '')}/statements/${statementId}/export`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      },
    )
  } catch {
    return Response.json(
      { success: false, message: 'No fue posible descargar el archivo', data: null },
      { status: 502 },
    )
  }

  const headers = new Headers()
  for (const name of ['content-type', 'content-disposition', 'content-length']) {
    const value = upstream.headers.get(name)
    if (value) headers.set(name, value)
  }

  return new Response(upstream.body, { status: upstream.status, headers })
}
