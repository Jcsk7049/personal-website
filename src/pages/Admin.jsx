import { useState, useEffect, useCallback } from 'react'
import { api } from '../api/client'
import { useData } from '../context/DataContext'

// ── Helpers ───────────────────────────────────────────────────────────────────

function useToken() {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token'))
  const save = (t) => { localStorage.setItem('admin_token', t); setToken(t) }
  const clear = () => { localStorage.removeItem('admin_token'); setToken(null) }
  return { token, save, clear }
}

function Btn({ onClick, children, variant = 'primary', disabled, type = 'button', className = '' }) {
  const base = 'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed'
  const styles = {
    primary: 'bg-[#0071E3] text-white hover:bg-[#0077ED]',
    danger:  'bg-red-500 text-white hover:bg-red-600',
    ghost:   'bg-black/[0.06] text-[#1D1D1F] hover:bg-black/[0.1]',
  }
  return (
    <button type={type} className={`${base} ${styles[variant]} ${className}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

function Toast({ msg, ok }) {
  if (!msg) return null
  return (
    <div className={`fixed bottom-6 right-6 px-4 py-2.5 rounded-xl text-sm font-medium shadow-lg z-50 transition-all ${ok ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
      {msg}
    </div>
  )
}

function Field({ label, children, hint }) {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-medium text-[#3F3F46]">
        {label}
        {hint && <span className="ml-1.5 text-[#86868B] font-normal">{hint}</span>}
      </label>
      {children}
    </div>
  )
}

const inputCls = 'w-full px-3 py-2 rounded-lg border border-black/10 text-sm focus:outline-none focus:border-[#0071E3] bg-white'
const textareaCls = `${inputCls} resize-y`

function JsonEditor({ value, onChange, rows = 16 }) {
  const [raw, setRaw] = useState(() => JSON.stringify(value, null, 2))
  const [err, setErr] = useState('')

  useEffect(() => {
    setRaw(JSON.stringify(value, null, 2))
    setErr('')
  }, [])  // only on mount; user edits are authoritative after that

  const handleChange = (v) => {
    setRaw(v)
    try { onChange(JSON.parse(v)); setErr('') }
    catch { setErr('JSON 格式錯誤') }
  }

  return (
    <div className="space-y-1">
      <textarea
        className={`w-full font-mono text-xs bg-[#1D1D1F] text-green-400 rounded-xl p-4 resize-y border ${err ? 'border-red-500' : 'border-transparent'} focus:outline-none focus:border-[#0071E3]`}
        rows={rows}
        value={raw}
        onChange={e => handleChange(e.target.value)}
        spellCheck={false}
      />
      {err && <p className="text-xs text-red-500">{err}</p>}
    </div>
  )
}

// ── Login ─────────────────────────────────────────────────────────────────────

function LoginPage({ onLogin }) {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true); setErr('')
    try {
      const { token } = await api.login(pw)
      onLogin(token)
    } catch {
      setErr('密碼錯誤')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center">
      <form onSubmit={submit} className="bg-white rounded-2xl shadow-[0_0_0_1px_rgba(0,0,0,0.08)] p-8 w-80 space-y-4">
        <h1 className="text-lg font-semibold text-[#1D1D1F]">Admin 後台</h1>
        <input
          type="password"
          placeholder="密碼"
          value={pw}
          onChange={e => setPw(e.target.value)}
          className={inputCls}
          autoFocus
        />
        {err && <p className="text-sm text-red-500">{err}</p>}
        <Btn type="submit" disabled={loading || !pw}>{loading ? '登入中…' : '登入'}</Btn>
      </form>
    </div>
  )
}

// ── Project Form ──────────────────────────────────────────────────────────────

const CATEGORIES = ['大學課程作品', '大學校外作品', '大學專題作品', '高職選手作品']

function TechEditor({ value = [], onChange }) {
  // value: [{name, items: [], note}]
  const add = () => onChange([...value, { name: '', items: [], note: '' }])
  const remove = (i) => onChange(value.filter((_, idx) => idx !== i))
  const update = (i, field, v) => {
    const next = value.map((t, idx) => idx === i ? { ...t, [field]: v } : t)
    onChange(next)
  }
  const updateItems = (i, raw) => {
    update(i, 'items', raw.split(',').map(s => s.trim()).filter(Boolean))
  }

  return (
    <div className="space-y-3">
      {value.map((t, i) => (
        <div key={i} className="bg-black/[0.03] rounded-xl p-3 space-y-2 relative">
          <button
            type="button"
            onClick={() => remove(i)}
            className="absolute top-2 right-2 text-xs text-red-400 hover:text-red-600"
          >✕</button>
          <Field label="群組名稱">
            <input className={inputCls} value={t.name} onChange={e => update(i, 'name', e.target.value)} placeholder="例：硬體" />
          </Field>
          <Field label="技術項目" hint="逗號分隔">
            <input className={inputCls} value={t.items?.join(', ')} onChange={e => updateItems(i, e.target.value)} placeholder="Arduino, ESP32" />
          </Field>
          <Field label="備註（選填）">
            <input className={inputCls} value={t.note || ''} onChange={e => update(i, 'note', e.target.value)} />
          </Field>
        </div>
      ))}
      <button type="button" onClick={add} className="text-xs text-[#0071E3] hover:underline">+ 新增技術群組</button>
    </div>
  )
}

function ImagesEditor({ value = [], onChange }) {
  const add = () => onChange([...value, { src: '', caption: '' }])
  const remove = (i) => onChange(value.filter((_, idx) => idx !== i))
  const update = (i, field, v) => onChange(value.map((img, idx) => idx === i ? { ...img, [field]: v } : img))

  return (
    <div className="space-y-2">
      {value.map((img, i) => (
        <div key={i} className="flex gap-2 items-start">
          <div className="flex-1 space-y-1">
            <input className={inputCls} placeholder="路徑 /images/xxx/cover.png" value={img.src || ''} onChange={e => update(i, 'src', e.target.value)} />
            <input className={inputCls} placeholder="說明文字（選填）" value={img.caption || ''} onChange={e => update(i, 'caption', e.target.value)} />
          </div>
          <button type="button" onClick={() => remove(i)} className="mt-2 text-xs text-red-400 hover:text-red-600 shrink-0">✕</button>
        </div>
      ))}
      <button type="button" onClick={add} className="text-xs text-[#0071E3] hover:underline">+ 新增圖片</button>
    </div>
  )
}

function ProjectForm({ data, onChange, lang }) {
  const set = (field, value) => onChange({ ...data, [field]: value })
  const setDetail = (field, value) => onChange({ ...data, detail: { ...data.detail, [field]: value } })
  const d = data.detail || {}

  return (
    <div className="space-y-4">
      <p className="text-xs font-semibold tracking-widest text-[#86868B] uppercase">{lang === 'zh' ? '中文（ZH）' : 'English（EN）'}</p>

      <div className="grid grid-cols-2 gap-3">
        {lang === 'zh' && (
          <Field label="ID">
            <input className={inputCls} value={data.id || ''} onChange={e => set('id', e.target.value)} placeholder="pcb-defect-detection" />
          </Field>
        )}
        <Field label={lang === 'zh' ? '分類' : 'Category'}>
          {lang === 'zh'
            ? (
              <select className={inputCls} value={data.category || ''} onChange={e => set('category', e.target.value)}>
                <option value="">選擇分類</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            )
            : <input className={inputCls} value={data.category || ''} onChange={e => set('category', e.target.value)} placeholder="University Project" />
          }
        </Field>
        <Field label={lang === 'zh' ? '時間' : 'Period'}>
          <input className={inputCls} value={data.period || ''} onChange={e => set('period', e.target.value)} placeholder="2025 — 至今" />
        </Field>
      </div>

      <Field label={lang === 'zh' ? '標題' : 'Title'}>
        <input className={inputCls} value={data.title || ''} onChange={e => set('title', e.target.value)} />
      </Field>

      <Field label={lang === 'zh' ? '摘要描述' : 'Short description'}>
        <textarea className={textareaCls} rows={2} value={data.description || ''} onChange={e => set('description', e.target.value)} />
      </Field>

      <Field label="Tags" hint="逗號分隔">
        <input className={inputCls} value={(data.tags || []).join(', ')} onChange={e => set('tags', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} />
      </Field>

      <hr className="border-black/[0.06]" />
      <p className="text-xs font-medium text-[#86868B] uppercase tracking-wider">Detail</p>

      <Field label={lang === 'zh' ? '做這個的原因' : 'Purpose'}>
        <textarea className={textareaCls} rows={3} value={d.purpose || ''} onChange={e => setDetail('purpose', e.target.value)} />
      </Field>

      <Field label={lang === 'zh' ? '怎麼做的' : 'Concept'}>
        <textarea className={textareaCls} rows={3} value={d.concept || ''} onChange={e => setDetail('concept', e.target.value)} />
      </Field>

      <Field label={lang === 'zh' ? '結果/成效' : 'Outcome'}>
        <textarea className={textareaCls} rows={3} value={d.outcome || ''} onChange={e => setDetail('outcome', e.target.value)} />
      </Field>

      <Field label="GitHub URL（選填）">
        <input className={inputCls} value={d.github || ''} onChange={e => setDetail('github', e.target.value)} placeholder="https://github.com/..." />
      </Field>

      <Field label={lang === 'zh' ? '使用技術' : 'Tech stack'}>
        <TechEditor value={d.tech} onChange={v => setDetail('tech', v)} />
      </Field>

      {lang === 'zh' && (
        <Field label="圖片">
          <ImagesEditor value={d.images} onChange={v => setDetail('images', v)} />
        </Field>
      )}
    </div>
  )
}

// ── Projects Tab ──────────────────────────────────────────────────────────────

const EMPTY_PROJ = () => ({
  id: '', category: '', title: '', period: '', description: '', tags: [],
  detail: { images: [], purpose: '', concept: '', outcome: '', tech: [], github: '' },
})

function ProjectsTab({ toast }) {
  const { cvZh, cvEn, refresh } = useData()
  const [editing, setEditing] = useState(null)
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(null)

  const projects = cvZh.projects || []

  const openNew = () => { setEditId(null); setEditing({ zh: EMPTY_PROJ(), en: EMPTY_PROJ() }) }
  const openEdit = (proj) => {
    const en = cvEn.projects?.find(p => p.id === proj.id) || {}
    setEditId(proj.id)
    setEditing({ zh: JSON.parse(JSON.stringify(proj)), en: JSON.parse(JSON.stringify(en)) })
  }

  const save = async () => {
    if (!editing.zh.id) return toast('請填寫 ID', false)
    setSaving(true)
    try {
      if (editId) await api.updateProject(editId, editing.zh, editing.en)
      else        await api.createProject(editing.zh, editing.en)
      await refresh()
      setEditing(null)
      toast('儲存成功', true)
    } catch (e) {
      toast(e.message, false)
    } finally {
      setSaving(false)
    }
  }

  const del = async (id) => {
    if (!confirm(`確定刪除「${id}」？`)) return
    setDeleting(id)
    try {
      await api.deleteProject(id)
      await refresh()
      toast('已刪除', true)
    } catch (e) {
      toast(e.message, false)
    } finally {
      setDeleting(null)
    }
  }

  if (editing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Btn variant="ghost" onClick={() => setEditing(null)}>← 返回</Btn>
          <h2 className="text-base font-semibold">{editId ? `編輯：${editId}` : '新增專案'}</h2>
          <Btn onClick={save} disabled={saving} className="ml-auto">{saving ? '儲存中…' : '儲存'}</Btn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-[0_0_0_1px_rgba(0,0,0,0.08)] p-5">
            <ProjectForm data={editing.zh} onChange={v => setEditing(e => ({ ...e, zh: v }))} lang="zh" />
          </div>
          <div className="bg-white rounded-2xl shadow-[0_0_0_1px_rgba(0,0,0,0.08)] p-5">
            <ProjectForm data={editing.en} onChange={v => setEditing(e => ({ ...e, en: v }))} lang="en" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#86868B]">共 {projects.length} 個專案</p>
        <Btn onClick={openNew}>+ 新增專案</Btn>
      </div>
      <div className="space-y-2">
        {projects.map(proj => (
          <div key={proj.id} className="flex items-center justify-between bg-white rounded-xl px-4 py-3 shadow-[0_0_0_1px_rgba(0,0,0,0.08)]">
            <div>
              <p className="text-sm font-medium text-[#1D1D1F]">{proj.title}</p>
              <p className="text-xs text-[#86868B]">{proj.id} · {proj.category} · {proj.period}</p>
            </div>
            <div className="flex gap-2">
              <Btn variant="ghost" onClick={() => openEdit(proj)}>編輯</Btn>
              <Btn variant="danger" disabled={deleting === proj.id} onClick={() => del(proj.id)}>
                {deleting === proj.id ? '…' : '刪除'}
              </Btn>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Section Tab ───────────────────────────────────────────────────────────────

function SectionTab({ sectionKey, label, toast }) {
  const { cvZh, cvEn, refresh } = useData()
  const [zh, setZh] = useState(cvZh[sectionKey] ?? null)
  const [en, setEn] = useState(cvEn[sectionKey] ?? null)
  const [saving, setSaving] = useState(false)

  const save = async () => {
    setSaving(true)
    try {
      await api.setSection(sectionKey, zh, en)
      await refresh()
      toast('儲存成功', true)
    } catch (e) {
      toast(e.message, false)
    } finally {
      setSaving(false)
    }
  }

  if (zh === null) return <p className="text-sm text-[#86868B]">載入中…</p>

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-widest text-[#86868B] uppercase">中文（ZH）</p>
          <JsonEditor value={zh} onChange={setZh} rows={22} />
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-widest text-[#86868B] uppercase">English（EN）</p>
          <JsonEditor value={en} onChange={setEn} rows={22} />
        </div>
      </div>
      <Btn onClick={save} disabled={saving}>{saving ? '儲存中…' : `儲存 ${label}`}</Btn>
    </div>
  )
}

// ── Resume Tab ────────────────────────────────────────────────────────────────

function ResumeTab({ toast }) {
  const [html, setHtml] = useState('')
  const [loaded, setLoaded] = useState(false)
  const [saving, setSaving] = useState(false)
  const [preview, setPreview] = useState(false)

  useEffect(() => {
    api.getResume('zh').then(r => { setHtml(r.html); setLoaded(true) }).catch(() => setLoaded(true))
  }, [])

  const save = async () => {
    setSaving(true)
    try {
      await api.setResume('zh', html)
      toast('儲存成功', true)
    } catch (e) {
      toast(e.message, false)
    } finally {
      setSaving(false)
    }
  }

  if (!loaded) return <p className="text-sm text-[#86868B]">載入中…</p>

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Btn variant="ghost" onClick={() => setPreview(p => !p)}>
          {preview ? '← 編輯' : '預覽'}
        </Btn>
        <Btn onClick={save} disabled={saving}>{saving ? '儲存中…' : '儲存'}</Btn>
      </div>
      {preview
        ? <div className="bg-white rounded-2xl shadow-[0_0_0_1px_rgba(0,0,0,0.08)] p-6 h-[72vh] overflow-auto" dangerouslySetInnerHTML={{ __html: html }} />
        : <textarea
            className="w-full font-mono text-xs bg-[#1D1D1F] text-green-400 rounded-xl p-4 h-[72vh] resize-y focus:outline-none focus:border-[#0071E3] border border-transparent"
            value={html}
            onChange={e => setHtml(e.target.value)}
            spellCheck={false}
          />
      }
    </div>
  )
}

// ── Main Admin ────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'projects',      label: '專案' },
  { id: 'profile',       label: '簡介' },
  { id: 'experience',    label: '經歷' },
  { id: 'skills_matrix', label: '技能' },
  { id: 'awards',        label: '獎項' },
  { id: 'resume',        label: '履歷 HTML' },
]

export default function Admin() {
  const { token, save: saveToken, clear } = useToken()
  const [tab, setTab] = useState('projects')
  const [toastMsg, setToastMsg] = useState('')
  const [toastOk, setToastOk] = useState(true)

  const toast = useCallback((msg, ok = true) => {
    setToastMsg(msg); setToastOk(ok)
    setTimeout(() => setToastMsg(''), 2500)
  }, [])

  if (!token) return <LoginPage onLogin={saveToken} />

  const renderTab = () => {
    if (tab === 'projects') return <ProjectsTab toast={toast} />
    if (tab === 'resume')   return <ResumeTab toast={toast} />
    const found = TABS.find(t => t.id === tab)
    // key={tab} forces remount on tab switch, preventing stale JSON editor state
    return <SectionTab key={tab} sectionKey={tab} label={found?.label} toast={toast} />
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <div className="bg-white border-b border-black/[0.08] sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="text-sm font-semibold text-[#1D1D1F]">Admin</span>
            <nav className="flex gap-1">
              {TABS.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${tab === t.id ? 'bg-[#0071E3] text-white' : 'text-[#3F3F46] hover:bg-black/[0.06]'}`}
                >
                  {t.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" rel="noreferrer" className="text-xs text-[#86868B] hover:text-[#1D1D1F]">← 回網站</a>
            <Btn variant="ghost" onClick={clear}>登出</Btn>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {renderTab()}
      </div>

      <Toast msg={toastMsg} ok={toastOk} />
    </div>
  )
}
