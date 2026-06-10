import { useParams, Link, useNavigate, useNavigationType } from 'react-router-dom'
import { useEffect } from 'react'
import cvDataZh from '../data/cvData.json'
import cvDataEn from '../data/cvData.en.json'
import { useLanguage } from '../context/LanguageContext'
import { uiText } from '../data/uiText'

const SKILL_ACCENTS = {
  data_analysis: 'from-sky-400 to-blue-600',
  programming:   'from-violet-400 to-purple-600',
  eda:           'from-amber-400 to-orange-500',
  manufacturing: 'from-teal-400 to-cyan-500',
}

const LEVEL_CONFIG = {
  '基礎': { dots: 1, badge: 'bg-[#F5F5F7] text-[#86868B]',    bar: 'bg-black/20'  },
  '熟悉': { dots: 2, badge: 'bg-[#EEF5FF] text-[#0066CC]',    bar: 'bg-[#0071E3]' },
  '進階': { dots: 3, badge: 'bg-[#F2EEFF] text-[#5E3DE8]',    bar: 'bg-[#7C3AED]' },
}

function LevelDots({ level }) {
  const cfg = LEVEL_CONFIG[level] || LEVEL_CONFIG['基礎']
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3].map(i => (
        <span key={i}
              className={`inline-block w-1.5 h-1.5 rounded-full transition-colors duration-[125ms]
                          ${i <= cfg.dots ? cfg.bar : 'bg-black/10'}`} />
      ))}
    </div>
  )
}

export default function SkillDetail() {
  const { id }         = useParams()
  const navigate       = useNavigate()
  const navigationType = useNavigationType()
  const { lang }       = useLanguage()
  const t              = uiText[lang]
  const cvData         = lang === 'en' ? cvDataEn : cvDataZh
  const detail         = cvData.skills_detail?.[id]
  const accent         = SKILL_ACCENTS[id] || 'from-gray-300 to-gray-400'

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
  const gridCols = total <= 3
    ? 'grid-cols-1 md:grid-cols-3'
    : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'

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
            className="flex items-center gap-1.5 text-sm text-[#86868B] hover:text-[#1D1D1F] transition-colors duration-[125ms] shrink-0"
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
            <p className={`text-[12px] font-semibold tracking-[0.2em] uppercase mb-3
                           bg-gradient-to-r ${accent} bg-clip-text text-transparent`}>
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

          {/* ── Skill cards ── */}
          <div className={`grid ${gridCols} gap-5`} data-reveal>
            {sortedSkills.map((skill, i) => {
              return (
                <div key={i}
                     className="group relative bg-white rounded-[18px] p-7
                                hover:shadow-[rgba(0,0,0,0.08)_2px_4px_12px_0px]
                                transition-shadow duration-[240ms]
                                flex flex-col gap-4">

                  <p className={`text-[12px] font-semibold tracking-[0.2em] uppercase
                                 bg-gradient-to-r ${accent} bg-clip-text text-transparent`}>
                    {t.levels[skill.level] ?? skill.level}
                  </p>

                  <h2 className="text-[20px] font-semibold tracking-[0.009em] leading-[1.29] text-[#1D1D1F]">
                    {skill.name}
                  </h2>

                  <LevelDots level={skill.level} />

                  <p className="text-sm text-[#3F3F46] leading-relaxed flex-1">
                    {skill.desc}
                  </p>

                  {skill.projects?.length > 0 && (
                    <div className="pt-3 border-t border-black/[0.06]">
                      <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#86868B] mb-2">
                        {t.appliedProjects}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {skill.projects.map(proj => (
                          <span key={proj}
                                className="px-2.5 py-1 rounded-full text-xs font-medium
                                           bg-[#EEF5FF] text-[#0066CC] border border-[#C7D8F0]">
                            {proj}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-end pt-1">
                    <span className={`flex items-center justify-center w-9 h-9 rounded-full bg-[#1D1D1F] text-white
                                     group-hover:bg-[#0071E3] transition-colors duration-[240ms]`}
                          aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                        <line x1="7" y1="1.5" x2="7" y2="12.5" /><line x1="1.5" y1="7" x2="12.5" y2="7" />
                      </svg>
                    </span>
                  </div>

                </div>
              )
            })}
          </div>

        </main>
      </div>
    </div>
  )
}
