import { json } from '../_shared/cors.js'

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
  const { zh, en } = await request.json()

  await env.DB.prepare(`
    INSERT INTO sections (key, zh, en) VALUES (?, ?, ?)
    ON CONFLICT(key) DO UPDATE SET zh = excluded.zh, en = excluded.en, updated_at = datetime('now')
  `).bind(params.key, JSON.stringify(zh), JSON.stringify(en ?? {})).run()

  return json({ ok: true }, 200, request)
}
