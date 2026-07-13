// 程序化大理石紋理背景：feTurbulence(type=turbulence) 生成脈狀噪點，
// colorMatrix 只取單一通道當 alpha（多通道相加會糊成一片），把亮脊萃取成細脈。
// 全內嵌、無外部請求。深色區白脈、淺色區淡灰脈，一律壓得很淡不搶內容。
// 覆蓋率經像素量測校準：dark ~20%、light ~11%（避免早期整片糊白的 bug）。

const VARIANTS = {
  dark:  { seed: 12, freq: '0.013 0.021', vein: '1 1 1',       aMul: 2.0, aOff: -0.95, opacity: 0.55, blend: 'soft-light' },
  light: { seed: 7,  freq: '0.011 0.018', vein: '0.1 0.1 0.12', aMul: 2.2, aOff: -1.15, opacity: 0.4,  blend: 'multiply' },
}

export default function MarbleBackground({ variant = 'dark' }) {
  const v = VARIANTS[variant]
  const id = `marble-${variant}`
  const [vr, vg, vb] = v.vein.split(' ')
  return (
    <div aria-hidden="true"
         className="pointer-events-none absolute inset-0 overflow-hidden"
         style={{ opacity: v.opacity, mixBlendMode: v.blend }}>
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <filter id={id}>
          <feTurbulence type="turbulence" baseFrequency={v.freq} numOctaves="5" seed={v.seed} stitchTiles="stitch" />
          <feColorMatrix type="matrix" values={
            `0 0 0 0 ${vr}
             0 0 0 0 ${vg}
             0 0 0 0 ${vb}
             ${v.aMul} 0 0 0 ${v.aOff}`} />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${id})`} />
      </svg>
    </div>
  )
}
