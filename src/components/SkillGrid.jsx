import SectionHeader from './SectionHeader'

const QUADRANTS = [
  { key: 'data_analysis', label: '數據分析',  sublabel: 'Data Analysis',    icon: '∿', dark: true  },
  { key: 'programming',   label: '程式開發',  sublabel: 'Programming',       icon: '{ }', dark: false },
  { key: 'eda',           label: '電路設計',  sublabel: 'Electronic Design', icon: '⬡', dark: false },
  { key: 'manufacturing', label: '機構加工',  sublabel: 'Manufacturing',     icon: '⚙', dark: false },
]

export default function SkillGrid({ skills }) {
  return (
    <section id="skills" className="py-24 bg-[#F5F5F7]">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
      <SectionHeader
        en="Skills"
        zh="技術矩陣"
        sub="從底層硬體到 AI 模型，跨域整合是最核心的競爭力。"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl card-stagger">
        {QUADRANTS.map(q => (
          <div key={q.key}
               className={`rounded-2xl p-8 border border-transparent transition-all duration-300
                           hover:-translate-y-1 hover:shadow-xl hover:border-gray-200/60 ${
                 q.dark
                   ? 'bg-[#1D1D1F] text-white hover:shadow-gray-800/30'
                   : 'bg-white hover:shadow-gray-200/60'
               }`}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className={`text-xs tracking-widest uppercase mb-1 ${q.dark ? 'text-white/50' : 'text-[#86868B]'}`}>
                  {q.sublabel}
                </p>
                <h3 className={`text-xl font-semibold ${q.dark ? 'text-white' : 'text-[#1D1D1F]'}`}>
                  {q.label}
                </h3>
              </div>
              <span className={`text-2xl font-mono select-none ${q.dark ? 'text-[#0071E3]' : 'text-gray-300'}`}>
                {q.icon}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {(skills[q.key] || []).map(skill => (
                <span key={skill}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        q.dark
                          ? 'bg-white/10 text-white'
                          : 'bg-[#F5F5F7] text-[#1D1D1F]'
                      }`}>
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
