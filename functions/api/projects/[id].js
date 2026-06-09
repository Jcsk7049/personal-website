import { json } from '../_shared/cors.js'

export async function onRequestGet(context) {
  const { env, request, params } = context
  const lang = new URL(request.url).searchParams.get('lang') || 'zh'
  const row = await env.DB.prepare('SELECT zh, en FROM projects WHERE id = ?')
    .bind(params.id).first()
  if (!row) return json({ error: 'Not found' }, 404, request)
  return json(JSON.parse(row[lang] || row.zh), 200, request)
}

export async function onRequestPut(context) {
  const { request, env, params } = context
  const { zh, en } = await request.json()

  const existing = await env.DB.prepare('SELECT id FROM projects WHERE id = ?')
    .bind(params.id).first()
  if (!existing) return json({ error: 'Not found' }, 404, request)

  await env.DB.prepare(
    'UPDATE projects SET zh = ?, en = ?, updated_at = datetime("now") WHERE id = ?'
  ).bind(JSON.stringify(zh), JSON.stringify(en ?? {}), params.id).run()

  return json({ ok: true }, 200, request)
}

export async function onRequestDelete(context) {
  const { request, env, params } = context
  await env.DB.prepare('DELETE FROM projects WHERE id = ?').bind(params.id).run()
  return json({ ok: true }, 200, request)
}
