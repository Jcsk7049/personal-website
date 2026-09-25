import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { uiText } from '../data/uiText'
import SkillGrid from './SkillGrid'

export default function Hero({ profile, skills, skillDetail }) {
  const [showScroll, setShowScroll] = useState(true)
  const { lang }                    = useLanguage()
  const t                           = uiText[lang]

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY < 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const resumeHref     = lang === 'en' ? '/resume-en.pdf'      : '/resume-zh.pdf'
  const resumeFullHref = lang === 'en' ? '/resume-en-full.pdf' : '/resume-zh-full.pdf'

  // 名字字級：中文三字可放到 96px；英文較長，min/max 略收允許換行。
  const nameSize = lang === 'en'
    ? 'text-[clamp(2.5rem,6vw,4rem)]'
    : 'text-[clamp(3.5rem,9vw,6rem)]'

  return (
    <section id="hero" className="wash-hero relative min-h-[calc(100svh-3rem)] flex flex-col justify-center pt-14 md:pt-20 pb-20 md:pb-28 xl:justify-start xl:py-4">
      <div className="hero-geometric-bg" aria-hidden="true">
        <span className="hero-facet hero-facet-a" />
        <span className="hero-facet hero-facet-b" />
        <span className="hero-facet hero-facet-c" />
      </div>

      <div className="hero-content w-full px-6 md:px-10 relative xl:flex-1 xl:flex">
        <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] xl:items-stretch gap-14 xl:gap-20 xl:flex-1">

          {/* Left side: introduction and photo */}
          <div className="flex flex-col md:flex-row md:items-center gap-10 xl:gap-12 min-w-0">
          <div className="flex-1 min-w-0">
            {/* eyebrow 色 #636366：12px 非大字需過 WCAG AA 4.5；#86868B 只有 3.04:1（實測）→ #636366 = 5.03:1 */}
            <p className="hero-eyebrow flex items-center gap-3 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#636366] mb-7">
              <span className="w-7 h-px bg-[#737C84]" />{profile.contact.location}
            </p>

            <h1 className={`${nameSize} font-semibold tracking-[-0.035em] leading-[0.98] text-[#1D1D1F] mb-5 text-balance`}>
              <span className="hero-name-unveil inline-block">{profile.name}</span>
            </h1>

            <p className="hero-line text-[clamp(1.25rem,2.7vw,1.8rem)] font-medium tracking-[-0.02em] leading-[1.28] text-[#737C84] max-w-[26ch] mb-9 text-balance">
              {t.heroLine}
            </p>

            <div className="hero-cta flex flex-wrap gap-2.5">
              <button
                onClick={() => { window.location.href = `mailto:${profile.contact.email}` }}
                className="px-5 py-3 rounded-full bg-[#737C84] text-white text-[13px] font-semibold
                           hover:bg-[#656E76] hover:scale-[1.02] active:scale-95 transition-all duration-[240ms]">
                {profile.contact.email}
              </button>
              <a href={`https://github.com/${profile.links.github}`}
                 target="_blank" rel="noopener noreferrer"
                 className="px-5 py-3 rounded-full border border-black/[0.12] text-[13px] text-[#1D1D1F]
                            hover:border-[#737C84] hover:text-[#737C84] hover:scale-[1.02] active:scale-95 transition-all duration-[240ms]">
                GitHub
              </a>
              <a href={`https://linkedin.com/in/${profile.links.linkedin}`}
                 target="_blank" rel="noopener noreferrer"
                 className="px-5 py-3 rounded-full border border-black/[0.12] text-[13px] text-[#1D1D1F]
                            hover:border-[#737C84] hover:text-[#737C84] hover:scale-[1.02] active:scale-95 transition-all duration-[240ms]">
                LinkedIn
              </a>
              <a href={resumeHref}
                 target="_blank" rel="noopener noreferrer"
                 className="px-5 py-3 rounded-full text-[13px] font-semibold
                            border-2 border-[#737C84] text-[#737C84]
                            hover:bg-[#737C84] hover:text-white hover:scale-[1.02] active:scale-95 transition-all duration-[240ms]">
                {t.resumeBtnOnePage}
              </a>
              <a href={resumeFullHref}
                 target="_blank" rel="noopener noreferrer"
                 className="px-5 py-3 rounded-full text-[13px] font-medium
                            border border-black/[0.12] text-[#1D1D1F]
                            hover:border-[#737C84] hover:text-[#737C84] hover:scale-[1.02] active:scale-95 transition-all duration-[240ms]">
                {t.resumeBtnFull}
              </a>
            </div>
          </div>

          <div className="shrink-0">
            <div className="hero-photo-in flex justify-center md:justify-end">
              <div className="relative">
                <div className="hero-photo-frame relative w-56 h-64 md:w-56 md:h-64 xl:w-[18rem] xl:h-[22rem] rounded-[8px] overflow-hidden
                                bg-[#E5E5EA]">
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

          {/* Right side: skills */}
          <SkillGrid skills={skills} detail={skillDetail} />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2
                       pointer-events-none transition-opacity duration-500
                       ${showScroll ? 'opacity-100' : 'opacity-0'}`}>
        <span className="text-[11px] tracking-[0.15em] uppercase text-[#86868B] scroll-bounce">{t.scrollHint}</span>
        <div className="w-px h-10 bg-gradient-to-b from-gray-300 to-transparent scroll-bounce"
             style={{ animationDelay: '0.15s' }} />
      </div>
    </section>
  )
}
