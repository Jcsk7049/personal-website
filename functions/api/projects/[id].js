import { json } from '../_shared/cors.js'
import { isPlainObject } from '../_shared/validate.js'

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
  const body = await request.json().catch(() => null)
  if (!body || !isPlainObject(body.zh)) return json({ error: 'zh required' }, 400, request)
  const { zh, en } = body
  if (en !== undefined && en !== null && !isPlainObject(en)) return json({ error: 'invalid en' }, 400, request)

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
