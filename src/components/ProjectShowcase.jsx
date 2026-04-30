import { Link } from 'react-router-dom'
import SectionHeader from './SectionHeader'

const PROJECT_ACCENTS = {
  'vap':                'from-sky-400 to-blue-600',
  'aws-hackathon':      'from-amber-400 to-orange-500',
  'qmk-stm32-keyboard': 'from-violet-400 to-purple-600',
  'whack-a-mole':       'from-teal-400 to-cyan-500',
  'swerve':             'from-rose-400 to-red-500',
}

// Tag color by keyword — monochromatic-first, accent only for major stacks
const TAG_COLORS = {
  // AI / ML — subtle violet
  'PyTorch':    'bg-violet-50 text-violet-600 border border-violet-100',
  'MIMIC-IV':   'bg-violet-50 text-violet-600 border border-violet-100',
  'Medical AI': 'bg-violet-50 text-violet-600 border border-violet-100',
  'XGBoost':    'bg-purple-50 text-purple-600 border border-purple-100',
  'LightGBM':   'bg-purple-50 text-purple-600 border border-purple-100',
  // AWS cloud — amber
  'AWS SageMaker': 'bg-amber-50 text-amber-600 border border-amber-100',
  'AWS Glue':      'bg-amber-50 text-amber-600 border border-amber-100',
  'Streamlit':     'bg-amber-50 text-amber-600 border border-amber-100',
  // Embedded / Hardware — teal
  'QMK':        'bg-teal-50 text-teal-600 border border-teal-100',
  'PCB Design': 'bg-teal-50 text-teal-600 border border-teal-100',
  'STM32':      'bg-teal-50 text-teal-600 border border-teal-100',
  'ESP32':      'bg-teal-50 text-teal-600 border border-teal-100',
  'ESP-NOW':    'bg-teal-50 text-teal-600 border border-teal-100',
  'Arduino':    'bg-teal-50 text-teal-600 border border-teal-100',
  // Robotics / Control — rose
  'LabVIEW':     'bg-rose-50 text-rose-600 border border-rose-100',
  'PID Control': 'bg-rose-50 text-rose-600 border border-rose-100',
  'Robotics':    'bg-rose-50 text-rose-600 border border-rose-100',
}

function tagStyle(tag) {
  return TAG_COLORS[tag.trim()] || 'bg-[#F5F5F7] text-[#424245] border border-[#E5E5EA]'
}

export function accent(id) {
  return PROJECT_ACCENTS[id] || 'from-gray-300 to-gray-400'
}

const CARD_BASE = `block rounded-2xl overflow-hidden bg-white border border-[#E5E5EA]
                   shadow-card hover:shadow-card-hover hover:-translate-y-[4px]
                   transition-all duration-500 ease-apple group`

export default function ProjectShowcase({ projects }) {
  const featured = projects.filter(p => p.metric)
  const rest      = projects.filter(p => !p.metric)

  return (
    <section id="projects" className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <SectionHeader
          en="Projects"
          zh="專案"
          sub="以醫療 AI 數據分析為核心，延伸至嵌入式系統與機器人控制。"
        />

        <div className="space-y-4">

          {/* Featured cards */}
          <div className="space-y-4 card-stagger">
            {featured.map(proj => (
              <Link key={proj.id} to={`/projects/${proj.id}`} className={CARD_BASE}>
                <div className={`h-[2px] w-full bg-gradient-to-r ${accent(proj.id)}`} />
                <div className="p-8 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2.5 mb-4">
                        <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${accent(proj.id)} shrink-0`} />
                        <p className="text-[11px] text-[#86868B] font-mono tracking-wide">{proj.period}</p>
                      </div>
                      <h3 className="text-xl font-bold tracking-tight text-[#1D1D1F] mb-3
                                     group-hover:text-[#0071E3] transition-colors duration-300 ease-apple">
                        {proj.title}
                      </h3>
                      <p className="text-sm text-[#6E6E73] leading-loose mb-6 max-w-lg">{proj.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {proj.tags.map(tag => (
                          <span key={tag} className={`px-3 py-1 rounded-full text-[11px] font-medium ${tagStyle(tag)}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="shrink-0 flex flex-col items-end justify-center text-right">
                      <div className={`text-[4.25rem] font-extrabold leading-none tracking-[-0.04em]
                                      bg-gradient-to-br ${accent(proj.id)} bg-clip-text text-transparent`}>
                        {proj.metric.replace(/[a-zA-Z\s]/g, '')}
                      </div>
                      <p className="text-[10px] font-mono text-[#86868B] tracking-widest uppercase mt-1">
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
                    className={`${CARD_BASE} flex flex-col`}>
                <div className={`h-[2px] w-full bg-gradient-to-r ${accent(proj.id)}`} />
                <div className="p-7 flex flex-col gap-3.5 flex-1">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${accent(proj.id)} shrink-0`} />
                      <p className="text-[11px] text-[#86868B] font-mono tracking-wide">{proj.period}</p>
                    </div>
                    <h3 className="text-[15px] font-bold tracking-tight text-[#1D1D1F] leading-snug
                                   group-hover:text-[#0071E3] transition-colors duration-300 ease-apple">
                      {proj.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[#6E6E73] leading-loose flex-1">{proj.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags.map(tag => (
                      <span key={tag} className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium ${tagStyle(tag)}`}>
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                  <span className="text-[12px] text-[#0071E3] font-medium
                                   opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0
                                   transition-all duration-400 ease-apple">
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
