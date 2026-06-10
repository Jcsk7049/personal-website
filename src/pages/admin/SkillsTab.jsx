import { useState } from 'react'
import { api } from '../../api/client'
import { useData } from '../../context/DataContext'
import { SKILL_CAT_ACCENTS, LEVEL_CONFIG, SKILL_LEVELS } from '../../data/designTokens'
import { Btn, SectionCard, EditorWithPreview, LangTab, F, inp, ta } from './ui'

const SKILL_CAT_LABELS = {
  manufacturing: '製造 / Manufacturing',
  programming:   '程式 / Programming',
  eda:           'EDA 電路設計',
  data_analysis: '數據分析 / ML',
  embedded:      '嵌入式系統',
  web:           'Web / 後端',
}

function SkillChips({ items, onChange, levelOf }) {
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
        ) : (() => {
          const level = levelOf?.(s, i)
          const cfg = level ? LEVEL_CONFIG[level] : null
          return (
            <span key={i}
              className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full cursor-pointer
                          ${cfg ? cfg.badge : 'bg-[#F5F5F7] text-[#3F3F46]'} hover:opacity-80`}
              onClick={() => startEdit(i)} title={level ? `${level}，點擊編輯` : '點擊編輯'}>
              {cfg && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${cfg.bar}`} />}
              {s}
              <button type="button" onClick={e => { e.stopPropagation(); remove(i) }} className="opacity-60 hover:opacity-100 hover:text-red-500 text-base leading-none">&times;</button>
            </span>
          )
        })())}
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
          const cfg = LEVEL_CONFIG[s.level] || LEVEL_CONFIG['基礎']
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
                const cfg = LEVEL_CONFIG[skill.level] || LEVEL_CONFIG['基礎']
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

export default function SkillsTab({ toast }) {
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
        preview={
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cats.map(cat => {
              const tags = matrixZh[cat] || []
              const skillList = detailZh[cat]?.skills || []
              const counts = { '進階': 0, '熟悉': 0, '基礎': 0 }
              skillList.forEach(s => { if (s.level in counts) counts[s.level]++ })
              return (
                <div key={cat} className="rounded-[18px] bg-white p-6 flex flex-col gap-4">
                  <h3 className="text-lg font-semibold tracking-tight text-[#1D1D1F]">
                    {detailZh[cat]?.title || SKILL_CAT_LABELS[cat] || cat}
                  </h3>
                  {detailZh[cat]?.overview && (
                    <p className="text-sm text-[#3F3F46] leading-relaxed line-clamp-2">{detailZh[cat].overview}</p>
                  )}
                  {skillList.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex h-[3px] rounded-full overflow-hidden gap-0.5">
                        {counts['進階'] > 0 && <div className={`${LEVEL_CONFIG['進階'].bar} rounded-full`} style={{ flex: counts['進階'] }} />}
                        {counts['熟悉'] > 0 && <div className={`${LEVEL_CONFIG['熟悉'].bar} rounded-full`} style={{ flex: counts['熟悉'] }} />}
                        {counts['基礎'] > 0 && <div className={`${LEVEL_CONFIG['基礎'].bar} rounded-full`} style={{ flex: counts['基礎'] }} />}
                      </div>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map(skill => (
                      <span key={skill} className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#F5F5F7] text-[#3F3F46]">
                        {skill}
                      </span>
                    ))}
                  </div>
                  {skillList.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-black/[0.06]">
                      {skillList.map(s => (
                        <span key={s.name} className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${(LEVEL_CONFIG[s.level] || LEVEL_CONFIG['基礎']).badge}`}>
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
                  <SkillChips items={matrixZh[cat] || []} onChange={v => setMatrixZh(m => ({ ...m, [cat]: v }))}
                    levelOf={name => detailZh[cat]?.skills?.find(s => s.name === name)?.level} />
                </F>
                <F label="EN labels" hint="顏色與同位置的中文標籤同步">
                  <SkillChips items={matrixEn[cat] || []} onChange={v => setMatrixEn(m => ({ ...m, [cat]: v }))}
                    levelOf={(name, i) => {
                      const zhName = (matrixZh[cat] || [])[i]
                      return detailZh[cat]?.skills?.find(s => s.name === zhName)?.level
                          ?? detailEn[cat]?.skills?.find(s => s.name === name)?.level
                    }} />
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
