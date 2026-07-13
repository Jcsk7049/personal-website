import { useParams, Link, useNavigate, useNavigationType } from 'react-router-dom'
import { useEffect } from 'react'
import cvDataZh from '../data/cvData.json'
import cvDataEn from '../data/cvData.en.json'
import { useLanguage } from '../context/LanguageContext'
import { uiText } from '../data/uiText'
import { SKILL_CAT_ACCENTS, SKILL_CAT_ACCENT_SOLID, LEVEL_CONFIG } from '../data/designTokens'

function LevelDots({ level }) {
  const cfg = LEVEL_CONFIG[level] || LEVEL_CONFIG['基礎']
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3].map(i => (
        <span key={i}
              className={`inline-block w-1.5 h-1.5 rounded-full transition-colors duration-[240ms]
                          ${i <= cfg.dots ? cfg.bar : 'bg-black/10'}`} />
      ))}
    </div>
  )
}

// 把「應用專案」標籤對回專案 id，用資料驅動的最長共同子字串比對（撐得住 admin 改標題）。
// ponytail: 門檻 3 字，對不上就退化成純文字，不硬連。
const normKey = s => (s || '').toLowerCase().replace(/[\s()（）·・.\-—]/g, '')
function lcsLen(a, b) {
  let best = 0
  const dp = Array(b.length + 1).fill(0)
  for (let i = 1; i <= a.length; i++) {
    let prev = 0
    for (let j = 1; j <= b.length; j++) {
      const tmp = dp[j]
      dp[j] = a[i - 1] === b[j - 1] ? prev + 1 : 0
      if (dp[j] > best) best = dp[j]
      prev = tmp
    }
  }
  return best
}
function resolveProjectId(label, projects) {
  if (!Array.isArray(projects)) return null
  const nl = normKey(label)
  let best = null, bestScore = 0
  for (const p of projects) {
    const score = lcsLen(nl, normKey(p.title))
    if (score > bestScore) { bestScore = score; best = p }
  }
  return bestScore >= 3 ? best?.id : null
}

