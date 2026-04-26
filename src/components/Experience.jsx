import SectionHeader from './SectionHeader'

export default function Experience({ experience }) {
  return (
    <section id="experience" className="py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <SectionHeader
          en="Experience"
          zh="經歷"
          sub="跨越學術研究、競賽技術指導與選手實戰三個維度。"
        />

        <div className="max-w-3xl card-stagger">
          {experience.map((exp, i) => (
            <div key={i} className="relative pl-8 pb-12 last:pb-0 group">
              {/* Timeline line */}
              {i < experience.length - 1 && (
                <div className="absolute left-[3px] top-4 w-px h-full
                                bg-gradient-to-b from-[#0071E3]/40 via-gray-200 to-gray-100" />
              )}
              {/* Timeline dot */}
              <div className="absolute left-0 top-2.5 w-[7px] h-[7px] rounded-full bg-[#0071E3]
                              ring-[3px] ring-[#0071E3]/20
                              group-hover:ring-[#0071E3]/40 group-hover:scale-125
                              transition-all duration-300" />

              <div className="flex items-start justify-between gap-4 mb-1">
                <h3 className="text-base font-semibold text-[#1D1D1F]
                               group-hover:text-[#0071E3] transition-colors duration-200">
                  {exp.role}
                </h3>
                <span className="text-xs text-[#86868B] font-mono whitespace-nowrap shrink-0 mt-0.5">
                  {exp.period}
                </span>
              </div>
              <p className="text-sm text-[#86868B] mb-2 font-medium">{exp.organization}</p>
              <p className="text-sm text-[#1D1D1F] leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
