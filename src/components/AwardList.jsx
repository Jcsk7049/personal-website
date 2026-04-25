import SectionHeader from './SectionHeader'

export default function AwardList({ awards }) {
  return (
    <section id="awards" className="py-24 px-6 md:px-20 lg:px-36 bg-[#F5F5F7]">
      <SectionHeader
        en="Awards"
        zh="獲獎"
        sub="國際競賽與黑客松的實戰成果。"
      />

      <div className="max-w-3xl space-y-3">
        {awards.map((award, i) => (
          <div key={i}
               className="flex items-center gap-4 p-5 rounded-2xl bg-white
                          hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300">
            <span className="shrink-0 px-3 py-1 rounded-full bg-[#F5F5F7] text-[#86868B]
                             text-xs font-mono font-semibold">
              {award.year}
            </span>
            <p className="text-sm text-[#1D1D1F] leading-snug">{award.title}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
