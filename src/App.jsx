import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav             from './components/Nav'
import Hero            from './components/Hero'
import Education       from './components/Education'
import Experience      from './components/Experience'
import SkillGrid       from './components/SkillGrid'
import ProjectShowcase from './components/ProjectShowcase'
import AwardList       from './components/AwardList'
import ProjectDetail   from './pages/ProjectDetail'
import NotFound        from './pages/NotFound'
import cvData          from './data/cvData.json'

function HomePage() {
  useEffect(() => {
    const sections = document.querySelectorAll('section:not(#hero)')
    sections.forEach(s => s.classList.add('reveal'))

    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible')
          observer.unobserve(e.target)
        }
      }),
      { threshold: 0.06 }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="bg-[#F5F5F7] text-[#1D1D1F] font-sans antialiased">
      <Nav             name={cvData.profile.name} />
      <Hero            profile={cvData.profile} />
      <Education       education={cvData.education} />
      <Experience      experience={cvData.experience} />
      <SkillGrid       skills={cvData.skills_matrix} />
      <ProjectShowcase projects={cvData.projects} />
      <AwardList       awards={cvData.awards} />

      <footer className="py-20 bg-white border-t border-[#E5E5EA]">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 mb-12">
            <div>
              <p className="text-sm font-bold text-[#1D1D1F] tracking-tight mb-1.5">
                {cvData.profile.name}
              </p>
              <p className="text-xs text-[#86868B] leading-relaxed max-w-[18rem]">
                {cvData.profile.title || '電機工程・醫療 AI・嵌入式系統'}
              </p>
            </div>
            <nav className="flex gap-12">
              <div className="flex flex-col gap-3">
                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#C7C7CC] mb-1">
                  內容
                </p>
                {[
                  ['#education',  '學歷'],
                  ['#experience', '經歷'],
                  ['#skills',     '技術'],
                  ['#projects',   '專案'],
                  ['#awards',     '獲獎'],
                ].map(([href, label]) => (
                  <a key={href} href={href}
                     className="text-xs text-[#86868B] hover:text-[#1D1D1F] transition-colors duration-200">
                    {label}
                  </a>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#C7C7CC] mb-1">
                  聯絡
                </p>
                <a href={`mailto:${cvData.profile.contact.email}`}
                   className="text-xs text-[#86868B] hover:text-[#0071E3] transition-colors duration-200">
                  Email
                </a>
                <a href={`https://github.com/${cvData.profile.links.github}`}
                   target="_blank" rel="noopener noreferrer"
                   className="text-xs text-[#86868B] hover:text-[#0071E3] transition-colors duration-200">
                  GitHub ↗
                </a>
                <a href={`https://linkedin.com/in/${cvData.profile.links.linkedin}`}
                   target="_blank" rel="noopener noreferrer"
                   className="text-xs text-[#86868B] hover:text-[#0071E3] transition-colors duration-200">
                  LinkedIn ↗
                </a>
              </div>
            </nav>
          </div>
          <div className="border-t border-[#F5F5F7] pt-6 flex items-center justify-between">
            <p className="text-[11px] text-[#C7C7CC]">
              © {new Date().getFullYear()} {cvData.profile.name}
            </p>
            <p className="text-[11px] text-[#C7C7CC]">Built with React & Tailwind</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"             element={<HomePage />}     />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="*"             element={<NotFound />}     />
      </Routes>
    </BrowserRouter>
  )
}
