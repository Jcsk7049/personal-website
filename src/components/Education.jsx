import SectionHeader from './SectionHeader'

export default function Education({ education }) {
  return (
    <section id="education" className="py-24 bg-[#F5F5F7]">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
      <SectionHeader
        en="Education"
        zh="學歷"
        sub="紮根電機工程，從技職體系一路銜接至大學研究。"
      />

      <div className="grid md:grid-cols-2 gap-4 max-w-3xl card-stagger">
        {education.map((edu, i) => (
          <div key={i}
               className="p-7 rounded-2xl bg-white border border-transparent
                          hover:border-gray-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/50
                          transition-all duration-300 group">
            <p className="text-xs text-[#86868B] mb-3 font-mono">{edu.period}</p>
            <h3 className="text-lg font-semibold text-[#1D1D1F] mb-1 group-hover:text-[#0071E3] transition-colors duration-200">{edu.school}</h3>
            <p className="text-sm text-[#86868B]">{edu.degree}</p>
          </div>
        ))}
      </div>
      </div>
    </section>
  )
}
