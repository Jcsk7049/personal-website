import SectionHeader from './SectionHeader'
import { useLanguage } from '../context/LanguageContext'
import { uiText } from '../data/uiText'

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
  const { lang } = useLanguage()
  const t = uiText[lang]
  return (
    <section id="awards" className="min-h-screen flex flex-col justify-center py-20 bg-[#F5F5F7]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionHeader label={t.sections.awards} />

        <div className="grid md:grid-cols-2 gap-2.5 card-stagger">
          {awards.map((award, i, arr) => (
            <div key={i}
                 className={`flex items-center gap-4 px-5 py-4 rounded-2xl
                            shadow-[0_0_0_1px_#E4E4E7]
                            hover:shadow-[0_0_0_1px_#D4D4D8] hover:bg-[#F0F0F2]
                            transition-all duration-[125ms] group bg-white
                            ${i === arr.length - 1 && arr.length % 2 !== 0 ? 'md:col-span-2' : ''}`}>
              <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full
                              bg-[#EBEBED] group-hover:bg-blue-50 transition-colors duration-[125ms] overflow-hidden">
                <span className="text-[#c7c7cc] group-hover:text-[#0071E3] transition-colors duration-[125ms]">
                  <TrophyIcon />
                </span>
              </div>
              <p className="text-sm text-[#1D1D1F] leading-relaxed flex-1">{award.title}</p>
              <span className="shrink-0 text-[11px] text-[#3F3F46] font-mono bg-[#EBEBED] px-2.5 py-1
                               rounded-full leading-none group-hover:bg-blue-50 group-hover:text-blue-600
                               transition-colors duration-[125ms]">
                {award.year}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
