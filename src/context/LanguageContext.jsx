import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext({ lang: 'zh', setLang: () => {} })

export function LanguageProvider({ children }) {
  const [lang, setLanguageState] = useState(() => new URLSearchParams(window.location.search).get('lang') === 'en' ? 'en' : 'zh')

  const setLang = next => {
    const language = next === 'en' ? 'en' : 'zh'
    setLanguageState(language)
    const url = new URL(window.location.href)
    if (language === 'en') url.searchParams.set('lang', 'en')
    else url.searchParams.delete('lang')
    window.history.replaceState(window.history.state, '', url)
  }

  useEffect(() => {
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-TW'
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
