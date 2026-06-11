import { json } from '../_shared/cors.js'
import { isPlainObject } from '../_shared/validate.js'

const ALLOWED_KEYS = ['profile', 'experience', 'education', 'skills_matrix', 'skills_detail', 'awards']

export async function onRequestGet(context) {
  const { env, request, params } = context
  if (!ALLOWED_KEYS.includes(params.key)) return json({ error: 'Unknown key' }, 400, request)
  const lang = new URL(request.url).searchParams.get('lang') || 'zh'

  const row = await env.DB.prepare('SELECT zh, en FROM sections WHERE key = ?')
    .bind(params.key).first()
  if (!row) return json(null, 200, request)
  return json(JSON.parse(row[lang] || row.zh), 200, request)
}

export async function onRequestPut(context) {
  const { request, env, params } = context
  if (!ALLOWED_KEYS.includes(params.key)) return json({ error: 'Unknown key' }, 400, request)
  const body = await request.json().catch(() => null)
  if (!body || (!isPlainObject(body.zh) && !Array.isArray(body.zh))) {
    return json({ error: 'zh required' }, 400, request)
  }
  const { zh, en } = body
  if (en !== undefined && en !== null && !isPlainObject(en) && !Array.isArray(en)) {
    return json({ error: 'invalid en' }, 400, request)
  }

  await env.DB.prepare(`
    INSERT INTO sections (key, zh, en) VALUES (?, ?, ?)
    ON CONFLICT(key) DO UPDATE SET zh = excluded.zh, en = excluded.en, updated_at = datetime('now')
  `).bind(params.key, JSON.stringify(zh), JSON.stringify(en ?? {})).run()

  return json({ ok: true }, 200, request)
}
