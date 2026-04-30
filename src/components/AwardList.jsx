import SectionHeader from './SectionHeader'

const TrophyIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 22h16"/>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
  </svg>
)

export default function AwardList({ awards }) {
  return (
    <section id="awards" className="py-32 bg-[#F5F5F7]">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <SectionHeader
          en="Awards"
          zh="獲獎"
          sub="國際競賽與黑客松的實戰成果。"
        />

        <div className="max-w-3xl space-y-2 card-stagger">
          {awards.map((award, i) => (
            <div key={i}
                 className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-white border border-[#E5E5EA]
                            shadow-card hover:shadow-card-hover hover:-translate-y-[3px]
                            transition-all duration-500 ease-apple group cursor-default">
              <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full
                              bg-[#F5F5F7] group-hover:bg-[#0071E3]/8
                              transition-colors duration-500 ease-apple">
                <span className="text-[#C7C7CC] group-hover:text-[#0071E3]
                                 transition-colors duration-300 ease-apple">
                  <TrophyIcon />
                </span>
              </div>
              <p className="text-sm text-[#1D1D1F] leading-relaxed flex-1 font-medium">{award.title}</p>
              <span className="shrink-0 text-[11px] text-[#86868B] font-mono bg-[#F5F5F7]
                               border border-[#E5E5EA] px-2.5 py-1 rounded-full leading-none
                               group-hover:border-[#0071E3]/20 group-hover:text-[#0071E3]
                               transition-all duration-300 ease-apple">
                {award.year}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
