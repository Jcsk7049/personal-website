import { createContext, useContext, useState, useEffect } from 'react'
import cvDataZhFallback from '../data/cvData.json'
import cvDataEnFallback from '../data/cvData.en.json'
import { api } from '../api/client'
import { useLanguage } from './LanguageContext'

const DataContext = createContext(null)

const SECTION_KEYS = ['profile', 'education', 'experience', 'skills_matrix', 'skills_detail', 'awards']
const OBJECT_SECTION_KEYS = new Set(['profile', 'skills_matrix', 'skills_detail'])

function resolveSection(key, value, fallback) {
  if (value == null) return fallback
  if (OBJECT_SECTION_KEYS.has(key) && !Array.isArray(value) && !Array.isArray(fallback)) {
    return { ...fallback, ...value }
  }
  return value
}

async function fetchCV(lang, fallback) {
  const [sections, projects] = await Promise.all([
    Promise.all(SECTION_KEYS.map(k =>
      api.getSection(k, lang)
        .then(v => [k, resolveSection(k, v, fallback[k])])
        .catch(() => [k, fallback[k]])
    )),
    api.getProjects(lang)
      .then(v => (Array.isArray(v) && v.length > 0 ? v : fallback.projects))
      .catch(() => fallback.projects),
  ])
  const cv = Object.fromEntries(sections)
  cv.projects = projects
  // 若關鍵欄位仍然是 null，直接用 fallback 整包
  if (!cv.profile) return fallback
  return cv
}

export function DataProvider({ children }) {
  const { lang } = useLanguage()
  const [cvZh, setCvZh] = useState(cvDataZhFallback)
  const [cvEn, setCvEn] = useState(cvDataEnFallback)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const fallback = lang === 'en' ? cvDataEnFallback : cvDataZhFallback
    fetchCV(lang, fallback)
      .then(data => {
        if (lang === 'en') setCvEn(data)
        else setCvZh(data)
      })
      .finally(() => setReady(true))
  }, [lang])

  const refresh = () =>
    fetchCV(lang, lang === 'en' ? cvDataEnFallback : cvDataZhFallback).then(data => {
      if (lang === 'en') setCvEn(data)
      else setCvZh(data)
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
