import { useState, useCallback } from 'react'
import { useToken, Btn, Toast, LoginPage } from './admin/ui'
import ProjectsTab from './admin/ProjectsTab'
import ProfileTab from './admin/ProfileTab'
import ExperienceTab from './admin/ExperienceTab'
import SkillsTab from './admin/SkillsTab'
import AwardsTab from './admin/AwardsTab'
import ResumeTab from './admin/ResumeTab'

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
            <span className="text-sm font-semibold text-[#1D1D1F]">個人網站編輯頁</span>
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
