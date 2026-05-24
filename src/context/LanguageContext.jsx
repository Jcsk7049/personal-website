import { createContext, useContext, useState } from 'react'

const LanguageContext = createContext({ lang: 'zh', setLang: () => {} })

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('zh')
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
