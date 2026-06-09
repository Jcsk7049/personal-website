import { createContext, useContext, useState, useEffect } from 'react'
import cvDataZhFallback from '../data/cvData.json'
import cvDataEnFallback from '../data/cvData.en.json'
import { api } from '../api/client'

const DataContext = createContext(null)

const SECTION_KEYS = ['profile', 'education', 'experience', 'skills_matrix', 'skills_detail', 'awards']

async function fetchCV(lang) {
  const [sections, projects] = await Promise.all([
    Promise.all(SECTION_KEYS.map(k => api.getSection(k, lang).then(v => [k, v]))),
    api.getProjects(lang),
  ])
  const cv = Object.fromEntries(sections)
  cv.projects = projects
  return cv
}

export function DataProvider({ children }) {
  const [cvZh, setCvZh] = useState(cvDataZhFallback)
  const [cvEn, setCvEn] = useState(cvDataEnFallback)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    Promise.all([fetchCV('zh'), fetchCV('en')])
      .then(([zh, en]) => {
        setCvZh(zh)
        setCvEn(en)
        setReady(true)
      })
      .catch(() => {
        // API not available (local dev without wrangler) — keep JSON fallback
        setReady(true)
      })
  }, [])

  const refresh = () =>
    Promise.all([fetchCV('zh'), fetchCV('en')]).then(([zh, en]) => {
      setCvZh(zh)
      setCvEn(en)
    })

  return (
    <DataContext.Provider value={{ cvZh, cvEn, ready, refresh }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  return useContext(DataContext)
}
