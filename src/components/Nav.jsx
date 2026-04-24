import { useState, useEffect } from 'react'

const SECTIONS = [
  { id: 'education', label: '學歷' },
  { id: 'experience', label: '經歷' },
  { id: 'skills',    label: '技術' },
  { id: 'projects',  label: '專案' },
  { id: 'awards',    label: '獲獎' },
]

export default function Nav({ name }) {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive]     = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-40% 0px -55% 0px' }
    )
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-gray-100/80 shadow-sm' : 'bg-transparent'
    }`}>
      <div className="px-6 md:px-20 lg:px-36 h-14 flex items-center justify-between">
        <a href="#hero"
           className={`text-sm font-semibold text-[#1D1D1F] transition-all duration-300 ${
             scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
           }`}>
          {name}
        </a>

        <div className={`flex items-center gap-6 transition-all duration-300 ${
          scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          {SECTIONS.map(({ id, label }) => (
            <a key={id} href={`#${id}`}
               className={`text-sm transition-colors ${
                 active === id
                   ? 'text-[#1D1D1F] font-medium'
                   : 'text-[#86868B] hover:text-[#1D1D1F]'
               }`}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
