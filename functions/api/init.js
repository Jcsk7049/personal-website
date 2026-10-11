import { json } from './_shared/cors.js'

// The former initializer copied the repository's fallback JSON into D1 and
// overwrote live content. D1 is authoritative, so this endpoint is retired.
export function onRequestGet({ request }) {
  return json({ error: 'Initialization endpoint retired' }, 410, request)
}
