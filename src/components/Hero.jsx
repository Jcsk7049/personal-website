import { useEffect, useState } from 'react'

export default function Hero({ profile }) {
  const [shown, setShown] = useState('')
  const full = profile.title

  useEffect(() => {
    if (shown.length >= full.length) return
    const t = setTimeout(() => setShown(full.slice(0, shown.length + 1)), 65)
    return () => clearTimeout(t)
  }, [shown, full])

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6 md:px-10 w-full">

      <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#86868B] mb-8">
        {profile.contact.location}
      </p>

      <h1 className="text-[clamp(3.5rem,10vw,7rem)] font-bold tracking-[-0.04em] leading-none text-[#1D1D1F] mb-6">
        {profile.name}
      </h1>

      <div className="flex items-center h-9 mb-14">
        <span className="text-xl md:text-2xl text-[#86868B] font-light">{shown}</span>
        <span className="ml-1 inline-block w-[2px] h-6 bg-[#0071E3] animate-blink" />
      </div>

      <div className="flex flex-wrap gap-3">
        <a href={`mailto:${profile.contact.email}`}
           className="px-5 py-2.5 rounded-full bg-[#0071E3] text-white text-sm font-medium
                      hover:bg-[#0077ED] active:scale-95 transition-all">
          {profile.contact.email}
        </a>
        <a href={`tel:${profile.contact.phone}`}
           className="px-5 py-2.5 rounded-full border border-gray-200 text-sm text-[#1D1D1F]
                      hover:border-gray-400 active:scale-95 transition-all">
          {profile.contact.phone}
        </a>
        <a href={`https://github.com/${profile.links.github}`}
           target="_blank" rel="noopener noreferrer"
           className="px-5 py-2.5 rounded-full border border-gray-200 text-sm text-[#1D1D1F]
                      hover:border-gray-400 active:scale-95 transition-all">
          GitHub
        </a>
        <a href={`https://linkedin.com/in/${profile.links.linkedin}`}
           target="_blank" rel="noopener noreferrer"
           className="px-5 py-2.5 rounded-full border border-gray-200 text-sm text-[#1D1D1F]
                      hover:border-gray-400 active:scale-95 transition-all">
          LinkedIn
        </a>
      </div>

      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
        <span className="text-[10px] tracking-[0.2em] uppercase text-[#86868B]">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-gray-300 to-transparent" />
      </div>
    </section>
  )
}
