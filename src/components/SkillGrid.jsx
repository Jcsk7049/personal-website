import { Link } from 'react-router-dom'
import SectionHeader from './SectionHeader'
import { useLanguage } from '../context/LanguageContext'
import { uiText } from '../data/uiText'

const GROUPS = [
  { key: 'data_analysis', number: '01' },
  { key: 'programming', number: '02' },
  { key: 'eda', number: '03' },
  { key: 'manufacturing', number: '04' },
  { key: 'vibecoding', number: '05' },
]

const LEVEL_TILE = {
  '基礎': 'bg-[#E8EAEC] border-[#D8DCE0] text-[#1D1D1F]',
  '熟悉': 'bg-[#AEB7BE] border-[#A0AAB2] text-[#1D1D1F]',
  '進階': 'bg-[#59636C] border-[#59636C] text-white',
}

export default function SkillGrid({ skills = {}, detail = {} }) {
  const { lang } = useLanguage()
  const t = uiText[lang]

  return (
    <section id="skills" className="skills-section hero-skills w-full xl:h-full xl:min-h-0 xl:max-h-[calc(100svh-5rem)] xl:flex xl:flex-col">
      <SectionHeader label={t.sections.skills} sub={t.sectionSubs.skills} compact />
      <div className="grid min-h-0 grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 xl:flex-1 xl:grid-rows-3">
        {GROUPS.map(({ key, number }) => {
          const group = t.quadrants[key]
          const items = detail?.[key]?.skills || (skills[key] || []).map(name => ({ name }))
          const isVibeCoding = key === 'vibecoding'
          const visibleItems = items.slice(0, 2)
          const hiddenCount = items.length - visibleItems.length
          const previewItems = hiddenCount > 0
            ? [...visibleItems, { name: lang === 'en' ? `+${hiddenCount} more` : `+${hiddenCount} 項` }]
            : visibleItems

          return (
            <Link
              key={key}
              to={`/skills/${key}`}
              className={`skill-row skill-tile-panel group flex min-h-0 flex-col gap-1.5 p-2.5 md:p-3 border border-[#D8DCE0] bg-white/75 hover:bg-white transition-colors duration-[240ms] xl:h-full ${isVibeCoding ? 'md:col-span-2' : ''}`}
            >
              <div className="flex items-start gap-2.5">
                <span className="pt-0.5 font-mono text-[11px] tracking-wider text-[#737C84]">{number}</span>
                <div className="min-w-0">
                  <p className="truncate text-[10px] text-[#6E6E73]">{group.sublabel}</p>
                  <h3 className="text-sm font-semibold tracking-tight text-[#737C84]">{group.label}</h3>
                </div>
              </div>

              {detail?.[key]?.overview && (
                <p className="line-clamp-1 text-[11px] text-[#3F3F46] leading-snug">{detail[key].overview}</p>
              )}

              <ul className={`grid min-h-0 grid-cols-2 gap-1 ${isVibeCoding ? 'md:grid-cols-4' : ''}`}>
                {previewItems.map(item => (
                  <li
                    key={item.name}
                    className={`skill-item-tile flex min-h-8 items-center justify-between gap-1 px-1.5 py-1 border text-[10px] md:text-[11px] transition-colors duration-[240ms] ${LEVEL_TILE[item.level] || 'bg-[#F1F2F3] border-[#E1E4E7] text-[#1D1D1F]'}`}
                  >
                    <span>{item.name}</span>
                    {item.level && <span className={`shrink-0 text-[10px] ${item.level === '進階' ? 'text-white/85' : 'text-[#3F3F46]'}`}>{t.levels[item.level] ?? item.level}</span>}
                  </li>
                ))}
              </ul>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
