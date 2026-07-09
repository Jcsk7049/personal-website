import { useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import { ActiveSectionProvider } from './context/ActiveSectionContext'
import { DataProvider, useData } from './context/DataContext'
import { uiText } from './data/uiText'
import Nav             from './components/Nav'
import Hero            from './components/Hero'
import Experience      from './components/Experience'
import SkillGrid       from './components/SkillGrid'
import ProjectShowcase from './components/ProjectShowcase'
import AwardList           from './components/AwardList'
import DotNav              from './components/DotNav'
import GuestbookContact    from './components/GuestbookContact'
import NotFound        from './pages/NotFound'
import ScrollToTop     from './components/ScrollToTop'
import ErrorBoundary   from './components/ErrorBoundary'

const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const SkillDetail   = lazy(() => import('./pages/SkillDetail'))
const Card          = lazy(() => import('./pages/Card'))
const QRPage        = lazy(() => import('./pages/QRPage'))
const Admin         = lazy(() => import('./pages/Admin'))

function HomePage() {
  const { lang } = useLanguage()
  const { cvZh, cvEn } = useData()
  const t = uiText[lang]
  const cv = lang === 'en' ? cvEn : cvZh

  useEffect(() => {
    document.title = lang === 'en'
      ? 'Chiang Jia Yuan — Hardware/Software Integration'
      : '江嘉元 — 軟硬整合 · 從 PCB 到韌體到資料'
  }, [lang])

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
    <ActiveSectionProvider>
    <div className="bg-[#F5F5F7] text-[#1D1D1F] font-sans antialiased">
      <DotNav />
      <Nav             name={cv.profile.name} />
      <Hero            profile={cv.profile} />
      <Experience      experience={cv.experience} education={cv.education} />
      <ProjectShowcase projects={cv.projects} />
      <SkillGrid       skills={cv.skills_matrix} detail={cv.skills_detail} />
      <AwardList       awards={cv.awards} />
      <GuestbookContact profile={cv.profile} />

      {/* ── Apple Footer ── */}
      <footer className="bg-[#F5F5F7] border-t border-black/[0.1]">
        <div className="max-w-[980px] mx-auto px-6">

          {/* Top: brand + columns */}
          <div className="pt-10 pb-8 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10">

            {/* Brand block */}
            <div className="max-w-xs">
              <p className="text-[13px] font-semibold text-[rgba(0,0,0,0.88)] mb-2 tracking-tight">
                {cv.profile.name}
              </p>
              <p className="text-[12px] leading-[1.6] text-[rgba(0,0,0,0.56)]">
                {cv.profile.bio}
              </p>
            </div>

            {/* Link columns */}
            <div className="flex gap-12 shrink-0">
              <div className="flex flex-col gap-2.5">
                <p className="text-[12px] font-semibold text-[rgba(0,0,0,0.88)] mb-1">{t.footer.content}</p>
                {t.nav.map(({ id, label }) => (
                  <a key={id} href={`#${id}`}
                     className="text-[12px] text-[rgba(0,0,0,0.72)] hover:text-[#1D1D1F]"
                     style={{ transition: 'color 0.32s cubic-bezier(0.4,0,0.6,1)' }}>
                    {label}
                  </a>
                ))}
              </div>

              <div className="flex flex-col gap-2.5">
                <p className="text-[12px] font-semibold text-[rgba(0,0,0,0.88)] mb-1">{t.footer.contact}</p>
                <button
                  onClick={() => { window.location.href = `mailto:${cv.profile.contact.email}` }}
                  className="text-[12px] text-[rgba(0,0,0,0.72)] hover:text-[#0066CC] text-left"
                  style={{ transition: 'color 0.32s cubic-bezier(0.4,0,0.6,1)' }}>
                  Email
                </button>
                <a href={`https://github.com/${cv.profile.links.github}`}
                   target="_blank" rel="noopener noreferrer"
                   className="text-[12px] text-[rgba(0,0,0,0.72)] hover:text-[#0066CC]"
                   style={{ transition: 'color 0.32s cubic-bezier(0.4,0,0.6,1)' }}>
                  GitHub ↗
                </a>
                <a href={`https://linkedin.com/in/${cv.profile.links.linkedin}`}
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
              Copyright © {new Date().getFullYear()} {cv.profile.name}. All rights reserved.
            </p>
            <p className="text-[12px] text-[rgba(0,0,0,0.48)]">Built with React &amp; Tailwind</p>
          </div>

        </div>
      </footer>
    </div>
    </ActiveSectionProvider>
  )
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen bg-[#F5F5F7]" />}>
        <Routes>
          <Route path="/"             element={<HomePage />}      />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/skills/:id"   element={<SkillDetail />}   />
          <Route path="/card"         element={<Card />}          />
          <Route path="/qr"           element={<QRPage />}        />
          <Route path="/admin/*"      element={<Admin />}         />
          <Route path="*"             element={<NotFound />}      />
        </Routes>
      </Suspense>
    </>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <DataProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </DataProvider>
      </LanguageProvider>
    </ErrorBoundary>
  )
}