export default function SkillDetail() {
  const { id }         = useParams()
  const navigate       = useNavigate()
  const navigationType = useNavigationType()
  const { lang }       = useLanguage()
  const t              = uiText[lang]
  const cvData         = lang === 'en' ? cvDataEn : cvDataZh
  const detail         = cvData.skills_detail?.[id]
  const accent         = SKILL_CAT_ACCENTS[id] || 'from-gray-300 to-gray-400'
  const accentSolid    = SKILL_CAT_ACCENT_SOLID[id] || 'text-gray-400'

  useEffect(() => {
    if (detail) document.title = `${detail.title} — 江嘉元`
    return () => { document.title = '江嘉元 — 個人履歷' }
  }, [detail])

  /* ── Scroll reveal ── */
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    els.forEach(el => el.classList.add('reveal'))
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); observer.unobserve(e.target) }
      }),
      { threshold: 0.08 }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [detail])

  const handleBack = () => {
    if (navigationType !== 'POP') navigate(-1)
    else navigate('/')
  }

  if (!detail) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#F5F5F7]">
        <p className="text-[#86868B]">{t.notFoundSkill}</p>
        <Link to="/" className="text-sm text-[#0066CC] hover:underline">{t.backHome}</Link>
      </div>
    )
  }

  const total    = detail.skills?.length || 0

  const LEVEL_ORDER = { '進階': 0, '熟悉': 1, '基礎': 2 }
  const sortedSkills = [...(detail.skills || [])].sort(
    (a, b) => (LEVEL_ORDER[a.level] ?? 3) - (LEVEL_ORDER[b.level] ?? 3)
  )
  const counts = { '進階': 0, '熟悉': 0, '基礎': 0 }
  sortedSkills.forEach(s => { if (s.level in counts) counts[s.level]++ })

  return (
    <div className="bg-[#F5F5F7] min-h-screen font-sans antialiased page-enter">

      {/* ── Nav: Apple frosted glass, 48px ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-12"
        style={{
          background: 'rgba(245,245,247,0.85)',
          backdropFilter: 'saturate(180%) blur(20px)',
          WebkitBackdropFilter: 'saturate(180%) blur(20px)',
          borderBottom: '1px solid rgba(0,0,0,0.1)',
        }}
      >
        <div className="max-w-[980px] mx-auto px-6 md:px-10 h-full flex items-center justify-between gap-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 text-sm text-[#86868B] hover:text-[#1D1D1F] transition-colors duration-[240ms] shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
            {t.back}
          </button>
          <p className="text-sm font-semibold tracking-tight text-[#1D1D1F] truncate">{detail.title}</p>
          <div className="shrink-0 w-12" />
        </div>
      </nav>

      <div className="pt-12">
        {/* Accent line */}
        <div className={`h-[3px] w-full bg-gradient-to-r ${accent}`} />

        <main className="pt-16 pb-32 px-6 md:px-10 max-w-[980px] mx-auto">

          {/* ── Hero ── */}
          <div className="mb-12 hero-fade-left">
            <p className={`text-[12px] font-semibold tracking-[0.2em] uppercase mb-3 ${accentSolid}`}>
              {detail.en}
            </p>
            <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.02em] text-[#1D1D1F] mb-6 leading-[1.07]">
              {detail.title}
            </h1>
            <p className="text-[17px] text-[#3F3F46] leading-[1.47] max-w-2xl">
              {detail.overview}
            </p>

            {/* level summary */}
            <div className="flex flex-wrap items-center gap-2 mt-8">
              <span className="px-3 py-1.5 rounded-full bg-white
                               text-xs font-medium text-[#1D1D1F]">
                {t.skillCount ? t.skillCount(total) : `${total}`}
              </span>
              {['進階', '熟悉', '基礎'].map(lv => counts[lv] > 0 && (
                <span key={lv}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white
                                 text-xs font-medium text-[#3F3F46]">
                  <span className={`w-1.5 h-1.5 rounded-full ${LEVEL_CONFIG[lv].bar}`} />
                  {t.levels?.[lv] ?? lv} {counts[lv]}
                </span>
              ))}
            </div>
          </div>

          {/* ── Skill spec-list ── */}
          <div className="border-t border-black/[0.08]" data-reveal>
            {sortedSkills.map((skill, i) => (
              <div key={i}
                   className="grid md:grid-cols-[minmax(150px,15rem)_1fr] gap-x-10 gap-y-3
                              py-6 md:py-7 border-b border-black/[0.08]">

                {/* Left: name + level */}
                <div>
                  <h2 className="text-[17px] md:text-[18px] font-semibold tracking-tight leading-snug text-[#1D1D1F]">
                    {skill.name}
                  </h2>
                  <div className="flex items-center gap-2 mt-2">
                    <LevelDots level={skill.level} />
                    <span className={`text-[11px] font-semibold tracking-[0.15em] uppercase ${accentSolid}`}>
                      {t.levels[skill.level] ?? skill.level}
                    </span>
                  </div>
                </div>

                {/* Right: description + applied projects */}
                <div>
                  <p className="text-[15px] text-[#3F3F46] leading-relaxed">
                    {skill.desc}
                  </p>
                  {skill.projects?.length > 0 && (
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-4">
                      <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#86868B]">
                        {t.appliedProjects}
                      </span>
                      {skill.projects.map(proj => {
                        const pid = resolveProjectId(proj, cvData.projects)
                        return pid ? (
                          <Link key={proj} to={`/projects/${pid}`}
                                className="inline-flex items-center gap-1 text-[13px] text-[#0071E3]
                                           hover:underline underline-offset-2 decoration-[#0071E3]/40">
                            {proj}
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M7 17 17 7M8 7h9v9" />
                            </svg>
                          </Link>
                        ) : (
                          <span key={proj} className="text-[13px] text-[#3F3F46]">{proj}</span>
                        )
                      })}
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>

        </main>
      </div>
    </div>
  )
}
