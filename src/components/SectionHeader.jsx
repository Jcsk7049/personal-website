export default function SectionHeader({ en, zh, sub }) {
  return (
    <div className="mb-16">
      <p className="text-[13px] font-semibold text-[#0071E3] mb-4">{en}</p>
      <h2 className="text-[2.5rem] md:text-[3.5rem] font-bold tracking-[-0.003em] text-[#1D1D1F] mb-4 leading-[1.05]">
        {zh}
      </h2>
      {sub && (
        <p className="text-[17px] text-[#6e6e73] font-light leading-relaxed max-w-xl">{sub}</p>
      )}
    </div>
  )
}
