import SectionHeader from './SectionHeader'

const GraduationIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c0 1.1 2.7 2 6 2s6-.9 6-2v-5"/>
  </svg>
)

export default function Education({ education }) {
  return (
    <section id="education" className="py-24 bg-[#F5F5F7]">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <SectionHeader
          en="Education"
          zh="學歷"
          sub="紮根電機工程，從技職體系一路銜接至大學研究。"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 card-stagger">
          {education.map((edu, i) => (
            <div key={i}
                 className="p-7 rounded-2xl bg-white
                            shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]
                            hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]
                            transition-all duration-300 group">
              <div className="flex items-start justify-between mb-5">
                <span className="text-[#C7C7CC] group-hover:text-[#0071E3] transition-colors duration-300">
                  <GraduationIcon />
                </span>
                <span className="text-[10px] text-[#AEAEB2] font-mono bg-[#F5F5F7] px-2.5 py-1 rounded-full leading-none">
                  {edu.period}
                </span>
              </div>
              <h3 className="text-base font-semibold text-[#1D1D1F] mb-1.5
                             group-hover:text-[#0071E3] transition-colors duration-200">
                {edu.school}
              </h3>
              <p className="text-sm text-[#86868B] leading-snug">{edu.degree}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
