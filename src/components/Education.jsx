import SectionHeader from './SectionHeader'

export default function Education({ education }) {
  return (
    <section id="education" className="py-24 px-6 md:px-20 lg:px-36 border-t border-gray-100">
      <SectionHeader en="Education" zh="學歷" />

      <div className="grid md:grid-cols-2 gap-4 max-w-3xl">
        {education.map((edu, i) => (
          <div key={i}
               className="p-7 rounded-2xl border border-gray-100 hover:border-gray-200
                          transition-colors group">
            <p className="text-xs text-[#86868B] mb-2 font-mono">{edu.period}</p>
            <h3 className="text-lg font-semibold text-[#1D1D1F] mb-1">{edu.school}</h3>
            <p className="text-sm text-[#86868B]">{edu.degree}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
