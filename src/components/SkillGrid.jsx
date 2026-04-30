import SectionHeader from './SectionHeader'

const QUADRANTS = [
  {
    key: 'data_analysis', label: '數據分析', sublabel: 'Data Analysis',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4"  />
        <line x1="6"  y1="20" x2="6"  y2="14" />
        <line x1="2"  y1="20" x2="22" y2="20" />
      </svg>
    ),
  },
  {
    key: 'programming', label: '程式開發', sublabel: 'Programming',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18"   />
      </svg>
    ),
  },
  {
    key: 'eda', label: '電路設計', sublabel: 'Electronic Design',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
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
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
      </svg>
    ),
  },
]

export default function SkillGrid({ skills }) {
  return (
    <section id="skills" className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <SectionHeader
          en="Skills"
          zh="技術矩陣"
          sub="從底層硬體到 AI 模型，跨域整合是最核心的競爭力。"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl card-stagger">
          {QUADRANTS.map(q => (
            <div key={q.key}
                 className="rounded-2xl p-8 bg-white border border-[#E5E5EA]
                            shadow-card hover:shadow-card-hover hover:-translate-y-[4px]
                            transition-all duration-500 ease-apple group">
              <div className="flex items-start justify-between mb-7">
                <div>
                  <p className="text-[10px] tracking-[0.24em] uppercase mb-2 text-[#86868B] font-medium">
                    {q.sublabel}
                  </p>
                  <h3 className="text-[17px] font-bold tracking-tight text-[#1D1D1F]">
                    {q.label}
                  </h3>
                </div>
                <span className="mt-1 text-[#C7C7CC] group-hover:text-[#0071E3]
                                 transition-colors duration-500 ease-apple">
                  {q.icon}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {(skills[q.key] || []).map(skill => (
                  <span key={skill}
                        className="px-3 py-1 rounded-full text-[11px] font-medium
                                   bg-[#F5F5F7] text-[#424245] border border-[#E5E5EA]
                                   hover:border-[#0071E3]/30 hover:text-[#0071E3]
                                   transition-colors duration-300 ease-apple cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
