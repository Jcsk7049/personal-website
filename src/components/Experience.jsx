import SectionHeader from './SectionHeader'

const FRC_LOGO = 'https://www.plasmarobotics.org/wp-content/uploads/2012/01/FRCicon_RGB.jpg'

({ experience }) {
  return (
    <section id="experience" className="py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <SectionHeader
          en="Experience"
          zh="經歷"
          sub="跨越學術研究、競賽技術指導與選手實戰三個維度。"
        />

        <div className="max-w-3xl card-stagger">
          {experience.map((exp, i) => (
            <div key={i} className="relative pl-9 pb-11 last:pb-0 group">
              {/* Timeline line */}
              {i < experience.length - 1 && (
                <div className="absolute left-[4px] top-5 w-px h-full
                                bg-gradient-to-b from-[#0071E3]/30 via-slate-200/60 to-transparent" />
              )}
              {/* Timeline dot / FRC logo */}
              {exp.frc ? (
                <img src={FRC_LOGO} alt="FRC"
                     className="absolute left-[-5px] top-[0.35rem] w-6 h-6 rounded-full object-cover
                                ring-2 ring-white shadow-sm" />
              ) : (
                <div className="absolute left-0 top-[0.6rem] w-2 h-2 rounded-full bg-[#0071E3]
                                ring-[3px] ring-white shadow-[0_0_0_3px_rgba(0,113,227,0.15)]
                                group-hover:shadow-[0_0_0_4px_rgba(0,113,227,0.25)] group-hover:scale-110
                                transition-all duration-300" />
              )}

              <div className="p-5 rounded-2xl hover:bg-slate-50/70 transition-colors duration-200 -ml-2 pl-7">
                <div className="flex items-start justify-between gap-4 mb-1.5">
                  <h3 className="text-base font-bold tracking-tight text-[#1D1D1F] leading-snug
                                 group-hover:text-[#0071E3] transition-colors duration-200">
                    {exp.role}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono bg-slate-50 px-2.5 py-1
                                   rounded-full whitespace-nowrap shrink-0 leading-none mt-0.5">
                    {exp.period}
                  </span>
                </div>
                <p className="text-sm text-[#0071E3]/80 mb-2.5 font-medium">{exp.organization}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
