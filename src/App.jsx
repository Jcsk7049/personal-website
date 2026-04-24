import Hero            from './components/Hero'
import SkillGrid       from './components/SkillGrid'
import ProjectTimeline from './components/ProjectTimeline'
import ExperienceList  from './components/ExperienceList'
import cvData          from './cvData.json'

export default function App() {
  return (
    <div className="bg-white text-[#1D1D1F] font-sans antialiased">
      <Hero            profile={cvData.profile} />
      <SkillGrid       skills={cvData.skills} />
      <ProjectTimeline projects={cvData.projects} />
      <ExperienceList  awards={cvData.awards} education={cvData.education} />
      <footer className="py-16 text-center text-sm text-[#86868B] border-t border-gray-100">
        © {new Date().getFullYear()} {cvData.profile.name} · Built with React & Tailwind
      </footer>
    </div>
  )
}
