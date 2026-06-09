/**
 * GET /api/init?secret=<ADMIN_PASSWORD>
 * 一次性將 cvData.json 資料匯入 D1。
 * 已有資料的 key 會被覆蓋，重複執行安全。
 */
import { json } from './_shared/cors.js'
import cvDataZh from '../../src/data/cvData.json'
import cvDataEn from '../../src/data/cvData.en.json'

const SECTION_KEYS = ['profile', 'education', 'experience', 'skills_matrix', 'skills_detail', 'awards']

export async function onRequestGet(context) {
  const { env, request } = context
  const secret = new URL(request.url).searchParams.get('secret')
  if (secret !== env.ADMIN_PASSWORD) return json({ error: 'Forbidden' }, 403, request)

  const db = env.DB

  // Create tables
  await db.batch([
    db.prepare(`CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY, zh TEXT NOT NULL, en TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0, updated_at TEXT DEFAULT (datetime('now'))
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS sections (
      key TEXT PRIMARY KEY, zh TEXT NOT NULL, en TEXT NOT NULL,
      updated_at TEXT DEFAULT (datetime('now'))
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS resume (
      lang TEXT PRIMARY KEY, html TEXT NOT NULL,
      updated_at TEXT DEFAULT (datetime('now'))
    )`),
  ])

  // Seed sections
  const sectionStmts = SECTION_KEYS.map(key =>
    db.prepare(`INSERT INTO sections (key, zh, en) VALUES (?, ?, ?)
      ON CONFLICT(key) DO UPDATE SET zh=excluded.zh, en=excluded.en, updated_at=datetime('now')`)
      .bind(key, JSON.stringify(cvDataZh[key]), JSON.stringify(cvDataEn[key]))
  )
  await db.batch(sectionStmts)

  // Seed projects
  const projectStmts = cvDataZh.projects.map((proj, i) => {
    const enProj = cvDataEn.projects.find(p => p.id === proj.id) ?? {}
    return db.prepare(`INSERT INTO projects (id, zh, en, sort_order) VALUES (?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET zh=excluded.zh, en=excluded.en, sort_order=excluded.sort_order, updated_at=datetime('now')`)
      .bind(proj.id, JSON.stringify(proj), JSON.stringify(enProj), i)
  })
  await db.batch(projectStmts)

  return json({ ok: true, sections: SECTION_KEYS.length, projects: cvDataZh.projects.length }, 200, request)
}
