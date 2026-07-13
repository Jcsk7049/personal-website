import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import SectionHeader from './SectionHeader'
import { useLanguage } from '../context/LanguageContext'
import { uiText } from '../data/uiText'

import { accent, CATEGORY_STYLES } from '../data/designTokens'

const CATEGORIES = ['全部', '高職選手作品', '大學課程作品', '大學專題作品', '大學校外作品']

export { accent }

export function CategoryBadge({ category, className = '' }) {
  const { lang } = useLanguage()
  const t = uiText[lang]
  if (!category) return null
  const style = CATEGORY_STYLES[category] || 'bg-gray-50 text-gray-500 border-gray-200'
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full border text-[11px] font-medium tracking-wide ${style} ${className}`}>
      {t.categoryLabel(category)}
    </span>
  )
}

function SpotlightCard({ children, className = '' }) {
  const ref = useRef(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0, on: false })

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={e => {
        const r = ref.current.getBoundingClientRect()
        setMouse({ x: e.clientX - r.left, y: e.clientY - r.top, on: true })
      }}
      onMouseLeave={() => setMouse(m => ({ ...m, on: false }))}
    >
      <div
        className="pointer-events-none absolute -inset-px z-0"
        style={{
          borderRadius: '17px',
          opacity: mouse.on ? 1 : 0,
          background: `radial-gradient(260px circle at ${mouse.x}px ${mouse.y}px, rgba(34,160,74,0.22) 0%, transparent 65%)`,
          transition: 'opacity 0.3s ease',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-[18px] z-10"
        style={{
          opacity: mouse.on ? 1 : 0,
          background: `radial-gradient(300px circle at ${mouse.x}px ${mouse.y}px, rgba(15,58,32,0.05) 0%, transparent 70%)`,
          transition: 'opacity 0.3s ease',
        }}
      />
      <div className="relative z-[1] h-full flex flex-col">
        {children}
      </div>
    </div>
  )
}

export default function ProjectShowcase({ projects }) {
  const { lang } = useLanguage()
  const t = uiText[lang]
  const [activeCategory, setActiveCategory] = useState('全部')

  const filtered = activeCategory === '全部'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  return (
    <section id="projects" className="min-h-screen py-16 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionHeader label={t.sections.projects} sub={t.sectionSubs.projects} />

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map(cat => {
            const count = cat === '全部' ? projects.length : projects.filter(p => p.category === cat).length
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1.5 px-[15px] py-2 rounded-[980px] text-sm font-normal
                            transition-colors duration-[240ms] border
                            ${activeCategory === cat
                              ? 'bg-[#1D1D1F] text-[#F5F5F7] border-[#1D1D1F]'
                              : 'bg-transparent text-[#1D1D1F] border-current hover:bg-[#1D1D1F] hover:text-[#F5F5F7]'
                            }`}
              >
                {t.categoryLabel(cat)}
                <span className={`text-[11px] font-mono ${activeCategory === cat ? 'text-white/60' : 'text-[#86868B]'}`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 card-stagger">
          {filtered.map(proj => {
            const isFeatured = activeCategory === '全部' && proj.featured
            return (
              <SpotlightCard key={proj.id} className={`flex flex-col ${isFeatured ? 'sm:col-span-2 lg:col-span-2' : ''}`}>
                <Link
                  to={`/projects/${proj.id}`}
                  className={`rounded-[18px] bg-white overflow-hidden
                             hover:-translate-y-1 hover:shadow-[rgba(0,0,0,0.08)_2px_4px_12px_0px]
                             transition-all duration-[240ms] group flex flex-col flex-1
                             ${isFeatured ? 'sm:flex-row' : ''}`}
                >
                  {/* Cover image / gradient area */}
                  <div className={`relative bg-gradient-to-br ${accent(proj.id)} overflow-hidden shrink-0
                                   ${isFeatured ? 'h-56 sm:h-auto sm:w-2/5' : 'h-48'}`}>
                    {proj.cover ? (
                      <img
                        src={proj.cover}
                        alt={proj.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                      />
                    ) : (
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: 'radial-gradient(rgba(255,255,255,0.13) 1.5px, transparent 1.5px)',
                          backgroundSize: '22px 22px',
                        }}
                      />
                    )}
                    {/* Gradient fade at bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                      <CategoryBadge category={proj.category} />
                    </div>
                    {/* FRC badge */}
                    {proj.frc && (
                      <div className="absolute bottom-3 right-3">
                        <span className="px-2 py-0.5 rounded-full bg-black/30 text-white text-[10px] font-bold tracking-wide backdrop-blur-sm border border-white/20">
                          FRC
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className={`flex flex-col gap-2 flex-1 ${isFeatured ? 'p-6 sm:p-8 justify-center' : 'p-5'}`}>
                    <p className="text-[11px] text-[#86868B] font-mono tracking-wide">{proj.period}</p>
                    <h3 className={`font-bold tracking-tight text-[#1D1D1F] leading-snug
                                   group-hover:text-[#0071E3] transition-colors duration-[240ms]
                                   ${isFeatured ? 'text-xl md:text-2xl' : 'text-base'}`}>
                      {proj.title}
                    </h3>
                    {proj.badge && (
                      <span className="self-start px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide
                                       bg-amber-50 text-amber-700 border border-amber-300">
                        {proj.badge}
                      </span>
                    )}
                    <p className={`text-[#3F3F46] leading-relaxed ${isFeatured ? 'text-[15px]' : 'text-sm line-clamp-2'}`}>
                      {isFeatured ? (proj.description || proj.summary) : (proj.summary || proj.description)}
                    </p>
                    <div className="mt-auto flex flex-col gap-2">
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {(proj.tags ?? []).slice(0, isFeatured ? proj.tags.length : 3).map(tag => (
                          <span key={tag}
                                className="px-2 py-0.5 rounded-full bg-[#f5f5f7] text-[#3F3F46]
                                           border border-black/[0.05] text-xs font-medium">
                            {tag.trim()}
                          </span>
                        ))}
                        {!isFeatured && (proj.tags?.length ?? 0) > 3 && (
                          <span className="px-2 py-0.5 rounded-full bg-[#f5f5f7] text-[#3F3F46]
                                           border border-black/[0.05] text-xs font-medium">
                            +{proj.tags.length - 3}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-[#0071E3] font-medium
                                       opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0
                                       transition-all duration-[240ms]">
                        {t.viewDetail}
                      </span>
                    </div>
                  </div>
                </Link>
              </SpotlightCard>
            )
          })}
        </div>

      </div>
    </section>
  )
}
