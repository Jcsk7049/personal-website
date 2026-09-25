import { useLanguage } from '../context/LanguageContext'
import { uiText } from '../data/uiText'

export default function Experience({ experience, education }) {
  const { lang } = useLanguage()
  const t = uiText[lang]
  /* ── Shared cell renderers ── */
  const ExpCell = ({ item, isLast }) => (
    <div className="relative pl-9 group">
      {!isLast && (
        <div className="absolute left-[4px] top-5 bottom-[-2.75rem] w-px bg-white/15" />
      )}
      {item?.frc ? (
        <span className="absolute left-[-3px] top-[0.6rem] w-2 h-2 rounded-full bg-[#86868B] ring-[3px] ring-[#1D1D1F]" />
      ) : (
        <div className="absolute left-0 top-[0.6rem] w-2 h-2 rounded-full bg-[#737C84] ring-[3px] ring-[#1D1D1F]" />
      )}
      <div className="py-4 -ml-2 pl-7">
        <div className="flex items-start justify-between gap-4 mb-1.5">
          <h3 className="text-base font-semibold tracking-tight text-white leading-snug">{item?.role}</h3>
          <span className="text-[11px] text-white/50 font-mono whitespace-nowrap shrink-0 leading-none mt-1">
            {item?.period}
          </span>
        </div>
        <p className="text-sm text-white/65 mb-2 font-medium">{item?.organization}</p>
        <p className="text-sm text-white/75 leading-[1.7] whitespace-pre-line max-w-[68ch]">{item?.description}</p>
      </div>
    </div>
  )

  const EduCell = ({ item, isLast }) => (
    <div className="relative pl-9 group">
      {!isLast && (
        <div className="absolute left-[4px] top-5 bottom-[-2.75rem] w-px bg-white/15" />
      )}
      <div className="absolute left-0 top-[0.6rem] w-2 h-2 rounded-full bg-white/45 ring-[3px] ring-[#1D1D1F]" />
      <div className="py-4 -ml-2 pl-7">
        <div className="flex items-start justify-between gap-4 mb-1.5">
          <h3 className="text-base font-semibold tracking-tight text-white leading-snug">{item?.school}</h3>
          <span className="text-[11px] text-white/50 font-mono whitespace-nowrap shrink-0 leading-none mt-1">
            {item?.period}
          </span>
        </div>
        <p className="text-sm text-white/65 leading-relaxed whitespace-pre-line">{item?.degree}</p>
      </div>
    </div>
  )

  return (
    <section id="experience" className="experience-section min-h-[calc(100svh-3rem)] py-16 md:py-24 bg-[#1D1D1F] text-white">
      <div className="mx-auto w-full max-w-[1024px] px-6 md:px-10">

        {/* anchor for #education (single, independent of responsive variants) */}
        <div id="education" aria-hidden="true" />

        <div className="experience-grid grid grid-cols-1 lg:grid-cols-[1.35fr_0.85fr] gap-14 lg:gap-24">
          <div>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-[-0.03em] leading-[1.08] mb-9">
              {t.sections.experience}
            </h2>
            <div className="flex flex-col gap-7 card-stagger">
              {experience.map((item, i) => (
                <ExpCell key={i} item={item} isLast={i === experience.length - 1} />
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-[-0.03em] leading-[1.08] mb-9">
              {t.sections.education}
            </h2>
            <div className="flex flex-col gap-7 card-stagger">
              {education.map((item, i) => (
                <EduCell key={i} item={item} isLast={i === education.length - 1} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
