import { useParams, Link, useNavigate } from 'react-router-dom'
import cvData from '../data/cvData.json'

const SKILL_ACCENTS = {
  data_analysis: 'from-sky-400 to-blue-600',
  programming:   'from-violet-400 to-purple-600',
  eda:           'from-amber-400 to-orange-500',
  manufacturing: 'from-teal-400 to-cyan-500',
}

const LEVEL_CONFIG = {
  '基礎': { dots: 1, badge: 'bg-slate-100 text-slate-500',   bar: 'bg-slate-300' },
  '熟悉': { dots: 2, badge: 'bg-blue-50  text-blue-600',     bar: 'bg-blue-400'  },
  '進階': { dots: 3, badge: 'bg-violet-50 text-violet-600',  bar: 'bg-violet-500'},
}

function LevelDots({ level }) {
  const cfg = LEVEL_CONFIG[level] || LEVEL_CONFIG['基礎']
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3].map(i => (
        <span key={i}
              className={`inline-block w-1.5 h-1.5 rounded-full transition-colors
                          ${i <= cfg.dots ? cfg.bar : 'bg-slate-200'}`} />
      ))}
    </div>
  )
}

export default function SkillDetail() {
  const { id }   = useParams()
  const navigate = useNavigate()
  const detail   = cvData.skills_detail?.[id]
  const accent   = SKILL_ACCENTS[id] || 'from-gray-300 to-gray-400'

  const handleBack = () => {
    if (window.history.length > 1) window.history.back()
    else navigate('/')
  }

  if (!detail) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50">
        <p className="text-slate-400">找不到此技術頁面</p>
        <Link to="/" className="text-sm text-[#0071E3] hover:underline">← 返回首頁</Link>
      </div>
    )
  }

  return (
    <div className="bg-slate-50 min-h-screen font-sans antialiased page-enter">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between gap-4">
          <button onClick={handleBack}
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-[#1D1D1F] transition-colors shrink-0">
            <span>←</span><span>返回</span>
          </button>
          <p className="text-sm font-semibold tracking-tight text-[#1D1D1F] truncate">{detail.title}</p>
          <div className="shrink-0 w-12" />
        </div>
      </nav>

      <div className="pt-14">
        <div className={`h-[3px] w-full bg-gradient-to-r ${accent}`} />
        <main className="pt-16 pb-32 px-6 md:px-10 max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-14 max-w-2xl">
          <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-slate-400 mb-3">
            {detail.en}
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1D1D1F] mb-6 leading-tight">
            {detail.title}
          </h1>
          <p className="text-base text-slate-500 leading-relaxed">
            {detail.overview}
          </p>
        </div>

        {/* Skill cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {(detail.skills || []).map((skill, i) => {
            const cfg = LEVEL_CONFIG[skill.level] || LEVEL_CONFIG['基礎']
            return (
              <div key={i}
                   className="bg-white border border-slate-100 rounded-2xl p-7 shadow-sm
                              hover:border-slate-200 hover:shadow-md transition-all duration-300
                              flex flex-col gap-4">

                {/* Card header */}
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-base font-bold tracking-tight text-[#1D1D1F] leading-snug">
                    {skill.name}
                  </h2>
                  <span className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-semibold leading-none ${cfg.badge}`}>
                    {skill.level}
                  </span>
                </div>

                {/* Level dots */}
                <LevelDots level={skill.level} />

                {/* Description */}
                <p className="text-sm text-slate-500 leading-relaxed flex-1">
                  {skill.desc}
                </p>

                {/* Projects */}
                {skill.projects?.length > 0 && (
                  <div className="pt-3 border-t border-slate-50">
                    <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-slate-400 mb-2">
                      應用專案
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {skill.projects.map(proj => (
                        <span key={proj}
                              className="px-2.5 py-1 rounded-full text-xs font-medium
                                         bg-blue-50 text-blue-700 border border-blue-100">
                          {proj}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )
          })}
        </div>

      </main>
      </div>
    </div>
  )
}
