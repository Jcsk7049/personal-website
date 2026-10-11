const SITE_NAME = '江嘉元'

function compact(value, limit = 180) {
  const text = String(value || '').replace(/\s+/g, ' ').trim()
  return text.length > limit ? `${text.slice(0, limit - 1).trimEnd()}…` : text
}
function escapeAttribute(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char])
}

function setMeta(html, key, value) {
  const attr = key.startsWith('og:') ? 'property' : 'name'
  let found = false
  const updated = html.replace(/<meta\b[^>]*>/gi, tag => {
    const match = tag.match(/\b(?:name|property)=["']([^"']+)["']/i)
    if (match?.[1] !== key) return tag
    found = true
    return `<meta ${attr}="${key}" content="${escapeAttribute(value)}">`
  })
  return found ? updated : updated.replace('</head>', `  <meta ${attr}="${key}" content="${escapeAttribute(value)}">\n</head>`)
}

function setCanonical(html, url) {
  const tag = `<link rel="canonical" href="${escapeAttribute(url)}">`
  const pattern = /<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/i
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `  ${tag}\n</head>`)
}

export async function serveMetadataPage(context, loadRecord) {
  const response = await context.next()
  if (!response.headers.get('content-type')?.includes('text/html')) return response

  try {
    const record = await loadRecord(context)
    if (!record?.title) return response

    const requestUrl = new URL(context.request.url)
    const canonical = new URL(requestUrl.pathname, requestUrl.origin)
    const title = `${record.title} — ${SITE_NAME}`
    const description = compact(record.description || record.title)
    const image = record.image ? new URL(record.image, requestUrl.origin).href : null
    let html = await response.text()
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeAttribute(title)}</title>`)
    html = setMeta(html, 'description', description)
    html = setMeta(html, 'og:type', record.type || 'website')
    html = setMeta(html, 'og:title', title)
    html = setMeta(html, 'og:description', description)
    html = setMeta(html, 'og:url', requestUrl.href)
    html = setMeta(html, 'twitter:card', 'summary_large_image')
    html = setMeta(html, 'twitter:title', title)
    html = setMeta(html, 'twitter:description', description)
    if (image) {
      html = setMeta(html, 'og:image', image)
      html = setMeta(html, 'twitter:image', image)
    }
    html = setCanonical(html, canonical.href)

    const headers = new Headers(response.headers)
    headers.delete('content-length')
    headers.delete('content-encoding')
    headers.delete('etag')
    headers.set('cache-control', 'no-store')
    return new Response(html, { status: response.status, statusText: response.statusText, headers })
  } catch {
    return response
  }
}
