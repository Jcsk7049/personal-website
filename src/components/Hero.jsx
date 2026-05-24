import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { uiText } from '../data/uiText'

export default function Hero({ profile }) {
  const [shown, setShown]           = useState('')
  const [showScroll, setShowScroll] = useState(true)
  const { lang }                    = useLanguage()
  const t                           = uiText[lang]
  const full = profile.title || ''

  useEffect(() => {
    if (shown.length >= full.length) return
    const t = setTimeout(() => setShown(full.slice(0, shown.length + 1)), 65)
    return () => clearTimeout(t)
  }, [shown, full])

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY < 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const resumeHref = lang === 'en' ? '/resume-zh.html' : '/resume-zh.html'

  return (
    <section id="hero" className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center pt-12 md:pt-20 pb-16 md:pb-24 overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full relative">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-20">

          {/* Left: Text */}
          <div className="flex-1 hero-fade-left">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#86868B] mb-8">
              {profile.contact.location}
            </p>
            <h1 className="text-[clamp(3.5rem,9vw,7rem)] font-bold tracking-[-0.015em] leading-none text-[#1D1D1F] mb-4">
              {profile.name}
            </h1>
            {profile.bio && (
              <p className="hero-bio text-[15px] text-[#6e6e73] leading-[1.8] max-w-[500px] mb-8 text-wrap-pretty">
                {profile.bio}
              </p>
            )}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => { window.location.href = `mailto:${profile.contact.email}` }}
                className="px-5 py-2.5 rounded-full bg-[#0071E3] text-white text-sm font-medium
                           hover:bg-[#0077ED] hover:scale-[1.02] active:scale-95 transition-all duration-[125ms]">
                {profile.contact.email}
              </button>
              <a href={`https://github.com/${profile.links.github}`}
                 target="_blank" rel="noopener noreferrer"
                 className="px-5 py-2.5 rounded-full border border-black/[0.12] text-sm text-[#1D1D1F]
                            hover:border-[#0071E3] hover:text-[#0071E3] hover:scale-[1.02] active:scale-95 transition-all duration-[125ms]">
                GitHub
              </a>
              <a href={`https://linkedin.com/in/${profile.links.linkedin}`}
                 target="_blank" rel="noopener noreferrer"
                 className="px-5 py-2.5 rounded-full border border-black/[0.12] text-sm text-[#1D1D1F]
                            hover:border-[#0071E3] hover:text-[#0071E3] hover:scale-[1.02] active:scale-95 transition-all duration-[125ms]">
                LinkedIn
              </a>
              <a href={resumeHref}
                 target="_blank" rel="noopener noreferrer"
                 className="px-5 py-2.5 rounded-full border border-black/[0.12] text-sm text-[#1D1D1F]
                            hover:border-[#0071E3] hover:text-[#0071E3] hover:scale-[1.02] active:scale-95 transition-all duration-[125ms]">
                {t.resumeBtn}
              </a>
            </div>
          </div>

          {/* Right: Photo */}
          <div className="shrink-0 flex justify-center lg:justify-end hero-fade-right">
            <div className="relative">
              <div className="w-52 h-52 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-[2rem] overflow-hidden
                              bg-[#f5f5f7]
                              shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
                {profile.avatar ? (
                  <img src={profile.avatar} alt={profile.name}
                       className="w-full h-full object-cover"
                       fetchpriority="high" decoding="async" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2
                                  bg-gradient-to-br from-[#F5F5F7] to-[#E8ECF4]">
                    <span className="text-7xl lg:text-8xl font-bold tracking-tighter text-[#C7C7CC] select-none">
                      {profile.name[0]}
                    </span>
                    <span className="text-xs text-[#C7C7CC] tracking-[0.15em] uppercase select-none">Photo</span>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2
                       pointer-events-none transition-opacity duration-500
                       ${showScroll ? 'opacity-100' : 'opacity-0'}`}>
        <span className="text-[10px] tracking-[0.2em] uppercase text-[#86868B] scroll-bounce">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-gray-300 to-transparent scroll-bounce"
             style={{ animationDelay: '0.15s' }} />
      </div>
    </section>
  )
}
