import { useParams, Link } from 'react-router-dom'
import cvData from '../data/cvData.json'

const SECTIONS = [
  { key: 'purpose', label: '用途', en: 'Purpose' },
  { key: 'concept', label: '設計構思', en: 'Design Concept' },
  { key: 'outcome', label: '成果', en: 'Outcome' },
]

export default function ProjectDetail() {
  const { id } = useParams()
  const project = cvData.projects.find(p => p.id === id)

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-[#86868B]">找不到此專案</p>
        <Link to="/" className="text-sm text-[#0071E3] hover:underline">← 返回首頁</Link>
      </div>
    )
  }

  const detail = project.detail || {}

  return (
    <div className="bg-white min-h-screen font-sans antialiased">

      {/* Top nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between gap-4">
          <Link to="/"
                className="flex items-center gap-2 text-sm text-[#86868B] hover:text-[#1D1D1F] transition-colors shrink-0">
            <span>←</span>
            <span>返回</span>
          </Link>
          <p className="text-sm font-semibold text-[#1D1D1F] truncate">{project.title}</p>
          <div className="shrink-0 w-12" />
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6 md:px-10 max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <p className="text-xs font-mono text-[#86868B] mb-4">{project.period}</p>
          <h1 className="text-5xl font-bold tracking-[-0.03em] text-[#1D1D1F] mb-6 leading-tight">
            {project.title}
          </h1>
          {project.metric && (
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-[4rem] font-bold tracking-[-0.04em] text-[#0071E3] leading-none">
                {project.metric.replace(/[a-zA-Z\s]/g, '')}
              </span>
              <span className="text-sm font-mono text-[#86868B] uppercase tracking-widest">
                {project.metric.replace(/[\d.+]/g, '').trim() || 'AUROC'}
              </span>
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag}
                    className="px-3 py-1 rounded-full bg-[#F5F5F7] text-[#1D1D1F] text-sm font-medium">
                {tag.trim()}
              </span>
            ))}
          </div>
        </div>

        {/* Content sections */}
        <div className="space-y-16">
          {SECTIONS.map(({ key, label, en }) => (
            <section key={key}>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#86868B] mb-3">{en}</p>
              <h2 className="text-2xl font-bold text-[#1D1D1F] mb-5">{label}</h2>
              {detail[key] ? (
                <p className="text-base text-[#1D1D1F] leading-relaxed max-w-2xl whitespace-pre-line">
                  {detail[key]}
                </p>
              ) : (
                <div className="h-24 rounded-2xl bg-[#F5F5F7] flex items-center justify-center">
                  <p className="text-sm text-[#86868B]">（內容待填寫）</p>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* GitHub link */}
        <div className="mt-20 pt-10 border-t border-gray-100">
          {detail.github ? (
            <a href={detail.github}
               target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#1D1D1F] text-white
                          text-sm font-medium hover:bg-[#2D2D2F] active:scale-95 transition-all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              在 GitHub 查看
            </a>
          ) : (
            <p className="text-sm text-[#86868B]">GitHub 連結待補充</p>
          )}
        </div>

      </main>
    </div>
  )
}
