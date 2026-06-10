import { useState } from 'react'
import { api } from '../../api/client'
import { useData } from '../../context/DataContext'
import { Btn, EditorWithPreview, LangTab, F, inp, ta } from './ui'

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

export default function ExperienceTab({ toast }) {
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
