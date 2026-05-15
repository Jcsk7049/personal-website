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
                       hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)] transition-all duration-300
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3]"
          >
            <img
              src={img.src}
              alt={img.caption}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[#1D1D1F]/0 group-hover:bg-[#1D1D1F]/30
                            transition-all duration-300 flex items-end">
              <p className="w-full px-3 py-2 text-[11px] text-white font-medium
                             translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                             transition-all duration-300 bg-gradient-to-t from-black/60 to-transparent">
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
          <div
            className="relative max-w-4xl w-full"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={images[active].src}
              alt={images[active].caption}
              className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />
            <p className="text-center text-white/70 text-sm mt-4">{images[active].caption}</p>

            {/* Prev / Next */}
            {active > 0 && (
              <button
                onClick={() => setActive(a => a - 1)}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12
                           w-10 h-10 rounded-full bg-white/10 hover:bg-white/20
                           flex items-center justify-center text-white transition-colors"
              >
                ←
              </button>
            )}
            {active < images.length - 1 && (
              <button
                onClick={() => setActive(a => a + 1)}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12
                           w-10 h-10 rounded-full bg-white/10 hover:bg-white/20
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
