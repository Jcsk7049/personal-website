import { useState, useEffect, useCallback } from 'react'
import { api } from '../api/client'
import { useData } from '../context/DataContext'

// ── Helpers ──────────────────────────────────────────────────────────────────

function useToken() {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token'))
  const save = (t) => { localStorage.setItem('admin_token', t); setToken(t) }
  const clear = () => { localStorage.removeItem('admin_token'); setToken(null) }
  return { token, save, clear }
}

function Btn({ onClick, children, variant = 'primary', disabled, className = '' }) {
  const base = 'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed'
  const styles = {
    primary: 'bg-[#0071E3] text-white hover:bg-[#0077ED]',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    ghost: 'bg-black/[0.06] text-[#1D1D1F] hover:bg-black/[0.1]',
  }
  return <button className={`${base} ${styles[variant]} ${className}`} onClick={onClick} disabled={disabled}>{children}</button>
}

function Toast({ msg, ok }) {
  if (!msg) return null
  return (
    <div className={`fixed bottom-6 right-6 px-4 py-2.5 rounded-xl text-sm font-medium shadow-lg z-50 ${ok ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
      {msg}
    </div>
  )
}

function JsonEditor({ value, onChange, rows = 16 }) {
  const [raw, setRaw] = useState(() => JSON.stringify(value, null, 2))
  const [err, setErr] = useState('')

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
          className="w-full px-3 py-2 rounded-lg border border-black/10 text-sm focus:outline-none focus:border-[#0071E3]"
          autoFocus
        />
        {err && <p className="text-sm text-red-500">{err}</p>}
        <Btn disabled={loading || !pw}>{loading ? '登入中…' : '登入'}</Btn>
      </form>
    </div>
  )
}

// ── Projects Tab ──────────────────────────────────────────────────────────────

function ProjectsTab({ toast }) {
  const { cvZh, cvEn, refresh } = useData()
  const [editing, setEditing] = useState(null) // { zh, en } | null
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(null)

  const projects = cvZh.projects || []

  const openNew = () => {
    setEditId(null)
    setEditing({
      zh: { id: '', category: '', title: '', period: '', description: '', tags: [], detail: { images: [], purpose: '', concept: '', outcome: '', tech: [], github: '' } },
      en: { id: '', category: '', title: '', period: '', description: '', tags: [], detail: { images: [], purpose: '', concept: '', outcome: '', tech: [], github: '' } },
    })
  }

  const openEdit = (proj) => {
    const enProj = cvEn.projects?.find(p => p.id === proj.id) || {}
    setEditId(proj.id)
    setEditing({ zh: JSON.parse(JSON.stringify(proj)), en: JSON.parse(JSON.stringify(enProj)) })
  }

  const save = async () => {
    setSaving(true)
    try {
      if (editId) {
        await api.updateProject(editId, editing.zh, editing.en)
      } else {
        await api.createProject(editing.zh, editing.en)
      }
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
    if (!confirm(`確定刪除專案 ${id}？`)) return
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-widest text-[#86868B] uppercase">中文（zh）</p>
            <JsonEditor value={editing.zh} onChange={v => setEditing(e => ({ ...e, zh: v }))} rows={30} />
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-widest text-[#86868B] uppercase">English（en）</p>
            <JsonEditor value={editing.en} onChange={v => setEditing(e => ({ ...e, en: v }))} rows={30} />
          </div>
        </div>

        <Btn onClick={save} disabled={saving}>{saving ? '儲存中…' : '儲存'}</Btn>
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

// ── Section Tab (JSON editor) ─────────────────────────────────────────────────

function SectionTab({ sectionKey, label, toast }) {
  const { cvZh, cvEn, refresh } = useData()
  const [zh, setZh] = useState(null)
  const [en, setEn] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setZh(cvZh[sectionKey] ?? null)
    setEn(cvEn[sectionKey] ?? null)
  }, [cvZh, cvEn, sectionKey])

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
          <p className="text-xs font-semibold tracking-widest text-[#86868B] uppercase">中文（zh）</p>
          <JsonEditor value={zh} onChange={setZh} rows={20} />
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-widest text-[#86868B] uppercase">English（en）</p>
          <JsonEditor value={en} onChange={setEn} rows={20} />
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
      <textarea
        className="w-full font-mono text-xs bg-[#1D1D1F] text-green-400 rounded-xl p-4 h-[60vh] resize-y focus:outline-none focus:border-[#0071E3] border border-transparent"
        value={html}
        onChange={e => setHtml(e.target.value)}
        spellCheck={false}
      />
      <Btn onClick={save} disabled={saving}>{saving ? '儲存中…' : '儲存履歷 HTML'}</Btn>
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
    return <SectionTab sectionKey={tab} label={found?.label} toast={toast} />
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      {/* Top bar */}
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
            <a href="/" target="_blank" className="text-xs text-[#86868B] hover:text-[#1D1D1F]">← 回網站</a>
            <Btn variant="ghost" onClick={clear}>登出</Btn>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {renderTab()}
      </div>

      <Toast msg={toastMsg} ok={toastOk} />
    </div>
  )
}
