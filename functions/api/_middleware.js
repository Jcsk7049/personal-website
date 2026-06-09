import { verifyToken } from './_shared/auth.js'
import { json, handleOptions } from './_shared/cors.js'

const PUBLIC_ROUTES = ['/api/auth/login', '/api/init']

export async function onRequest(context) {
  const { request, next, env } = context
  const url = new URL(request.url)

  if (request.method === 'OPTIONS') return handleOptions(request)
  if (request.method === 'GET') return next()
  if (PUBLIC_ROUTES.some(r => url.pathname.startsWith(r))) return next()

  const auth = request.headers.get('Authorization') || ''
  if (!auth.startsWith('Bearer ')) return json({ error: 'Unauthorized' }, 401, request)

  const valid = await verifyToken(auth.slice(7), env.ADMIN_PASSWORD)
  if (!valid) return json({ error: 'Unauthorized' }, 401, request)

  return next()
}
