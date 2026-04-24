export default function ProjectTimeline({ projects }) {
  return (
    <section id="projects" className="py-24 px-6 md:px-20 lg:px-36 border-t border-gray-100">

      <p className="text-xs tracking-[0.22em] uppercase text-[#86868B] mb-3">Projects</p>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-16">專案時間軸</h2>

      <div className="relative">
        {/* Timeline vertical line */}
        <div className="absolute left-0 md:left-[11px] top-0 bottom-0 w-px bg-gray-100" />

        <div className="flex flex-col gap-12">
          {projects.map((project, i) => (
            <div key={project.id} className="relative pl-8 md:pl-10">

              {/* Timeline dot */}
              <div
                className={`absolute left-0 top-1 w-[23px] h-[23px] rounded-full border-2 flex items-center justify-center ${
                  project.highlight
                    ? 'border-[#0071E3] bg-white'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    project.highlight ? 'bg-[#0071E3]' : 'bg-gray-300'
                  }`}
                />
              </div>

              {/* Card */}
              <div className="rounded-2xl border border-gray-100 p-7 hover:border-gray-200 transition-colors">

                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-[#1D1D1F] leading-snug">
                      {project.title}
                    </h3>
                    {project.lab && (
                      <p className="text-sm text-[#86868B] mt-1">{project.lab}</p>
                    )}
                  </div>

                  {/* AUROC highlight badge — only if project.highlight exists */}
                  {project.highlight && (
                    <span className="shrink-0 px-3 py-1 rounded-full bg-[#0071E3] text-white text-xs font-semibold tracking-wide">
                      {project.highlight}
                    </span>
                  )}
                </div>

                <p className="text-[#86868B] text-sm leading-relaxed mb-5">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-[#F5F5F7] text-[#1D1D1F] text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
