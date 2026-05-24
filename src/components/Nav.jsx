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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-[#F5F5F7]/85 backdrop-blur-xl border-b border-black/[0.08]'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
        <a href="#hero"
           className={`text-sm font-extrabold tracking-tight text-[#1D1D1F] transition-all duration-300 ${
             scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
           }`}>
          {name}
        </a>

        <div className={`flex items-center gap-5 md:gap-7 transition-all duration-300 ${
          scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          {SECTIONS.map(({ id, label }) => (
            <a key={id} href={`#${id}`}
               className={`relative text-xs md:text-sm transition-colors duration-[125ms] pb-1 ${
                 active === id
                   ? 'text-[#1D1D1F] font-semibold'
                   : 'text-slate-400 hover:text-[#1D1D1F]'
               }`}>
              {label}
              <span className={`absolute bottom-0 left-0 right-0 h-px rounded-full bg-[#0071E3]
                                transition-all duration-[125ms] ${active === id ? 'opacity-100' : 'opacity-0'}`} />
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
