import { useEffect } from 'react'
import { useParams, Link, useNavigate, useNavigationType } from 'react-router-dom'
import cvDataZh from '../data/cvData.json'
import cvDataEn from '../data/cvData.en.json'
import { useLanguage } from '../context/LanguageContext'
import { uiText } from '../data/uiText'

const CATEGORY_ORDER = ['data_analysis', 'programming', 'eda', 'manufacturing', 'vibecoding']
const CATEGORY_COLOR = {
  data_analysis: '#737C84',
  programming: '#737C84',
  eda: '#737C84',
  manufacturing: '#737C84',
  vibecoding: '#737C84',
}
const LEVELS = ['進階', '熟悉', '基礎']
const LEVEL_COLOR = { '進階': '#515B64', '熟悉': '#737C84', '基礎': '#A1A1AA' }

const normKey = s => (s || '').toLowerCase().replace(/[\s()（）·・.\-—]/g, '')
function lcsLen(a, b) {
  let best = 0
  const dp = Array(b.length + 1).fill(0)
  for (let i = 1; i <= a.length; i++) {
    let prev = 0
    for (let j = 1; j <= b.length; j++) {
      const tmp = dp[j]
      dp[j] = a[i - 1] === b[j - 1] ? prev + 1 : 0
      best = Math.max(best, dp[j])
      prev = tmp
    }
  }
  return best
}
function resolveProjectId(label, projects) {
  if (!Array.isArray(projects)) return null
  const normalized = normKey(label)
  let best = null, score = 0
  for (const project of projects) {
    const candidate = lcsLen(normalized, normKey(project.title))
    if (candidate > score) { score = candidate; best = project }
  }
  return score >= 3 ? best?.id : null
}

function LevelDots({ level }) {
  const count = { '進階': 3, '熟悉': 2, '基礎': 1 }[level] || 1
  return <span className="flex gap-1" aria-label={level}>
    {[0, 1, 2].map(i => <i key={i} className="h-1.5 w-1.5 rounded-full" style={{ background: i < count ? LEVEL_COLOR[level] : 'rgba(255,255,255,.16)' }} />)}
  </span>
}

