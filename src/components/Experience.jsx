import SectionHeader from './SectionHeader'
import { useLanguage } from '../context/LanguageContext'
import { uiText } from '../data/uiText'

export default function Experience({ experience, education }) {
  const { lang } = useLanguage()
  const t = uiText[lang]

  return (
    <section id="experience" className="min-h-screen py-16 md:py-32 bg-[#1D1D1F]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionHeader label={t.sections.experience} invert />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── Left: Experience timeline ── */}
          <div className="card-stagger">
            {experience.map((exp, i) => (
              <div key={i} className="relative pl-9 pb-11 last:pb-0 group">
                {i < experience.length - 1 && (
                  <div className="absolute left-[4px] top-5 w-px h-full
                                  bg-gradient-to-b from-white/20 via-white/10 to-transparent" />
                )}
                {exp.frc ? (
                  <span className="absolute left-[-3px] top-[0.6rem] w-2 h-2 rounded-full bg-white/40 ring-[3px] ring-[#1D1D1F]" />
                ) : (
                  <div className="absolute left-0 top-[0.6rem] w-2 h-2 rounded-full bg-[#0071E3]
                                  ring-[3px] ring-[#1D1D1F] shadow-[0_0_0_3px_rgba(0,113,227,0.15)]
                                  group-hover:shadow-[0_0_0_4px_rgba(0,113,227,0.2)] group-hover:scale-110
                                  transition-all duration-[125ms]" />
                )}
                <div className="p-5 rounded-2xl hover:bg-white/[0.05] transition-colors duration-[125ms] -ml-2 pl-7">
                  <div className="flex items-start justify-between gap-4 mb-1.5">
                    <h3 className="text-base font-bold tracking-tight text-white leading-snug">
                      {exp.role}
                    </h3>
                    <span className="text-[10px] text-white/50 font-mono bg-white/10 px-2.5 py-1
                                     rounded-full whitespace-nowrap shrink-0 leading-none mt-0.5">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-sm text-white/65 mb-2.5 font-medium">{exp.organization}</p>
                  <p className="text-sm text-white/50 leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Right: Education timeline (same template) ── */}
          <div id="education" className="lg:pt-1 card-stagger">
            <p className="text-[11px] font-semibold tracking-widest uppercase text-white/40 mb-5 pl-9">
              {t.sections.education}
            </p>
            {education.map((edu, i) => (
              <div key={i} className="relative pl-9 pb-11 last:pb-0 group">
                {i < education.length - 1 && (
                  <div className="absolute left-[4px] top-5 w-px h-full
                                  bg-gradient-to-b from-white/20 via-white/10 to-transparent" />
                )}
                <div className="absolute left-0 top-[0.6rem] w-2 h-2 rounded-full bg-white/30
                                ring-[3px] ring-[#1D1D1F]
                                group-hover:bg-white/60 group-hover:scale-110
                                transition-all duration-[125ms]" />
                <div className="p-5 rounded-2xl hover:bg-white/[0.05] transition-colors duration-[125ms] -ml-2 pl-7">
                  <div className="flex items-start justify-between gap-4 mb-1.5">
                    <h3 className="text-base font-bold tracking-tight text-white leading-snug">
                      {edu.school}
                    </h3>
                    <span className="text-[10px] text-white/50 font-mono bg-white/10 px-2.5 py-1
                                     rounded-full whitespace-nowrap shrink-0 leading-none mt-0.5">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed">{edu.degree}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
