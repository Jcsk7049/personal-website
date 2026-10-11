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

const MIME_EXT = {
  'image/jpeg': ['jpg', 'jpeg'],
  'image/png': ['png'],
  'image/webp': ['webp'],
  'image/gif': ['gif'],
}
const MAX_SIZE     = 5 * 1024 * 1024 // 5MB

function detectImageMime(bytes) {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'image/jpeg'
  if (bytes.length >= 8 && [137, 80, 78, 71, 13, 10, 26, 10].every((value, i) => bytes[i] === value)) return 'image/png'
  if (bytes.length >= 6 && ['GIF87a', 'GIF89a'].some(signature => signature.split('').every((char, i) => bytes[i] === char.charCodeAt(0)))) return 'image/gif'
  if (bytes.length >= 12 && String.fromCharCode(...bytes.subarray(0, 4)) === 'RIFF' && String.fromCharCode(...bytes.subarray(8, 12)) === 'WEBP') return 'image/webp'
  return null
}

export async function onRequestPost(context) {
  const { request, env } = context
  const form = await request.formData()
  const file = form.get('file')
  if (!file || typeof file === 'string') return json({ error: 'no file' }, 400, request)
  if (file.size > MAX_SIZE) return json({ error: 'file too large (max 5MB)' }, 400, request)

  const ext = (file.name.split('.').pop() || '').toLowerCase()
  const buffer = await file.arrayBuffer()
  const mime = detectImageMime(new Uint8Array(buffer))
  if (!mime || !MIME_EXT[mime].includes(ext) || file.type !== mime) {
    return json({ error: 'unsupported or mismatched image type' }, 400, request)
  }
  const name = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const b64  = arrayBufferToBase64(buffer)

  await env.DB.prepare(
    'INSERT INTO images (name, data, mime) VALUES (?, ?, ?) ON CONFLICT(name) DO UPDATE SET data=excluded.data, mime=excluded.mime'
  ).bind(name, b64, mime).run()

  return json({ name, path: `/api/images/${name}` }, 200, request)
}
