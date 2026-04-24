import SectionHeader from './SectionHeader'

export default function ProjectShowcase({ projects }) {
  return (
    <section id="projects" className="py-24 px-6 md:px-20 lg:px-36 border-t border-gray-100">
      <SectionHeader en="Projects" zh="專案" />

      <div className="grid md:grid-cols-2 gap-4 max-w-5xl">
        {projects.map((proj) => (
          <div key={proj.id}
               className="p-7 rounded-2xl border border-gray-100 hover:border-gray-200
                          transition-colors flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-semibold text-[#1D1D1F] leading-snug">{proj.title}</h3>
              {proj.metric && (
                <span className="shrink-0 px-2.5 py-1 rounded-full bg-[#E8F2FF] text-[#0071E3]
                                 text-xs font-semibold font-mono">
                  {proj.metric}
                </span>
              )}
            </div>

            <p className="text-xs text-[#86868B] font-mono">{proj.period}</p>
            <p className="text-sm text-[#86868B] leading-relaxed flex-1">{proj.description}</p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {proj.tags.map(tag => (
                <span key={tag}
                      className="px-2.5 py-0.5 rounded-full bg-[#F5F5F7] text-[#1D1D1F]
                                 text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
