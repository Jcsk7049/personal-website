import SectionHeader from './SectionHeader'

export default function ProjectShowcase({ projects }) {
  const featured = projects.filter(p => p.metric)
  const rest      = projects.filter(p => !p.metric)

  return (
    <section id="projects" className="py-24 px-6 md:px-20 lg:px-36">
      <SectionHeader
        en="Projects"
        zh="專案"
        sub="以醫療 AI 數據分析為核心，延伸至嵌入式系統與機器人控制。"
      />

      <div className="max-w-5xl space-y-4">

        {/* Featured card — large AUROC display */}
        {featured.map(proj => (
          <div key={proj.id}
               className="p-8 rounded-2xl bg-[#F5F5F7]
                          hover:-translate-y-1 hover:shadow-md transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex-1">
                <p className="text-xs text-[#86868B] font-mono mb-3">{proj.period}</p>
                <h3 className="text-xl font-semibold text-[#1D1D1F] mb-3">{proj.title}</h3>
                <p className="text-sm text-[#86868B] leading-relaxed mb-5 max-w-lg">{proj.description}</p>
                <div className="flex flex-wrap gap-2">
                  {proj.tags.map(tag => (
                    <span key={tag}
                          className="px-3 py-1 rounded-full bg-white border border-gray-200
                                     text-[#1D1D1F] text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                {proj.link && (
                  <a href={proj.link} target="_blank" rel="noopener noreferrer"
                     className="inline-block mt-4 text-sm text-[#0071E3] font-medium hover:underline">
                    查看專案 →
                  </a>
                )}
              </div>

              {/* Big metric */}
              <div className="shrink-0 flex flex-col items-end justify-center text-right">
                <div className="text-[5rem] font-bold leading-none tracking-[-0.04em] text-[#0071E3]">
                  {proj.metric.replace(/[a-zA-Z\s]/g, '')}
                </div>
                <p className="text-xs font-mono text-[#86868B] tracking-widest uppercase mt-1">
                  {proj.metric.replace(/[\d.+]/g, '').trim() || 'AUROC'}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Regular cards — 2-column grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {rest.map(proj => (
            <div key={proj.id}
                 className="p-7 rounded-2xl bg-[#F5F5F7]
                            hover:-translate-y-1 hover:shadow-md transition-all duration-300
                            flex flex-col gap-3">
              <div>
                <h3 className="text-base font-semibold text-[#1D1D1F] leading-snug mb-1">{proj.title}</h3>
                <p className="text-xs text-[#86868B] font-mono">{proj.period}</p>
              </div>
              <p className="text-sm text-[#86868B] leading-relaxed flex-1">{proj.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {proj.tags.map(tag => (
                  <span key={tag}
                        className="px-2.5 py-0.5 rounded-full bg-white text-[#1D1D1F]
                                   text-xs font-medium border border-gray-100">
                    {tag.trim()}
                  </span>
                ))}
              </div>
              {proj.link && (
                <a href={proj.link} target="_blank" rel="noopener noreferrer"
                   className="text-sm text-[#0071E3] font-medium hover:underline self-start">
                  查看專案 →
                </a>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
