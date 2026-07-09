import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 page-enter bg-white">
      <p className="text-[clamp(6rem,20vw,10rem)] font-bold tracking-tighter text-[#F5F5F7] leading-none select-none">
        404
      </p>
      <div className="text-center space-y-2 -mt-4">
        <p className="text-xl font-semibold text-[#1D1D1F]">找不到此頁面</p>
        <p className="text-sm text-[#86868B]">這個頁面不存在或已被移除。</p>
      </div>
      <Link to="/"
            className="px-6 py-2.5 rounded-full bg-[#0071E3] text-white text-sm font-medium
                       hover:bg-[#0077ED] hover:scale-[1.03] active:scale-95 transition-all duration-[240ms]">
        返回首頁
      </Link>
    </div>
  )
}
