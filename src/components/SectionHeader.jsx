// Apple 商店式標題：「粗體開頭。灰色補述。」
export default function SectionHeader({ label, sub, zh, invert = false }) {
  const text = label ?? zh
  const isCJK = /[一-鿿]/.test(text)
  return (
    <div className="mb-12 md:mb-16">
      <h2 className={`text-[clamp(2.25rem,4.5vw,3.25rem)] font-semibold tracking-[-0.02em] leading-[1.08] text-balance ${
        invert ? 'text-white' : 'text-[#1D1D1F]'
      }`}>
        {text}
        {sub && (
          <>
            {isCJK ? '。' : '. '}
            <span className={invert ? 'text-white/60' : 'text-[#6E6E73]'}>{sub}</span>
          </>
        )}
      </h2>
    </div>
  )
}
