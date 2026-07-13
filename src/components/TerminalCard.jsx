const DOTS = ['bg-[#86868B]', 'bg-[#6E6E73]', 'bg-[#3F3F46]']

export default function TerminalCard({ lines }) {
  if (!lines?.length) return null
  return (
    <div className="rounded-[18px] bg-[#1D1D1F] overflow-hidden">
      <div className="flex items-center gap-1.5 px-5 py-3 border-b border-white/10">
        {DOTS.map((c, i) => <span key={i} className={`w-2.5 h-2.5 rounded-full ${c}`} />)}
      </div>
      <div className="px-5 py-4 font-mono text-[13px] leading-[1.9] overflow-x-auto">
        {lines.map(({ marker, file, label }, i) => (
          <div key={i} className="whitespace-nowrap">
            <span className="text-[#86868B]">{marker}</span>{' '}
            <span className="text-[#F5F5F7]">{file}</span>{' '}
            <span className="text-[#6E6E73]">→</span>{' '}
            <span className="text-[#86868B]">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
