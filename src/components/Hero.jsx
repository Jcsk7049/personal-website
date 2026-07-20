import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { uiText } from '../data/uiText'

export default function Hero({ profile }) {
  const [showScroll, setShowScroll] = useState(true)
  const { lang }                    = useLanguage()
  const t                           = uiText[lang]
  const textWrapRef                 = useRef(null)
  const photoWrapRef                = useRef(null)

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY < 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 捲動視差：文字與照片以不同速率位移＋淡出（transform/opacity only, rAF 節流）。
  // 掛在外層 wrapper，進場動畫掛在內層元素，兩者不同節點不衝突。
  useEffect(() => {
    // matchMedia 在 headless / 老環境可能不存在，防護避免整個 Hero 崩掉
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) return
    let raf = 0
    const apply = () => {
      raf = 0
      const y = window.scrollY
      const h = window.innerHeight || 1
      if (y > h * 1.2) return
      const p = Math.min(y / h, 1)
      if (textWrapRef.current) {
        textWrapRef.current.style.transform = `translateY(${y * 0.18}px)`
        textWrapRef.current.style.opacity   = String(Math.max(1 - p * 1.15, 0))
      }
      if (photoWrapRef.current) {
        photoWrapRef.current.style.transform = `translateY(${y * 0.09}px) scale(${1 - p * 0.05})`
        photoWrapRef.current.style.opacity   = String(Math.max(1 - p * 0.9, 0))
      }
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(apply) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const resumeHref     = lang === 'en' ? '/resume-en.pdf'      : '/resume-zh.pdf'
  const resumeFullHref = lang === 'en' ? '/resume-en-full.pdf' : '/resume-zh-full.pdf'

  // 名字字級：中文三字可放到 96px；英文較長，min/max 略收允許換行。
  const nameSize = lang === 'en'
    ? 'text-[clamp(2.5rem,6vw,4rem)]'
    : 'text-[clamp(3.5rem,9vw,6rem)]'

  return (
    <section id="hero" className="wash-hero relative min-h-[calc(100vh-4rem)] flex flex-col justify-center pt-12 md:pt-20 pb-16 md:pb-24 overflow-hidden">

      <div className="max-w-7xl xl:max-w-[1400px] mx-auto px-6 md:px-10 w-full relative">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-20">

          {/* Left: Text（外層吃視差，內層元素吃進場） */}
          <div ref={textWrapRef} className="flex-1 min-w-0" style={{ willChange: 'transform, opacity' }}>
            {/* eyebrow 色 #636366：12px 非大字需過 WCAG AA 4.5；#86868B 只有 3.04:1（實測）→ #636366 = 5.03:1 */}
            <p className="hero-eyebrow text-xs font-medium tracking-[0.2em] uppercase text-[#636366] mb-5">
              {profile.contact.location}
            </p>

            <h1 className={`${nameSize} font-semibold tracking-[-0.03em] leading-[1.0] text-[#1D1D1F] mb-6 text-balance`}>
              <span className="hero-name-unveil inline-block">{profile.name}</span>
            </h1>

            <p className="hero-line text-[clamp(1.25rem,3vw,1.75rem)] font-semibold tracking-[-0.02em] leading-[1.25] text-[#1D1D1F] max-w-[24ch] mb-8 text-balance">
              {t.heroLine}
            </p>

            <div className="hero-cta flex flex-wrap gap-3">
              <button
                onClick={() => { window.location.href = `mailto:${profile.contact.email}` }}
                className="px-5 py-2.5 rounded-full bg-[#0071E3] text-white text-sm font-medium
                           hover:bg-[#0077ED] hover:scale-[1.02] active:scale-95 transition-all duration-[240ms]">
                {profile.contact.email}
              </button>
              <a href={`https://github.com/${profile.links.github}`}
                 target="_blank" rel="noopener noreferrer"
                 className="px-5 py-2.5 rounded-full border border-black/[0.12] text-sm text-[#1D1D1F]
                            hover:border-[#0071E3] hover:text-[#0071E3] hover:scale-[1.02] active:scale-95 transition-all duration-[240ms]">
                GitHub
              </a>
              <a href={`https://linkedin.com/in/${profile.links.linkedin}`}
                 target="_blank" rel="noopener noreferrer"
                 className="px-5 py-2.5 rounded-full border border-black/[0.12] text-sm text-[#1D1D1F]
                            hover:border-[#0071E3] hover:text-[#0071E3] hover:scale-[1.02] active:scale-95 transition-all duration-[240ms]">
                LinkedIn
              </a>
              <a href={resumeHref}
                 target="_blank" rel="noopener noreferrer"
                 className="px-5 py-2.5 rounded-full text-sm font-medium
                            border-2 border-[#0071E3] text-[#0071E3]
                            hover:bg-[#0071E3] hover:text-white hover:scale-[1.02] active:scale-95 transition-all duration-[240ms]">
                {t.resumeBtnOnePage}
              </a>
              <a href={resumeFullHref}
                 target="_blank" rel="noopener noreferrer"
                 className="px-5 py-2.5 rounded-full text-sm font-medium
                            border border-black/[0.12] text-[#1D1D1F]
                            hover:border-[#0071E3] hover:text-[#0071E3] hover:scale-[1.02] active:scale-95 transition-all duration-[240ms]">
                {t.resumeBtnFull}
              </a>
            </div>
          </div>

          {/* Right: Photo（外層吃視差） */}
          <div ref={photoWrapRef} className="shrink-0" style={{ willChange: 'transform, opacity' }}>
            <div className="hero-photo-in flex justify-center lg:justify-end">
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
