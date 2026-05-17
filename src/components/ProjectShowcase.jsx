import { Link } from 'react-router-dom'
import SectionHeader from './SectionHeader'

const PROJECT_ACCENTS = {
  'vap':               'from-sky-400 to-blue-600',
  'aws-hackathon':     'from-amber-400 to-orange-500',
  'audio-amplifier':   'from-lime-400 to-green-600',
  'qmk-stm32-keyboard':'from-violet-400 to-purple-600',
  'whack-a-mole':      'from-teal-400 to-cyan-500',
  'swerve':            'from-rose-400 to-red-500',
}

const CATEGORY_STYLES = {
  '高職選手作品': 'bg-amber-50 text-amber-700 border-amber-200',
  '大學課程作品': 'bg-sky-50 text-sky-700 border-sky-200',
  '大學專題作品': 'bg-violet-50 text-violet-700 border-violet-200',
  '大學校外作品': 'bg-teal-50 text-teal-700 border-teal-200',
}

export function accent(id) {
  return PROJECT_ACCENTS[id] || 'from-gray-300 to-gray-400'
}

export function CategoryBadge({ category, className = '' }) {
  if (!category) return null
  const style = CATEGORY_STYLES[category] || 'bg-gray-50 text-gray-500 border-gray-200'
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full border text-[11px] font-medium tracking-wide ${style} ${className}`}>
      {category}
    </span>
  )
}

export default function ProjectShowcase({ projects }) {
  const featured = projects.filter(p => p.metric)
  const rest      = projects.filter(p => !p.metric)

  return (
    <section id="projects" className="py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionHeader zh="專案" />

        <div className="space-y-5">

          {/* Featured cards */}
          <div className="space-y-5 card-stagger">
            {featured.map(proj => (
              <Link key={proj.id} to={`/projects/${proj.id}`}
                    className="rounded-2xl bg-white
                               shadow-[0_2px_12px_rgba(0,0,0,0.06)]
                               hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.10)]
                               transition-all duration-500 group">
                <div className="p-8 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${accent(proj.id)} shrink-0`} />
                        <p className="text-[11px] text-[#6e6e73] font-mono tracking-wide">{proj.period}</p>
                        <CategoryBadge category={proj.category} />
                      </div>
                      <h3 className="text-xl font-bold tracking-tight text-[#1D1D1F] mb-3
                                     group-hover:text-[#0071E3] transition-colors duration-200">
                        {proj.title}
                      </h3>
                      <p className="text-sm text-[#6e6e73] leading-relaxed mb-5 max-w-lg">{proj.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {proj.tags.map(tag => (
                          <span key={tag}
                                className="px-3 py-1 rounded-full bg-[#f5f5f7] text-[#6e6e73] border border-black/[0.05]
                                           text-xs font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="shrink-0 flex flex-col items-end justify-center text-right
                                    bg-[#f5f5f7] rounded-2xl px-8 py-5">
                      <div className={`text-[5rem] font-extrabold leading-none tracking-[-0.05em]
                                      bg-gradient-to-br ${accent(proj.id)} bg-clip-text text-transparent`}>
                        {proj.metric.replace(/[a-zA-Z\s]/g, '')}
                      </div>
                      <p className="text-[10px] font-mono text-slate-400 tracking-[0.2em] uppercase mt-2">
                        {proj.metric.replace(/[\d.+]/g, '').trim() || 'AUROC'}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Regular cards */}
          <div className="grid md:grid-cols-2 gap-4 card-stagger">
            {rest.map(proj => (
              <Link key={proj.id} to={`/projects/${proj.id}`}
                    className="rounded-2xl bg-white
                               shadow-[0_2px_12px_rgba(0,0,0,0.06)]
                               hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.10)]
                               transition-all duration-500 group flex flex-col">
                <div className="p-7 flex flex-col gap-3 flex-1">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      {proj.frc ? (
                        <span className="text-[10px] font-bold tracking-[0.08em] text-[#0071E3]">FRC</span>
                      ) : (
                        <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${accent(proj.id)} shrink-0`} />
                      )}
                      <p className="text-[11px] text-[#6e6e73] font-mono tracking-wide">{proj.period}</p>
                      <CategoryBadge category={proj.category} />
                    </div>
                    <h3 className="text-base font-bold tracking-tight text-[#1D1D1F] leading-snug
                                   group-hover:text-[#0071E3] transition-colors duration-200">
                      {proj.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[#6e6e73] leading-relaxed flex-1">{proj.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags.map(tag => (
                      <span key={tag}
                            className="px-2.5 py-0.5 rounded-full bg-[#f5f5f7] text-[#6e6e73] border border-black/[0.05]
                                       text-xs font-medium">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-[#0071E3] font-medium mt-1
                                   opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0
                                   transition-all duration-200">
                    查看詳情 →
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
