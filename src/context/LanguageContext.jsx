import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext({ lang: 'zh', setLang: () => {} })

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('zh')

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
