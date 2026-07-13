import SectionHeader from './SectionHeader'
import { useLanguage } from '../context/LanguageContext'
import { uiText } from '../data/uiText'

const TrophyIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
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
  const { lang } = useLanguage()
  const t = uiText[lang]
  const featured = awards.filter(a => a.featured)
  const regular  = awards.filter(a => !a.featured)

  return (
    <section id="awards" className="min-h-screen flex flex-col justify-center py-20 bg-[#F5F5F7]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionHeader label={t.sections.awards} sub={t.sectionSubs.awards} />

        {featured.length > 0 && (
          <div className="flex flex-col gap-2.5 mb-2.5">
            {featured.map((award, i) => (
              <div key={i}
                   className="flex items-center gap-5 px-6 py-6 md:px-8 md:py-7 rounded-[18px] bg-white
                              hover:shadow-[rgba(0,0,0,0.08)_2px_4px_12px_0px]
                              transition-all duration-[240ms] group">
                <div className="shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-[#EBF4FF]">
                  <span className="text-[#0071E3]">
                    <TrophyIcon size={22} />
                  </span>
                </div>
                <p className="text-lg md:text-xl font-semibold tracking-tight text-[#1D1D1F] leading-snug flex-1">
                  {award.title}
                </p>
                <span className="shrink-0 text-xs text-[#0071E3] font-mono bg-[#EBF4FF] px-3 py-1.5
                                 rounded-full leading-none">
                  {award.year}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-2.5 card-stagger">
          {regular.map((award, i, arr) => (
            <div key={i}
                 className={`flex items-center gap-4 px-5 py-4 rounded-[18px] bg-white
                            hover:shadow-[rgba(0,0,0,0.08)_2px_4px_12px_0px]
                            transition-all duration-[240ms] group bg-white
                            ${i === arr.length - 1 && arr.length % 2 !== 0 ? 'md:col-span-2' : ''}`}>
              <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full
                              bg-[#EBEBED] group-hover:bg-blue-50 transition-colors duration-[240ms] overflow-hidden">
                <span className="text-[#c7c7cc] group-hover:text-[#0071E3] transition-colors duration-[240ms]">
                  <TrophyIcon />
                </span>
              </div>
              <p className="text-sm text-[#1D1D1F] leading-relaxed flex-1">{award.title}</p>
              <span className="shrink-0 text-[11px] text-[#3F3F46] font-mono bg-[#EBEBED] px-2.5 py-1
                               rounded-full leading-none group-hover:bg-blue-50 group-hover:text-blue-600
                               transition-colors duration-[240ms]">
                {award.year}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
