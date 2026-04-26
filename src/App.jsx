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
      { threshold: 0.07 }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="page-enter bg-white text-[#1D1D1F] font-sans antialiased">
      <Nav             name={cvData.profile.name} />
      <Hero            profile={cvData.profile} />
      <Education       education={cvData.education} />
      <Experience      experience={cvData.experience} />
      <SkillGrid       skills={cvData.skills_matrix} />
      <ProjectShowcase projects={cvData.projects} />
      <AwardList       awards={cvData.awards} />
      <footer className="py-16 text-center text-sm text-[#86868B] border-t border-gray-100">
        © {new Date().getFullYear()} {cvData.profile.name} · Built with React & Tailwind
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
