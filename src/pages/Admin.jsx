import { useState, useEffect, useCallback } from 'react'
import { api } from '../api/client'
import { useData } from '../context/DataContext'

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

const inp = 'w-full px-3 py-2 rounded-lg border border-black/10 text-sm focus:outline-none focus:border-[#0071E3] bg-white'
const ta  = `${inp} resize-y`

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

function ImagesEditor({ value = [], onChange }) {
  const add    = () => onChange([...value, { src: '', caption: '' }])
  const remove = i => onChange(value.filter((_, j) => j !== i))
  const set    = (i, f, v) => onChange(value.map((img, j) => j === i ? { ...img, [f]: v } : img))
  return (
    <div className="space-y-2">
      {value.map((img, i) => (
        <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
          <input className={inp} placeholder="/images/xxx/cover.png" value={img.src || ''} onChange={e => set(i, 'src', e.target.value)} />
          <input className={inp} placeholder="說明文字（選填）" value={img.caption || ''} onChange={e => set(i, 'caption', e.target.value)} />
          <button type="button" onClick={() => remove(i)} className="text-[#86868B] hover:text-red-500 text-lg leading-none">×</button>
        </div>
      ))}
      <button type="button" onClick={add} className="text-xs text-[#0071E3] hover:underline">+ 新增圖片</button>
    </div>
  )
}

