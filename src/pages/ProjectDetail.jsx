import { useParams, Link, useNavigate, useNavigationType } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useData } from '../context/DataContext'
import { uiText } from '../data/uiText'
import VapCharts from '../components/VapCharts'
import BitoCharts from '../components/BitoCharts'
import ProjectGallery from '../components/ProjectGallery'
import { CategoryBadge } from '../components/ProjectShowcase'

const PROJECT_ACCENTS = {
  'analog-ic-studio':  'from-cyan-400 to-blue-600',
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
  const { lang }        = useLanguage()
  const t               = uiText[lang]
  const { cvZh, cvEn }  = useData()
  const cvData          = lang === 'en' ? cvEn : cvZh
  const project         = cvData.projects.find(p => p.id === id)
  const [archOpen, setArchOpen] = useState(false)

  useEffect(() => {
    if (project) document.title = `${project.title} — 江嘉元`
    return () => { document.title = '江嘉元' }
  }, [project])

  /* ── Scroll reveal ── */
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    els.forEach(el => el.classList.add('reveal'))
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); observer.unobserve(e.target) }
      }),
      { threshold: 0.08 }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [project])

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape' && archOpen) setArchOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [archOpen])

  const handleBack = () => {
    if (navigationType !== 'POP') navigate(-1)
    else navigate('/')
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#F5F5F7]">
        <p className="text-[#86868B]">{t.notFoundProject}</p>
        <Link to="/" className="text-sm text-[#0066CC] hover:underline">{t.backHome}</Link>
      </div>
    )
  }

  const detail      = project.detail || {}
  const accentClass = PROJECT_ACCENTS[project.id] || 'from-gray-300 to-gray-400'
  const sections    = t.projectSections

  return (
    <div className="bg-[#F5F5F7] min-h-screen font-sans antialiased page-enter">

      {/* ── Nav: Apple frosted glass, 48px ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-12"
        style={{
          background: 'rgba(245,245,247,0.85)',
          backdropFilter: 'saturate(180%) blur(20px)',
          WebkitBackdropFilter: 'saturate(180%) blur(20px)',
          borderBottom: '1px solid rgba(0,0,0,0.1)',
        }}
      >
        <div className="max-w-[980px] mx-auto px-6 md:px-10 h-full flex items-center justify-between gap-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 text-sm text-[#86868B] hover:text-[#1D1D1F] transition-colors duration-[125ms] shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
            {t.back}
          </button>
          <p className="text-sm font-semibold tracking-tight text-[#1D1D1F] truncate">{project.title}</p>
          <div className="shrink-0 w-12" />
        </div>
      </nav>

      <div className="pt-12">
        {/* Accent line */}
        <div className={`h-[3px] w-full bg-gradient-to-r ${accentClass}`} />

        <main className="pt-16 pb-32 px-6 md:px-10 max-w-[980px] mx-auto">

          {/* ── Hero ── */}
          <div className="mb-20 hero-fade-left">
            {/* Eyebrow: category + period */}
            <div className="flex items-center gap-3 mb-5">
              {project.category && <CategoryBadge category={project.category} />}
              {project.period && (
                <span className="text-[12px] font-mono text-[#86868B] tracking-wide">
                  {project.period}
                </span>
              )}
            </div>

            <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.02em] text-[#1D1D1F] mb-5 leading-[1.07]">
              {project.title}
            </h1>

            {/* ── Quick-access links below title ── */}
            {(detail.github || detail.demo) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {detail.github && (
                  <a href={detail.github}
                     target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#1D1D1F] text-white
                                text-xs font-medium hover:bg-[#2D2D2F] transition-colors duration-[125ms]">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    {t.githubBtn}
                  </a>
                )}
                {detail.demo && (
                  <a href={detail.demo}
                     target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full
                                border border-[#1D1D1F] text-[#1D1D1F] text-xs font-medium
                                hover:bg-[#1D1D1F] hover:text-white transition-colors duration-[125ms]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>
            )}

            {project.metric && (
              <div className="flex items-baseline gap-3 mb-6">
                <span className={`text-[3.5rem] font-bold tracking-[-0.04em] leading-none
                                 bg-gradient-to-br ${accentClass} bg-clip-text text-transparent`}>
                  {project.metric.replace(/[a-zA-Z\s]/g, '')}
                </span>
                <span className="text-[12px] font-semibold tracking-[0.2em] uppercase text-[#86868B]">
                  {project.metric.replace(/[\d.+]/g, '').trim() || 'AUROC'}
                </span>
              </div>
            )}

            {project.badge && (
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold
                               bg-amber-50 text-amber-700 border border-amber-200 mb-4">
                {project.badge}
              </span>
            )}

            <div className="flex flex-wrap gap-2 items-center">
              {project.tags.map(tag => (
                <span key={tag}
                      className="px-2.5 py-1 rounded-full bg-white text-[#3F3F46]
                                 shadow-[0_0_0_1px_rgba(0,0,0,0.08)] text-xs font-medium">
                  {tag.trim()}
                </span>
              ))}
            </div>
          </div>

          {/* ── Editorial sections: no cards, divide-y ── */}
          <div className="divide-y divide-black/[0.06]">
            {sections.map(({ key, label, en }) => (
              <div key={key} className="py-14 first:pt-0" data-reveal>

                {/* 2-layer: eyebrow + title */}
                <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-[#86868B] mb-2">
                  {en}
                </p>
                <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.003em] text-[#1D1D1F] mb-8 leading-tight">
                  {label}
                </h2>

                {/* Charts / media */}
                {key === 'outcome' && project.id === 'vap' && (
                  <div className="mb-8"><VapCharts /></div>
                )}
                {key === 'outcome' && project.id === 'aws-hackathon' && (
                  <div className="mb-8"><BitoCharts /></div>
                )}
                {key === 'outcome' && detail.images?.length > 0 && (
                  <div className="mb-8"><ProjectGallery images={detail.images} /></div>
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

                {/* Tech stack */}
                {key === 'tech' && Array.isArray(detail.tech) ? (
                  <div className="space-y-8">
                    {detail.tech.map(group => (
                      <div key={group.group}>
                        <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-[#86868B] mb-3">
                          {group.group}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {group.items.map(item => (
                            <div key={item.name}
                                 className="flex gap-3 bg-white rounded-2xl px-5 py-4
                                            shadow-[0_0_0_1px_rgba(0,0,0,0.08)]">
                              <span className="shrink-0 font-semibold text-sm text-[#1D1D1F] min-w-[7rem]">
                                {item.name}
                              </span>
                              <span className="text-sm text-[#3F3F46] leading-snug">{item.desc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : detail[key] ? (
                  <p className="text-[17px] text-[#3F3F46] leading-[1.47] max-w-2xl whitespace-pre-line">
                    {detail[key]}
                  </p>
                ) : (
                  <div className="h-20 rounded-2xl bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.06)]
                                  flex items-center justify-center">
                    <p className="text-sm text-[#86868B]">
                      {lang === 'en' ? '(Content coming soon)' : '（內容待填寫）'}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ── Architecture button (only for projects without GitHub) ── */}
          {!detail.github && (
            <div className="pt-14 border-t border-black/[0.06]" data-reveal>
              <button
                onClick={() => setArchOpen(true)}
                className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full
                           shadow-[0_0_0_1px_rgba(0,0,0,0.12)] text-[#3F3F46] text-sm font-medium
                           hover:shadow-[0_0_0_1px_rgba(0,0,0,0.25)] hover:text-[#1D1D1F]
                           transition-colors duration-[125ms]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                  <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
                </svg>
                {t.archBtn}
              </button>
            </div>
          )}
        </main>
      </div>

      {/* ── Architecture modal ── */}
      {archOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-6"
          onClick={() => setArchOpen(false)}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="arch-modal-enter relative z-10 bg-white/90 backdrop-blur-xl rounded-2xl p-8
                       w-full max-w-2xl shadow-[0_32px_80px_rgba(0,0,0,0.18)] border border-white/60"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-[#86868B] mb-1">
                  Architecture
                </p>
                <h3 className="text-lg font-bold tracking-tight text-[#1D1D1F]">{project.title}</h3>
              </div>
              <button
                onClick={() => setArchOpen(false)}
                className="w-8 h-8 rounded-full bg-[#F5F5F7] flex items-center justify-center
                           text-[#86868B] hover:bg-[#E8E8ED] hover:text-[#1D1D1F]
                           transition-colors duration-[125ms]"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div className="rounded-2xl bg-[#F5F5F7] shadow-[0_0_0_1px_rgba(0,0,0,0.06)]
                            min-h-[260px] flex flex-col items-center justify-center gap-4 text-center p-10">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08)]
                              flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#86868B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                  <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-[#1D1D1F] mb-1.5">{t.archComingSoon}</p>
                <p className="text-xs text-[#86868B] leading-relaxed max-w-xs">
                  {t.archUpload}{' '}
                  <code className="bg-white px-1.5 py-0.5 rounded text-[11px] text-[#0066CC]
                                   shadow-[0_0_0_1px_rgba(0,0,0,0.08)]">
                    public/images/{project.id}/
                  </code>
                </p>
              </div>
            </div>
            <p className="mt-4 text-[11px] text-[#C7C7CC] text-center">{t.archDismiss}</p>
          </div>
        </div>
      )}
    </div>
  )
}
