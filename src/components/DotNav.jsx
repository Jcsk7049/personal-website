import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { uiText } from '../data/uiText'

const SECTION_IDS = ['education', 'experience', 'projects', 'skills', 'awards', 'guestbook']

export default function DotNav() {
  const { lang } = useLanguage()
  const t = uiText[lang]
  const [active, setActive] = useState(null)
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-25% 0px -50% 0px', threshold: 0 }
    )
    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

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
          <span
            className={`absolute right-6 bg-[#1D1D1F]/90 text-white text-[11px] px-2 py-0.5 rounded-md whitespace-nowrap pointer-events-none
                        transition-all duration-150 ${hovered === id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-1'}`}
          >
            {getLabel(id)}
          </span>
          <button
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            aria-label={getLabel(id)}
            className={`w-2 h-2 rounded-full transition-all duration-300
                        ${active === id
                          ? 'bg-[#0071E3] scale-150'
                          : 'bg-black/20 hover:bg-black/50 hover:scale-110'}`}
          />
        </div>
      ))}
    </nav>
  )
}
