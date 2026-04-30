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
    const onScroll = () => setScrolled(window.scrollY > 60)
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-apple ${
      scrolled
        ? 'bg-white/80 backdrop-blur-xl border-b border-[#E5E5EA]/60 shadow-[0_1px_0_rgba(0,0,0,0.04)]'
        : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-[52px] flex items-center justify-between">
        <a href="#hero"
           className={`text-[13px] font-bold tracking-tight text-[#1D1D1F] transition-all duration-500 ease-apple ${
             scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
           }`}>
          {name}
        </a>

        <div className={`flex items-center gap-6 md:gap-8 transition-all duration-500 ease-apple ${
          scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          {SECTIONS.map(({ id, label }) => (
            <a key={id} href={`#${id}`}
               className={`relative text-[13px] transition-colors duration-200 pb-1 ${
                 active === id
                   ? 'text-[#1D1D1F] font-semibold'
                   : 'text-[#86868B] hover:text-[#1D1D1F]'
               }`}>
              {label}
              <span className={`absolute bottom-0 left-0 right-0 h-px rounded-full bg-[#0071E3]
                                transition-all duration-300 ease-apple ${
                                  active === id ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                                }`} />
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
