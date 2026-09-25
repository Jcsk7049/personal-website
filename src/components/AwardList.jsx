import { useLanguage } from '../context/LanguageContext'
import { uiText } from '../data/uiText'

export default function AwardList({ awards = [] }) {
  const { lang } = useLanguage()
  const t = uiText[lang]

  return (
    <div id="awards" className="awards-column">
      <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-[-0.03em] leading-[1.08] mb-9">
        {t.sections.awards}
      </h2>
      <div className="flex flex-col gap-7">
        {awards.map((award, index) => (
          <div key={`${award.year}-${index}`} className="relative pl-9">
            {index < awards.length - 1 && (
              <div className="absolute left-[4px] top-5 bottom-[-2.75rem] w-px bg-white/15" />
            )}
            <span className={`absolute left-0 top-[0.6rem] w-2 h-2 rounded-full ring-[3px] ring-[#1D1D1F] ${award.featured ? 'bg-[#737C84]' : 'bg-white/45'}`} />
            <div className="py-4 -ml-2 pl-7">
              <div className="flex items-start justify-between gap-3 mb-1.5">
                <h3 className="text-base font-semibold tracking-tight text-white leading-snug">{award.title}</h3>
                <span className="text-[11px] text-white/50 font-mono whitespace-nowrap shrink-0 leading-none mt-1">
                  {award.year}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
