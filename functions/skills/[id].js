import { serveMetadataPage } from '../_shared/pageMetadata.js'

export function onRequestGet(context) {
  return serveMetadataPage(context, async ({ env, params, request }) => {
    const row = await env.DB.prepare("SELECT zh, en FROM sections WHERE key = 'skills_detail' LIMIT 1").first()
    if (!row) return null
    const language = new URL(request.url).searchParams.get('lang')
    const skillGroups = JSON.parse(language === 'en' ? row.en : row.zh)
    const detail = skillGroups[params.id]
    if (!detail) return null
    return {
      title: detail.title,
      description: detail.overview,
    }
  })
}
