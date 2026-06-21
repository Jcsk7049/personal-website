import { useState } from 'react'

export default function ProjectGallery({ images }) {
  const [active, setActive] = useState(null)

  if (!images?.length) return null

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-[#f5f5f7]
                       [@media(hover:hover)]:hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)] transition-all duration-[125ms]
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3]"
          >
            <img
              src={img.src}
              alt={img.caption}
              className="w-full h-full object-contain [@media(hover:hover)]:group-hover:scale-[1.04] transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[#1D1D1F]/0 [@media(hover:hover)]:group-hover:bg-[#1D1D1F]/30
                            transition-all duration-[125ms] flex items-end pointer-events-none">
              <p className="w-full px-3 py-2 text-[11px] text-white font-medium
                             translate-y-2 opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100
                             transition-all duration-[125ms] bg-gradient-to-t from-black/60 to-transparent">
                {img.caption}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <div className="relative max-w-4xl w-full">
            <img
              src={images[active].src}
              alt={images[active].caption}
              onClick={e => e.stopPropagation()}
              className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl mx-auto"
            />
            <p className="text-center text-white/70 text-sm mt-4">{images[active].caption}</p>

            {/* Prev / Next — 手機版置於圖片內側，桌面版移出容器外 */}
            {active > 0 && (
              <button
                onClick={e => { e.stopPropagation(); setActive(a => a - 1) }}
                className="absolute left-2 md:left-0 md:-translate-x-12 top-1/2 -translate-y-1/2
                           w-10 h-10 rounded-full bg-black/40 md:bg-white/10
                           hover:bg-black/60 md:hover:bg-white/20
                           flex items-center justify-center text-white transition-colors"
              >
                ←
              </button>
            )}
            {active < images.length - 1 && (
              <button
                onClick={e => { e.stopPropagation(); setActive(a => a + 1) }}
                className="absolute right-2 md:right-0 md:translate-x-12 top-1/2 -translate-y-1/2
                           w-10 h-10 rounded-full bg-black/40 md:bg-white/10
                           hover:bg-black/60 md:hover:bg-white/20
                           flex items-center justify-center text-white transition-colors"
              >
                →
              </button>
            )}

            {/* Close */}
            <button
              onClick={() => setActive(null)}
              className="absolute -top-10 right-0 text-white/60 hover:text-white
                         text-sm transition-colors"
            >
              關閉 ✕
            </button>
          </div>
        </div>
      )}
    </>
  )
}
