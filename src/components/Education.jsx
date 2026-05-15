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
    <section id="education" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionHeader zh="學歷" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 card-stagger">
          {education.map((edu, i) => (
            <div key={i}
                 className="p-7 rounded-2xl bg-white
                            shadow-[0_2px_12px_rgba(0,0,0,0.06)]
                            hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(0,0,0,0.10)]
                            transition-all duration-500 group">
              <div className="flex items-start justify-between mb-5">
                <span className="text-[#c7c7cc] group-hover:text-[#0071E3] transition-colors duration-300">
                  <GraduationIcon />
                </span>
                <span className="text-[10px] text-[#6e6e73] font-mono bg-[#f5f5f7] px-2.5 py-1 rounded-full leading-none">
                  {edu.period}
                </span>
              </div>
              <h3 className="text-base font-bold tracking-tight text-[#1D1D1F] mb-1.5
                             group-hover:text-[#0071E3] transition-colors duration-200">
                {edu.school}
              </h3>
              <p className="text-sm text-[#6e6e73] leading-relaxed">{edu.degree}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
