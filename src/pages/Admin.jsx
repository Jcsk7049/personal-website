import { useState, useEffect, useCallback } from 'react'
import { api } from '../api/client'
import { useData } from '../context/DataContext'
import { accent } from '../components/ProjectShowcase'

// ── Primitives ────────────────────────────────────────────────────────────────

function useToken() {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token'))
  const save = t => { localStorage.setItem('admin_token', t); setToken(t) }
  const clear = () => { localStorage.removeItem('admin_token'); setToken(null) }
  return { token, save, clear }
}

function Btn({ onClick, children, variant = 'primary', disabled, type = 'button', sm, className = '' }) {
  const base = `${sm ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-sm'} rounded-lg font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed`
  const v = { primary: 'bg-[#0071E3] text-white hover:bg-[#0077ED]', danger: 'bg-red-500 text-white hover:bg-red-600', ghost: 'bg-black/[0.06] text-[#1D1D1F] hover:bg-black/[0.1]' }
  return <button type={type} disabled={disabled} onClick={onClick} className={`${base} ${v[variant]} ${className}`}>{children}</button>
}

function Toast({ msg, ok }) {
  if (!msg) return null
  return <div className={`fixed bottom-6 right-6 px-4 py-2.5 rounded-xl text-sm font-medium shadow-lg z-50 ${ok ? 'bg-green-500' : 'bg-red-500'} text-white`}>{msg}</div>
}

