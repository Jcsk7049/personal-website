export default function SectionHeader({ en, zh, sub }) {
  return (
    <div className="mb-16">
      <div className="flex items-center gap-2 mb-6">
        <span className="block w-4 h-px bg-[#0071E3] rounded-full opacity-70" />
        <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-[#86868B]">
          {en}
        </p>
      </div>
      <h2 className="text-[2.25rem] md:text-[3rem] font-extrabold tracking-[-0.03em] text-[#1D1D1F] mb-5 leading-[1.05]">
        {zh}
      </h2>
      {sub && (
        <p className="text-[0.9375rem] md:text-base text-[#6E6E73] font-light leading-loose max-w-md">
          {sub}
        </p>
      )}
    </div>
  )
}
