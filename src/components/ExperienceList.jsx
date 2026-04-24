export default function ExperienceList({ awards, education }) {
  return (
    <section id="experience" className="py-24 px-6 md:px-20 lg:px-36 border-t border-gray-100">

      <div className="grid md:grid-cols-2 gap-16">

        {/* ── Education ── */}
        <div>
          <p className="text-xs tracking-[0.22em] uppercase text-[#86868B] mb-3">Education</p>
          <h2 className="text-3xl font-bold tracking-tight mb-10">學歷</h2>

          <div className="flex flex-col gap-6">
            {education.map((edu, i) => (
              <div
                key={i}
                className="flex items-start gap-5 p-5 rounded-2xl border border-gray-100
                           hover:border-gray-200 transition-colors"
              >
                <div className="mt-0.5 w-9 h-9 rounded-full bg-[#F5F5F7] flex items-center justify-center shrink-0">
                  <span className="text-base">🎓</span>
                </div>
                <div>
                  <p className="text-xs text-[#86868B] mb-0.5">{edu.period}</p>
                  <h3 className="font-semibold text-[#1D1D1F]">{edu.school}</h3>
                  <p className="text-sm text-[#86868B]">{edu.degree}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Awards ── */}
        <div>
          <p className="text-xs tracking-[0.22em] uppercase text-[#86868B] mb-3">Awards</p>
          <h2 className="text-3xl font-bold tracking-tight mb-10">獲獎紀錄</h2>

          <div className="flex flex-col gap-0">
            {awards.map((award, i) => (
              <div
                key={i}
                className={`flex items-start gap-5 py-5 ${
                  i !== awards.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <span className="mt-0.5 text-[#0071E3] text-lg shrink-0">✦</span>
                <div>
                  <h3 className="font-medium text-[#1D1D1F] leading-snug">{award.title}</h3>
                  <p className="text-xs text-[#86868B] mt-1">{award.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
