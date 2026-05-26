import { createContext, useContext, useEffect, useState } from 'react'

const ActiveSectionContext = createContext('hero')

const ALL_SECTIONS = ['hero', 'experience', 'projects', 'skills', 'awards', 'guestbook']

export function ActiveSectionProvider({ children }) {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-30% 0px -50% 0px', threshold: 0 }
    )
    ALL_SECTIONS.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <ActiveSectionContext.Provider value={active}>
      {children}
    </ActiveSectionContext.Provider>
  )
}

export const useActiveSection = () => useContext(ActiveSectionContext)
