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
    <section id="hero" className="relative min-h-screen flex flex-col justify-center pt-32 pb-24 overflow-hidden">

      {/* Background gradient blobs */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full
                        bg-[#0071E3] opacity-[0.06] blur-[100px]" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] rounded-full
                        bg-[#0071E3] opacity-[0.04] blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full relative">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-20">

          {/* Left: Text */}
          <div className="flex-1 hero-fade-left">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#86868B] mb-8">
              {profile.contact.location}
            </p>
            <h1 className="text-[clamp(3.5rem,9vw,7rem)] font-extrabold tracking-[-0.04em] leading-none text-[#1D1D1F] mb-6">
              {profile.name}
            </h1>
            {full && (
              <div className="flex items-center h-9 mb-14">
                <span className="text-xl md:text-2xl text-[#86868B] font-light">{shown}</span>
                <span className="ml-1 inline-block w-[2px] h-6 bg-[#0071E3] animate-blink" />
              </div>
            )}
            <div className="flex flex-wrap gap-3">
              <a href={`mailto:${profile.contact.email}`}
                 className="px-5 py-2.5 rounded-full bg-[#0071E3] text-white text-sm font-medium
                            hover:bg-[#0077ED] hover:scale-[1.03] active:scale-95 transition-all duration-200
                            shadow-sm shadow-[#0071E3]/20">
                {profile.contact.email}
              </a>
              <a href={`tel:${profile.contact.phone}`}
                 className="px-5 py-2.5 rounded-full border border-gray-200 text-sm text-[#1D1D1F]
                            hover:border-[#0071E3] hover:text-[#0071E3] hover:scale-[1.03] active:scale-95 transition-all duration-200">
                {profile.contact.phone}
              </a>
              <a href={`https://github.com/${profile.links.github}`}
                 target="_blank" rel="noopener noreferrer"
                 className="px-5 py-2.5 rounded-full border border-gray-200 text-sm text-[#1D1D1F]
                            hover:border-[#0071E3] hover:text-[#0071E3] hover:scale-[1.03] active:scale-95 transition-all duration-200">
                GitHub
              </a>
              <a href={`https://linkedin.com/in/${profile.links.linkedin}`}
                 target="_blank" rel="noopener noreferrer"
                 className="px-5 py-2.5 rounded-full border border-gray-200 text-sm text-[#1D1D1F]
                            hover:border-[#0071E3] hover:text-[#0071E3] hover:scale-[1.03] active:scale-95 transition-all duration-200">
                LinkedIn
              </a>
            </div>
          </div>

          {/* Right: Photo */}
          <div className="shrink-0 flex justify-center lg:justify-end hero-fade-right">
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] border border-[#0071E3]/10 pointer-events-none" />
              <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#0071E3]/20" />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-[#0071E3]/10" />
              <div className="w-52 h-52 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-[2rem] overflow-hidden
                              bg-gradient-to-br from-[#F0F4FF] to-[#E8EDF5]
                              ring-1 ring-gray-200/80 shadow-2xl shadow-gray-300/40">
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

      {/* Scroll indicator — fades out on scroll */}
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
