const TOKEN_TTL = 24 * 60 * 60 * 1000 // 24 hours

async function hmac(data, secret) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const buf = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data))
  return btoa(String.fromCharCode(...new Uint8Array(buf)))
}

export async function createToken(secret) {
  const ts = Date.now().toString()
  const sig = await hmac(ts, secret)
  return `${ts}.${sig}`
}

export function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export async function verifyToken(token, secret) {
  try {
    const dot = token.indexOf('.')
    if (dot === -1) return false
    const ts = token.slice(0, dot)
    const sig = token.slice(dot + 1)
    if (Date.now() - parseInt(ts) > TOKEN_TTL) return false
    const expected = await hmac(ts, secret)
    return timingSafeEqual(expected, sig)
  } catch {
    return false
  }
}
