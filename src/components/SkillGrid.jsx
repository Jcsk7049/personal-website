import { Link, useLocation } from 'react-router-dom'
import SectionHeader from './SectionHeader'

const QUADRANTS = [
  {
    key: 'data_analysis', label: '數據分析', sublabel: 'Data Analysis',
    accent: 'from-sky-400 to-blue-500',
    span: 2,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6"  y1="20" x2="6"  y2="14" /><line x1="2"  y1="20" x2="22" y2="20" />
      </svg>
    ),
  },
  {
    key: 'programming', label: '程式開發', sublabel: 'Programming',
    accent: 'from-violet-400 to-purple-500',
    span: 1,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    key: 'eda', label: '電路設計', sublabel: 'Electronic Design',
    accent: 'from-amber-400 to-orange-500',
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
    key: 'manufacturing', label: '機構加工', sublabel: 'Manufacturing',
    accent: 'from-teal-400 to-cyan-500',
    span: 2,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
      </svg>
    ),
  },
]

const LEVEL_STYLE = {
  '進階': 'bg-violet-400/15 text-violet-300',
  '熟悉': 'bg-blue-400/15 text-blue-300',
  '基礎': 'bg-white/10 text-white/40',
}

export default function SkillGrid({ skills, detail }) {
  const location = useLocation()
  return (
    <section id="skills" className="py-32 bg-[#0d0d0f]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionHeader zh="技術矩陣" invert />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 card-stagger">
          {QUADRANTS.map(q => {
            const d        = detail?.[q.key]
            const tags     = skills[q.key] || []
            const skillList = d?.skills || []
            const isFeatured = q.span === 2

            const counts = { '進階': 0, '熟悉': 0, '基礎': 0 }
            skillList.forEach(s => { if (s.level in counts) counts[s.level]++ })

            return (
              <Link
                key={q.key}
                to={`/skills/${q.key}`}
                state={{ background: location }}
                className={`col-span-1 ${isFeatured ? 'md:col-span-2' : ''}
                           rounded-2xl bg-[#141418] border border-white/[0.06]
                           hover:border-white/[0.13] hover:-translate-y-0.5 hover:bg-[#1a1a20]
                           transition-all duration-500 group flex flex-col`}
              >
                <div className={`${isFeatured ? 'p-8 md:p-10' : 'p-7'} flex flex-col flex-1 gap-5`}>

                  {/* header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[10px] tracking-[0.22em] uppercase mb-1.5 text-white/35">
                        {q.sublabel}
                      </p>
                      <h3 className="text-lg font-bold tracking-tight text-white/85
                                     group-hover:text-white transition-colors duration-200">
                        {q.label}
                      </h3>
                    </div>
                    <span className={`mt-0.5 bg-gradient-to-br ${q.accent} bg-clip-text text-transparent
                                     opacity-40 group-hover:opacity-75 transition-opacity duration-300`}>
                      {q.icon}
                    </span>
                  </div>

                  {/* overview */}
                  {d?.overview && (
                    <p className={`text-sm text-white/45 leading-relaxed ${isFeatured ? '' : 'line-clamp-2'}`}>
                      {d.overview}
                    </p>
                  )}

                  {/* featured: inline skill preview */}
                  {isFeatured && skillList.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {skillList.slice(0, 4).map(s => (
                        <div key={s.name}
                             className="flex items-center justify-between
                                        bg-white/[0.04] rounded-xl px-3.5 py-2.5
                                        border border-white/[0.05]">
                          <span className="text-sm font-medium text-white/75 truncate mr-2">{s.name}</span>
                          <span className={`shrink-0 text-[10px] font-mono px-2 py-0.5 rounded-full ${LEVEL_STYLE[s.level] || LEVEL_STYLE['基礎']}`}>
                            {s.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* proficiency bar */}
                  {skillList.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex h-[3px] rounded-full overflow-hidden gap-0.5">
                        {counts['進階'] > 0 && <div className="bg-violet-400/60 rounded-full" style={{ flex: counts['進階'] }} />}
                        {counts['熟悉'] > 0 && <div className="bg-blue-400/60 rounded-full"   style={{ flex: counts['熟悉'] }} />}
                        {counts['基礎'] > 0 && <div className="bg-white/15 rounded-full"       style={{ flex: counts['基礎'] }} />}
                      </div>
                      <div className="flex gap-3">
                        {counts['進階'] > 0 && <span className="flex items-center gap-1 text-[11px] text-white/35"><span className="w-1.5 h-1.5 rounded-full bg-violet-400/60 shrink-0" />進階 {counts['進階']}</span>}
                        {counts['熟悉'] > 0 && <span className="flex items-center gap-1 text-[11px] text-white/35"><span className="w-1.5 h-1.5 rounded-full bg-blue-400/60 shrink-0" />熟悉 {counts['熟悉']}</span>}
                        {counts['基礎'] > 0 && <span className="flex items-center gap-1 text-[11px] text-white/35"><span className="w-1.5 h-1.5 rounded-full bg-white/15 shrink-0" />基礎 {counts['基礎']}</span>}
                      </div>
                    </div>
                  )}

                  {/* tool tags */}
                  <div className="flex flex-wrap gap-1.5 flex-1 items-start content-start">
                    {tags.map(skill => (
                      <span key={skill}
                            className="px-2.5 py-1 rounded-full text-xs font-medium
                                       bg-white/[0.05] text-white/45 border border-white/[0.06]">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                    {skillList.length > 0 && (
                      <span className="text-[11px] text-white/25 font-mono">{skillList.length} 項技能</span>
                    )}
                    <span className="text-xs text-sky-400 font-medium ml-auto
                                     opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0
                                     transition-all duration-200">
                      查看詳情 →
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
