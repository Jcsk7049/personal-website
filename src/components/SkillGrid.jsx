import { Link } from 'react-router-dom'
import SectionHeader from './SectionHeader'

const QUADRANTS = [
  {
    key: 'data_analysis', label: '數據分析', sublabel: 'Data Analysis',
    accent: 'from-sky-400 to-blue-600',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4"  />
        <line x1="6"  y1="20" x2="6"  y2="14" />
        <line x1="2"  y1="20" x2="22" y2="20" />
      </svg>
    ),
  },
  {
    key: 'programming', label: '程式開發', sublabel: 'Programming',
    accent: 'from-violet-400 to-purple-600',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18"   />
      </svg>
    ),
  },
  {
    key: 'eda', label: '電路設計', sublabel: 'Electronic Design',
    accent: 'from-amber-400 to-orange-500',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="7" y="7" width="10" height="10" rx="1" />
        <line x1="7"  y1="9"  x2="3"  y2="9"  />
        <line x1="7"  y1="15" x2="3"  y2="15" />
        <line x1="17" y1="9"  x2="21" y2="9"  />
        <line x1="17" y1="15" x2="21" y2="15" />
        <line x1="9"  y1="7"  x2="9"  y2="3"  />
        <line x1="15" y1="7"  x2="15" y2="3"  />
        <line x1="9"  y1="17" x2="9"  y2="21" />
        <line x1="15" y1="17" x2="15" y2="21" />
      </svg>
    ),
  },
  {
    key: 'manufacturing', label: '機構加工', sublabel: 'Manufacturing',
    accent: 'from-teal-400 to-cyan-500',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
      </svg>
    ),
  },
]

export default function SkillGrid({ skills, detail }) {
  return (
    <section id="skills" className="py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionHeader
          en="Skills"
          zh="技術矩陣"
          sub="從底層硬體到 AI 模型，跨域整合是最核心的競爭力。"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 card-stagger">
          {QUADRANTS.map(q => {
            const d = detail?.[q.key]
            const tags = skills[q.key] || []
            const sectionCount = d?.skills?.length ?? 0
            return (
              <Link key={q.key} to={`/skills/${q.key}`}
                   className="rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm
                              transition-all duration-500 hover:-translate-y-1
                              hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:border-slate-200
                              group flex flex-col">

                {/* accent bar */}
                <div className={`h-[3px] w-full bg-gradient-to-r ${q.accent}`} />

                <div className="p-8 flex flex-col flex-1 gap-5">

                  {/* header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[10px] tracking-[0.22em] uppercase mb-1.5 text-slate-400">
                        {q.sublabel}
                      </p>
                      <h3 className="text-lg font-bold tracking-tight text-[#1D1D1F]
                                     group-hover:text-[#0071E3] transition-colors duration-200">
                        {q.label}
                      </h3>
                    </div>
                    <span className={`mt-1 bg-gradient-to-br ${q.accent} bg-clip-text text-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300`}>
                      {q.icon}
                    </span>
                  </div>

                  {/* overview */}
                  {d?.overview && (
                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                      {d.overview}
                    </p>
                  )}

                  {/* tools */}
                  <div className="flex flex-wrap gap-2 flex-1">
                    {tags.map(skill => (
                      <span key={skill}
                            className="px-3 py-1 rounded-full text-xs font-medium
                                       bg-blue-50 text-blue-700 border border-blue-100">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                    {sectionCount > 0 && (
                      <span className="text-[11px] text-slate-400 font-mono">
                        {sectionCount} 個核心領域
                      </span>
                    )}
                    <span className="text-xs text-[#0071E3] font-medium ml-auto
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
