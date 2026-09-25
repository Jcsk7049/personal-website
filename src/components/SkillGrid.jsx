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

export default function SkillGrid({ skills = {}, detail = {} }) {
  const { lang } = useLanguage()
  const t = uiText[lang]

  return (
    <section id="skills" className="skills-section hero-skills w-full">
      <SectionHeader label={t.sections.skills} sub={t.sectionSubs.skills} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {GROUPS.map(({ key, number }) => {
          const group = t.quadrants[key]
          const items = detail?.[key]?.skills || (skills[key] || []).map(name => ({ name }))

          return (
            <Link
              key={key}
              to={`/skills/${key}`}
              className="skill-row skill-tile-panel group grid content-start gap-4 p-4 md:p-5 border border-[#D8DCE0] bg-white/75 hover:bg-white transition-colors duration-[240ms]"
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

              <ul className="grid grid-cols-2 gap-2">
                {items.map((item, index) => (
                  <li
                    key={item.name}
                    className={`skill-item-tile flex min-h-10 items-center justify-between gap-2 px-2.5 py-2 border border-[#E1E4E7] text-sm text-[#3F3F46] ${index % 2 === 0 ? 'bg-[#F1F2F3]' : 'bg-[#F8F8F8]'}`}
                  >
                    <span>{item.name}</span>
                    {item.level && <span className="shrink-0 text-xs text-[#737C84]">{t.levels[item.level] ?? item.level}</span>}
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
