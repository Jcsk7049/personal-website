import { createToken, timingSafeEqual } from '../_shared/auth.js'
import { json } from '../_shared/cors.js'

const MAX_ATTEMPTS  = 5
const WINDOW_MS     = 15 * 60 * 1000  // 15 minutes
const LOCKOUT_MS    = 15 * 60 * 1000  // 15 minutes

export async function onRequestPost(context) {
  const { request, env } = context
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown'
  const now = Date.now()

  const row = await env.DB.prepare('SELECT count, first_at, locked_until FROM login_attempts WHERE ip = ?')
    .bind(ip).first()

  if (row?.locked_until && row.locked_until > now) {
    return json({ error: 'Too many attempts, try again later' }, 429, request)
  }

  const { password } = await request.json().catch(() => ({}))

  if (!env.ADMIN_PASSWORD) return json({ error: 'Server misconfigured' }, 500, request)
  if (typeof password !== 'string' || !timingSafeEqual(password, env.ADMIN_PASSWORD)) {
    if (!row || now - row.first_at > WINDOW_MS) {
      await env.DB.prepare(
        'INSERT INTO login_attempts (ip, count, first_at, locked_until) VALUES (?, 1, ?, NULL) ON CONFLICT(ip) DO UPDATE SET count = 1, first_at = excluded.first_at, locked_until = NULL'
      ).bind(ip, now).run()
    } else {
      const count = row.count + 1
      const lockedUntil = count >= MAX_ATTEMPTS ? now + LOCKOUT_MS : null
      await env.DB.prepare(
        'UPDATE login_attempts SET count = ?, locked_until = ? WHERE ip = ?'
      ).bind(count, lockedUntil, ip).run()
    }
    return json({ error: 'Wrong password' }, 401, request)
  }

  await env.DB.prepare('DELETE FROM login_attempts WHERE ip = ?').bind(ip).run()

  const token = await createToken(env.ADMIN_PASSWORD)
  return json({ token }, 200, request)
}
