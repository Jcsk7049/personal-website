import { verifyToken } from './_shared/auth.js'
import { json, handleOptions } from './_shared/cors.js'

const PUBLIC_ROUTES = ['/api/auth/login']

function withSecurityHeaders(response) {
  const headers = new Headers(response.headers)
  headers.set('X-Frame-Options', 'DENY')
  headers.set('X-Content-Type-Options', 'nosniff')
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  headers.set('Content-Security-Policy', "object-src 'none'; base-uri 'self'; frame-ancestors 'none'")
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers })
}

export async function onRequest(context) {
  const { request, next, env } = context
  const url = new URL(request.url)

  if (request.method === 'OPTIONS') return withSecurityHeaders(handleOptions(request))
  if (request.method === 'GET') return withSecurityHeaders(await next())
  if (PUBLIC_ROUTES.includes(url.pathname)) return withSecurityHeaders(await next())

  const auth = request.headers.get('Authorization') || ''
  if (!auth.startsWith('Bearer ')) return withSecurityHeaders(json({ error: 'Unauthorized' }, 401, request))

  const valid = await verifyToken(auth.slice(7), env.ADMIN_PASSWORD)
  if (!valid) return withSecurityHeaders(json({ error: 'Unauthorized' }, 401, request))

  return withSecurityHeaders(await next())
}
