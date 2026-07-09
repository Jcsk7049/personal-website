import { Link } from 'react-router-dom'
import SectionHeader from './SectionHeader'
import { useLanguage } from '../context/LanguageContext'
import { uiText } from '../data/uiText'
import { SKILL_CAT_ACCENTS, LEVEL_CONFIG } from '../data/designTokens'

const QUADRANT_META = [
  {
    key: 'data_analysis',
    accent: SKILL_CAT_ACCENTS.data_analysis,
    span: 2,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6"  y1="20" x2="6"  y2="14" /><line x1="2"  y1="20" x2="22" y2="20" />
      </svg>
    ),
  },
  {
    key: 'programming',
    accent: SKILL_CAT_ACCENTS.programming,
    span: 1,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    key: 'eda',
    accent: SKILL_CAT_ACCENTS.eda,
    span: 1,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="7" y="7" width="10" height="10" rx="1" />
        <line x1="7" y1="9" x2="3" y2="9" /><line x1="7" y1="15" x2="3" y2="15" />
        <line x1="17" y1="9" x2="21" y2="9" /><line x1="17" y1="15" x2="21" y2="15" />
        <line x1="9" y1="7" x2="9" y2="3" /><line x1="15" y1="7" x2="15" y2="3" />
        <line x1="9" y1="17" x2="9" y2="21" /><line x1="15" y1="17" x2="15" y2="21" />
      </svg>
    ),
  },
  {
    key: 'manufacturing',
    accent: SKILL_CAT_ACCENTS.manufacturing,
    span: 2,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
      </svg>
    ),
  },
]

const LEVEL_STYLE = Object.fromEntries(
  Object.entries(LEVEL_CONFIG).map(([k, v]) => [k, v.badge])
)
const LEVEL_BAR = Object.fromEntries(
  Object.entries(LEVEL_CONFIG).map(([k, v]) => [k, v.bar])
)

export default function SkillGrid({ skills, detail }) {
  const { lang } = useLanguage()
  const t = uiText[lang]

  return (
    <section id="skills" className="min-h-screen py-16 md:py-32 bg-[#F5F5F7]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionHeader label={t.sections.skills} sub={t.sectionSubs.skills} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 card-stagger">
          {QUADRANT_META.map(q => {
            const d        = detail?.[q.key]
            const tags     = skills[q.key] || []
            const skillList = d?.skills || []
            const isFeatured = q.span === 2
            const qLabels  = t.quadrants[q.key]

            const counts = { '進階': 0, '熟悉': 0, '基礎': 0 }
            skillList.forEach(s => { if (s.level in counts) counts[s.level]++ })

            return (
              <Link
                key={q.key}
                to={`/skills/${q.key}`}
                className={`col-span-1 ${isFeatured ? 'md:col-span-2' : ''}
                           relative rounded-[18px] bg-white
                           hover:shadow-[rgba(0,0,0,0.08)_2px_4px_12px_0px]
                           transition-shadow duration-[240ms] group flex flex-col`}
              >
                <div className={`${isFeatured ? 'p-8 md:p-10' : 'p-7 md:p-8'} flex flex-col flex-1 gap-5`}>

                  {/* eyebrow + headline */}
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-semibold text-[#6E6E73] mb-2">
                        {qLabels.sublabel}
                      </p>
                      <h3 className="text-[24px] font-semibold tracking-[0.009em] leading-[1.29] text-[#1D1D1F]">
                        {qLabels.label}
                      </h3>
                    </div>
                    <span className={`mt-0.5 bg-gradient-to-br ${q.accent} bg-clip-text text-transparent
                                     opacity-60 group-hover:opacity-100 transition-opacity duration-[240ms]`}>
                      {q.icon}
                    </span>
                  </div>

                  {/* overview */}
                  {d?.overview && (
                    <p className={`text-[15px] text-[#3F3F46] leading-[1.47] ${isFeatured ? '' : 'line-clamp-3'}`}>
                      {d.overview}
                    </p>
                  )}

                  {/* proficiency bar */}
                  {skillList.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex h-[3px] rounded-full overflow-hidden gap-0.5">
                        {counts['進階'] > 0 && <div className={`${LEVEL_BAR['進階']} rounded-full`} style={{ flex: counts['進階'] }} />}
                        {counts['熟悉'] > 0 && <div className={`${LEVEL_BAR['熟悉']} rounded-full`} style={{ flex: counts['熟悉'] }} />}
                        {counts['基礎'] > 0 && <div className={`${LEVEL_BAR['基礎']} rounded-full`} style={{ flex: counts['基礎'] }} />}
                      </div>
                      <div className="flex gap-3">
                        {counts['進階'] > 0 && <span className="flex items-center gap-1 text-[11px] text-[#86868B]"><span className={`w-1.5 h-1.5 rounded-full shrink-0 ${LEVEL_BAR['進階']}`} />{t.levels['進階']} {counts['進階']}</span>}
                        {counts['熟悉'] > 0 && <span className="flex items-center gap-1 text-[11px] text-[#86868B]"><span className={`w-1.5 h-1.5 rounded-full shrink-0 ${LEVEL_BAR['熟悉']}`} />{t.levels['熟悉']} {counts['熟悉']}</span>}
                        {counts['基礎'] > 0 && <span className="flex items-center gap-1 text-[11px] text-[#86868B]"><span className={`w-1.5 h-1.5 rounded-full shrink-0 ${LEVEL_BAR['基礎']}`} />{t.levels['基礎']} {counts['基礎']}</span>}
                      </div>
                    </div>
                  )}

                  {/* tool tags（含精熟度） */}
                  <div className="flex flex-wrap gap-1.5 flex-1 items-start content-start">
                    {(skillList.length > 0 ? skillList : tags.map(name => ({ name }))).map(s => (
                      <span key={s.name}
                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${s.level ? (LEVEL_STYLE[s.level] || LEVEL_STYLE['基礎']) : 'bg-[#F5F5F7] text-[#3F3F46]'}`}>
                        {s.name}
                        {s.level && <span className="opacity-60"> · {t.levels[s.level] ?? s.level}</span>}
                      </span>
                    ))}
                  </div>

                  {/* footer: count + Apple-style plus button */}
                  <div className="flex items-end justify-between pt-1">
                    {skillList.length > 0 ? (
                      <span className="text-[11px] text-[#86868B] font-mono">{t.skillCount(skillList.length)}</span>
                    ) : <span />}
                    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#1D1D1F] text-white
                                     group-hover:bg-[#0071E3] transition-colors duration-[240ms]"
                          aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                        <line x1="7" y1="1.5" x2="7" y2="12.5" /><line x1="1.5" y1="7" x2="12.5" y2="7" />
                      </svg>
                    </span>
                  </div>

                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
