// 編輯式標題：大標題 + 下方灰色副標（原本是 Apple 商店式「粗體。灰補述。」內聯，改為堆疊）
export default function SectionHeader({ label, sub, zh, invert = false, compact = false }) {
  const text = label ?? zh
  return (
    <div className={compact ? 'mb-4 md:mb-5' : 'mb-12 md:mb-16'}>
      <h2 className={`sh-t ${compact ? 'text-[clamp(1.8rem,3vw,2.5rem)]' : 'text-[clamp(2.25rem,4.5vw,3.25rem)]'} font-semibold tracking-[-0.02em] leading-[1.08] text-balance ${
        invert ? 'text-white' : 'text-[#1D1D1F]'
      }`}>
        {text}
      </h2>
      {sub && (
        <p className={`sh-s ${compact ? 'mt-1.5 text-sm md:text-base' : 'mt-3 text-[clamp(1.05rem,1.8vw,1.375rem)]'} font-medium leading-snug ${
          invert ? 'text-white/55' : 'text-[#6E6E73]'
        }`}>
          {sub}
        </p>
      )}
    </div>
  )
}
