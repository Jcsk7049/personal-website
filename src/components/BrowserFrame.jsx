const DOTS = ['bg-[#86868B]', 'bg-[#6E6E73]', 'bg-[#3F3F46]']

export default function BrowserFrame({ url, imageSrc, alt }) {
  if (!url || !imageSrc) return null
  let hostname = url
  try { hostname = new URL(url).hostname } catch {}

  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
       className="block rounded-[18px] overflow-hidden bg-white shadow-[rgba(0,0,0,0.08)_2px_4px_12px_0px]
                  hover:-translate-y-1 transition-transform duration-[240ms] group">
      <div className="flex items-center gap-3 px-4 py-2.5 bg-[#EBEBED] border-b border-black/[0.06]">
        <div className="flex items-center gap-1.5 shrink-0">
          {DOTS.map((c, i) => <span key={i} className={`w-2.5 h-2.5 rounded-full ${c}`} />)}
        </div>
        <span className="flex-1 min-w-0 truncate text-center text-xs font-mono text-[#3F3F46] bg-white
                         rounded-full px-3 py-1">
          {hostname}
        </span>
      </div>
      <img src={imageSrc} alt={alt}
           className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-300 ease-out" />
    </a>
  )
}
