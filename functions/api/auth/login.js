import { createToken } from '../_shared/auth.js'
import { json } from '../_shared/cors.js'

export async function onRequestPost(context) {
  const { request, env } = context
  const { password } = await request.json()

  if (!env.ADMIN_PASSWORD) return json({ error: 'Server misconfigured' }, 500, request)
  if (password !== env.ADMIN_PASSWORD) return json({ error: 'Wrong password' }, 401, request)

  const token = await createToken(env.ADMIN_PASSWORD)
  return json({ token }, 200, request)
}
