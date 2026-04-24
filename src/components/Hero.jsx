import { useEffect, useState } from 'react'

const ROTATING_TITLES = [
  '電機工程學系學士在學生',
  'Machine Learning Researcher',
  'Hardware & Firmware Engineer',
  'Full Stack Developer',
]

export default function Hero({ profile }) {
  const [titleIdx, setTitleIdx]   = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting]   = useState(false)

  useEffect(() => {
    const target = ROTATING_TITLES[titleIdx]
    let t

    if (!deleting && displayed.length < target.length) {
      t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 65)
    } else if (!deleting && displayed.length === target.length) {
      t = setTimeout(() => setDeleting(true), 2600)
    } else if (deleting && displayed.length > 0) {
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 32)
    } else {
      setDeleting(false)
      setTitleIdx(i => (i + 1) % ROTATING_TITLES.length)
    }

    return () => clearTimeout(t)
  }, [displayed, deleting, titleIdx])

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center px-6 md:px-20 lg:px-36 py-24">

      {/* Location chip */}
      <p className="text-xs tracking-[0.22em] uppercase text-[#86868B] mb-8">
        {profile.contact.location}
      </p>

      {/* Name */}
      <h1 className="text-7xl md:text-9xl font-bold tracking-tight text-[#1D1D1F] leading-none mb-6">
        {profile.name}
      </h1>

      {/* Typewriter title */}
      <div className="flex items-center gap-1 h-9 mb-14">
        <span className="text-xl md:text-2xl text-[#86868B] font-light">
          {displayed}
        </span>
        <span className="inline-block w-[2px] h-6 bg-[#0071E3] animate-blink" />
      </div>

      {/* Contact links */}
      <div className="flex flex-wrap gap-3">
        <a
          href={`mailto:${profile.contact.email}`}
          className="px-5 py-2.5 rounded-full bg-[#0071E3] text-white text-sm font-medium
                     hover:bg-[#0077ED] transition-colors"
        >
          {profile.contact.email}
        </a>
        <a
          href={`https://github.com/${profile.links.github}`}
          target="_blank" rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-full border border-gray-200 text-sm font-medium
                     text-[#1D1D1F] hover:border-gray-400 transition-colors"
        >
          GitHub / {profile.links.github}
        </a>
        <a
          href={`https://linkedin.com/in/${profile.links.linkedin}`}
          target="_blank" rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-full border border-gray-200 text-sm font-medium
                     text-[#1D1D1F] hover:border-gray-400 transition-colors"
        >
          LinkedIn
        </a>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
        <span className="text-xs text-[#86868B] tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-gray-300 to-transparent" />
      </div>
    </section>
  )
}
