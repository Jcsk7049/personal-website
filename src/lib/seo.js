const baseTitle = document.title
const baseTags = ['description', 'og:title', 'og:description', 'og:url', 'og:image', 'twitter:title', 'twitter:description', 'twitter:image']
const baseValues = Object.fromEntries(baseTags.map(key => {
  const selector = key.startsWith('og:') ? `meta[property="${key}"]` : `meta[name="${key}"]`
  return [key, document.head.querySelector(selector)?.content || '']
}))

function setMeta(key, value) {
  if (!value) return
  const attr = key.startsWith('og:') ? 'property' : 'name'
  let element = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attr, key)
    document.head.append(element)
  }
  element.content = value
}

function setCanonical(url) {
  let link = document.head.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.rel = 'canonical'
    document.head.append(link)
  }
  link.href = url
}

export function updatePageMetadata({ title, description, image, path, type = 'website' }) {
  document.title = title
  const pageUrl = new URL(path, window.location.origin)
  const canonical = new URL(pageUrl)
  canonical.search = ''
  canonical.hash = ''
  const absoluteImage = image ? new URL(image, window.location.origin).href : baseValues['og:image']
  setMeta('description', description)
  setMeta('og:type', type)
  setMeta('og:title', title)
  setMeta('og:description', description)
  setMeta('og:url', pageUrl.href)
  setMeta('og:image', absoluteImage)
  setMeta('twitter:title', title)
  setMeta('twitter:description', description)
  setMeta('twitter:image', absoluteImage)
  setCanonical(canonical.href)
}

export function resetPageMetadata(title = baseTitle) {
  document.title = title
  for (const [key, value] of Object.entries(baseValues)) setMeta(key, value)
  setMeta('og:type', 'website')
  setCanonical(new URL('/', window.location.origin).href)
}
