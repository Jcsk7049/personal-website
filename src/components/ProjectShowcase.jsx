import { Link } from 'react-router-dom'
import SectionHeader from './SectionHeader'

const PROJECT_ACCENTS = {
  'vap':               'from-sky-400 to-blue-600',
  'aws-hackathon':     'from-amber-400 to-orange-500',
  'qmk-stm32-keyboard':'from-violet-400 to-purple-600',
  'whack-a-mole':      'from-teal-400 to-cyan-500',
  'swerve':            'from-rose-400 to-red-500',
}

export function accent(id) {
  return PROJECT_ACCENTS[id] || 'from-gray-300 to-gray-400'
}

export default function ProjectShowcase({ projects }) {
  const featured = projects.filter(p => p.metric)
  const rest      = projects.filter(p => !p.metric)

  return (
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <SectionHeader
          en="Projects"
          zh="專案"
          sub="以醫療 AI 數據分析為核心，延伸至嵌入式系統與機器人控制。"
        />

        <div className="max-w-5xl space-y-5">

          {/* Featured cards — each is a direct child of its own stagger */}
          <div className="space-y-5 card-stagger">
            {featured.map(proj => (
              <Link key={proj.id} to={`/projects/${proj.id}`}
                    className="block rounded-2xl overflow-hidden bg-[#F5F5F7] border border-transparent
                               hover:border-gray-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/60
                               transition-all duration-300 group">
                <div className={`h-1 w-full bg-gradient-to-r ${accent(proj.id)}`} />
                <div className="p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <p className="text-xs text-[#86868B] font-mono">{proj.period}</p>
                        <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${accent(proj.id)}`} />
                      </div>
                      <h3 className="text-xl font-semibold text-[#1D1D1F] mb-3
                                     group-hover:text-[#0071E3] transition-colors duration-200">
                        {proj.title}
                      </h3>
                      <p className="text-sm text-[#86868B] leading-relaxed mb-5 max-w-lg">{proj.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {proj.tags.map(tag => (
                          <span key={tag}
                                className="px-3 py-1 rounded-full bg-white border border-gray-200
                                           text-[#1D1D1F] text-xs font-medium
                                           group-hover:border-gray-300 transition-colors duration-200">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="shrink-0 flex flex-col items-end justify-center text-right">
                      <div className={`text-[5rem] font-bold leading-none tracking-[-0.04em]
                                      bg-gradient-to-br ${accent(proj.id)} bg-clip-text text-transparent`}>
                        {proj.metric.replace(/[a-zA-Z\s]/g, '')}
                      </div>
                      <p className="text-xs font-mono text-[#86868B] tracking-widest uppercase mt-1">
                        {proj.metric.replace(/[\d.+]/g, '').trim() || 'AUROC'}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Regular cards — flat grid, each card is a direct stagger child */}
          <div className="grid md:grid-cols-2 gap-4 card-stagger">
            {rest.map(proj => (
              <Link key={proj.id} to={`/projects/${proj.id}`}
                    className="block rounded-2xl overflow-hidden bg-[#F5F5F7] border border-transparent
                               hover:border-gray-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/60
                               transition-all duration-300 group flex flex-col">
                <div className={`h-1 w-full bg-gradient-to-r ${accent(proj.id)}`} />
                <div className="p-7 flex flex-col gap-3 flex-1">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${accent(proj.id)}`} />
                      <p className="text-xs text-[#86868B] font-mono">{proj.period}</p>
                    </div>
                    <h3 className="text-base font-semibold text-[#1D1D1F] leading-snug
                                   group-hover:text-[#0071E3] transition-colors duration-200">
                      {proj.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[#86868B] leading-relaxed flex-1">{proj.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags.map(tag => (
                      <span key={tag}
                            className="px-2.5 py-0.5 rounded-full bg-white text-[#1D1D1F]
                                       text-xs font-medium border border-gray-100
                                       group-hover:border-gray-200 transition-colors duration-200">
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
