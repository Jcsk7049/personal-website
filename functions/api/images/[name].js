export async function onRequestGet(context) {
  const { params, env } = context
  const row = await env.DB.prepare('SELECT data, mime FROM images WHERE name = ?').bind(params.name).first()
  if (!row) return new Response('Not found', { status: 404 })

  const binary = atob(row.data)
  const bytes  = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)

  return new Response(bytes, {
    headers: {
      'Content-Type': row.mime,
      'Cache-Control': 'public, max-age=31536000',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
