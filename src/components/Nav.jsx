import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { uiText } from '../data/uiText'

export default function Nav({ name }) {
  const { lang, setLang } = useLanguage()
  const t = uiText[lang]

  const [active,     setActive]     = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const sections = t.nav
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [t.nav])

  useEffect(() => {
    const close = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', close)
    return () => window.removeEventListener('resize', close)
  }, [])

  const navLinks = t.nav

  return (
    <>
      {/* ── Wooting Nav ── sticky / white / 64px / no blur / no border */}
      <nav
        className="sticky top-0 z-50 w-full h-16 bg-white"
        style={{ transition: 'background-color 0.125s cubic-bezier(0,0,0.2,1)' }}
      >
        <div className="max-w-[1200px] mx-auto h-full px-4 flex items-center justify-between">

          {/* Brand */}
          <a
            href="#hero"
            className="text-[15px] font-bold text-[#09090B]"
            style={{ transition: 'color 0.125s cubic-bezier(0,0,0.2,1)' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#FFB900')}
            onMouseLeave={e => (e.currentTarget.style.color = '#09090B')}
          >
            {name}
          </a>

          {/* Desktop links + lang toggle */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className="relative text-[16px] leading-6 pb-[3px]"
                style={{
                  color: active === id ? '#09090B' : '#71717A',
                  fontWeight: active === id ? 500 : 400,
                  transition: 'color 0.125s cubic-bezier(0,0,0.2,1)',
                }}
                onMouseEnter={e => { if (active !== id) e.currentTarget.style.color = '#09090B' }}
                onMouseLeave={e => { if (active !== id) e.currentTarget.style.color = '#71717A' }}
              >
                {label}
                <span
                  className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[#FFB900]"
                  style={{
                    opacity: active === id ? 1 : 0,
                    transition: 'opacity 0.125s cubic-bezier(0,0,0.2,1)',
                  }}
                />
              </a>
            ))}

            {/* Language toggle */}
            <button
              onClick={() => setLang(l => l === 'zh' ? 'en' : 'zh')}
              className="flex items-center gap-0.5 text-[13px] font-medium leading-6"
              style={{ transition: 'color 0.125s cubic-bezier(0,0,0.2,1)' }}
              aria-label="Switch language"
            >
              <span style={{
                color: lang === 'zh' ? '#FFB900' : '#71717A',
                fontWeight: lang === 'zh' ? 600 : 400,
                transition: 'color 0.125s cubic-bezier(0,0,0.2,1)',
              }}>中</span>
              <span className="text-[#C4C4C6] mx-0.5">/</span>
              <span style={{
                color: lang === 'en' ? '#FFB900' : '#71717A',
                fontWeight: lang === 'en' ? 600 : 400,
                transition: 'color 0.125s cubic-bezier(0,0,0.2,1)',
              }}>EN</span>
            </button>
          </div>

          {/* Mobile right side: lang toggle + hamburger */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setLang(l => l === 'zh' ? 'en' : 'zh')}
              className="flex items-center gap-0.5 text-[13px] font-medium"
              aria-label="Switch language"
            >
              <span style={{ color: lang === 'zh' ? '#FFB900' : '#71717A', fontWeight: lang === 'zh' ? 600 : 400 }}>中</span>
              <span className="text-[#C4C4C6] mx-0.5">/</span>
              <span style={{ color: lang === 'en' ? '#FFB900' : '#71717A', fontWeight: lang === 'en' ? 600 : 400 }}>EN</span>
            </button>

            <button
              className="flex flex-col justify-center gap-[5px] w-8 h-8"
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle menu"
            >
              <span
                className="block h-[1.5px] bg-[#09090B] rounded-full origin-center"
                style={{
                  width: '20px',
                  transform: mobileOpen ? 'rotate(45deg) translateY(6.5px)' : 'none',
                  transition: 'transform 0.125s cubic-bezier(0,0,0.2,1)',
                }}
              />
              <span
                className="block h-[1.5px] bg-[#09090B] rounded-full"
                style={{
                  width: '20px',
                  opacity: mobileOpen ? 0 : 1,
                  transition: 'opacity 0.125s cubic-bezier(0,0,0.2,1)',
                }}
              />
              <span
                className="block h-[1.5px] bg-[#09090B] rounded-full origin-center"
                style={{
                  width: '20px',
                  transform: mobileOpen ? 'rotate(-45deg) translateY(-6.5px)' : 'none',
                  transition: 'transform 0.125s cubic-bezier(0,0,0.2,1)',
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile dropdown — plain white, no blur */}
      <div
        className="md:hidden fixed top-16 left-0 right-0 z-40 bg-white overflow-hidden"
        style={{
          maxHeight: mobileOpen ? `${navLinks.length * 56}px` : '0px',
          transition: 'max-height 0.125s cubic-bezier(0,0,0.2,1)',
        }}
      >
        {navLinks.map(({ id, label }, i) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={() => setMobileOpen(false)}
            className="flex items-center px-4 h-14"
            style={{
              color: active === id ? '#09090B' : '#71717A',
              fontWeight: active === id ? 500 : 400,
              fontSize: '16px',
              lineHeight: '24px',
              borderTop: '1px solid #F4F4F5',
              transition: 'color 0.125s cubic-bezier(0,0,0.2,1)',
            }}
          >
            {active === id && (
              <span className="w-[3px] h-4 rounded-full bg-[#FFB900] mr-3 shrink-0" />
            )}
            {label}
          </a>
        ))}
      </div>
    </>
  )
}
