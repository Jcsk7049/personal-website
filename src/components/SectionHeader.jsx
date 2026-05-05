export default function SectionHeader({ en, zh, sub }) {
  return (
    <div className="mb-16">
      <div className="flex items-center gap-2.5 mb-5">
        <span className="block w-5 h-px bg-[#0071E3] rounded-full" />
        <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#6e6e73]">{en}</p>
      </div>
      <h2 className="text-[2.5rem] md:text-[3.5rem] font-extrabold tracking-tight text-[#1D1D1F] mb-4 leading-[1.05]">
        {zh}
      </h2>
      {sub && (
        <p className="text-base md:text-lg text-[#6e6e73] font-light leading-relaxed max-w-xl">{sub}</p>
      )}
    </div>
  )
}