export default function SkillDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const navigationType = useNavigationType()
  const { lang } = useLanguage()
  const t = uiText[lang]
  const cvData = lang === 'en' ? cvDataEn : cvDataZh
  const detail = cvData.skills_detail?.[id]
  const color = CATEGORY_COLOR[id] || '#A1A1AA'

  useEffect(() => {
    if (detail) document.title = `${detail.title} — 江嘉元`
    return () => { document.title = '江嘉元 — 個人履歷' }
  }, [detail])

  const handleBack = () => navigationType !== 'POP' ? navigate(-1) : navigate('/')
  if (!detail) return <div className="min-h-screen bg-[#1D1D1F] text-white flex flex-col items-center justify-center gap-4">
    <p className="text-white/60">{t.notFoundSkill}</p>
    <Link to="/" className="text-sm text-[#AEB5BA] hover:underline">{t.backHome}</Link>
  </div>

  const skills = detail.skills || []
  const counts = Object.fromEntries(LEVELS.map(level => [level, skills.filter(skill => skill.level === level).length]))
  const total = skills.length

  return <div className="site-shell min-h-screen bg-[#1D1D1F] text-[#F5F5F7] font-sans antialiased">
    <nav className="fixed inset-x-0 top-0 z-50 h-12 border-b border-white/10" style={{ background: 'rgba(29,29,31,.88)', backdropFilter: 'saturate(150%) blur(18px)' }}>
      <div className="flex h-full w-full items-center justify-between gap-4 px-6 md:px-10">
        <button onClick={handleBack} className="flex shrink-0 items-center gap-2 text-sm text-white/55 transition-colors hover:text-white">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>{t.back}
        </button>
        <p className="truncate text-sm font-medium text-white/80">{detail.title}</p><span className="w-12 shrink-0" />
      </div>
    </nav>

    <main className="w-full px-6 pb-24 pt-12 md:px-10">
      <header className="border-b border-white/10 pb-10 pt-12 md:pb-14 md:pt-16">
        <div className="mb-9 flex flex-wrap gap-2" aria-label={t.sections.skills}>
          {CATEGORY_ORDER.map(key => {
            const label = t.quadrants?.[key]?.label || key
            return key === id
              ? <span key={key} className="border px-3 py-2 text-xs font-medium" style={{ borderColor: `${color}75`, color, background: `${color}12` }}>{label}</span>
              : <Link key={key} to={`/skills/${key}`} className="border border-white/10 px-3 py-2 text-xs text-white/50 transition-colors hover:border-white/30 hover:text-white/85">{label}</Link>
          })}
        </div>
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(300px,.72fr)] xl:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[.18em]" style={{ color }}>{detail.en}</p>
            <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[.98] tracking-[-.045em]">{detail.title}</h1>
            <p className="mt-6 max-w-3xl text-base leading-7 text-white/65 md:text-lg">{detail.overview}</p>
          </div>
          <div className="border-t border-white/15 pt-4 xl:border-l xl:border-t-0 xl:pl-6 xl:pt-0">
            <div className="mb-4 flex items-baseline justify-between gap-4">
              <span className="text-sm text-white/55">{lang === 'en' ? 'Skill inventory' : '技能清單'}</span>
              <span className="font-mono text-3xl font-medium tracking-tight">{String(total).padStart(2, '0')}</span>
            </div>
            <div className="flex h-1.5 w-full overflow-hidden bg-white/10" aria-label={t.skillCount ? t.skillCount(total) : `${total}`}>
              {LEVELS.map(level => counts[level] > 0 && <span key={level} style={{ width: `${counts[level] / Math.max(total, 1) * 100}%`, background: LEVEL_COLOR[level] }} />)}
            </div>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              {LEVELS.map(level => counts[level] > 0 && <span key={level} className="flex items-center gap-2 text-xs text-white/60"><i className="h-1.5 w-1.5 rounded-full" style={{ background: LEVEL_COLOR[level] }} />{t.levels?.[level] || level}<b className="font-mono font-normal text-white/85">{counts[level]}</b></span>)}
            </div>
          </div>
        </div>
      </header>

      <section className="pt-8 md:pt-10" aria-label={detail.title}>
        <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-3 text-xs text-white/45">
          <span>{lang === 'en' ? 'TECHNICAL NOTES' : '技術項目'}</span><span className="font-mono">{String(total).padStart(2, '0')} {lang === 'en' ? 'ENTRIES' : '項'}</span>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {skills.map((skill, index) => <article key={`${skill.name}-${index}`} className="skill-spec-card flex min-w-0 flex-col border border-white/10 bg-[#242427] p-5 md:p-6" style={{ borderTopColor: color }}>
            <div className="mb-7 flex items-start justify-between gap-4">
              <span className="font-mono text-xs" style={{ color }}>{String(index + 1).padStart(2, '0')}</span>
              <span className="flex items-center gap-2 text-[11px] text-white/55"><LevelDots level={skill.level} />{t.levels?.[skill.level] || skill.level}</span>
            </div>
            <h2 className="text-xl font-semibold leading-snug tracking-tight text-white">{skill.name}</h2>
            <p className="mt-3 flex-1 text-sm leading-6 text-white/62">{skill.desc}</p>
            {skill.projects?.length > 0 && <div className="mt-6 border-t border-white/10 pt-4">
              <p className="mb-2 text-[10px] font-medium uppercase tracking-[.15em] text-white/40">{t.appliedProjects}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {skill.projects.map(project => {
                  const projectId = resolveProjectId(project, cvData.projects)
                  return projectId ? <Link key={project} to={`/projects/${projectId}`} className="text-xs text-[#B8C0C6] transition-colors hover:text-white">{project} ↗</Link> : <span key={project} className="text-xs text-white/60">{project}</span>
                })}
              </div>
            </div>}
          </article>)}
        </div>
      </section>
    </main>
  </div>
}
