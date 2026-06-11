export function isPlainObject(v) {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

export function isValidSlug(id) {
  return typeof id === 'string' && /^[a-z0-9][a-z0-9-]{0,63}$/.test(id)
}
