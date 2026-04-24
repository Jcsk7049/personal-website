const QUADRANTS = [
  {
    key:      'programming',
    label:    '程式語言',
    sublabel: 'Programming',
    icon:     '{ }',
    accent:   false,
  },
  {
    key:      'eda',
    label:    'EDA 工具',
    sublabel: 'Electronic Design',
    icon:     '⬡',
    accent:   false,
  },
  {
    key:      'manufacturing',
    label:    '硬體製造',
    sublabel: 'Manufacturing',
    icon:     '⚙',
    accent:   true,   // highlighted per spec
  },
  {
    key:      'dataAnalysis',
    label:    '數據分析',
    sublabel: 'Data Analysis',
    icon:     '∿',
    accent:   true,   // highlighted per spec
  },
]

export default function SkillGrid({ skills }) {
  return (
    <section id="skills" className="py-24 px-6 md:px-20 lg:px-36 border-t border-gray-100">

      <p className="text-xs tracking-[0.22em] uppercase text-[#86868B] mb-3">Skills</p>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">技術棧</h2>
      <p className="text-[#86868B] text-base mb-16 max-w-md">
        橫跨硬體製造與數據分析的跨界能力，是我最核心的競爭優勢。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {QUADRANTS.map(q => (
          <div
            key={q.key}
            className={`rounded-2xl p-8 transition-all ${
              q.accent
                ? 'bg-[#F5F5F7] ring-1 ring-inset ring-gray-200'
                : 'border border-gray-100'
            }`}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-xs tracking-widest uppercase text-[#86868B] mb-1">
                  {q.sublabel}
                </p>
                <h3 className="text-xl font-semibold text-[#1D1D1F]">{q.label}</h3>
              </div>
              <span
                className={`text-2xl font-mono select-none ${
                  q.accent ? 'text-[#0071E3]' : 'text-gray-300'
                }`}
              >
                {q.icon}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {(skills[q.key] || []).map(skill => (
                <span
                  key={skill}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    q.accent
                      ? 'bg-white text-[#1D1D1F] border border-gray-200'
                      : 'bg-[#F5F5F7] text-[#1D1D1F]'
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
