import { useParams, Link, useNavigate, useNavigationType } from 'react-router-dom'
import { useEffect } from 'react'
import cvData from '../data/cvData.json'
import VapCharts from '../components/VapCharts'
import BitoCharts from '../components/BitoCharts'
import ProjectGallery from '../components/ProjectGallery'
import { CategoryBadge } from '../components/ProjectShowcase'

const SECTIONS = [
  { key: 'purpose', label: '用途',   en: 'Purpose'       },
  { key: 'concept', label: '設計構思', en: 'Design Concept' },
  { key: 'outcome', label: '成果',   en: 'Outcome'        },
  { key: 'tech',    label: '使用技術', en: 'Tech Stack'     },
]

const PROJECT_ACCENTS = {
  'vap':               'from-sky-400 to-blue-600',
  'aws-hackathon':     'from-amber-400 to-orange-500',
  'audio-amplifier':   'from-lime-400 to-green-600',
  'qmk-stm32-keyboard':'from-violet-400 to-purple-600',
  'whack-a-mole':      'from-teal-400 to-cyan-500',
  'auto-sanitizer':    'from-emerald-400 to-green-600',
  'team-robot':        'from-orange-400 to-amber-600',
  'swerve':            'from-rose-400 to-red-500',
}

export default function ProjectDetail() {
  const { id }          = useParams()
  const navigate        = useNavigate()
  const navigationType  = useNavigationType()
  const project         = cvData.projects.find(p => p.id === id)

  useEffect(() => {
    if (project) document.title = `${project.title} — 江嘉元`
    return () => { document.title = '江嘉元 — 個人履歷' }
  }, [project])

  const handleBack = () => {
    if (navigationType === 'POP') navigate('/')
    else navigate(-1)
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50">
        <p className="text-slate-400">找不到此專案</p>
        <Link to="/" className="text-sm text-[#0071E3] hover:underline">← 返回首頁</Link>
      </div>
    )
  }

  const detail      = project.detail || {}
  const accentClass = PROJECT_ACCENTS[project.id] || 'from-gray-300 to-gray-400'

  return (
    <div className="bg-slate-50 min-h-screen font-sans antialiased page-enter">

      {/* Top nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between gap-4">
          <button onClick={handleBack}
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-[#1D1D1F] transition-colors shrink-0">
            <span>←</span><span>返回</span>
          </button>
          <p className="text-sm font-semibold tracking-tight text-[#1D1D1F] truncate">{project.title}</p>
          <div className="shrink-0 w-12" />
        </div>
      </nav>

      <div className="pt-14">
        <div className={`h-[3px] w-full bg-gradient-to-r ${accentClass}`} />
        <main className="pt-16 pb-32 px-6 md:px-10 max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.003em] text-[#1D1D1F] mb-6 leading-tight">
            {project.title}
          </h1>
          {project.metric && (
            <div className="flex items-baseline gap-3 mb-6">
              <span className={`text-[4rem] font-extrabold tracking-[-0.04em] leading-none
                               bg-gradient-to-br ${accentClass} bg-clip-text text-transparent`}>
                {project.metric.replace(/[a-zA-Z\s]/g, '')}
              </span>
              <span className="text-sm font-mono text-slate-400 uppercase tracking-widest">
                {project.metric.replace(/[\d.+]/g, '').trim() || 'AUROC'}
              </span>
            </div>
          )}
          <div className="flex flex-wrap gap-2 items-center">
            {project.category && <CategoryBadge category={project.category} />}
            {project.tags.map(tag => (
              <span key={tag}
                    className="px-3 py-1 rounded-full bg-[#f5f5f7] text-[#6e6e73] border border-black/[0.05] text-sm font-medium">
                {tag.trim()}
              </span>
            ))}
          </div>
        </div>

        {/* Content sections */}
        <div className="space-y-14">
          {SECTIONS.map(({ key, label, en }) => (
            <section key={key} className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="block w-4 h-px bg-[#0071E3] rounded-full" />
                <p className="text-[13px] font-semibold text-[#0071E3]">{en}</p>
              </div>
              <h2 className="text-xl font-bold tracking-[-0.003em] text-[#1D1D1F] mb-4">{label}</h2>
              {key === 'outcome' && project.id === 'vap' && (
                <div className="mb-8">
                  <VapCharts />
                </div>
              )}
              {key === 'outcome' && project.id === 'aws-hackathon' && (
                <div className="mb-8">
                  <BitoCharts />
                </div>
              )}
              {key === 'outcome' && detail.images?.length > 0 && (
                <div className="mb-8">
                  <ProjectGallery images={detail.images} />
                </div>
              )}
              {key === 'outcome' && detail.video && (
                <div className="mb-8 flex justify-center">
                  <div className="relative w-[260px] rounded-[2rem] overflow-hidden shadow-2xl border-[6px] border-[#1D1D1F] bg-black">
                    <div className="aspect-[9/16]">
                      <iframe
                        src={`https://www.youtube.com/embed/${detail.video}?autoplay=0&rel=0`}
                        title="Demo video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              )}
              {key === 'tech' && Array.isArray(detail.tech) ? (
                <div className="space-y-6">
                  {detail.tech.map(group => (
                    <div key={group.group}>
                      <p className="text-xs font-semibold tracking-[0.12em] uppercase text-slate-400 mb-2">
                        {group.group}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {group.items.map(item => (
                          <div key={item.name}
                               className="flex gap-3 bg-[#f5f5f7] rounded-xl px-4 py-3">
                            <span className="shrink-0 font-semibold text-sm text-[#1D1D1F] min-w-[7rem]">
                              {item.name}
                            </span>
                            <span className="text-sm text-[#6e6e73] leading-snug">{item.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : detail[key] ? (
                <p className="text-base text-slate-600 leading-relaxed max-w-2xl whitespace-pre-line">
                  {detail[key]}
                </p>
              ) : (
                <div className="h-20 rounded-xl bg-slate-50 flex items-center justify-center">
                  <p className="text-sm text-slate-400">（內容待填寫）</p>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Links */}
        <div className="mt-16 pt-10 border-t border-slate-100 flex flex-wrap gap-3">
          {detail.github && (
            <a href={detail.github}
               target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#1D1D1F] text-white
                          text-sm font-medium hover:bg-[#2D2D2F] active:scale-95 transition-all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              在 GitHub 查看
            </a>
          )}
          {detail.demo && (
            <a href={detail.demo}
               target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full
                          border border-[#1D1D1F] text-[#1D1D1F] text-sm font-medium
                          hover:bg-[#1D1D1F] hover:text-white active:scale-95 transition-all">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              Live Demo
            </a>
          )}
        </div>

      </main>
      </div>
    </div>
  )
}
