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

      <div className="max-w-3xl">
        {experience.map((exp, i) => (
          <div key={i} className="relative pl-6 pb-10 last:pb-0">
            {i < experience.length - 1 && (
              <div className="absolute left-0 top-2 w-px h-full bg-gray-200" />
            )}
            <div className="absolute left-[-3px] top-2 w-[7px] h-[7px] rounded-full bg-[#0071E3]" />

            <div className="flex items-start justify-between gap-4 mb-1">
              <h3 className="text-base font-semibold text-[#1D1D1F]">{exp.role}</h3>
              <span className="text-xs text-[#86868B] font-mono whitespace-nowrap shrink-0 mt-0.5">{exp.period}</span>
            </div>
            <p className="text-sm text-[#86868B] mb-2">{exp.organization}</p>
            <p className="text-sm text-[#1D1D1F] leading-relaxed">{exp.description}</p>
          </div>
        ))}
      </div>
      </div>
    </section>
  )
}
