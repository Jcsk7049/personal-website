import { serveMetadataPage } from '../_shared/pageMetadata.js'

export function onRequestGet(context) {
  return serveMetadataPage(context, async ({ env, params, request }) => {
    const row = await env.DB.prepare('SELECT zh, en FROM projects WHERE id = ? LIMIT 1').bind(params.id).first()
    if (!row) return null
    const language = new URL(request.url).searchParams.get('lang')
    const project = JSON.parse(language === 'en' ? row.en : row.zh)
    return {
      title: project.title,
      description: project.description,
      image: project.cover,
      type: 'article',
    }
  })
}
