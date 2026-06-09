import { json } from '../_shared/cors.js'

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
  const { zh, en } = await request.json()
  if (!zh?.id) return json({ error: 'zh.id required' }, 400, request)

  const maxRow = await env.DB.prepare('SELECT MAX(sort_order) as m FROM projects').first()
  const sort = (maxRow?.m ?? -1) + 1

  await env.DB.prepare(
    'INSERT INTO projects (id, zh, en, sort_order) VALUES (?, ?, ?, ?)'
  ).bind(zh.id, JSON.stringify(zh), JSON.stringify(en ?? {}), sort).run()

  return json({ ok: true, id: zh.id }, 201, request)
}
