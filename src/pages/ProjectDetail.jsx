import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import cvData from '../data/cvData.json'
import { accent } from '../components/ProjectShowcase'

const SECTIONS = [
  { key: 'purpose', label: '用途',    en: 'Purpose'        },
  { key: 'concept', label: '設計構思', en: 'Design Concept' },
  { key: 'outcome', label: '成果',    en: 'Outcome'         },
]

const TAG_COLORS = {
  'PyTorch':       'bg-violet-50 text-violet-600 border border-violet-100',
  'MIMIC-IV':      'bg-violet-50 text-violet-600 border border-violet-100',
  'Medical AI':    'bg-violet-50 text-violet-600 border border-violet-100',
  'XGBoost':       'bg-purple-50 text-purple-600 border border-purple-100',
  'LightGBM':      'bg-purple-50 text-purple-600 border border-purple-100',
  'AWS SageMaker': 'bg-amber-50  text-amber-600  border border-amber-100',
  'AWS Glue':      'bg-amber-50  text-amber-600  border border-amber-100',
  'Streamlit':     'bg-amber-50  text-amber-600  border border-amber-100',
  'QMK':           'bg-teal-50   text-teal-600   border border-teal-100',
  'PCB Design':    'bg-teal-50   text-teal-600   border border-teal-100',
  'STM32':         'bg-teal-50   text-teal-600   border border-teal-100',
  'ESP32':         'bg-teal-50   text-teal-600   border border-teal-100',
  'ESP-NOW':       'bg-teal-50   text-teal-600   border border-teal-100',
  'Arduino':       'bg-teal-50   text-teal-600   border border-teal-100',
  'LabVIEW':       'bg-rose-50   text-rose-600   border border-rose-100',
  'PID Control':   'bg-rose-50   text-rose-600   border border-rose-100',
  'Robotics':      'bg-rose-50   text-rose-600   border border-rose-100',
}
function tagStyle(tag) {
  return TAG_COLORS[tag.trim()] || 'bg-[#F5F5F7] text-[#424245] border border-[#E5E5EA]'
}

export default function ProjectDetail() {
  const { id }   = useParams()
  const navigate = useNavigate()
  const project  = cvData.projects.find(p => p.id === id)

  // Fix: scroll to top on every navigation to this page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [id])

  const handleBack = () => {
    if (window.history.length > 1) window.history.back()
    else navigate('/')
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#F5F5F7]">
        <p className="text-[#86868B]">找不到此專案</p>
        <Link to="/" className="text-sm text-[#0071E3] hover:underline">← 返回首頁</Link>
      </div>
    )
  }

  const detail      = project.detail || {}
  const accentClass = accent(project.id)

  return (
    <div className="bg-[#F5F5F7] min-h-screen font-sans antialiased page-enter">

      {/* Top nav */}
      <nav className="fixed top-0 left-0 right-0 z-50
                      bg-white/80 backdrop-blur-xl border-b border-[#E5E5EA]/60
                      shadow-[0_1px_0_rgba(0,0,0,0.04)]">
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-[52px] flex items-center justify-between gap-4">
          <button onClick={handleBack}
                  className="flex items-center gap-2 text-[13px] text-[#86868B]
                             hover:text-[#1D1D1F] transition-colors duration-200 shrink-0">
            <span>←</span><span>返回</span>
          </button>
          <p className="text-[13px] font-semibold tracking-tight text-[#1D1D1F] truncate">
            {project.title}
          </p>
          <div className="shrink-0 w-12" />
        </div>
      </nav>

      {/* Gradient accent bar */}
      <div className={`h-[2px] w-full bg-gradient-to-r ${accentClass} mt-[52px]`} />

      <main className="pt-14 pb-32 px-6 md:px-10 max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${accentClass} shrink-0`} />
            <p className="text-[11px] text-[#86868B] font-mono tracking-wide">{project.period}</p>
          </div>
          <h1 className="text-[2.5rem] md:text-[3.25rem] font-extrabold tracking-[-0.03em]
                         text-[#1D1D1F] mb-5 leading-[1.05]">
            {project.title}
          </h1>
          {project.metric && (
            <div className="flex items-baseline gap-3 mb-7">
              <span className={`text-[3.75rem] font-extrabold tracking-[-0.04em] leading-none
                               bg-gradient-to-br ${accentClass} bg-clip-text text-transparent`}>
                {project.metric.replace(/[a-zA-Z\s]/g, '')}
              </span>
              <span className="text-xs font-mono text-[#86868B] uppercase tracking-widest">
                {project.metric.replace(/[\d.+]/g, '').trim() || 'AUROC'}
              </span>
            </div>
          )}
          <p className="text-base text-[#6E6E73] leading-loose mb-7 max-w-xl">{project.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map(tag => (
              <span key={tag} className={`px-3 py-1 rounded-full text-[11px] font-medium ${tagStyle(tag)}`}>
                {tag.trim()}
              </span>
            ))}
          </div>
        </div>

        {/* Content sections */}
        <div className="space-y-4">
          {SECTIONS.map(({ key, label, en }) => (
            <section key={key}
                     className="bg-white border border-[#E5E5EA] rounded-2xl p-8
                                shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
              <div className="flex items-center gap-2 mb-5">
                <span className="block w-4 h-px bg-[#0071E3] rounded-full opacity-70" />
                <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-[#86868B]">{en}</p>
              </div>
              <h2 className="text-lg font-bold tracking-tight text-[#1D1D1F] mb-4">{label}</h2>
              {detail[key] ? (
                <p className="text-[15px] text-[#6E6E73] leading-loose max-w-2xl whitespace-pre-line">
                  {detail[key]}
                </p>
              ) : (
                <div className="h-16 rounded-xl bg-[#F5F5F7] flex items-center justify-center">
                  <p className="text-sm text-[#C7C7CC]">（內容待填寫）</p>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* GitHub link */}
        <div className="mt-14 pt-10 border-t border-[#E5E5EA]">
          {detail.github ? (
            <a href={detail.github}
               target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#1D1D1F] text-white
                          text-[13px] font-medium hover:bg-[#2D2D2F] active:scale-95
                          transition-all duration-300 ease-apple
                          shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              在 GitHub 查看
            </a>
          ) : (
            <p className="text-sm text-[#C7C7CC]">GitHub 連結待補充</p>
          )}
        </div>

      </main>
    </div>
  )
}
