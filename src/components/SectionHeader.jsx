export default function SectionHeader({ en, zh }) {
  return (
    <div className="mb-12">
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#86868B] mb-2">{en}</p>
      <h2 className="text-4xl font-bold tracking-tight text-[#1D1D1F]">{zh}</h2>
    </div>
  )
}
