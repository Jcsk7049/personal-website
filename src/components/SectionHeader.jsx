export default function SectionHeader({ en, zh, sub }) {
  return (
    <div className="mb-14">
      <div className="flex items-center gap-2.5 mb-5">
        <span className="block w-5 h-px bg-[#0071E3] rounded-full" />
        <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-slate-400">{en}</p>
      </div>
      <h2 className="text-[2rem] md:text-[2.75rem] font-extrabold tracking-tight text-[#1D1D1F] mb-4 leading-[1.1]">
        {zh}
      </h2>
      {sub && (
        <p className="text-base md:text-lg text-slate-500 font-light leading-relaxed max-w-lg">{sub}</p>
      )}
    </div>
  )
}
