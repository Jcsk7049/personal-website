import { useState, useRef, useLayoutEffect } from 'react'
import { api } from '../../api/client'

// ── Shared primitives for all admin tabs ──────────────────────────────────────

export function useToken() {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token'))
  const save = t => { localStorage.setItem('admin_token', t); setToken(t) }
  const clear = () => { localStorage.removeItem('admin_token'); setToken(null) }
  return { token, save, clear }
}

export function Btn({ onClick, children, variant = 'primary', disabled, type = 'button', sm, className = '' }) {
  const base = `${sm ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-sm'} rounded-lg font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed`
  const v = { primary: 'bg-[#0071E3] text-white hover:bg-[#0077ED]', danger: 'bg-red-500 text-white hover:bg-red-600', ghost: 'bg-black/[0.06] text-[#1D1D1F] hover:bg-black/[0.1]' }
  return <button type={type} disabled={disabled} onClick={onClick} className={`${base} ${v[variant]} ${className}`}>{children}</button>
}

export function Toast({ msg, ok }) {
  if (!msg) return null
  return <div className={`fixed bottom-6 right-6 px-4 py-2.5 rounded-xl text-sm font-medium shadow-lg z-50 ${ok ? 'bg-green-500' : 'bg-red-500'} text-white`}>{msg}</div>
}

export function LangTab({ lang, setLang }) {
  return (
    <div className="inline-flex gap-0.5 bg-black/[0.05] rounded-lg p-0.5">
      {[['zh', '中文'], ['en', 'EN']].map(([v, label]) => (
        <button key={v} type="button" onClick={() => setLang(v)}
          className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${lang === v ? 'bg-white shadow text-[#1D1D1F]' : 'text-[#86868B] hover:text-[#1D1D1F]'}`}>
          {label}
        </button>
      ))}
    </div>
  )
}

export function SectionCard({ title, action, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-[0_0_0_1px_rgba(0,0,0,0.08)] overflow-hidden">
      {(title || action) && (
        <div className="flex items-center justify-between px-5 py-3 border-b border-black/[0.06]">
          {title && <p className="text-sm font-semibold text-[#1D1D1F]">{title}</p>}
          {action}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  )
}

// Two-column layout: left = editing form, right = sticky live preview of how the section looks on the site
export function EditorWithPreview({ children, preview, previewBg = '#F5F5F7' }) {
  return (
    <div className="flex gap-5 items-start">
      <div className="w-[480px] shrink-0 space-y-3">{children}</div>
      <div className="flex-1 min-w-0 sticky top-20 self-start" style={{ height: 'calc(100vh - 120px)' }}>
        <div className="h-full rounded-2xl shadow-[0_0_0_1px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col">
          <div className="px-4 py-2 border-b border-black/[0.06] shrink-0 bg-white">
            <span className="text-xs font-medium text-[#86868B]">即時預覽（網站樣式）</span>
          </div>
          <div className="flex-1 overflow-auto p-6" style={{ background: previewBg }}>
            {preview}
          </div>
        </div>
      </div>
    </div>
  )
}

export const inp = 'w-full px-3 py-2 rounded-lg border border-black/10 text-sm focus:outline-none focus:border-[#0071E3] bg-white'
export const ta  = `${inp} resize-y overflow-y-auto leading-relaxed`

export function F({ label, hint, children }) {
  return (
    <div className="space-y-1">
      <div className="flex items-baseline gap-1.5">
        <label className="text-xs font-medium text-[#3F3F46]">{label}</label>
        {hint && <span className="text-xs text-[#86868B]">{hint}</span>}
      </div>
      {children}
    </div>
  )
}

export function LoginPage({ onLogin }) {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const submit = async e => {
    e.preventDefault(); setLoading(true); setErr('')
    try { onLogin((await api.login(pw)).token) }
    catch { setErr('密碼錯誤') }
    finally { setLoading(false) }
  }
  return (
    <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center">
      <form onSubmit={submit} className="bg-white rounded-2xl shadow-[0_0_0_1px_rgba(0,0,0,0.08)] p-8 w-80 space-y-4">
        <h1 className="text-lg font-semibold">個人網站編輯頁</h1>
        <input type="password" placeholder="密碼" value={pw} onChange={e => setPw(e.target.value)} className={inp} autoFocus />
        {err && <p className="text-sm text-red-500">{err}</p>}
        <Btn type="submit" disabled={loading || !pw}>{loading ? '登入中…' : '登入'}</Btn>
      </form>
    </div>
  )
}

// FLIP：順序改變時讓卡片從舊位置滑到新位置
export function useFlip(orderKey) {
  const refs = useRef(new Map())
  const prev = useRef(new Map())
  useLayoutEffect(() => {
    const next = new Map()
    refs.current.forEach((el, key) => { if (el) next.set(key, el.getBoundingClientRect().top) })
    next.forEach((top, key) => {
      const old = prev.current.get(key)
      const el  = refs.current.get(key)
      if (el && old != null && old !== top) {
        el.style.transition = 'none'
        el.style.transform  = `translateY(${old - top}px)`
        requestAnimationFrame(() => {
          el.style.transition = 'transform 220ms cubic-bezier(0.4,0,0.2,1)'
          el.style.transform  = ''
        })
      }
    })
    prev.current = next
  }, [orderKey])
  return key => el => { el ? refs.current.set(key, el) : refs.current.delete(key) }
}

export function DragHandleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
      <circle cx="4.5" cy="2.5" r="1.3" /><circle cx="9.5" cy="2.5" r="1.3" />
      <circle cx="4.5" cy="7"   r="1.3" /><circle cx="9.5" cy="7"   r="1.3" />
      <circle cx="4.5" cy="11.5" r="1.3" /><circle cx="9.5" cy="11.5" r="1.3" />
    </svg>
  )
}

export function ImageUploadBtn({ onUploaded }) {
  const [uploading, setUploading] = useState(false)
  const [drag, setDrag] = useState(false)

  const upload = async (file) => {
    if (!file || !file.type.startsWith('image/')) return
    setUploading(true)
    try {
      const form = new FormData()
      form.append('file', file)
      const res = await fetch('/api/images', {
        method: 'POST',
        headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` },
        body: form,
      })
      const data = await res.json()
      if (data.path) onUploaded(data.path)
    } finally {
      setUploading(false)
    }
  }

  return (
    <label
      onDragOver={e => { e.preventDefault(); setDrag(true) }}
      onDragLeave={() => setDrag(false)}
      onDrop={e => { e.preventDefault(); setDrag(false); upload(e.dataTransfer.files[0]) }}
      className={`flex items-center justify-center gap-2 h-16 rounded-xl border-2 border-dashed cursor-pointer transition-colors text-sm
        ${drag ? 'border-[#0071E3] bg-blue-50 text-[#0071E3]' : 'border-black/10 text-[#86868B] hover:border-[#0071E3] hover:text-[#0071E3]'}`}
    >
      {uploading ? '上傳中…' : '點擊或拖曳圖片上傳'}
      <input type="file" accept="image/*" className="hidden" onChange={e => upload(e.target.files[0])} />
    </label>
  )
}