function ProjectEditor({ zh, en, onZh, onEn, isNew }) {
  const [lang, setLang] = useState('zh')
  const d  = lang === 'zh' ? zh : en
  const on = lang === 'zh' ? onZh : onEn
  const set    = (f, v) => on({ ...d, [f]: v })
  const setDet = (f, v) => on({ ...d, detail: { ...d.detail, [f]: v } })

  return (
    <div className="space-y-5">
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
        <textarea className={ta} rows={2} value={d.description || ''} onChange={e => set('description', e.target.value)} />
      </F>

      <F label="Tags" hint="逗號分隔">
        <input className={inp} value={(d.tags || []).join(', ')} onChange={e => set('tags', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} />
      </F>

      <div className="border-t border-black/[0.06] pt-4 space-y-4">
        <p className="text-xs font-semibold text-[#86868B] uppercase tracking-widest">詳細說明（Detail）</p>
        <F label="做這個的原因">
          <textarea className={ta} rows={3} value={d.detail?.purpose || ''} onChange={e => setDet('purpose', e.target.value)} />
        </F>
        <F label="怎麼做的">
          <textarea className={ta} rows={3} value={d.detail?.concept || ''} onChange={e => setDet('concept', e.target.value)} />
        </F>
        <F label="結果 / 成效">
          <textarea className={ta} rows={3} value={d.detail?.outcome || ''} onChange={e => setDet('outcome', e.target.value)} />
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
    </div>
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
    <div className="space-y-5 max-w-2xl">
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#86868B]">共 {projects.length} 個專案</p>
        <Btn onClick={openNew}>+ 新增專案</Btn>
      </div>
      <div className="space-y-2">
        {projects.map(p => (
          <div key={p.id} className="flex items-center justify-between bg-white rounded-xl px-4 py-3 shadow-[0_0_0_1px_rgba(0,0,0,0.08)]">
            <div>
              <p className="text-sm font-medium">{p.title}</p>
              <p className="text-xs text-[#86868B]">{p.id} · {p.category} · {p.period}</p>
            </div>
            <div className="flex gap-2">
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
    <div className="max-w-xl space-y-4">
      <div className="flex items-center justify-between">
        <LangTab lang={lang} setLang={setLang} />
        <Btn onClick={save} disabled={saving}>{saving ? '儲存中…' : '儲存'}</Btn>
      </div>
      <SectionCard title="基本資訊">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <F label="姓名 / Name"><input className={inp} value={d.name || ''} onChange={e => set('name', e.target.value)} /></F>
            <F label="職稱 / Title"><input className={inp} value={d.title || ''} onChange={e => set('title', e.target.value)} placeholder="選填" /></F>
          </div>
          <F label="個人簡介 / Bio">
            <textarea className={ta} rows={4} value={d.bio || ''} onChange={e => set('bio', e.target.value)} />
          </F>
          <F label="頭像路徑（兩語共用）">
            <input className={inp} value={zh.avatar || ''} onChange={e => { setZh(p => ({ ...p, avatar: e.target.value })); setEn(p => ({ ...p, avatar: e.target.value })) }} />
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
            <textarea className={ta} rows={4} value={d.description || ''} onChange={e => on({ ...d, description: e.target.value })} />
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
    <div className="max-w-2xl space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#86868B]">共 {items.zh.length} 筆</p>
        <div className="flex gap-2">
          <Btn variant="ghost" onClick={addNew}>+ 新增</Btn>
          <Btn onClick={save} disabled={saving}>{saving ? '儲存中…' : '儲存全部'}</Btn>
        </div>
      </div>
      {items.zh.map((zh, i) => (
        <ExpItem key={i} zh={zh} en={items.en[i] || {}}
          onZh={v => updateZh(i, v)} onEn={v => updateEn(i, v)} onDelete={() => remove(i)} />
      ))}
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

  return (
    <div className="max-w-2xl space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#86868B]">共 {items.zh.length} 筆</p>
        <div className="flex gap-2">
          <Btn variant="ghost" onClick={addNew}>+ 新增</Btn>
          <Btn onClick={save} disabled={saving}>{saving ? '儲存中…' : '儲存全部'}</Btn>
        </div>
      </div>
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

function SkillChips({ items, onChange }) {
  const [draft, setDraft] = useState('')
  const add = () => { const t = draft.trim(); if (t && !items.includes(t)) { onChange([...items, t]); setDraft('') } }
  const remove = item => onChange(items.filter(x => x !== item))
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5">
        {items.map(s => (
          <span key={s} className="inline-flex items-center gap-1 bg-[#F5F5F7] text-xs px-2.5 py-1 rounded-full">
            {s}
            <button type="button" onClick={() => remove(s)} className="text-[#86868B] hover:text-red-500 text-base leading-none">&times;</button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input className={`${inp} flex-1`} value={draft} onChange={e => setDraft(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), add())}
          placeholder="新增技能，按 Enter" />
        <Btn sm variant="ghost" onClick={add}>新增</Btn>
      </div>
    </div>
  )
}

function SkillsTab({ toast }) {
  const { cvZh, cvEn, refresh } = useData()
  const [matrixZh, setMatrixZh] = useState(() => JSON.parse(JSON.stringify(cvZh.skills_matrix || {})))
  const [matrixEn, setMatrixEn] = useState(() => JSON.parse(JSON.stringify(cvEn.skills_matrix || {})))
  const [saving, setSaving] = useState(false)

  const cats = Object.keys(matrixZh)

  const save = async () => {
    setSaving(true)
    try {
      await api.setSection('skills_matrix', matrixZh, matrixEn)
      await refresh(); toast('已儲存', true)
    } catch (e) { toast(e.message, false) }
    finally { setSaving(false) }
  }

  return (
    <div className="max-w-2xl space-y-3">
      <div className="flex justify-end">
        <Btn onClick={save} disabled={saving}>{saving ? '儲存中…' : '儲存'}</Btn>
      </div>
      {cats.map(cat => (
        <SectionCard key={cat} title={SKILL_CAT_LABELS[cat] || cat}>
          <div className="space-y-3">
            <F label="中文標籤">
              <SkillChips items={matrixZh[cat] || []} onChange={v => setMatrixZh(m => ({ ...m, [cat]: v }))} />
            </F>
            <F label="EN labels">
              <SkillChips items={matrixEn[cat] || []} onChange={v => setMatrixEn(m => ({ ...m, [cat]: v }))} />
            </F>
          </div>
        </SectionCard>
      ))}
    </div>
  )
}

// ── Resume Tab ────────────────────────────────────────────────────────────────

function ResumeTab({ toast }) {
  const [html, setHtml] = useState('')
  const [loaded, setLoaded] = useState(false)
  const [saving, setSaving] = useState(false)
  const [preview, setPreview] = useState(false)
  useEffect(() => { api.getResume('zh').then(r => { setHtml(r.html); setLoaded(true) }).catch(() => setLoaded(true)) }, [])
  const save = async () => {
    setSaving(true)
    try { await api.setResume('zh', html); toast('已儲存', true) }
    catch (e) { toast(e.message, false) }
    finally { setSaving(false) }
  }
  if (!loaded) return <p className="text-sm text-[#86868B]">載入中…</p>
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Btn variant="ghost" onClick={() => setPreview(p => !p)}>{preview ? '← 編輯' : '預覽'}</Btn>
        <Btn onClick={save} disabled={saving}>{saving ? '儲存中…' : '儲存'}</Btn>
      </div>
      {preview
        ? <div className="bg-white rounded-2xl shadow-[0_0_0_1px_rgba(0,0,0,0.08)] p-8 h-[74vh] overflow-auto" dangerouslySetInnerHTML={{ __html: html }} />
        : <textarea className="w-full font-mono text-xs bg-[#1D1D1F] text-green-400 rounded-xl p-4 h-[74vh] resize-y border border-transparent focus:outline-none focus:border-[#0071E3]" value={html} onChange={e => setHtml(e.target.value)} spellCheck={false} />
      }
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
        <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between">
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
      <div className="max-w-5xl mx-auto px-6 py-8">
        {renderTab()}
      </div>
      <Toast msg={toastMsg} ok={toastOk} />
    </div>
  )
}
