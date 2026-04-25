export default function SectionHeader({ en, zh, sub }) {
  return (
    <div className="mb-12">
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#86868B] mb-3">{en}</p>
      <h2 className="text-5xl font-bold tracking-[-0.03em] text-[#1D1D1F] mb-4">{zh}</h2>
      {sub && (
        <p className="text-lg text-[#86868B] font-light leading-relaxed max-w-xl">{sub}</p>
      )}
    </div>
  )
}
