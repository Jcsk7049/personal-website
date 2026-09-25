import { Link } from 'react-router-dom'
import SectionHeader from './SectionHeader'
import { useLanguage } from '../context/LanguageContext'
import { uiText } from '../data/uiText'
import { SKILL_CAT_ACCENT_SOLID } from '../data/designTokens'

const GROUPS = [
  { key: 'data_analysis', accent: SKILL_CAT_ACCENT_SOLID.data_analysis },
  { key: 'programming', accent: SKILL_CAT_ACCENT_SOLID.programming },
  { key: 'eda', accent: SKILL_CAT_ACCENT_SOLID.eda },
  { key: 'manufacturing', accent: SKILL_CAT_ACCENT_SOLID.manufacturing },
]

export default function SkillGrid({ skills = {}, detail = {} }) {
  const { lang } = useLanguage()
  const t = uiText[lang]

  return (
    <section id="skills" className="skills-section hero-skills mt-14 md:mt-20 pt-10 md:pt-12 border-t border-black/10">
      <div className="w-full">
      <SectionHeader label={t.sections.skills} sub={t.sectionSubs.skills} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {GROUPS.map(({ key, accent }) => {
          const group = t.quadrants[key]
          const items = detail?.[key]?.skills || (skills[key] || []).map(name => ({ name }))
          return (
            <Link key={key} to={`/skills/${key}`} className="skill-row grid grid-cols-1 gap-y-3 p-5 border border-black/10 bg-white/60 hover:bg-white transition-colors duration-[240ms]">
              <div>
                <p className="text-xs text-[#6E6E73] mb-1">{group.sublabel}</p>
                <h3 className={`text-lg font-semibold tracking-tight ${accent}`}>{group.label}</h3>
              </div>
              <div>
                {detail?.[key]?.overview && <p className="max-w-[75ch] text-sm text-[#3F3F46] leading-relaxed mb-3">{detail[key].overview}</p>}
                <ul className="flex flex-wrap gap-x-5 gap-y-2">
                  {items.map(item => <li key={item.name} className="text-sm text-[#3F3F46]">{item.name}{item.level && <span className="text-xs text-[#86868B]">　{t.levels[item.level] ?? item.level}</span>}</li>)}
                </ul>
              </div>
            </Link>
          )
        })}
      </div>
      </div>
    </section>
  )
}
