import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { uiText } from '../data/uiText'
import { useActiveSection } from '../context/ActiveSectionContext'

const FROSTED = {
  background: 'rgba(245,245,247,0.85)',
  backdropFilter: 'saturate(180%) blur(20px)',
  WebkitBackdropFilter: 'saturate(180%) blur(20px)',
}

export default function Nav({ name }) {
  const { lang, setLang } = useLanguage()
  const t = uiText[lang]
  const active = useActiveSection()

  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const close = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', close)
    return () => window.removeEventListener('resize', close)
  }, [])

  const navLinks = t.nav

  return (
    <>
      {/* ── Apple frosted glass nav, 48px ── */}
      <nav
        className="sticky top-0 z-50 w-full h-12"
        style={{ ...FROSTED, borderBottom: '1px solid rgba(0,0,0,0.1)' }}
      >
        <div className="max-w-[1200px] mx-auto h-full px-6 flex items-center justify-between">

          {/* Brand */}
          <a
            href="#hero"
            className="text-sm font-semibold tracking-tight text-[#1D1D1F] hover:text-[#0071E3]
                       transition-colors duration-[240ms]"
          >
            {name}
          </a>

          {/* Desktop links + lang toggle */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`text-xs transition-colors duration-[240ms]
                            ${active === id
                              ? 'text-[#1D1D1F] font-semibold'
                              : 'text-[#86868B] font-normal hover:text-[#1D1D1F]'}`}
              >
                {label}
              </a>
            ))}

            {/* Language toggle */}
            <button
              onClick={() => setLang(l => l === 'zh' ? 'en' : 'zh')}
              className="flex items-center gap-0.5 min-h-11 min-w-11 justify-center text-xs"
              aria-label="Switch language"
            >
              <span className={`transition-colors duration-[240ms] ${lang === 'zh' ? 'text-[#0071E3] font-semibold' : 'text-[#86868B]'}`}>中</span>
              <span className="text-[#C7C7CC] mx-0.5">/</span>
              <span className={`transition-colors duration-[240ms] ${lang === 'en' ? 'text-[#0071E3] font-semibold' : 'text-[#86868B]'}`}>EN</span>
            </button>
          </div>

          {/* Mobile right side: lang toggle + hamburger */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setLang(l => l === 'zh' ? 'en' : 'zh')}
              className="flex items-center gap-0.5 min-h-11 min-w-11 justify-center text-xs"
              aria-label="Switch language"
            >
              <span className={lang === 'zh' ? 'text-[#0071E3] font-semibold' : 'text-[#86868B]'}>中</span>
              <span className="text-[#C7C7CC] mx-0.5">/</span>
              <span className={lang === 'en' ? 'text-[#0071E3] font-semibold' : 'text-[#86868B]'}>EN</span>
            </button>

            <button
              className="flex flex-col justify-center gap-[5px] w-11 h-11 items-center"
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <span
                className="block h-[1.5px] w-5 bg-[#1D1D1F] rounded-full origin-center"
                style={{
                  transform: mobileOpen ? 'rotate(45deg) translateY(6.5px)' : 'none',
                  transition: 'transform 0.24s cubic-bezier(0.4,0,0.6,1)',
                }}
              />
              <span
                className="block h-[1.5px] w-5 bg-[#1D1D1F] rounded-full"
                style={{
                  opacity: mobileOpen ? 0 : 1,
                  transition: 'opacity 0.24s cubic-bezier(0.4,0,0.6,1)',
                }}
              />
              <span
                className="block h-[1.5px] w-5 bg-[#1D1D1F] rounded-full origin-center"
                style={{
                  transform: mobileOpen ? 'rotate(-45deg) translateY(-6.5px)' : 'none',
                  transition: 'transform 0.24s cubic-bezier(0.4,0,0.6,1)',
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile dropdown — frosted glass */}
      <div
        className="md:hidden fixed top-12 left-0 right-0 z-40 grid"
        style={{
          ...FROSTED,
          gridTemplateRows: mobileOpen ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.24s cubic-bezier(0.4,0,0.6,1)',
        }}
      >
        <div className="overflow-hidden">
          {navLinks.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center px-6 h-14 text-sm transition-colors duration-[240ms]
                          ${active === id ? 'text-[#1D1D1F] font-semibold' : 'text-[#86868B]'}`}
              style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
            >
              {active === id && (
                <span className="w-[3px] h-4 rounded-full bg-[#0071E3] mr-3 shrink-0" />
              )}
              {label}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
