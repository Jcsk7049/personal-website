import { useEffect, useState } from 'react'

export default function Hero({ profile }) {
  const [shown, setShown]           = useState('')
  const [showScroll, setShowScroll] = useState(true)
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

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center pt-28 pb-24 overflow-hidden">

      {/* Background gradient — very subtle, Apple style */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-[-8%] right-[-4%] w-[520px] h-[520px] rounded-full
                        bg-[#0071E3] opacity-[0.05] blur-[120px]" />
        <div className="absolute bottom-[-4%] left-[-4%] w-[360px] h-[360px] rounded-full
                        bg-[#0071E3] opacity-[0.03] blur-[90px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 w-full relative">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-14 lg:gap-24">

          {/* Left: Text */}
          <div className="flex-1 hero-fade-left">
            <div className="flex items-center gap-2 mb-10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34C759]" />
              <p className="text-xs font-medium tracking-[0.18em] uppercase text-[#86868B]">
                {profile.contact.location}
              </p>
            </div>

            <h1 className="text-[clamp(3rem,8vw,5.75rem)] font-extrabold tracking-[-0.04em] leading-[0.95]
                           text-[#1D1D1F] mb-7">
              {profile.name}
            </h1>

            <div className="flex items-center h-9 mb-16">
              <span className="text-lg md:text-xl text-[#6E6E73] font-light tracking-wide">{shown}</span>
              <span className="ml-1 inline-block w-[1.5px] h-5 bg-[#0071E3] animate-blink" />
            </div>

            <div className="flex flex-wrap gap-2.5">
              <a href={`mailto:${profile.contact.email}`}
                 className="px-5 py-2.5 rounded-full bg-[#0071E3] text-white text-[13px] font-medium
                            hover:bg-[#0077ED] hover:scale-[1.02] active:scale-[0.97]
                            transition-all duration-300 ease-apple
                            shadow-[0_2px_8px_rgba(0,113,227,0.25)]">
                {profile.contact.email}
              </a>
              <a href={`tel:${profile.contact.phone}`}
                 className="px-5 py-2.5 rounded-full border border-[#D2D2D7] bg-white/60 backdrop-blur-sm
                            text-[13px] text-[#1D1D1F] hover:border-[#0071E3] hover:text-[#0071E3]
                            hover:scale-[1.02] active:scale-[0.97]
                            transition-all duration-300 ease-apple">
                {profile.contact.phone}
              </a>
              <a href={`https://github.com/${profile.links.github}`}
                 target="_blank" rel="noopener noreferrer"
                 className="px-5 py-2.5 rounded-full border border-[#D2D2D7] bg-white/60 backdrop-blur-sm
                            text-[13px] text-[#1D1D1F] hover:border-[#0071E3] hover:text-[#0071E3]
                            hover:scale-[1.02] active:scale-[0.97]
                            transition-all duration-300 ease-apple">
                GitHub
              </a>
              <a href={`https://linkedin.com/in/${profile.links.linkedin}`}
                 target="_blank" rel="noopener noreferrer"
                 className="px-5 py-2.5 rounded-full border border-[#D2D2D7] bg-white/60 backdrop-blur-sm
                            text-[13px] text-[#1D1D1F] hover:border-[#0071E3] hover:text-[#0071E3]
                            hover:scale-[1.02] active:scale-[0.97]
                            transition-all duration-300 ease-apple">
                LinkedIn
              </a>
            </div>
          </div>

          {/* Right: Photo */}
          <div className="shrink-0 flex justify-center lg:justify-end hero-fade-right">
            <div className="relative">
              <div className="absolute -inset-5 rounded-[2.75rem] border border-[#0071E3]/8 pointer-events-none" />
              <div className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-[#0071E3]/15" />
              <div className="absolute -bottom-3 -left-3 w-5 h-5 rounded-full bg-[#0071E3]/08" />
              <div className="w-52 h-52 md:w-64 md:h-64 lg:w-[19rem] lg:h-[19rem] rounded-[2rem] overflow-hidden
                              bg-gradient-to-br from-[#F0F4FF] to-[#E8EDF5]
                              ring-1 ring-[#E5E5EA] shadow-[0_24px_64px_rgba(0,0,0,0.10),0_4px_16px_rgba(0,0,0,0.06)]">
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
      <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5
                       pointer-events-none transition-opacity duration-700 ease-apple
                       ${showScroll ? 'opacity-100' : 'opacity-0'}`}>
        <span className="text-[9px] tracking-[0.25em] uppercase text-[#AEAEB2] scroll-bounce">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#AEAEB2] to-transparent scroll-bounce"
             style={{ animationDelay: '0.12s' }} />
      </div>
    </section>
  )
}
