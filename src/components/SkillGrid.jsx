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
    <section id="skills" className="skills-section min-h-[calc(100svh-3rem)] pt-16 md:pt-24">
      <div className="w-full px-6 md:px-10">
      <SectionHeader label={t.sections.skills} sub={t.sectionSubs.skills} />
      <div className="mt-8 border-t border-black/10">
        {GROUPS.map(({ key, accent }) => {
          const group = t.quadrants[key]
          const items = detail?.[key]?.skills || (skills[key] || []).map(name => ({ name }))
          return (
            <Link key={key} to={`/skills/${key}`} className="skill-row grid grid-cols-1 md:grid-cols-[minmax(180px,0.28fr)_minmax(0,1fr)] gap-x-8 gap-y-3 py-6 border-b border-black/10 hover:bg-white/40 transition-colors duration-[240ms]">
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
