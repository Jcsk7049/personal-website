import SectionHeader from './SectionHeader'

export default function ProjectShowcase({ projects }) {
  const featured = projects.filter(p => p.metric)
  const rest      = projects.filter(p => !p.metric)

  return (
    <section id="projects" className="py-24 px-6 md:px-20 lg:px-36 border-t border-gray-100">
      <SectionHeader en="Projects" zh="專案" />

      <div className="max-w-5xl space-y-4">

        {/* Featured cards (with metric badge) — full width */}
        {featured.map(proj => (
          <div key={proj.id}
               className="p-8 rounded-2xl border border-[#0071E3]/20 bg-[#F0F7FF]
                          hover:border-[#0071E3]/40 transition-colors">
            <div className="flex items-start justify-between gap-4 mb-3">
              <h3 className="text-lg font-semibold text-[#1D1D1F]">{proj.title}</h3>
              <span className="shrink-0 px-3 py-1 rounded-full bg-[#0071E3] text-white
                               text-xs font-semibold font-mono">
                {proj.metric}
              </span>
            </div>
            <p className="text-xs text-[#86868B] font-mono mb-3">{proj.period}</p>
            <p className="text-sm text-[#1D1D1F] leading-relaxed mb-4 max-w-2xl">{proj.description}</p>
            <div className="flex flex-wrap gap-2">
              {proj.tags.map(tag => (
                <span key={tag}
                      className="px-3 py-1 rounded-full bg-white border border-[#0071E3]/20
                                 text-[#0071E3] text-xs font-medium">
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
        ))}

        {/* Regular cards — 2-column grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {rest.map(proj => (
            <div key={proj.id}
                 className="p-7 rounded-2xl border border-gray-100 hover:border-gray-200
                            transition-colors flex flex-col gap-3">
              <div>
                <h3 className="text-base font-semibold text-[#1D1D1F] leading-snug mb-1">{proj.title}</h3>
                <p className="text-xs text-[#86868B] font-mono">{proj.period}</p>
              </div>
              <p className="text-sm text-[#86868B] leading-relaxed flex-1">{proj.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {proj.tags.map(tag => (
                  <span key={tag}
                        className="px-2.5 py-0.5 rounded-full bg-[#F5F5F7] text-[#1D1D1F]
                                   text-xs font-medium">
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
