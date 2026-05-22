import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Nav             from './components/Nav'
import Hero            from './components/Hero'
import Education       from './components/Education'
import Experience      from './components/Experience'
import SkillGrid       from './components/SkillGrid'
import ProjectShowcase from './components/ProjectShowcase'
import AwardList       from './components/AwardList'
import ProjectDetail   from './pages/ProjectDetail'
import SkillDetail     from './pages/SkillDetail'
import NotFound        from './pages/NotFound'
import ScrollToTop     from './components/ScrollToTop'
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
      { threshold: 0.07 }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="bg-white text-[#1D1D1F] font-sans antialiased">
      <Nav             name={cvData.profile.name} />
      <Hero            profile={cvData.profile} />
      <Education       education={cvData.education} />
      <Experience      experience={cvData.experience} />
      <ProjectShowcase projects={cvData.projects} />
      <SkillGrid       skills={cvData.skills_matrix} detail={cvData.skills_detail} />
      <AwardList       awards={cvData.awards} />
      <footer className="py-16 bg-white border-t border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-10">
            <div>
              <p className="text-sm font-semibold text-[#1D1D1F] tracking-[-0.01em] mb-1">{cvData.profile.name}</p>
              <p className="text-xs text-[#86868B]">{cvData.profile.title}</p>
            </div>
            <nav className="flex gap-10">
              <div className="flex flex-col gap-2.5">
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#C7C7CC] mb-0.5">內容</p>
                <a href="#education"  className="text-xs text-[#86868B] hover:text-[#1D1D1F] transition-colors duration-150">學歷</a>
                <a href="#experience" className="text-xs text-[#86868B] hover:text-[#1D1D1F] transition-colors duration-150">經歷</a>
                <a href="#skills"     className="text-xs text-[#86868B] hover:text-[#1D1D1F] transition-colors duration-150">技術</a>
                <a href="#projects"   className="text-xs text-[#86868B] hover:text-[#1D1D1F] transition-colors duration-150">專案</a>
                <a href="#awards"     className="text-xs text-[#86868B] hover:text-[#1D1D1F] transition-colors duration-150">獲獎</a>
              </div>
              <div className="flex flex-col gap-2.5">
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#C7C7CC] mb-0.5">聯絡</p>
                <button
                   onClick={() => { window.location.href = `mailto:${cvData.profile.contact.email}` }}
                   className="text-xs text-[#86868B] hover:text-[#0071E3] transition-colors duration-150 text-left">Email</button>
                <a href={`https://github.com/${cvData.profile.links.github}`}
                   target="_blank" rel="noopener noreferrer"
                   className="text-xs text-[#86868B] hover:text-[#0071E3] transition-colors duration-150">GitHub ↗</a>
                <a href={`https://linkedin.com/in/${cvData.profile.links.linkedin}`}
                   target="_blank" rel="noopener noreferrer"
                   className="text-xs text-[#86868B] hover:text-[#0071E3] transition-colors duration-150">LinkedIn ↗</a>
              </div>
            </nav>
          </div>
          <div className="border-t border-gray-100 pt-6 flex items-center justify-between">
            <p className="text-xs text-[#C7C7CC]">© {new Date().getFullYear()} {cvData.profile.name}</p>
            <p className="text-xs text-[#C7C7CC]">Built with React & Tailwind</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function AppRoutes() {
  const location   = useLocation()
  const background = location.state?.background

  return (
    <>
      <ScrollToTop />
      <Routes location={background || location}>
        <Route path="/"             element={<HomePage />}      />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/skills/:id"   element={<SkillDetail />}   />
        <Route path="*"             element={<NotFound />}      />
      </Routes>
      {background && (
        <Routes>
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/skills/:id"   element={<SkillDetail />}   />
        </Routes>
      )}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
