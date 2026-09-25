import { useState } from 'react'
import { Link } from 'react-router-dom'
import SectionHeader from './SectionHeader'
import { useLanguage } from '../context/LanguageContext'
import { uiText } from '../data/uiText'
import { accent } from '../data/designTokens'

const CATEGORIES = ['全部', '高職選手作品', '大學課程作品', '大學專題作品', '大學校外作品']
export { accent }

export function CategoryBadge({ category, className = '' }) {
  const { lang } = useLanguage()
  if (!category) return null
  return <span className={`inline-block px-2 py-1 border border-black/10 bg-[#F5F5F7] text-[#3F3F46] text-[11px] font-medium ${className}`}>{uiText[lang].categoryLabel(category)}</span>
}

export default function ProjectShowcase({ projects }) {
  const { lang } = useLanguage()
  const t = uiText[lang]
  const [activeCategory, setActiveCategory] = useState('全部')
  const filtered = activeCategory === '全部' ? projects : projects.filter(p => p.category === activeCategory)

  return (
    <section id="projects" className="min-h-[calc(100svh-3rem)] py-16 md:py-24 bg-white text-[#1D1D1F]">
      <div className="w-full px-6 md:px-10">
        <SectionHeader label={t.sections.projects} sub={t.sectionSubs.projects} />
        <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label={t.sections.projects}>
          {CATEGORIES.map(cat => {
            const count = cat === '全部' ? projects.length : projects.filter(p => p.category === cat).length
            const selected = activeCategory === cat
            return <button key={cat} onClick={() => setActiveCategory(CATEGORIES[t.categories.indexOf(cat)] ?? cat)} aria-pressed={selected}
              className={`flex items-center gap-2 px-3 py-2 border text-[13px] font-medium transition-colors duration-[240ms] ${selected ? 'bg-[#737C84] text-white border-[#737C84]' : 'bg-[#F5F5F7] text-[#3F3F46] border-black/[0.08] hover:bg-[#E8EAEC]'}`}>
              {t.categoryLabel(cat)} <span className={`text-[11px] font-mono ${selected ? 'text-white/75' : 'text-[#86868B]'}`}>{count}</span>
            </button>
          })}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 md:gap-7">
          {filtered.map(proj => (
            <Link key={proj.id} to={`/projects/${proj.id}`} className="project-card group flex min-w-0 flex-col bg-[#F5F5F7] text-[#1D1D1F] transition-colors duration-[240ms]">
              <div className={`relative aspect-[16/9] overflow-hidden bg-gradient-to-br ${accent(proj.id)}`}>
                {proj.cover && <img src={proj.cover} alt={proj.title} loading="lazy" decoding="async" className="w-full h-full object-cover" />}
                <div className="absolute top-3 left-3"><CategoryBadge category={proj.category} /></div>
                {proj.frc && <span className="absolute bottom-3 right-3 px-2 py-1 bg-black/65 text-white text-[10px] font-semibold tracking-wide">FRC</span>}
              </div>
              <div className="flex flex-col gap-3 p-5 md:p-6 flex-1">
                <div className="flex items-center justify-between gap-3 text-[11px] text-[#86868B] font-mono"><span>{proj.period}</span><span className="font-sans truncate">{proj.tags?.[0]}</span></div>
                <h3 className="text-lg font-semibold tracking-tight text-[#1D1D1F] leading-snug group-hover:text-[#59636C] transition-colors">{proj.title}</h3>
                {proj.badge && <span className="self-start px-2 py-1 border border-black/10 bg-white text-[#3F3F46] text-[10px] font-semibold">{proj.badge}</span>}
                <p className="text-[13px] text-[#3F3F46] leading-[1.65]">{proj.description || proj.summary}</p>
                <div className="mt-auto pt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-[#6E6E73]">
                  {(proj.tags || []).slice(0, 4).map(tag => <span key={tag}>{tag.trim()}</span>)}
                  <span className="ml-auto text-[#59636C] font-medium">{t.viewDetail} ↗</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
