import { Fragment } from 'react'
import SectionHeader from './SectionHeader'
import { useLanguage } from '../context/LanguageContext'
import { uiText } from '../data/uiText'

export default function Experience({ experience, education }) {
  const { lang } = useLanguage()
  const t = uiText[lang]
  const rows = Math.max(experience.length, education.length)

  return (
    <section id="experience" className="min-h-screen py-16 md:py-32 bg-[#1D1D1F]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* ── Two aligned column headers ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 mb-10 md:mb-16">
          <h2 className="text-[2.5rem] md:text-[3.5rem] font-bold tracking-[-0.003em] leading-[1.05] text-white">
            {t.sections.experience}
          </h2>
          <h2 id="education" className="text-[2.5rem] md:text-[3.5rem] font-bold tracking-[-0.003em] leading-[1.05] text-white
                                         mt-6 lg:mt-0">
            {t.sections.education}
          </h2>
        </div>

        {/* ── 2 × 3 grid — items in the same row share height automatically ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-11 card-stagger">
          {Array.from({ length: rows }, (_, i) => (
            <Fragment key={i}>

              {/* ── Experience cell ── */}
              <div className="relative pl-9 group">
                {i < experience.length - 1 && (
                  <div className="absolute left-[4px] top-5 bottom-[-2.75rem] w-px
                                  bg-gradient-to-b from-white/20 via-white/10 to-transparent" />
                )}
                {experience[i]?.frc ? (
                  <span className="absolute left-[-3px] top-[0.6rem] w-2 h-2 rounded-full
                                   bg-white/40 ring-[3px] ring-[#1D1D1F]" />
                ) : (
                  <div className="absolute left-0 top-[0.6rem] w-2 h-2 rounded-full bg-[#0071E3]
                                  ring-[3px] ring-[#1D1D1F] shadow-[0_0_0_3px_rgba(0,113,227,0.15)]
                                  group-hover:shadow-[0_0_0_4px_rgba(0,113,227,0.2)] group-hover:scale-110
                                  transition-all duration-[125ms]" />
                )}
                <div className="p-5 rounded-2xl hover:bg-white/[0.05] transition-colors duration-[125ms] -ml-2 pl-7">
                  <div className="flex items-start justify-between gap-4 mb-1.5">
                    <h3 className="text-base font-bold tracking-tight text-white leading-snug">
                      {experience[i]?.role}
                    </h3>
                    <span className="text-[10px] text-white/50 font-mono bg-white/10 px-2.5 py-1
                                     rounded-full whitespace-nowrap shrink-0 leading-none mt-0.5">
                      {experience[i]?.period}
                    </span>
                  </div>
                  <p className="text-sm text-white/65 mb-2 font-medium">{experience[i]?.organization}</p>
                  <p className="text-sm text-white/50 leading-relaxed">{experience[i]?.description}</p>
                </div>
              </div>

              {/* ── Education cell ── */}
              <div className="relative pl-9 group">
                {i < education.length - 1 && (
                  <div className="absolute left-[4px] top-5 bottom-[-2.75rem] w-px
                                  bg-gradient-to-b from-white/20 via-white/10 to-transparent" />
                )}
                <div className="absolute left-0 top-[0.6rem] w-2 h-2 rounded-full bg-white/30
                                ring-[3px] ring-[#1D1D1F]
                                group-hover:bg-white/60 group-hover:scale-110
                                transition-all duration-[125ms]" />
                <div className="p-5 rounded-2xl hover:bg-white/[0.05] transition-colors duration-[125ms] -ml-2 pl-7">
                  <div className="flex items-start justify-between gap-4 mb-1.5">
                    <h3 className="text-base font-bold tracking-tight text-white leading-snug">
                      {education[i]?.school}
                    </h3>
                    <span className="text-[10px] text-white/50 font-mono bg-white/10 px-2.5 py-1
                                     rounded-full whitespace-nowrap shrink-0 leading-none mt-0.5">
                      {education[i]?.period}
                    </span>
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed">{education[i]?.degree}</p>
                </div>
              </div>

            </Fragment>
          ))}
        </div>

      </div>
    </section>
  )
}
