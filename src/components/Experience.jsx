import { Fragment } from 'react'
import SectionHeader from './SectionHeader'
import { useLanguage } from '../context/LanguageContext'
import { uiText } from '../data/uiText'

export default function Experience({ experience, education }) {
  const { lang } = useLanguage()
  const t = uiText[lang]
  const rows = Math.max(experience.length, education.length)

  /* ── Shared cell renderers ── */
  const ExpCell = ({ item, isLast }) => (
    <div className="relative pl-9 group">
      {!isLast && (
        <div className="absolute left-[4px] top-5 bottom-[-2.75rem] w-px
                        bg-gradient-to-b from-white/20 via-white/10 to-transparent" />
      )}
      {item?.frc ? (
        <span className="absolute left-[-3px] top-[0.6rem] w-2 h-2 rounded-full
                         bg-white/40 ring-[3px] ring-[#1D1D1F]" />
      ) : (
        <div className="absolute left-0 top-[0.6rem] w-2 h-2 rounded-full bg-[#0071E3]
                        ring-[3px] ring-[#1D1D1F] shadow-[0_0_0_3px_rgba(0,113,227,0.15)]
                        group-hover:shadow-[0_0_0_4px_rgba(0,113,227,0.2)] group-hover:scale-110
                        transition-all duration-[240ms]" />
      )}
      <div className="p-5 rounded-2xl hover:bg-white/[0.05] transition-colors duration-[240ms] -ml-2 pl-7">
        <div className="flex items-start justify-between gap-4 mb-1.5">
          <h3 className="text-base font-bold tracking-tight text-white leading-snug">{item?.role}</h3>
          <span className="text-[10px] text-white/50 font-mono bg-white/10 px-2.5 py-1
                           rounded-full whitespace-nowrap shrink-0 leading-none mt-0.5">
            {item?.period}
          </span>
        </div>
        <p className="text-sm text-white/65 mb-2 font-medium">{item?.organization}</p>
        <p className="text-sm text-white/50 leading-relaxed whitespace-pre-line">{item?.description}</p>
      </div>
    </div>
  )

  const EduCell = ({ item, isLast }) => (
    <div className="relative pl-9 group">
      {!isLast && (
        <div className="absolute left-[4px] top-5 bottom-[-2.75rem] w-px
                        bg-gradient-to-b from-white/20 via-white/10 to-transparent" />
      )}
      <div className="absolute left-0 top-[0.6rem] w-2 h-2 rounded-full bg-white/30
                      ring-[3px] ring-[#1D1D1F]
                      group-hover:bg-white/60 group-hover:scale-110
                      transition-all duration-[240ms]" />
      <div className="p-5 rounded-2xl hover:bg-white/[0.05] transition-colors duration-[240ms] -ml-2 pl-7">
        <div className="flex items-start justify-between gap-4 mb-1.5">
          <h3 className="text-base font-bold tracking-tight text-white leading-snug">{item?.school}</h3>
          <span className="text-[10px] text-white/50 font-mono bg-white/10 px-2.5 py-1
                           rounded-full whitespace-nowrap shrink-0 leading-none mt-0.5">
            {item?.period}
          </span>
        </div>
        <p className="text-sm text-white/50 leading-relaxed whitespace-pre-line">{item?.degree}</p>
      </div>
    </div>
  )

  return (
    <section id="experience" className="min-h-screen py-16 md:py-32 bg-[#1D1D1F]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* anchor for #education (single, independent of responsive variants) */}
        <div id="education" aria-hidden="true" />

        {/* ── MOBILE: stacked (experience → education) ── */}
        <div className="lg:hidden card-stagger">
          <h2 className="text-[2.5rem] font-semibold tracking-[-0.02em] leading-[1.05] text-white mb-10">
            {t.sections.experience}
          </h2>
          <div className="flex flex-col gap-11 mb-16">
            {experience.map((item, i) => (
              <ExpCell key={i} item={item} isLast={i === experience.length - 1} />
            ))}
          </div>
          <h2 className="text-[2.5rem] font-semibold tracking-[-0.02em] leading-[1.05] text-white mb-10">
            {t.sections.education}
          </h2>
          <div className="flex flex-col gap-11">
            {education.map((item, i) => (
              <EduCell key={i} item={item} isLast={i === education.length - 1} />
            ))}
          </div>
        </div>

        {/* ── DESKTOP: 2-column Fragment grid (same row = same height) ── */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-2 gap-x-16 mb-16">
            <h2 className="text-[3.5rem] font-semibold tracking-[-0.02em] leading-[1.05] text-white">
              {t.sections.experience}
            </h2>
            <h2 className="text-[3.5rem] font-semibold tracking-[-0.02em] leading-[1.05] text-white">
              {t.sections.education}
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-x-16 gap-y-11 card-stagger">
            {Array.from({ length: rows }, (_, i) => (
              <Fragment key={i}>
                <ExpCell item={experience[i]} isLast={i >= experience.length - 1} />
                <EduCell item={education[i]}  isLast={i >= education.length - 1} />
              </Fragment>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
