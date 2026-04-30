import SectionHeader from './SectionHeader'

export default function Experience({ experience }) {
  return (
    <section id="experience" className="py-32 bg-[#F5F5F7]">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <SectionHeader
          en="Experience"
          zh="經歷"
          sub="跨越學術研究、競賽技術指導與選手實戰三個維度。"
        />

        <div className="max-w-3xl card-stagger">
          {experience.map((exp, i) => (
            <div key={i} className="relative pl-9 pb-12 last:pb-0 group">
              {/* Timeline line */}
              {i < experience.length - 1 && (
                <div className="absolute left-[4px] top-5 w-px h-full
                                bg-gradient-to-b from-[#0071E3]/20 via-[#E5E5EA] to-transparent" />
              )}
              {/* Timeline dot */}
              <div className="absolute left-0 top-[0.65rem] w-2 h-2 rounded-full bg-[#0071E3]
                              ring-[3px] ring-[#F5F5F7]
                              shadow-[0_0_0_3px_rgba(0,113,227,0.12)]
                              group-hover:shadow-[0_0_0_4px_rgba(0,113,227,0.22)]
                              group-hover:scale-[1.15]
                              transition-all duration-500 ease-apple" />

              <div className="px-5 py-5 rounded-2xl
                              hover:bg-white hover:shadow-card
                              transition-all duration-500 ease-apple
                              -ml-2 pl-7">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-[15px] font-bold tracking-tight text-[#1D1D1F] leading-snug
                                 group-hover:text-[#0071E3] transition-colors duration-300 ease-apple">
                    {exp.role}
                  </h3>
                  <span className="text-[10px] text-[#86868B] font-mono bg-white border border-[#E5E5EA]
                                   px-2.5 py-1 rounded-full whitespace-nowrap shrink-0 leading-none mt-0.5">
                    {exp.period}
                  </span>
                </div>
                <p className="text-[13px] text-[#0071E3]/75 mb-3 font-semibold tracking-wide">{exp.organization}</p>
                <p className="text-sm text-[#6E6E73] leading-loose">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
