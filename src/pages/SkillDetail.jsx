import { useParams, Link, useNavigate } from 'react-router-dom'
import cvData from '../data/cvData.json'

const SKILL_ACCENTS = {
  data_analysis: 'from-sky-400 to-blue-600',
  programming:   'from-violet-400 to-purple-600',
  eda:           'from-teal-400 to-cyan-500',
  manufacturing: 'from-amber-400 to-orange-500',
}

export default function SkillDetail() {
  const { id }   = useParams()
  const navigate = useNavigate()
  const detail   = cvData.skills_detail?.[id]
  const tags     = cvData.skills_matrix?.[id] || []
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
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between gap-4">
          <button onClick={handleBack}
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-[#1D1D1F] transition-colors shrink-0">
            <span>←</span><span>返回</span>
          </button>
          <p className="text-sm font-semibold tracking-tight text-[#1D1D1F] truncate">{detail.title}</p>
          <div className="shrink-0 w-12" />
        </div>
      </nav>

      {/* Accent bar */}
      <div className={`h-[3px] w-full bg-gradient-to-r ${accent} mt-14`} />

      <main className="pt-16 pb-32 px-6 md:px-10 max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-slate-400 mb-3">
            {detail.en}
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1D1D1F] mb-6 leading-tight">
            {detail.title}
          </h1>
          <p className="text-base text-slate-500 leading-relaxed max-w-2xl mb-8">
            {detail.overview}
          </p>
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <span key={tag}
                    className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-sm font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {detail.sections.map((sec, i) => (
            <section key={i} className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="block w-4 h-px bg-[#0071E3] rounded-full" />
                <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-slate-400">
                  {String(i + 1).padStart(2, '0')}
                </p>
              </div>
              <h2 className="text-xl font-extrabold tracking-tight text-[#1D1D1F] mb-4">{sec.label}</h2>
              <p className="text-base text-slate-600 leading-relaxed max-w-2xl whitespace-pre-line">
                {sec.content}
              </p>
            </section>
          ))}
        </div>

      </main>
    </div>
  )
}
