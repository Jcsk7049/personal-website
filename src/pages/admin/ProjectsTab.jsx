import { useState } from 'react'
import { api } from '../../api/client'
import { useData } from '../../context/DataContext'
import { accent, CATEGORY_STYLES } from '../../data/designTokens'
import { Btn, SectionCard, EditorWithPreview, LangTab, F, inp, ta, useFlip, DragHandleIcon, ImageUploadBtn } from './ui'

const CATS_ZH = ['大學課程作品', '大學校外作品', '大學專題作品', '高職選手作品']
const EMPTY_PROJ = () => ({ id: '', category: '', title: '', period: '', description: '', tags: [], detail: { images: [], purpose: '', concept: '', outcome: '', tech: [], github: '' } })

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

      <F label="卡片簡介" hint="首頁卡片顯示這段，一兩句就好；留空則顯示摘要前兩行">
        <textarea className={ta} rows={2} value={d.summary || ''} onChange={e => set('summary', e.target.value)} />
      </F>

      <F label="摘要" hint="專案詳情頁的開頭段落">
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

export default function ProjectsTab({ toast }) {
  const { cvZh, cvEn, refresh } = useData()
  const [editing, setEditing] = useState(null)
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(null)
  const [order, setOrder] = useState(null)       // null = 跟隨伺服器順序
  const [dragId, setDragId] = useState(null)
  const serverProjects = cvZh.projects || []
  const projects = order
    ? order.map(id => serverProjects.find(p => p.id === id)).filter(Boolean)
    : serverProjects

  const setRef = useFlip(projects.map(p => p.id).join(','))

  // 拖到別張卡片上方時即時換位（FLIP 會做推開動畫）
  const onDragEnterRow = targetId => {
    if (!dragId || dragId === targetId) return
    const ids = projects.map(p => p.id)
    const from = ids.indexOf(dragId)
    const to   = ids.indexOf(targetId)
    if (from < 0 || to < 0) return
    ids.splice(to, 0, ids.splice(from, 1)[0])
    setOrder(ids)
  }

  const commitOrder = async () => {
    setDragId(null)
    if (!order) return
    try { await api.reorderProjects(order); await refresh(); setOrder(null); toast('順序已更新', true) }
    catch (e) { setOrder(null); toast(e.message, false) }
  }

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
               ref={setRef(p.id)}
               draggable
               onDragStart={e => { setDragId(p.id); e.dataTransfer.effectAllowed = 'move' }}
               onDragOver={e => { e.preventDefault(); e.dataTransfer.dropEffect = 'move' }}
               onDragEnter={() => onDragEnterRow(p.id)}
               onDrop={e => e.preventDefault()}
               onDragEnd={commitOrder}
               className={`flex items-center gap-3 bg-white rounded-2xl px-4 py-3
                          shadow-[0_0_0_1px_rgba(0,0,0,0.08)]
                          hover:shadow-[0_0_0_1px_rgba(0,0,0,0.14)] hover:bg-[#FAFAFA]
                          transition-all duration-[125ms] group
                          ${dragId === p.id ? 'opacity-40' : ''}`}>
            {/* Drag handle */}
            <span className="shrink-0 cursor-grab active:cursor-grabbing text-[#C7C7CC] group-hover:text-[#86868B] transition-colors duration-[125ms]"
                  title="拖拉調整順序">
              <DragHandleIcon />
            </span>
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
