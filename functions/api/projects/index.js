import { json } from '../_shared/cors.js'
import { isPlainObject, isValidSlug } from '../_shared/validate.js'

export async function onRequestGet(context) {
  const { env, request } = context
  const lang = new URL(request.url).searchParams.get('lang') || 'zh'
  const rows = await env.DB.prepare(
    'SELECT id, zh, en, sort_order FROM projects ORDER BY sort_order ASC, rowid ASC'
  ).all()
  const projects = rows.results.map(r => JSON.parse(r[lang] || r.zh))
  return json(projects, 200, request)
}

export async function onRequestPost(context) {
  const { request, env } = context
  const body = await request.json().catch(() => null)
  if (!body || !isPlainObject(body.zh)) return json({ error: 'zh required' }, 400, request)
  const { zh, en } = body
  if (!isValidSlug(zh.id)) return json({ error: 'zh.id must be a lowercase slug (a-z, 0-9, -)' }, 400, request)
  if (en !== undefined && en !== null && !isPlainObject(en)) return json({ error: 'invalid en' }, 400, request)

  const existing = await env.DB.prepare('SELECT id FROM projects WHERE id = ?').bind(zh.id).first()
  if (existing) return json({ error: 'Project id already exists' }, 409, request)

  const maxRow = await env.DB.prepare('SELECT MAX(sort_order) as m FROM projects').first()
  const sort = (maxRow?.m ?? -1) + 1

  await env.DB.prepare(
    'INSERT INTO projects (id, zh, en, sort_order) VALUES (?, ?, ?, ?)'
  ).bind(zh.id, JSON.stringify(zh), JSON.stringify(en ?? {}), sort).run()

  return json({ ok: true, id: zh.id }, 201, request)
}
