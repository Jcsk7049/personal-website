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
    <div className="bg-[#F5F5F7] text-[#1D1D1F] font-sans antialiased">
      <Nav             name={cvData.profile.name} />
      <Hero            profile={cvData.profile} />
      <Education       education={cvData.education} />
      <Experience      experience={cvData.experience} />
      <ProjectShowcase projects={cvData.projects} />
      <SkillGrid       skills={cvData.skills_matrix} detail={cvData.skills_detail} />
      <AwardList       awards={cvData.awards} />
      {/* ── Apple Footer ── #F5F5F7 / 12px / rgba opacity system / 0.32s ease */}
      <footer className="bg-[#F5F5F7] border-t border-black/[0.1]">
        <div className="max-w-[980px] mx-auto px-6">

          {/* Top: brand + columns */}
          <div className="pt-10 pb-8 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10">

            {/* Brand block */}
            <div className="max-w-xs">
              <p className="text-[13px] font-semibold text-[rgba(0,0,0,0.88)] mb-2 tracking-tight">
                {cvData.profile.name}
              </p>
              <p className="text-[12px] leading-[1.6] text-[rgba(0,0,0,0.56)]">
                {cvData.profile.bio}
              </p>
            </div>

            {/* Link columns */}
            <div className="flex gap-12 shrink-0">
              <div className="flex flex-col gap-2.5">
                <p className="text-[12px] font-semibold text-[rgba(0,0,0,0.88)] mb-1">內容</p>
                {[
                  { href: '#education',  label: '學歷' },
                  { href: '#experience', label: '經歷' },
                  { href: '#skills',     label: '技術' },
                  { href: '#projects',   label: '專案' },
                  { href: '#awards',     label: '獲獎' },
                ].map(({ href, label }) => (
                  <a key={href} href={href}
                     className="text-[12px] text-[rgba(0,0,0,0.72)] hover:text-[#1D1D1F]"
                     style={{ transition: 'color 0.32s cubic-bezier(0.4,0,0.6,1)' }}>
                    {label}
                  </a>
                ))}
              </div>

              <div className="flex flex-col gap-2.5">
                <p className="text-[12px] font-semibold text-[rgba(0,0,0,0.88)] mb-1">聯絡</p>
                <button
                  onClick={() => { window.location.href = `mailto:${cvData.profile.contact.email}` }}
                  className="text-[12px] text-[rgba(0,0,0,0.72)] hover:text-[#0066CC] text-left"
                  style={{ transition: 'color 0.32s cubic-bezier(0.4,0,0.6,1)' }}>
                  Email
                </button>
                <a href={`https://github.com/${cvData.profile.links.github}`}
                   target="_blank" rel="noopener noreferrer"
                   className="text-[12px] text-[rgba(0,0,0,0.72)] hover:text-[#0066CC]"
                   style={{ transition: 'color 0.32s cubic-bezier(0.4,0,0.6,1)' }}>
                  GitHub ↗
                </a>
                <a href={`https://linkedin.com/in/${cvData.profile.links.linkedin}`}
                   target="_blank" rel="noopener noreferrer"
                   className="text-[12px] text-[rgba(0,0,0,0.72)] hover:text-[#0066CC]"
                   style={{ transition: 'color 0.32s cubic-bezier(0.4,0,0.6,1)' }}>
                  LinkedIn ↗
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-black/[0.1] py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <p className="text-[12px] text-[rgba(0,0,0,0.48)]">
              Copyright © {new Date().getFullYear()} {cvData.profile.name}. All rights reserved.
            </p>
            <p className="text-[12px] text-[rgba(0,0,0,0.48)]">Built with React &amp; Tailwind</p>
          </div>

        </div>
      </footer>
    </div>
  )
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/"             element={<HomePage />}      />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/skills/:id"   element={<SkillDetail />}   />
        <Route path="*"             element={<NotFound />}      />
      </Routes>
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
