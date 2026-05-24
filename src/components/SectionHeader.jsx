export default function SectionHeader({ zh, invert = false }) {
  return (
    <div className="mb-10 md:mb-16">
      <h2 className={`text-[2.5rem] md:text-[3.5rem] font-bold tracking-[-0.003em] leading-[1.05] ${
        invert ? 'text-white' : 'text-[#1D1D1F]'
      }`}>
        {zh}
      </h2>
    </div>
  )
}
