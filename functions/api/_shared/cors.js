const ALLOWED_ORIGINS = ['http://localhost:5173', 'http://localhost:8788']

export function corsHeaders(request) {
  const origin = request.headers.get('Origin') || ''
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ''
  return {
    'Access-Control-Allow-Origin': allowed || '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  }
}

export function json(data, status = 200, request = null) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...(request ? corsHeaders(request) : {}),
    },
  })
}

export function handleOptions(request) {
  return new Response(null, { status: 204, headers: corsHeaders(request) })
}
