import { json } from '../_shared/cors.js'

export async function onRequestPost(context) {
  const { request, env } = context
  const { ids } = await request.json()
  if (!Array.isArray(ids) || ids.length === 0) return json({ error: 'ids required' }, 400, request)

  const stmt = env.DB.prepare('UPDATE projects SET sort_order = ?, updated_at = datetime(\'now\') WHERE id = ?')
  await env.DB.batch(ids.map((id, i) => stmt.bind(i, id)))

  return json({ ok: true }, 200, request)
}
