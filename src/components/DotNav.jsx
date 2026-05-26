import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { uiText } from '../data/uiText'
import { useActiveSection } from '../context/ActiveSectionContext'

const SECTION_IDS = ['hero', 'experience', 'projects', 'skills', 'awards', 'guestbook']
const DARK_SECTIONS = new Set(['experience', 'skills'])

const HomeIcon = () => (
  <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
)

export default function DotNav() {
  const { lang } = useLanguage()
  const t = uiText[lang]
  const active = useActiveSection()
  const [hovered, setHovered] = useState(null)

  const isDark = DARK_SECTIONS.has(active)

  const getLabel = id => {
    const nav = t.nav.find(n => n.id === id)
    if (nav) return nav.label
    if (id === 'guestbook') return lang === 'zh' ? '留言板' : 'Guestbook'
    return id
  }

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3.5"
    >
      {SECTION_IDS.map(id => (
        <div key={id} className="relative flex items-center justify-end">
          {/* Tooltip */}
          <span
            className={`absolute right-6 text-[11px] px-2 py-0.5 rounded-md whitespace-nowrap pointer-events-none
                        transition-all duration-[125ms]
                        ${isDark ? 'bg-white/90 text-[#1D1D1F]' : 'bg-[#1D1D1F]/90 text-white'}
                        ${hovered === id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-1'}`}
          >
            {getLabel(id)}
          </span>

          <button
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            aria-label={getLabel(id)}
            className={`flex items-center justify-center transition-all duration-[125ms]
                        ${id === 'hero'
                          ? `w-3 h-3 rounded-full
                             ${active === id
                               ? isDark ? 'bg-white text-[#1D1D1F] scale-110' : 'bg-[#0071E3] text-white scale-110'
                               : isDark ? 'bg-white/30 text-white/50 hover:bg-white/60' : 'bg-black/20 text-black/40 hover:bg-black/50'}`
                          : `w-2 h-2 rounded-full
                             ${active === id
                               ? isDark ? 'bg-white scale-150' : 'bg-[#0071E3] scale-150'
                               : isDark ? 'bg-white/30 hover:bg-white/60 hover:scale-110' : 'bg-black/20 hover:bg-black/50 hover:scale-110'}`
                        }`}
          >
            {id === 'hero' && <HomeIcon />}
          </button>
        </div>
      ))}
    </nav>
  )
}
