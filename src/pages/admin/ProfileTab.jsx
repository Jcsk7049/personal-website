import { useState } from 'react'
import { api } from '../../api/client'
import { useData } from '../../context/DataContext'
import { Btn, SectionCard, EditorWithPreview, LangTab, F, inp, ta, ImageUploadBtn } from './ui'

export default function ProfileTab({ toast }) {
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
