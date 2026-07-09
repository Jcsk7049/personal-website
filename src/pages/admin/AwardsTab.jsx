import { useState } from 'react'
import { api } from '../../api/client'
import { useData } from '../../context/DataContext'
import { Btn, EditorWithPreview, F, inp, DragHandleIcon } from './ui'

export default function AwardsTab({ toast }) {
  const { cvZh, cvEn, refresh } = useData()
  const [items, setItems] = useState(() => ({
    zh: JSON.parse(JSON.stringify(cvZh.awards || [])),
    en: JSON.parse(JSON.stringify(cvEn.awards || [])),
  }))
  const [saving, setSaving] = useState(false)
  const [dragIdx, setDragIdx] = useState(null)

  const addNew = () => setItems(s => ({
    zh: [...s.zh, { title: '', year: '' }],
    en: [...s.en, { title: '', year: '' }],
  }))

  const moveTo = to => {
    if (dragIdx === null || dragIdx === to) { setDragIdx(null); return }
    setItems(s => {
      const mv = arr => { const a = [...arr]; a.splice(to, 0, a.splice(dragIdx, 1)[0]); return a }
      return { zh: mv(s.zh), en: mv(s.en) }
    })
    setDragIdx(null)
  }
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
            <div key={i}
                 onDragOver={e => { e.preventDefault(); e.dataTransfer.dropEffect = 'move' }}
                 onDrop={() => moveTo(i)}
                 className={`relative bg-white rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.08)] p-4 pl-9
                             transition-opacity duration-[240ms] ${dragIdx === i ? 'opacity-40' : ''}`}>
              <span draggable
                    onDragStart={e => { setDragIdx(i); e.dataTransfer.effectAllowed = 'move' }}
                    onDragEnd={() => setDragIdx(null)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing
                               text-[#C7C7CC] hover:text-[#86868B] transition-colors duration-[240ms]"
                    title="拖拉調整順序">
                <DragHandleIcon />
              </span>
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
