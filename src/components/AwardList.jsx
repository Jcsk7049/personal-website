import SectionHeader from './SectionHeader'

const TrophyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
    <section id="awards" className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <SectionHeader
          en="Awards"
          zh="獲獎"
          sub="國際競賽與黑客松的實戰成果。"
        />

        <div className="max-w-3xl space-y-2.5 card-stagger">
          {awards.map((award, i) => (
            <div key={i}
                 className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-white border border-slate-100
                            hover:bg-slate-50 hover:border-slate-200
                            transition-all duration-300 group">
              <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full
                              bg-slate-50 group-hover:bg-blue-50 transition-colors duration-200">
                <span className="text-slate-300 group-hover:text-[#0071E3] transition-colors duration-200">
                  <TrophyIcon />
                </span>
              </div>
              <p className="text-sm text-[#1D1D1F] leading-relaxed flex-1">{award.title}</p>
              <span className="shrink-0 text-[11px] text-slate-400 font-mono bg-slate-50 px-2.5 py-1
                               rounded-full leading-none group-hover:bg-blue-50 group-hover:text-blue-600
                               transition-colors duration-200">
                {award.year}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
