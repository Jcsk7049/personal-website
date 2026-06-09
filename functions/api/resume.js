import { json } from '../_shared/cors.js'

export async function onRequestGet(context) {
  const { env, request } = context
  const lang = new URL(request.url).searchParams.get('lang') || 'zh'
  const row = await env.DB.prepare('SELECT html FROM resume WHERE lang = ?').bind(lang).first()
  if (!row) return json({ html: '' }, 200, request)
  return json({ html: row.html }, 200, request)
}

export async function onRequestPut(context) {
  const { request, env } = context
  const { lang, html } = await request.json()
  if (!lang || !html) return json({ error: 'lang and html required' }, 400, request)

  await env.DB.prepare(`
    INSERT INTO resume (lang, html) VALUES (?, ?)
    ON CONFLICT(lang) DO UPDATE SET html = excluded.html, updated_at = datetime('now')
  `).bind(lang, html).run()

  return json({ ok: true }, 200, request)
}
