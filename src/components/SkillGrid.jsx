import { Link } from 'react-router-dom'
import SectionHeader from './SectionHeader'
import { useLanguage } from '../context/LanguageContext'
import { uiText } from '../data/uiText'

const GROUPS = [
  { key: 'data_analysis', number: '01' },
  { key: 'programming', number: '02' },
  { key: 'eda', number: '03' },
  { key: 'manufacturing', number: '04' },
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
    <section id="skills" className="skills-section hero-skills w-full xl:h-full xl:min-h-0 xl:flex xl:flex-col">
      <SectionHeader label={t.sections.skills} sub={t.sectionSubs.skills} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 xl:flex-1 xl:auto-rows-fr">
        {GROUPS.map(({ key, number }) => {
          const group = t.quadrants[key]
          const items = detail?.[key]?.skills || (skills[key] || []).map(name => ({ name }))

          return (
            <Link
              key={key}
              to={`/skills/${key}`}
              className="skill-row skill-tile-panel group flex flex-col gap-3 p-4 md:p-5 border border-[#D8DCE0] bg-white/75 hover:bg-white transition-colors duration-[240ms] xl:h-full"
            >
              <div className="flex items-start gap-3">
                <span className="pt-1 font-mono text-xs tracking-wider text-[#737C84]">{number}</span>
                <div>
                  <p className="text-xs text-[#6E6E73] mb-1">{group.sublabel}</p>
                  <h3 className="text-lg font-semibold tracking-tight text-[#737C84]">{group.label}</h3>
                </div>
              </div>

              {detail?.[key]?.overview && (
                <p className="text-sm text-[#3F3F46] leading-relaxed">{detail[key].overview}</p>
              )}

              <ul className="grid grid-cols-2 gap-2 xl:flex-1 xl:auto-rows-fr">
                {items.map(item => (
                  <li
                    key={item.name}
                    className={`skill-item-tile flex min-h-12 xl:min-h-16 items-center justify-between gap-2 px-3 py-2.5 border text-sm transition-colors duration-[240ms] ${LEVEL_TILE[item.level] || 'bg-[#F1F2F3] border-[#E1E4E7] text-[#1D1D1F]'}`}
                  >
                    <span>{item.name}</span>
                    {item.level && <span className={`shrink-0 text-xs ${item.level === '進階' ? 'text-white/85' : 'text-[#3F3F46]'}`}>{t.levels[item.level] ?? item.level}</span>}
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
