import Hero            from './components/Hero'
import Education       from './components/Education'
import Experience      from './components/Experience'
import SkillGrid       from './components/SkillGrid'
import ProjectShowcase from './components/ProjectShowcase'
import AwardList       from './components/AwardList'
import cvData          from './data/cvData.json'

export default function App() {
  return (
    <div className="bg-white text-[#1D1D1F] font-sans antialiased">
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
