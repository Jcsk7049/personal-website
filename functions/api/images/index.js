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

const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
const ALLOWED_EXT  = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg']
const MAX_SIZE     = 5 * 1024 * 1024 // 5MB

export async function onRequestPost(context) {
  const { request, env } = context
  const form = await request.formData()
  const file = form.get('file')
  if (!file || typeof file === 'string') return json({ error: 'no file' }, 400, request)
  if (file.size > MAX_SIZE) return json({ error: 'file too large (max 5MB)' }, 400, request)

  const mime = file.type || 'image/jpeg'
  if (!ALLOWED_MIME.includes(mime)) return json({ error: 'unsupported file type' }, 400, request)
  const ext = (file.name.split('.').pop() || '').toLowerCase()
  if (!ALLOWED_EXT.includes(ext)) return json({ error: 'unsupported file extension' }, 400, request)
  const name = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const b64  = arrayBufferToBase64(await file.arrayBuffer())

  await env.DB.prepare(
    'INSERT INTO images (name, data, mime) VALUES (?, ?, ?) ON CONFLICT(name) DO UPDATE SET data=excluded.data, mime=excluded.mime'
  ).bind(name, b64, mime).run()

  return json({ name, path: `/api/images/${name}` }, 200, request)
}