function LangTab({ lang, setLang }) {
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

function SectionCard({ title, action, children }) {
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
function EditorWithPreview({ children, preview, previewBg = '#F5F5F7' }) {
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

const inp = 'w-full px-3 py-2 rounded-lg border border-black/10 text-sm focus:outline-none focus:border-[#0071E3] bg-white'
const ta  = `${inp} resize-y overflow-y-auto leading-relaxed`

function F({ label, hint, children }) {
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

// ── Login ─────────────────────────────────────────────────────────────────────

function LoginPage({ onLogin }) {
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
        <h1 className="text-lg font-semibold">Admin</h1>
        <input type="password" placeholder="密碼" value={pw} onChange={e => setPw(e.target.value)} className={inp} autoFocus />
        {err && <p className="text-sm text-red-500">{err}</p>}
        <Btn type="submit" disabled={loading || !pw}>{loading ? '登入中…' : '登入'}</Btn>
      </form>
    </div>
  )
}

// ── Projects Tab ──────────────────────────────────────────────────────────────

const CATS_ZH = ['大學課程作品', '大學校外作品', '大學專題作品', '高職選手作品']
const EMPTY_PROJ = () => ({ id: '', category: '', title: '', period: '', description: '', tags: [], detail: { images: [], purpose: '', concept: '', outcome: '', tech: [], github: '' } })

const CATEGORY_STYLES = {
  '高職選手作品': 'bg-amber-50 text-amber-700 border-amber-200',
  '大學課程作品': 'bg-sky-50 text-sky-700 border-sky-200',
  '大學專題作品': 'bg-violet-50 text-violet-700 border-violet-200',
  '大學校外作品': 'bg-teal-50 text-teal-700 border-teal-200',
}

const PROJECT_SECTIONS = [
  { key: 'purpose', label: '用途', en: 'Purpose' },
  { key: 'concept', label: '設計構思', en: 'Design Concept' },
  { key: 'outcome', label: '成果', en: 'Outcome' },
  { key: 'tech',    label: '使用技術', en: 'Tech Stack' },
]

function TechEditor({ value = [], onChange }) {
  const add    = () => onChange([...value, { name: '', items: [], note: '' }])
  const remove = i => onChange(value.filter((_, j) => j !== i))
  const set    = (i, f, v) => onChange(value.map((t, j) => j === i ? { ...t, [f]: v } : t))
  return (
    <div className="space-y-2">
      {value.map((t, i) => (
        <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-start">
          <input className={inp} placeholder="群組名稱" value={t.name} onChange={e => set(i, 'name', e.target.value)} />
          <input className={inp} placeholder="項目（逗號分隔）" value={t.items?.join(', ')} onChange={e => set(i, 'items', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} />
          <button type="button" onClick={() => remove(i)} className="mt-2 text-[#86868B] hover:text-red-500 text-lg leading-none">×</button>
        </div>
      ))}
      <button type="button" onClick={add} className="text-xs text-[#0071E3] hover:underline">+ 新增群組</button>
    </div>
  )
}

function ImageUploadBtn({ onUploaded }) {
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
      {uploading ? '上傳中…' : '📎 點擊或拖曳圖片上傳'}
      <input type="file" accept="image/*" className="hidden" onChange={e => upload(e.target.files[0])} />
    </label>
  )
}

function ImagesEditor({ value = [], onChange }) {
  const add    = () => onChange([...value, { src: '', caption: '' }])
  const remove = i => onChange(value.filter((_, j) => j !== i))
  const set    = (i, f, v) => onChange(value.map((img, j) => j === i ? { ...img, [f]: v } : img))
  return (
    <div className="space-y-3">
      <ImageUploadBtn onUploaded={path => onChange([...value, { src: path, caption: '' }])} />
      {value.map((img, i) => (
        <div key={i} className="bg-black/[0.03] rounded-xl p-3 space-y-2">
          {img.src && (
            <img src={img.src} alt="" className="w-full max-h-48 rounded-lg object-contain bg-black/5" onError={e => e.target.style.display='none'} />
          )}
          <div className="flex gap-2 items-start">
            <div className="flex-1 space-y-2">
              <input className={inp} placeholder="圖片路徑 /api/images/xxx 或 /images/xxx/cover.png" value={img.src || ''} onChange={e => set(i, 'src', e.target.value)} />
              <input className={inp} placeholder="說明文字（選填）" value={img.caption || ''} onChange={e => set(i, 'caption', e.target.value)} />
            </div>
            <button type="button" onClick={() => remove(i)} className="mt-2 text-[#86868B] hover:text-red-500 text-xl leading-none shrink-0">×</button>
          </div>
        </div>
      ))}
      <button type="button" onClick={add} className="text-xs text-[#0071E3] hover:underline">+ 手動輸入路徑</button>
    </div>
  )
}

function ProjectEditor({ zh, en, onZh, onEn, isNew }) {
  const [lang, setLang] = useState('zh')
  const d  = lang === 'zh' ? zh : en
  const on = lang === 'zh' ? onZh : onEn
  const set    = (f, v) => on({ ...d, [f]: v })
  const setDet = (f, v) => on({ ...d, detail: { ...d.detail, [f]: v } })

  const detail = d.detail || {}

  return (
    <EditorWithPreview
      preview={
        <div className="max-w-2xl">
          {/* Hero */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              {d.category && (
                <span className={`inline-block px-2.5 py-0.5 rounded-full border text-[11px] font-medium tracking-wide ${CATEGORY_STYLES[d.category] || 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                  {d.category}
                </span>
              )}
              {d.period && <span className="text-[12px] font-mono text-[#86868B] tracking-wide">{d.period}</span>}
            </div>
            <h1 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-[-0.02em] text-[#1D1D1F] mb-4 leading-[1.07]">
              {d.title || '（標題）'}
            </h1>
            {detail.github && (
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#1D1D1F] text-white text-xs font-medium">
                  GitHub
                </span>
              </div>
            )}
            <div className="flex flex-wrap gap-2 items-center">
              {(d.tags || []).map(tag => (
                <span key={tag} className="px-2.5 py-1 rounded-full bg-white text-[#3F3F46] shadow-[0_0_0_1px_rgba(0,0,0,0.08)] text-xs font-medium">
                  {tag.trim()}
                </span>
              ))}
            </div>
            {d.description && (
              <p className="mt-5 text-sm text-[#3F3F46] leading-relaxed max-w-xl whitespace-pre-line">
                {d.description}
              </p>
            )}
          </div>

          {/* Editorial sections */}
          <div className="divide-y divide-black/[0.06]">
            {PROJECT_SECTIONS.map(({ key, label, en: enLabel }) => (
              <div key={key} className="py-10 first:pt-0">
                <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-[#86868B] mb-2">{enLabel}</p>
                <h2 className="text-xl font-bold tracking-[-0.003em] text-[#1D1D1F] mb-5 leading-tight">{label}</h2>

                {key === 'outcome' && (detail.images || []).length > 0 && (
                  <div className="mb-6 grid grid-cols-2 gap-2">
                    {detail.images.map((img, i) => img.src && (
                      <img key={i} src={img.src} alt={img.caption || ''} className="w-full h-32 object-cover rounded-xl bg-black/5"
                           onError={e => { e.target.style.display = 'none' }} />
                    ))}
                  </div>
                )}

                {key === 'tech' && Array.isArray(detail.tech) && detail.tech.length > 0 ? (
                  <div className="space-y-6">
                    {detail.tech.map((group, gi) => (
                      <div key={gi}>
                        <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-[#86868B] mb-2">{group.group}</p>
                        <div className="grid grid-cols-1 gap-2">
                          {(group.items || []).map((item, ii) => (
                            typeof item === 'string' ? (
                              <div key={ii} className="bg-white rounded-xl px-4 py-2.5 shadow-[0_0_0_1px_rgba(0,0,0,0.08)] text-sm text-[#1D1D1F] font-semibold">
                                {item}
                              </div>
                            ) : (
                              <div key={ii} className="flex gap-3 bg-white rounded-xl px-4 py-2.5 shadow-[0_0_0_1px_rgba(0,0,0,0.08)]">
                                <span className="shrink-0 font-semibold text-sm text-[#1D1D1F] min-w-[6rem]">{item.name}</span>
                                <span className="text-sm text-[#3F3F46] leading-snug">{item.desc}</span>
                              </div>
                            )
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : key !== 'tech' && detail[key] ? (
                  <p className="text-sm text-[#3F3F46] leading-[1.6] max-w-xl whitespace-pre-line">{detail[key]}</p>
                ) : (
                  <div className="h-16 rounded-2xl bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.06)] flex items-center justify-center">
                    <p className="text-xs text-[#86868B]">（內容待填寫）</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      }
    >
      {/* Shared fields */}
      <div className="grid grid-cols-2 gap-3">
        <F label="ID（唯一識別，不可重複）">
          <input className={inp} value={zh.id} onChange={e => { onZh({ ...zh, id: e.target.value }); onEn({ ...en, id: e.target.value }) }} disabled={!isNew} placeholder="pcb-defect-detection" />
        </F>
        <F label="時間">
          <input className={inp} value={zh.period} onChange={e => { onZh({ ...zh, period: e.target.value }); onEn({ ...en, period: e.target.value }) }} placeholder="2025 — 至今" />
        </F>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-[#86868B] uppercase tracking-widest">語言相關欄位</p>
        <LangTab lang={lang} setLang={setLang} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <F label="標題">
          <input className={inp} value={d.title || ''} onChange={e => set('title', e.target.value)} />
        </F>
        <F label="分類">
          {lang === 'zh'
            ? <select className={inp} value={d.category || ''} onChange={e => set('category', e.target.value)}>
                <option value="">選擇</option>
                {CATS_ZH.map(c => <option key={c}>{c}</option>)}
              </select>
            : <input className={inp} value={d.category || ''} onChange={e => set('category', e.target.value)} placeholder="University Project" />
          }
        </F>
      </div>

      <F label="摘要">
        <textarea className={ta} rows={5} value={d.description || ''} onChange={e => set('description', e.target.value)} />
      </F>

      <F label="Tags" hint="逗號分隔">
        <input className={inp} value={(d.tags || []).join(', ')} onChange={e => set('tags', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} />
      </F>

      <div className="border-t border-black/[0.06] pt-4 space-y-4">
        <p className="text-xs font-semibold text-[#86868B] uppercase tracking-widest">詳細說明（Detail）</p>
        <F label="做這個的原因">
          <textarea className={ta} rows={10} value={d.detail?.purpose || ''} onChange={e => setDet('purpose', e.target.value)} />
        </F>
        <F label="怎麼做的">
          <textarea className={ta} rows={14} value={d.detail?.concept || ''} onChange={e => setDet('concept', e.target.value)} />
        </F>
        <F label="結果 / 成效">
          <textarea className={ta} rows={10} value={d.detail?.outcome || ''} onChange={e => setDet('outcome', e.target.value)} />
        </F>
        <F label="GitHub">
          <input className={inp} value={d.detail?.github || ''} onChange={e => setDet('github', e.target.value)} placeholder="https://github.com/..." />
        </F>
        <F label="使用技術">
          <TechEditor value={d.detail?.tech} onChange={v => setDet('tech', v)} />
        </F>
        {lang === 'zh' && (
          <F label="圖片">
            <ImagesEditor value={zh.detail?.images} onChange={v => setDet('images', v)} />
          </F>
        )}
      </div>
    </EditorWithPreview>
  )
}

function ProjectsTab({ toast }) {
  const { cvZh, cvEn, refresh } = useData()
  const [editing, setEditing] = useState(null)
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(null)
  const projects = cvZh.projects || []

  const openNew  = () => { setEditId(null); setEditing({ zh: EMPTY_PROJ(), en: EMPTY_PROJ() }) }
  const openEdit = p => { setEditId(p.id); setEditing({ zh: JSON.parse(JSON.stringify(p)), en: JSON.parse(JSON.stringify(cvEn.projects?.find(x => x.id === p.id) || {})) }) }

  const save = async () => {
    if (!editing.zh.id) return toast('請填寫 ID', false)
    setSaving(true)
    try {
      editId ? await api.updateProject(editId, editing.zh, editing.en) : await api.createProject(editing.zh, editing.en)
      await refresh(); setEditing(null); toast('已儲存', true)
    } catch (e) { toast(e.message, false) }
    finally { setSaving(false) }
  }

  const del = async id => {
    if (!confirm(`確定刪除「${id}」？`)) return
    setDeleting(id)
    try { await api.deleteProject(id); await refresh(); toast('已刪除', true) }
    catch (e) { toast(e.message, false) }
    finally { setDeleting(null) }
  }

  if (editing) return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Btn variant="ghost" onClick={() => setEditing(null)}>← 返回</Btn>
        <h2 className="font-semibold">{editId ? `編輯：${editId}` : '新增專案'}</h2>
        <Btn onClick={save} disabled={saving} className="ml-auto">{saving ? '儲存中…' : '儲存'}</Btn>
      </div>
      <SectionCard>
        <ProjectEditor zh={editing.zh} en={editing.en}
          onZh={v => setEditing(e => ({ ...e, zh: v }))}
          onEn={v => setEditing(e => ({ ...e, en: v }))}
          isNew={!editId} />
      </SectionCard>
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#86868B]">共 {projects.length} 個專案</p>
        <Btn onClick={openNew}>+ 新增專案</Btn>
      </div>
      <div className="space-y-2">
        {projects.map(p => (
          <div key={p.id}
               className="flex items-center gap-4 bg-white rounded-2xl px-4 py-3
                          shadow-[0_0_0_1px_rgba(0,0,0,0.08)]
                          hover:shadow-[0_0_0_1px_rgba(0,0,0,0.14)] hover:bg-[#FAFAFA]
                          transition-all duration-[125ms] group">
            {/* Cover thumbnail */}
            <div className={`shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${accent(p.id)} overflow-hidden`}>
              {p.cover && (
                <img src={p.cover} alt="" className="w-full h-full object-cover"
                     onError={e => { e.target.style.display = 'none' }} />
              )}
            </div>

            {/* Title + meta */}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-[#1D1D1F] truncate">{p.title}</p>
              <div className="flex items-center gap-2 mt-1">
                {p.category && (
                  <span className={`inline-block px-2 py-0.5 rounded-full border text-[10px] font-medium tracking-wide ${CATEGORY_STYLES[p.category] || 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                    {p.category}
                  </span>
                )}
                <span className="text-[11px] text-[#86868B] font-mono">{p.id}</span>
                <span className="text-[11px] text-[#C7C7CC]">·</span>
                <span className="text-[11px] text-[#86868B] font-mono">{p.period}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 shrink-0">
              <Btn sm variant="ghost" onClick={() => openEdit(p)}>編輯</Btn>
              <Btn sm variant="danger" disabled={deleting === p.id} onClick={() => del(p.id)}>{deleting === p.id ? '…' : '刪除'}</Btn>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Profile Tab ───────────────────────────────────────────────────────────────

function ProfileTab({ toast }) {
  const { cvZh, cvEn, refresh } = useData()
  const [zh, setZh]   = useState(() => JSON.parse(JSON.stringify(cvZh.profile || {})))
  const [en, setEn]   = useState(() => JSON.parse(JSON.stringify(cvEn.profile || {})))
  const [lang, setLang] = useState('zh')
  const [saving, setSaving] = useState(false)
  const [avatarOk, setAvatarOk] = useState(true)

  const d  = lang === 'zh' ? zh : en
  const on = lang === 'zh' ? setZh : setEn
  const set    = (f, v) => on(p => ({ ...p, [f]: v }))
  const setCon = (f, v) => on(p => ({ ...p, contact: { ...p.contact, [f]: v } }))
  const setLnk = (f, v) => on(p => ({ ...p, links:   { ...p.links,   [f]: v } }))

  const save = async () => {
    setSaving(true)
    try { await api.setSection('profile', zh, en); await refresh(); toast('已儲存', true) }
    catch (e) { toast(e.message, false) }
    finally { setSaving(false) }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <LangTab lang={lang} setLang={setLang} />
        <Btn onClick={save} disabled={saving}>{saving ? '儲存中…' : '儲存'}</Btn>
      </div>
      <EditorWithPreview
        previewBg="#ffffff"
        preview={
          <div className="max-w-3xl flex flex-col lg:flex-row lg:items-center gap-10">
            <div className="flex-1">
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#86868B] mb-8">
                {d.contact?.location || '地點'}
              </p>
              <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-bold tracking-[-0.015em] leading-none text-[#1D1D1F] mb-4">
                {d.name || '姓名'}
              </h1>
              {d.bio && (
                <p className="text-[15px] text-[#3F3F46] leading-[1.8] max-w-[500px] mb-8 whitespace-pre-wrap">
                  {d.bio}
                </p>
              )}
              <div className="flex flex-wrap gap-3">
                <button className="px-5 py-2.5 rounded-full bg-[#0071E3] text-white text-sm font-medium">
                  {d.contact?.email || 'email@example.com'}
                </button>
                <span className="px-5 py-2.5 rounded-full border border-black/[0.12] text-sm text-[#1D1D1F]">GitHub</span>
                <span className="px-5 py-2.5 rounded-full border border-black/[0.12] text-sm text-[#1D1D1F]">LinkedIn</span>
                <span className="px-5 py-2.5 rounded-full text-sm font-medium border-2 border-[#0071E3] text-[#0071E3]">
                  {lang === 'zh' ? '履歷' : 'Resume'}
                </span>
              </div>
            </div>
            <div className="shrink-0 flex justify-center">
              <div className="w-48 h-48 rounded-[2rem] overflow-hidden bg-[#f5f5f7] shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
                {zh.avatar && avatarOk ? (
                  <img src={zh.avatar} alt={d.name} className="w-full h-full object-cover"
                       onError={() => setAvatarOk(false)} onLoad={() => setAvatarOk(true)} />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#F5F5F7] to-[#E8ECF4]">
                    <span className="text-6xl font-bold tracking-tighter text-[#C7C7CC] select-none">
                      {(d.name || '?')[0]}
                    </span>
                    <span className="text-xs text-[#C7C7CC] tracking-[0.15em] uppercase select-none">Photo</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        }
      >
        <SectionCard title="基本資訊">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <F label="姓名 / Name"><input className={inp} value={d.name || ''} onChange={e => set('name', e.target.value)} /></F>
              <F label="職稱 / Title"><input className={inp} value={d.title || ''} onChange={e => set('title', e.target.value)} placeholder="選填" /></F>
            </div>
            <F label="個人簡介 / Bio">
              <textarea className={ta} rows={8} value={d.bio || ''} onChange={e => set('bio', e.target.value)} />
            </F>
            <F label="頭像（兩語共用）">
              <div className="space-y-2">
                {zh.avatar && (
                  <img src={zh.avatar} alt="" className="w-32 h-32 rounded-2xl object-cover bg-black/5"
                       onError={e => { e.target.style.display = 'none' }}
                       onLoad={e => { e.target.style.display = '' }} />
                )}
                <input className={inp} placeholder="/api/images/xxx 或 /images/xxx.png" value={zh.avatar || ''}
                       onChange={e => { setZh(p => ({ ...p, avatar: e.target.value })); setEn(p => ({ ...p, avatar: e.target.value })) }} />
                <ImageUploadBtn onUploaded={path => { setZh(p => ({ ...p, avatar: path })); setEn(p => ({ ...p, avatar: path })) }} />
              </div>
            </F>
          </div>
        </SectionCard>
        <SectionCard title="聯絡方式">
          <div className="space-y-3">
            <F label="Email（兩語共用）">
              <input className={inp} value={zh.contact?.email || ''} onChange={e => { setZh(p => ({ ...p, contact: { ...p.contact, email: e.target.value } })); setEn(p => ({ ...p, contact: { ...p.contact, email: e.target.value } })) }} />
            </F>
            <F label="電話（兩語共用）">
              <input className={inp} value={zh.contact?.phone || ''} onChange={e => { setZh(p => ({ ...p, contact: { ...p.contact, phone: e.target.value } })); setEn(p => ({ ...p, contact: { ...p.contact, phone: e.target.value } })) }} />
            </F>
            <F label="地點">
              <input className={inp} value={d.contact?.location || ''} onChange={e => setCon('location', e.target.value)} />
            </F>
          </div>
        </SectionCard>
        <SectionCard title="連結（兩語共用）">
          <div className="space-y-3">
            <F label="GitHub username"><input className={inp} value={zh.links?.github || ''} onChange={e => { setZh(p => ({ ...p, links: { ...p.links, github: e.target.value } })); setEn(p => ({ ...p, links: { ...p.links, github: e.target.value } })) }} /></F>
            <F label="LinkedIn（URL encoded path）"><input className={inp} value={zh.links?.linkedin || ''} onChange={e => { setZh(p => ({ ...p, links: { ...p.links, linkedin: e.target.value } })); setEn(p => ({ ...p, links: { ...p.links, linkedin: e.target.value } })) }} /></F>
          </div>
        </SectionCard>
      </EditorWithPreview>
    </div>
  )
}

// ── Experience Tab ────────────────────────────────────────────────────────────

function ExpItem({ zh, en, onZh, onEn, onDelete }) {
  const [open, setOpen] = useState(false)
  const [lang, setLang] = useState('zh')
  const d  = lang === 'zh' ? zh : en
  const on = lang === 'zh' ? onZh : onEn

  return (
    <div className="bg-white rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.08)] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 cursor-pointer select-none" onClick={() => setOpen(o => !o)}>
        <div>
          <p className="text-sm font-medium">{zh.role || '（未命名）'}</p>
          <p className="text-xs text-[#86868B]">{zh.organization} · {zh.period}</p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={e => { e.stopPropagation(); onDelete() }} className="text-xs text-[#86868B] hover:text-red-500">刪除</button>
          <span className="text-[#86868B] text-sm">{open ? '▲' : '▼'}</span>
        </div>
      </div>
      {open && (
        <div className="border-t border-black/[0.06] p-4 space-y-3">
          <div className="flex justify-end"><LangTab lang={lang} setLang={setLang} /></div>
          <div className="grid grid-cols-2 gap-3">
            <F label="職稱 / Role"><input className={inp} value={d.role || ''} onChange={e => on({ ...d, role: e.target.value })} /></F>
            <F label="機構（兩語共用）"><input className={inp} value={zh.organization || ''} onChange={e => { onZh({ ...zh, organization: e.target.value }); onEn({ ...en, organization: e.target.value }) }} /></F>
          </div>
          <F label="時間（兩語共用）"><input className={inp} value={zh.period || ''} onChange={e => { onZh({ ...zh, period: e.target.value }); onEn({ ...en, period: e.target.value }) }} /></F>
          <F label="描述">
            <textarea className={ta} rows={10} value={d.description || ''} onChange={e => on({ ...d, description: e.target.value })} />
          </F>
        </div>
      )}
    </div>
  )
}

function ExperienceTab({ toast }) {
  const { cvZh, cvEn, refresh } = useData()
  const [items, setItems] = useState(() => ({
    zh: JSON.parse(JSON.stringify(cvZh.experience || [])),
    en: JSON.parse(JSON.stringify(cvEn.experience || [])),
  }))
  const [saving, setSaving] = useState(false)

  const addNew = () => setItems(s => ({
    zh: [...s.zh, { role: '', organization: '', period: '', description: '' }],
    en: [...s.en, { role: '', organization: '', period: '', description: '' }],
  }))
  const remove  = i => setItems(s => ({ zh: s.zh.filter((_, j) => j !== i), en: s.en.filter((_, j) => j !== i) }))
  const updateZh = (i, v) => setItems(s => ({ ...s, zh: s.zh.map((x, j) => j === i ? v : x) }))
  const updateEn = (i, v) => setItems(s => ({ ...s, en: s.en.map((x, j) => j === i ? v : x) }))

  const save = async () => {
    setSaving(true)
    try { await api.setSection('experience', items.zh, items.en); await refresh(); toast('已儲存', true) }
    catch (e) { toast(e.message, false) }
    finally { setSaving(false) }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#86868B]">共 {items.zh.length} 筆</p>
        <div className="flex gap-2">
          <Btn variant="ghost" onClick={addNew}>+ 新增</Btn>
          <Btn onClick={save} disabled={saving}>{saving ? '儲存中…' : '儲存全部'}</Btn>
        </div>
      </div>
      <EditorWithPreview
        previewBg="#1D1D1F"
        preview={
          <div className="max-w-xl flex flex-col gap-8">
            {items.zh.map((item, i) => (
              <div key={i} className="relative pl-9">
                <div className="absolute left-0 top-[0.6rem] w-2 h-2 rounded-full bg-[#0071E3]
                                ring-[3px] ring-[#1D1D1F] shadow-[0_0_0_3px_rgba(0,113,227,0.15)]" />
                <div className="p-5 rounded-2xl bg-white/[0.03] -ml-2 pl-7">
                  <div className="flex items-start justify-between gap-4 mb-1.5">
                    <h3 className="text-base font-bold tracking-tight text-white leading-snug">{item.role || '（職稱）'}</h3>
                    <span className="text-[10px] text-white/50 font-mono bg-white/10 px-2.5 py-1
                                     rounded-full whitespace-nowrap shrink-0 leading-none mt-0.5">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-sm text-white/65 mb-2 font-medium">{item.organization}</p>
                  <p className="text-sm text-white/50 leading-relaxed whitespace-pre-wrap">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        }
      >
        {items.zh.map((zh, i) => (
          <ExpItem key={i} zh={zh} en={items.en[i] || {}}
            onZh={v => updateZh(i, v)} onEn={v => updateEn(i, v)} onDelete={() => remove(i)} />
        ))}
      </EditorWithPreview>
    </div>
  )
}

// ── Awards Tab ────────────────────────────────────────────────────────────────

function AwardsTab({ toast }) {
  const { cvZh, cvEn, refresh } = useData()
  const [items, setItems] = useState(() => ({
    zh: JSON.parse(JSON.stringify(cvZh.awards || [])),
    en: JSON.parse(JSON.stringify(cvEn.awards || [])),
  }))
  const [saving, setSaving] = useState(false)

  const addNew = () => setItems(s => ({
    zh: [...s.zh, { title: '', year: '' }],
    en: [...s.en, { title: '', year: '' }],
  }))
  const remove   = i => setItems(s => ({ zh: s.zh.filter((_, j) => j !== i), en: s.en.filter((_, j) => j !== i) }))
  const updateZh = (i, f, v) => setItems(s => ({ ...s, zh: s.zh.map((x, j) => j === i ? { ...x, [f]: v } : x) }))
  const updateEn = (i, f, v) => setItems(s => ({ ...s, en: s.en.map((x, j) => j === i ? { ...x, [f]: v } : x) }))

  const save = async () => {
    setSaving(true)
    try { await api.setSection('awards', items.zh, items.en); await refresh(); toast('已儲存', true) }
    catch (e) { toast(e.message, false) }
    finally { setSaving(false) }
  }

  const TrophyIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
      <path d="M4 22h16"/>
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
    </svg>
  )

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#86868B]">共 {items.zh.length} 筆</p>
        <div className="flex gap-2">
          <Btn variant="ghost" onClick={addNew}>+ 新增</Btn>
          <Btn onClick={save} disabled={saving}>{saving ? '儲存中…' : '儲存全部'}</Btn>
        </div>
      </div>
      <EditorWithPreview
        previewBg="#F5F5F7"
        preview={
          <div className="grid md:grid-cols-2 gap-2.5">
            {items.zh.map((award, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4 rounded-2xl shadow-[0_0_0_1px_#E4E4E7] bg-white">
                <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#EBEBED]">
                  <span className="text-[#c7c7cc]"><TrophyIcon /></span>
                </div>
                <p className="text-sm text-[#1D1D1F] leading-relaxed flex-1">{award.title || '（獎項名稱）'}</p>
                <span className="shrink-0 text-[11px] text-[#3F3F46] font-mono bg-[#EBEBED] px-2.5 py-1 rounded-full leading-none">
                  {award.year}
                </span>
              </div>
            ))}
          </div>
        }
      >
        <div className="space-y-2">
          {items.zh.map((zh, i) => (
            <div key={i} className="bg-white rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.08)] p-4">
              <div className="grid grid-cols-[1fr_80px_auto] gap-2 items-start mb-2">
                <F label="獎項名稱（中文）">
                  <input className={inp} value={zh.title || ''} onChange={e => updateZh(i, 'title', e.target.value)} />
                </F>
                <F label="年份">
                  <input className={inp} value={zh.year || ''} onChange={e => { updateZh(i, 'year', e.target.value); updateEn(i, 'year', e.target.value) }} placeholder="2025" />
                </F>
                <button type="button" onClick={() => remove(i)} className="mt-5 text-[#86868B] hover:text-red-500 text-xl leading-none">×</button>
              </div>
              <F label="Award Title (EN)">
                <input className={inp} value={items.en[i]?.title || ''} onChange={e => updateEn(i, 'title', e.target.value)} />
              </F>
            </div>
          ))}
        </div>
      </EditorWithPreview>
    </div>
  )
}

// ── Skills Tab ────────────────────────────────────────────────────────────────

const SKILL_CAT_LABELS = {
  manufacturing: '製造 / Manufacturing',
  programming:   '程式 / Programming',
  eda:           'EDA 電路設計',
  data_analysis: '數據分析 / ML',
  embedded:      '嵌入式系統',
  web:           'Web / 後端',
}

const SKILL_CAT_ACCENTS = {
  data_analysis: 'from-indigo-400 to-blue-500',
  programming:   'from-emerald-400 to-teal-500',
  eda:           'from-rose-400 to-pink-500',
  manufacturing: 'from-orange-400 to-amber-500',
}

function SkillChips({ items, onChange }) {
  const [draft, setDraft] = useState('')
  const [editingIdx, setEditingIdx] = useState(null)
  const [editVal, setEditVal] = useState('')

  const add = () => { const t = draft.trim(); if (t && !items.includes(t)) { onChange([...items, t]); setDraft('') } }
  const remove = i => onChange(items.filter((_, idx) => idx !== i))
  const startEdit = i => { setEditingIdx(i); setEditVal(items[i]) }
  const commitEdit = () => {
    const v = editVal.trim()
    if (v) onChange(items.map((x, idx) => idx === editingIdx ? v : x))
    setEditingIdx(null)
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5">
        {items.map((s, i) => editingIdx === i ? (
          <input key={i} autoFocus
            className="text-xs px-2.5 py-1 rounded-full border border-[#0071E3] focus:outline-none"
            style={{ width: `${Math.max(4, editVal.length) + 2}ch` }}
            value={editVal}
            onChange={e => setEditVal(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={e => { if (e.key === 'Enter') commitEdit(); if (e.key === 'Escape') setEditingIdx(null) }}
          />
        ) : (
          <span key={i}
            className="inline-flex items-center gap-1 bg-[#F5F5F7] text-xs px-2.5 py-1 rounded-full cursor-pointer hover:bg-[#EBEBED]"
            onClick={() => startEdit(i)} title="點擊編輯">
            {s}
            <button type="button" onClick={e => { e.stopPropagation(); remove(i) }} className="text-[#86868B] hover:text-red-500 text-base leading-none">&times;</button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input className={`${inp} flex-1`} value={draft} onChange={e => setDraft(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), add())}
          placeholder="新增技能，按 Enter；點擊已有標籤可編輯" />
        <Btn sm variant="ghost" onClick={add}>新增</Btn>
      </div>
    </div>
  )
}

const SKILL_LEVELS = ['進階', '熟悉', '基礎']

function SkillDetailEditor({ value, onChange, lang }) {
  const skills = value?.skills || []
  const set      = (f, v) => onChange({ ...value, [f]: v })
  const setSkill = (i, f, v) => onChange({ ...value, skills: skills.map((s, j) => j === i ? { ...s, [f]: v } : s) })
  const addSkill = () => onChange({ ...value, skills: [...skills, { name: '', level: '基礎', desc: '', projects: [] }] })
  const delSkill = i => onChange({ ...value, skills: skills.filter((_, j) => j !== i) })

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <F label={lang === 'zh' ? '分類標題' : 'Category title'}>
          <input className={inp} value={value?.title ?? value?.en ?? ''} onChange={e => onChange({ ...value, [lang === 'zh' ? 'title' : 'en']: e.target.value })} />
        </F>
      </div>
      <F label={lang === 'zh' ? '分類概述' : 'Overview'}>
        <textarea className={ta} rows={3} value={value?.overview || ''} onChange={e => set('overview', e.target.value)} />
      </F>
      <div className="space-y-2">
        {skills.map((s, i) => {
          const cfg = SKILL_LEVEL_CONFIG[s.level] || SKILL_LEVEL_CONFIG['基礎']
          return (
            <div key={i} className="bg-white rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.06)] p-3 space-y-2">
              <div className="flex items-center gap-2">
                <input className={`${inp} flex-1 font-medium`} placeholder="技能名稱" value={s.name || ''} onChange={e => setSkill(i, 'name', e.target.value)} />
                <select className={`shrink-0 w-24 px-2 py-2 rounded-lg border-0 text-xs font-semibold text-center focus:outline-none focus:ring-2 focus:ring-[#0071E3] ${cfg.badge}`}
                        value={s.level || '基礎'} onChange={e => setSkill(i, 'level', e.target.value)}>
                  {SKILL_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
                <button type="button" onClick={() => delSkill(i)} className="shrink-0 text-[#86868B] hover:text-red-500 text-lg leading-none px-1">×</button>
              </div>
              <div className="flex items-center gap-1 px-0.5">
                {[1, 2, 3].map(n => (
                  <span key={n} className={`inline-block w-1.5 h-1.5 rounded-full ${n <= cfg.dots ? cfg.bar : 'bg-black/10'}`} />
                ))}
              </div>
              <F label="說明">
                <textarea className={ta} rows={3} value={s.desc || ''} onChange={e => setSkill(i, 'desc', e.target.value)} />
              </F>
              <F label="相關專案" hint="逗號分隔">
                <input className={inp} value={(s.projects || []).join(', ')} onChange={e => setSkill(i, 'projects', e.target.value.split(',').map(x => x.trim()).filter(Boolean))} />
              </F>
            </div>
          )
        })}
        <button type="button" onClick={addSkill} className="text-xs text-[#0071E3] hover:underline">+ 新增技能詳情</button>
      </div>
    </div>
  )
}

const SKILL_LEVEL_CONFIG = {
  '基礎': { dots: 1, badge: 'bg-[#F5F5F7] text-[#86868B]', bar: 'bg-black/20' },
  '熟悉': { dots: 2, badge: 'bg-[#EEF5FF] text-[#0066CC]', bar: 'bg-[#0071E3]' },
  '進階': { dots: 3, badge: 'bg-[#F2EEFF] text-[#5E3DE8]', bar: 'bg-[#7C3AED]' },
}

function SkillDetailPage({ cat, detailZh, detailEn, onChangeZh, onChangeEn, onBack, onSave, saving }) {
  const [lang, setLang] = useState('zh')
  const value = lang === 'zh' ? (detailZh[cat] || { skills: [] }) : (detailEn[cat] || { skills: [] })
  const onChange = lang === 'zh' ? onChangeZh : onChangeEn
  const skills = value.skills || []
  const total = skills.length
  const gridCols = total <= 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Btn variant="ghost" onClick={onBack}>← 返回</Btn>
        <h2 className="font-semibold">技能詳情與精熟度：{SKILL_CAT_LABELS[cat] || cat}</h2>
        <Btn onClick={onSave} disabled={saving} className="ml-auto">{saving ? '儲存中…' : '儲存'}</Btn>
      </div>
      <EditorWithPreview
        preview={
          <div className="max-w-3xl -m-6 mb-0">
            <div className={`h-[3px] w-full bg-gradient-to-r ${SKILL_CAT_ACCENTS[cat] || 'from-gray-300 to-gray-400'}`} />
            <div className="p-6">
            <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-[#86868B] mb-3">
              {value.en || ''}
            </p>
            <h1 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-[-0.02em] text-[#1D1D1F] mb-5 leading-[1.07]">
              {value.title || SKILL_CAT_LABELS[cat] || cat}
            </h1>
            <p className="text-[15px] text-[#3F3F46] leading-[1.6] max-w-2xl mb-10 whitespace-pre-line">
              {value.overview}
            </p>
            <div className={`grid ${gridCols} gap-4`}>
              {skills.map((skill, i) => {
                const cfg = SKILL_LEVEL_CONFIG[skill.level] || SKILL_LEVEL_CONFIG['基礎']
                return (
                  <div key={i} className="bg-white rounded-2xl p-6 shadow-[0_0_0_1px_rgba(0,0,0,0.08)] flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-base font-bold tracking-tight text-[#1D1D1F] leading-snug">{skill.name || '（技能名稱）'}</h2>
                      <span className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-semibold leading-none ${cfg.badge}`}>{skill.level}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3].map(n => (
                        <span key={n} className={`inline-block w-1.5 h-1.5 rounded-full ${n <= cfg.dots ? cfg.bar : 'bg-black/10'}`} />
                      ))}
                    </div>
                    <p className="text-sm text-[#3F3F46] leading-relaxed flex-1">{skill.desc}</p>
                    {skill.projects?.length > 0 && (
                      <div className="pt-3 border-t border-black/[0.06]">
                        <div className="flex flex-wrap gap-1.5">
                          {skill.projects.map(proj => (
                            <span key={proj} className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#EEF5FF] text-[#0066CC] border border-[#C7D8F0]">{proj}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            </div>
          </div>
        }
      >
        <div className="flex justify-end"><LangTab lang={lang} setLang={setLang} /></div>
        <SectionCard>
          <SkillDetailEditor value={value} lang={lang} onChange={onChange} />
        </SectionCard>
      </EditorWithPreview>
    </div>
  )
}

function SkillsTab({ toast }) {
  const { cvZh, cvEn, refresh } = useData()
  const [matrixZh, setMatrixZh] = useState(() => JSON.parse(JSON.stringify(cvZh.skills_matrix || {})))
  const [matrixEn, setMatrixEn] = useState(() => JSON.parse(JSON.stringify(cvEn.skills_matrix || {})))
  const [detailZh, setDetailZh] = useState(() => JSON.parse(JSON.stringify(cvZh.skills_detail || {})))
  const [detailEn, setDetailEn] = useState(() => JSON.parse(JSON.stringify(cvEn.skills_detail || {})))
  const [saving, setSaving] = useState(false)
  const [editingDetail, setEditingDetail] = useState(null)

  const cats = Object.keys(matrixZh)

  const save = async () => {
    setSaving(true)
    try {
      await Promise.all([
        api.setSection('skills_matrix', matrixZh, matrixEn),
        api.setSection('skills_detail', detailZh, detailEn),
      ])
      await refresh(); toast('已儲存', true)
    } catch (e) { toast(e.message, false) }
    finally { setSaving(false) }
  }

  const LEVEL_STYLE = {
    '進階': 'bg-indigo-400/15 text-indigo-300',
    '熟悉': 'bg-emerald-400/15 text-emerald-300',
    '基礎': 'bg-white/10 text-white/40',
  }

  if (editingDetail) return (
    <SkillDetailPage
      cat={editingDetail}
      detailZh={detailZh} detailEn={detailEn}
      onChangeZh={v => setDetailZh(m => ({ ...m, [editingDetail]: v }))}
      onChangeEn={v => setDetailEn(m => ({ ...m, [editingDetail]: v }))}
      onBack={() => setEditingDetail(null)}
      onSave={save} saving={saving}
    />
  )

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <Btn onClick={save} disabled={saving}>{saving ? '儲存中…' : '儲存'}</Btn>
      </div>
      <EditorWithPreview
        previewBg="#1D1D1F"
        preview={
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cats.map(cat => {
              const tags = matrixZh[cat] || []
              const skillList = detailZh[cat]?.skills || []
              const counts = { '進階': 0, '熟悉': 0, '基礎': 0 }
              skillList.forEach(s => { if (s.level in counts) counts[s.level]++ })
              return (
                <div key={cat} className="rounded-2xl bg-[#141418] border border-white/[0.06] p-6 flex flex-col gap-4">
                  <h3 className="text-base font-bold tracking-tight text-white/85">
                    {detailZh[cat]?.title || SKILL_CAT_LABELS[cat] || cat}
                  </h3>
                  {detailZh[cat]?.overview && (
                    <p className="text-sm text-white/45 leading-relaxed line-clamp-2">{detailZh[cat].overview}</p>
                  )}
                  {skillList.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex h-[3px] rounded-full overflow-hidden gap-0.5">
                        {counts['進階'] > 0 && <div className="bg-indigo-400/60 rounded-full" style={{ flex: counts['進階'] }} />}
                        {counts['熟悉'] > 0 && <div className="bg-emerald-400/60 rounded-full" style={{ flex: counts['熟悉'] }} />}
                        {counts['基礎'] > 0 && <div className="bg-white/15 rounded-full" style={{ flex: counts['基礎'] }} />}
                      </div>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map(skill => (
                      <span key={skill} className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/[0.05] text-white/45 border border-white/[0.06]">
                        {skill}
                      </span>
                    ))}
                  </div>
                  {skillList.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.06]">
                      {skillList.map(s => (
                        <span key={s.name} className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${LEVEL_STYLE[s.level] || LEVEL_STYLE['基礎']}`}>
                          {s.name} · {s.level}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        }
      >
        {cats.map(cat => {
          const skillCount = detailZh[cat]?.skills?.length || 0
          return (
            <SectionCard key={cat}
              title={
                <span className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full bg-gradient-to-br ${SKILL_CAT_ACCENTS[cat] || 'from-gray-300 to-gray-400'}`} />
                  {SKILL_CAT_LABELS[cat] || cat}
                </span>
              }
            >
              <div className="space-y-3">
                <F label="中文標籤">
                  <SkillChips items={matrixZh[cat] || []} onChange={v => setMatrixZh(m => ({ ...m, [cat]: v }))} />
                </F>
                <F label="EN labels">
                  <SkillChips items={matrixEn[cat] || []} onChange={v => setMatrixEn(m => ({ ...m, [cat]: v }))} />
                </F>
              </div>
              <button type="button" onClick={() => setEditingDetail(cat)}
                className="mt-4 w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl
                           bg-[#F5F5F7] hover:bg-[#EBEBED] transition-colors duration-[125ms] group">
                <span className="text-xs font-medium text-[#1D1D1F]">
                  技能詳情與精熟度
                  <span className="ml-1.5 text-[#86868B] font-mono">{skillCount} 項</span>
                </span>
                <span className="text-xs text-[#0071E3] font-medium opacity-0 group-hover:opacity-100
                                 -translate-x-1 group-hover:translate-x-0 transition-all duration-[125ms]">
                  編輯 →
                </span>
              </button>
            </SectionCard>
          )
        })}
      </EditorWithPreview>
    </div>
  )
}

// ── Resume Tab ────────────────────────────────────────────────────────────────

// ── Resume Visual Editor ──────────────────────────────────────────────────────

const DEFAULT_RESUME = {
  name: '江嘉元',
  contact: { location: '台北市, 台灣', phone: '+886 928 530 700', email: 'johnjia9491@gmail.com', github: 'Jcsk7049' },
  bio: '就讀元智大學電機工程學系，目前在林書彥教授實驗室進行 ICU 生理訊號 AI 研究。從 FRC 競賽機器人選手出發，橫跨嵌入式韌體、電路設計到深度學習，喜歡把想法從零打造成真實的東西。',
  education: [
    { school: '元智大學', degree: '電機工程學系學士', period: '2024.09 – 2027.09' },
    { school: '明志科技大學', degree: '電機工程學系學士（轉學）', period: '2023.09 – 2024.06' },
    { school: '南港高工', degree: '電子科', period: '2020.09 – 2023.06' },
  ],
  experience: [
    { title: '實驗室專題生', org: '元智大學 林書彥教授實驗室', period: '2025.05 – 現在', desc: '進行 ICU VAP 生理訊號 AI 研究，以 LSTM 時序模型達成 6–72h 超前預警（AUROC 0.98–0.99）；設計 Stay-level CV 修正 Data Leakage，論文預計投稿 IEEE GCCE 2026。' },
    { title: 'Student Mentor & Technical Support', org: 'FRC TEAM 7645', period: '2023 – 現在', desc: '指導機器人開發、除錯；引入 LLM 輔助工具把原本反覆試錯的韌體除錯流程縮短約一週，並把根因除錯思路教給後進。競賽期間擔任教練，協助現場策略決策。' },
    { title: '競賽選手', org: '南港高工 NK-MTC 7645', period: '2020.06 – 2023.09', desc: '負責機器人配線、程式設計與小型機械零件加工，3 年內出賽 3 場 FRC 國際區域賽，並代表參加全國技能競賽。' },
  ],
  projects: [
    { cat: '大學專題', title: '加護病房 VAP 早期預測系統', period: '2025–', desc: 'Stay-level CV 修正 Data Leakage（AUROC 0.99→0.58）；IG 歸因篩選 MAP/RR/Vt/SpO₂，LSTM 於亞東 ICU（n=109）達 6–72h 預警，AUROC 0.98–0.99 / AUPRC 0.81–0.93。', tags: ['PyTorch','LSTM','Integrated Gradients','SMOTE','Medical AI'], github: '' },
    { cat: '校外競賽', title: 'AWS × BitoPro 黑客松：BitOGuard', period: '2026', desc: 'XGBoost / LightGBM × S3→Glue→Athena→SageMaker→Lambda→Bedrock 六服務端對端 AML 管線；31 項行為特徵 + SHAP 合規報告，Streamlit 儀表板已部署。', tags: ['XGBoost','AWS SageMaker','SHAP','Streamlit'], github: 'https://github.com/Jcsk7049/bitoguard-aml' },
    { cat: '校外作品', title: 'QMK × STM32 數字鍵盤', period: '2026', desc: 'STM32F072 USB FS DFU × EasyEDA Pro PCB × QMK + ChibiOS HAL；5×4 矩陣掃描、WS2812B RGB Matrix、VIA/VIAL 即時改鍵，延遲 <5ms，Gerber + 韌體開源。', tags: ['QMK Firmware','STM32','ChibiOS','EasyEDA Pro'], github: 'https://github.com/Jcsk7049/qmk-stm32-keyboard' },
    { cat: '大學課程', title: 'PCB 元件瑕疵偵測（Azure Custom Vision）', period: '2026', desc: '用 Azure Custom Vision 訓練物件偵測模型框出 PCB 破洞 / 翹腳瑕疵，1064+609 張標註影像，Precision 67.4% / Recall 97.5% / mAP 87.4%。', tags: ['Azure Custom Vision','Object Detection','Pascal VOC','Python'], github: '' },
    { cat: '高職作品', title: 'Swerve Drive 全向輪底盤（三代）', period: '2020–2023', desc: 'FRC 競賽全向輪底盤，向量合成運動學 + LabVIEW PID 閉迴路控制，CNC 精密加工，獲 2022 FRC 台灣區控制創新獎。', tags: ['LabVIEW','PID Control','CNC 加工','Robotics'], github: '' },
  ],
  skills: [
    { group: '數據分析', items: [{name:'深度學習',level:'a'},{name:'機器學習',level:'a'},{name:'特徵工程',level:'a'},{name:'訊號過濾',level:'b'},{name:'數據結構化',level:'b'}] },
    { group: '程式開發', items: [{name:'C / C++',level:'a'},{name:'Python',level:'a'},{name:'LabVIEW',level:'b'},{name:'Arduino',level:'b'},{name:'MATLAB',level:'c'}] },
    { group: '電路設計', items: [{name:'Altium Designer',level:'a'},{name:'EasyEDA Pro',level:'b'},{name:'KiCAD',level:'b'},{name:'OrCAD',level:'c'}] },
    { group: '機構加工', items: [{name:'CNC 銑床',level:'a'},{name:'3D 列印',level:'a'},{name:'Autodesk Inventor',level:'a'},{name:'Mastercam',level:'b'},{name:'AutoCAD',level:'b'},{name:'金屬焊接',level:'b'},{name:'雷射切割',level:'b'},{name:'Fusion 360',level:'c'}] },
  ],
  awards: [
    { title: 'AWS × BitoPro 黑客松完賽', year: '2026' },
    { title: 'FRC 台灣鴻海區域賽：亞軍聯盟 & 控制創新獎', year: '2022' },
    { title: 'Siemens SMSCP Level 1（西門子機電整合認證 第一級）', year: '2022' },
    { title: '工科賽：數位電子職類代表', year: '2022' },
    { title: '全國技能競賽：集體創作職類代表', year: '2022' },
    { title: 'FRC 中科 5G 區域賽：最佳工業設計獎', year: '2020' },
  ],
}

function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;') }

function generateResumeHTML(d) {
  const eduHTML = d.education.map(e => `
    <div class="entry">
      <div class="row"><span class="entry-title">${esc(e.school)}</span><span class="entry-period">${esc(e.period)}</span></div>
      <div class="entry-org">${esc(e.degree)}</div>
    </div>`).join('')

  const expHTML = d.experience.map(e => `
    <div class="entry">
      <div class="row"><span class="entry-title">${esc(e.title)}</span><span class="entry-period">${esc(e.period)}</span></div>
      <div class="entry-org">${esc(e.org)}</div>
      <div class="entry-desc">${esc(e.desc)}</div>
    </div>`).join('')

  const projHTML = d.projects.map(p => `
    <div class="proj">
      <div class="row">
        <div><span class="proj-cat">${esc(p.cat)}</span><span class="proj-title">${esc(p.title)}</span></div>
        <span class="entry-period">${esc(p.period)}</span>
      </div>
      <div class="proj-desc">${esc(p.desc)}</div>
      <div class="proj-tags">
        ${p.tags.map(t=>`<span class="ptag">${esc(t)}</span>`).join('')}
        ${p.github ? `<a class="proj-link" href="${esc(p.github)}">GitHub ↗</a>` : ''}
      </div>
    </div>`).join('')

  const skillHTML = d.skills.map(sg => `
    <div class="skill-group">
      <div class="sg-title">${esc(sg.group)}</div>
      <div class="sg-tags">
        ${sg.items.map(s=>`<span class="stag stag-${s.level}">${esc(s.name)}</span>`).join('')}
      </div>
    </div>`).join('')

  const awardHTML = d.awards.map(a => `
    <div class="award-row">
      <span class="award-title">${esc(a.title)}</span>
      <span class="award-year">${esc(a.year)}</span>
    </div>`).join('')

  return `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8" />
<title>${esc(d.name)} — 履歷</title>
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
@page { size: A4 portrait; margin: 14mm 16mm 14mm 16mm; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { width: 210mm; margin: 0 auto; padding: 14mm 16mm; font-family: 'Noto Sans TC', 'PingFang TC', 'Microsoft JhengHei', 'Hiragino Sans GB', sans-serif; font-size: 8.5pt; line-height: 1.5; color: #1a1a1a; background: #fff; }
h1 { font-size: 20pt; font-weight: 800; letter-spacing: -0.03em; line-height: 1; }
a  { color: #0057b8; text-decoration: none; }
.hd { display: flex; justify-content: space-between; align-items: flex-end; padding-bottom: 8px; border-bottom: 2px solid #1a1a1a; margin-bottom: 14px; }
.hd-left h1 { margin-bottom: 4px; }
.hd-right { text-align: right; font-size: 7.5pt; color: #555; line-height: 1.8; }
.columns { display: grid; grid-template-columns: 1fr 120px; gap: 0 20px; }
.col-main { min-width: 0; } .col-side { min-width: 0; }
.sec { margin-bottom: 13px; }
.sec-title { font-size: 6.5pt; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #999; border-bottom: 1px solid #e8e8e8; padding-bottom: 2px; margin-bottom: 7px; }
.entry { margin-bottom: 8px; } .entry:last-child { margin-bottom: 0; }
.row { display: flex; justify-content: space-between; align-items: baseline; gap: 6px; }
.entry-title { font-size: 9pt; font-weight: 700; }
.entry-period { font-size: 7pt; color: #888; white-space: nowrap; flex-shrink: 0; }
.entry-org { font-size: 7.5pt; color: #0057b8; font-weight: 600; margin-top: 0.5px; }
.entry-desc { font-size: 7.5pt; color: #444; margin-top: 2px; line-height: 1.45; }
.proj { margin-bottom: 7px; } .proj:last-child { margin-bottom: 0; }
.proj-title { font-size: 8.5pt; font-weight: 700; }
.proj-cat { display: inline-block; font-size: 6pt; padding: 0 4px; border-radius: 2px; border: 1px solid #ddd; background: #f5f5f5; color: #777; margin-right: 3px; vertical-align: middle; line-height: 1.6; }
.proj-desc { font-size: 7.5pt; color: #444; margin-top: 2px; line-height: 1.4; }
.proj-tags { margin-top: 2px; display: flex; flex-wrap: wrap; gap: 2px; }
.ptag { font-size: 6.5pt; background: #f3f3f3; border: 1px solid #e0e0e0; padding: 0 4px; border-radius: 2px; color: #555; }
.proj-link { font-size: 6.5pt; color: #0057b8; margin-left: 2px; }
.skill-group { margin-bottom: 6px; }
.sg-title { font-size: 7.5pt; font-weight: 700; color: #1a1a1a; margin-bottom: 2px; }
.sg-tags { display: flex; flex-wrap: wrap; gap: 2px; }
.stag { font-size: 6.5pt; padding: 0 4px; border-radius: 2px; border: 1px solid; line-height: 1.6; }
.stag-a { background: #eef2ff; border-color: #c7d2fe; color: #4338ca; }
.stag-b { background: #eff6ff; border-color: #bfdbfe; color: #1d4ed8; }
.stag-c { background: #f3f3f3; border-color: #e0e0e0; color: #555; }
.award-row { display: flex; justify-content: space-between; align-items: baseline; gap: 6px; padding: 2.5px 0; border-bottom: 1px solid #f2f2f2; }
.award-row:last-child { border-bottom: none; }
.award-title { font-size: 7.5pt; color: #1a1a1a; }
.award-year  { font-size: 7pt; color: #888; white-space: nowrap; flex-shrink: 0; }
.legend { display: flex; gap: 8px; margin-top: 4px; }
.leg-item { display: flex; align-items: center; gap: 3px; font-size: 6.5pt; color: #888; }
.dl-btn { position: fixed; top: 20px; right: 20px; z-index: 999; display: flex; align-items: center; gap: 6px; padding: 9px 18px; background: #0057b8; color: #fff; font-family: inherit; font-size: 9pt; font-weight: 700; border: none; border-radius: 8px; cursor: pointer; box-shadow: 0 2px 12px rgba(0,87,184,0.35); transition: background 0.15s; letter-spacing: 0.01em; }
.dl-btn:hover { background: #0047a0; }
.dl-btn svg { width: 14px; height: 14px; fill: currentColor; flex-shrink: 0; }
@media print { body { padding: 0; width: 100%; } .no-print { display: none !important; } }
@media screen { html { background: #e8e8e8; } body { margin: 20px auto; box-shadow: 0 4px 24px rgba(0,0,0,0.18); } }
</style>
</head>
<body>
<div class="hd">
  <div class="hd-left">
    <h1>${esc(d.name)}</h1>
    <div style="margin-top:4px;font-size:7.5pt;color:#555;display:flex;gap:14px;flex-wrap:wrap;">
      <span>📍 ${esc(d.contact.location)}</span>
      <span>📞 ${esc(d.contact.phone)}</span>
      <a href="mailto:${esc(d.contact.email)}">${esc(d.contact.email)}</a>
      <a href="https://github.com/${esc(d.contact.github)}">github.com/${esc(d.contact.github)}</a>
    </div>
  </div>
</div>
<div class="columns">
<div class="col-main">
  <div class="sec"><div class="sec-title">個人簡介</div><p class="entry-desc">${esc(d.bio)}</p></div>
  <div class="sec"><div class="sec-title">學歷</div>${eduHTML}</div>
  <div class="sec"><div class="sec-title">經歷</div>${expHTML}</div>
  <div class="sec"><div class="sec-title">精選專案</div>${projHTML}</div>
</div>
<div class="col-side">
  <div class="sec">
    <div class="sec-title">技術</div>
    ${skillHTML}
    <div class="legend">
      <div class="leg-item"><span class="stag stag-a" style="font-size:5.5pt;">進階</span></div>
      <div class="leg-item"><span class="stag stag-b" style="font-size:5.5pt;">熟悉</span></div>
      <div class="leg-item"><span class="stag stag-c" style="font-size:5.5pt;">基礎</span></div>
    </div>
  </div>
  <div class="sec"><div class="sec-title">獲獎</div>${awardHTML}</div>
</div>
</div>
<button class="dl-btn no-print" onclick="window.print()">
  <svg viewBox="0 0 24 24"><path d="M12 16l-5-5h3V4h4v7h3l-5 5zm-7 2h14v2H5v-2z"/></svg>
  下載 PDF
</button>
</body>
</html>`
}

// ── Accordion block for resume sections ─────────────────────────────────────

function RSection({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="bg-white rounded-2xl shadow-[0_0_0_1px_rgba(0,0,0,0.08)] overflow-hidden">
      <button type="button" onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-black/[0.02] transition-colors">
        <span className="text-sm font-semibold text-[#1D1D1F]">{title}</span>
        <span className="text-[#86868B]">{open ? '▲' : '▼'}</span>
      </button>
      {open && <div className="px-5 pb-5 pt-1 border-t border-black/[0.06] space-y-3">{children}</div>}
    </div>
  )
}

function ListEditor({ items, setItems, emptyItem, renderRow }) {
  const add    = () => setItems(s => [...s, { ...emptyItem }])
  const remove = i => setItems(s => s.filter((_, j) => j !== i))
  const update = (i, f, v) => setItems(s => s.map((x, j) => j === i ? { ...x, [f]: v } : x))
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="relative bg-black/[0.02] rounded-xl p-3 space-y-2">
          <button type="button" onClick={() => remove(i)} className="absolute top-2 right-2 text-[#86868B] hover:text-red-500 text-lg leading-none">×</button>
          {renderRow(item, i, (f, v) => update(i, f, v))}
        </div>
      ))}
      <button type="button" onClick={add} className="text-xs text-[#0071E3] hover:underline">+ 新增</button>
    </div>
  )
}

function ResumeTab({ toast }) {
  const [data, setData]     = useState(null)
  const [preview, setPreview] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    api.getSection('resume_data', 'zh')
      .then(v => setData(v && v.name ? v : DEFAULT_RESUME))
      .catch(() => setData(DEFAULT_RESUME))
  }, [])

  const set    = (f, v) => setData(d => ({ ...d, [f]: v }))
  const setCon = (f, v) => setData(d => ({ ...d, contact: { ...d.contact, [f]: v } }))

  const save = async () => {
    setSaving(true)
    try {
      const html = generateResumeHTML(data)
      await Promise.all([
        api.setSection('resume_data', data, null),
        api.setResume('zh', html),
      ])
      toast('已儲存，履歷已更新', true)
    } catch (e) { toast(e.message, false) }
    finally { setSaving(false) }
  }

  if (!data) return <p className="text-sm text-[#86868B]">載入中…</p>

  const previewHTML = generateResumeHTML(data)

  return (
    <div className="flex gap-5" style={{minHeight:'calc(100vh - 80px)'}}>
      {/* ── Left: editor ── */}
      <div className="w-[420px] shrink-0 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-[#1D1D1F]">履歷編輯</p>
          <Btn onClick={save} disabled={saving}>{saving ? '儲存中…' : '儲存並發布'}</Btn>
        </div>

      {/* Header */}
      <RSection title="基本資訊" defaultOpen>
        <div className="grid grid-cols-2 gap-3">
          <F label="姓名"><input className={inp} value={data.name} onChange={e => set('name', e.target.value)} /></F>
          <F label="Email"><input className={inp} value={data.contact.email} onChange={e => setCon('email', e.target.value)} /></F>
          <F label="電話"><input className={inp} value={data.contact.phone} onChange={e => setCon('phone', e.target.value)} /></F>
          <F label="地點"><input className={inp} value={data.contact.location} onChange={e => setCon('location', e.target.value)} /></F>
          <F label="GitHub username"><input className={inp} value={data.contact.github} onChange={e => setCon('github', e.target.value)} /></F>
        </div>
        <F label="個人簡介">
          <textarea className={ta} rows={4} value={data.bio} onChange={e => set('bio', e.target.value)} />
        </F>
      </RSection>

      {/* Education */}
      <RSection title="學歷">
        <ListEditor
          items={data.education}
          setItems={v => set('education', v)}
          emptyItem={{ school: '', degree: '', period: '' }}
          renderRow={(item, _, upd) => (
            <div className="grid grid-cols-[1fr_1fr_140px] gap-2">
              <F label="學校"><input className={inp} value={item.school} onChange={e => upd('school', e.target.value)} /></F>
              <F label="科系 / 學位"><input className={inp} value={item.degree} onChange={e => upd('degree', e.target.value)} /></F>
              <F label="時間"><input className={inp} value={item.period} onChange={e => upd('period', e.target.value)} /></F>
            </div>
          )}
        />
      </RSection>

      {/* Experience */}
      <RSection title="經歷">
        <ListEditor
          items={data.experience}
          setItems={v => set('experience', v)}
          emptyItem={{ title: '', org: '', period: '', desc: '' }}
          renderRow={(item, _, upd) => (
            <div className="space-y-2">
              <div className="grid grid-cols-[1fr_1fr_140px] gap-2">
                <F label="職稱"><input className={inp} value={item.title} onChange={e => upd('title', e.target.value)} /></F>
                <F label="機構"><input className={inp} value={item.org} onChange={e => upd('org', e.target.value)} /></F>
                <F label="時間"><input className={inp} value={item.period} onChange={e => upd('period', e.target.value)} /></F>
              </div>
              <F label="描述">
                <textarea className={ta} rows={4} value={item.desc} onChange={e => upd('desc', e.target.value)} />
              </F>
            </div>
          )}
        />
      </RSection>

      {/* Projects */}
      <RSection title="精選專案">
        <ListEditor
          items={data.projects}
          setItems={v => set('projects', v)}
          emptyItem={{ cat: '', title: '', period: '', desc: '', tags: [], github: '' }}
          renderRow={(item, _, upd) => (
            <div className="space-y-2">
              <div className="grid grid-cols-[100px_1fr_120px] gap-2">
                <F label="分類標籤"><input className={inp} value={item.cat} onChange={e => upd('cat', e.target.value)} placeholder="大學專題" /></F>
                <F label="專案名稱"><input className={inp} value={item.title} onChange={e => upd('title', e.target.value)} /></F>
                <F label="時間"><input className={inp} value={item.period} onChange={e => upd('period', e.target.value)} /></F>
              </div>
              <F label="描述">
                <textarea className={ta} rows={3} value={item.desc} onChange={e => upd('desc', e.target.value)} />
              </F>
              <div className="grid grid-cols-2 gap-2">
                <F label="Tags（逗號分隔）">
                  <input className={inp} value={item.tags.join(', ')} onChange={e => upd('tags', e.target.value.split(',').map(s=>s.trim()).filter(Boolean))} />
                </F>
                <F label="GitHub URL（選填）">
                  <input className={inp} value={item.github} onChange={e => upd('github', e.target.value)} placeholder="https://github.com/..." />
                </F>
              </div>
            </div>
          )}
        />
      </RSection>

      {/* Skills */}
      <RSection title="技術">
        <p className="text-xs text-[#86868B]">等級：<b>a</b> = 進階　<b>b</b> = 熟悉　<b>c</b> = 基礎</p>
        <ListEditor
          items={data.skills}
          setItems={v => set('skills', v)}
          emptyItem={{ group: '', items: [] }}
          renderRow={(sg, _, updSg) => (
            <div className="space-y-2">
              <F label="群組名稱"><input className={inp} value={sg.group} onChange={e => updSg('group', e.target.value)} /></F>
              <F label="技能（每行一個，格式：名稱,等級）">
                <textarea className={ta} rows={4}
                  value={sg.items.map(s=>`${s.name},${s.level}`).join('\n')}
                  onChange={e => updSg('items', e.target.value.split('\n').filter(l=>l.trim()).map(l => {
                    const [name,...rest]=l.split(','); return {name:name.trim(), level:(rest.join(',').trim()||'c')}
                  }))}
                  placeholder={"深度學習,a\n機器學習,a\n訊號過濾,b"}
                />
              </F>
            </div>
          )}
        />
      </RSection>

      {/* Awards */}
      <RSection title="獲獎">
        <ListEditor
          items={data.awards}
          setItems={v => set('awards', v)}
          emptyItem={{ title: '', year: '' }}
          renderRow={(item, _, upd) => (
            <div className="grid grid-cols-[1fr_80px] gap-2">
              <F label="獎項名稱"><input className={inp} value={item.title} onChange={e => upd('title', e.target.value)} /></F>
              <F label="年份"><input className={inp} value={item.year} onChange={e => upd('year', e.target.value)} /></F>
            </div>
          )}
        />
      </RSection>
      </div>

      {/* ── Right: live preview ── */}
      <div className="flex-1 min-w-0 sticky top-14 self-start" style={{height:'calc(100vh - 80px)'}}>
        <div className="h-full rounded-2xl shadow-[0_0_0_1px_rgba(0,0,0,0.08)] overflow-hidden bg-white flex flex-col">
          <div className="px-4 py-2 border-b border-black/[0.06] flex items-center gap-2 shrink-0">
            <span className="text-xs font-medium text-[#86868B]">即時預覽</span>
            <span className="text-xs text-[#86868B]">（編輯後自動更新）</span>
          </div>
          <iframe srcDoc={previewHTML} className="flex-1 w-full border-0" title="resume preview" />
        </div>
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'projects',   label: '專案' },
  { id: 'profile',    label: '簡介' },
  { id: 'experience', label: '經歷' },
  { id: 'skills',     label: '技能' },
  { id: 'awards',     label: '獎項' },
  { id: 'resume',     label: '履歷 HTML' },
]

export default function Admin() {
  const { token, save: saveToken, clear } = useToken()
  const [tab, setTab] = useState('projects')
  const [toastMsg, setToastMsg]   = useState('')
  const [toastOk, setToastOk]     = useState(true)

  const toast = useCallback((msg, ok = true) => {
    setToastMsg(msg); setToastOk(ok)
    setTimeout(() => setToastMsg(''), 2500)
  }, [])

  if (!token) return <LoginPage onLogin={saveToken} />

  const renderTab = () => {
    switch (tab) {
      case 'projects':   return <ProjectsTab   toast={toast} />
      case 'profile':    return <ProfileTab    key="profile"    toast={toast} />
      case 'experience': return <ExperienceTab key="experience" toast={toast} />
      case 'skills':     return <SkillsTab     key="skills"     toast={toast} />
      case 'awards':     return <AwardsTab     key="awards"     toast={toast} />
      case 'resume':     return <ResumeTab     toast={toast} />
      default:           return null
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <div className="bg-white border-b border-black/[0.08] sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="text-sm font-semibold text-[#1D1D1F]">Admin</span>
            <nav className="flex gap-0.5">
              {TABS.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${tab === t.id ? 'bg-[#0071E3] text-white' : 'text-[#3F3F46] hover:bg-black/[0.06]'}`}>
                  {t.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" rel="noreferrer" className="text-xs text-[#86868B] hover:text-[#1D1D1F]">← 回網站</a>
            <Btn sm variant="ghost" onClick={clear}>登出</Btn>
          </div>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {renderTab()}
      </div>
      <Toast msg={toastMsg} ok={toastOk} />
    </div>
  )
}
