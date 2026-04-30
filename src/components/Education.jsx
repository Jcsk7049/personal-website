import SectionHeader from './SectionHeader'

const GraduationIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c0 1.1 2.7 2 6 2s6-.9 6-2v-5"/>
  </svg>
)

export default function Education({ education }) {
  return (
    <section id="education" className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <SectionHeader
          en="Education"
          zh="學歷"
          sub="紮根電機工程，從技職體系一路銜接至大學研究。"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 card-stagger">
          {education.map((edu, i) => (
            <div key={i}
                 className="p-7 rounded-2xl bg-white border border-[#E5E5EA]
                            shadow-card hover:shadow-card-hover hover:-translate-y-[4px]
                            transition-all duration-500 ease-apple group cursor-default">
              <div className="flex items-start justify-between mb-6">
                <span className="text-[#C7C7CC] group-hover:text-[#0071E3] transition-colors duration-500 ease-apple">
                  <GraduationIcon />
                </span>
                <span className="text-[10px] text-[#86868B] font-mono bg-[#F5F5F7] px-2.5 py-1
                                 rounded-full leading-none tracking-wide">
                  {edu.period}
                </span>
              </div>
              <h3 className="text-[15px] font-bold tracking-tight text-[#1D1D1F] mb-2
                             group-hover:text-[#0071E3] transition-colors duration-300 ease-apple">
                {edu.school}
              </h3>
              <p className="text-sm text-[#6E6E73] leading-relaxed">{edu.degree}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
