import { json, corsHeaders, handleOptions } from '../_shared/cors.js'

function arrayBufferToBase64(buffer) {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  for (let i = 0; i < bytes.length; i += 8192) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 8192))
  }
  return btoa(binary)
}

export async function onRequestOptions(context) {
  return handleOptions(context.request)
}

export async function onRequestGet(context) {
  const { env, request } = context
  const rows = await env.DB.prepare('SELECT name, mime, created_at FROM images ORDER BY created_at DESC').all()
  return json(rows.results, 200, request)
}

export async function onRequestPost(context) {
  const { request, env } = context
  const form = await request.formData()
  const file = form.get('file')
  if (!file) return json({ error: 'no file' }, 400, request)

  const mime = file.type || 'image/jpeg'
  const ext  = file.name.split('.').pop().toLowerCase()
  const name = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const b64  = arrayBufferToBase64(await file.arrayBuffer())

  await env.DB.prepare(
    'INSERT INTO images (name, data, mime) VALUES (?, ?, ?) ON CONFLICT(name) DO UPDATE SET data=excluded.data, mime=excluded.mime'
  ).bind(name, b64, mime).run()

  return json({ name, path: `/api/images/${name}` }, 200, request)
}
