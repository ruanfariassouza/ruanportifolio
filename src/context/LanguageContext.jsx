import { createContext, useEffect, useMemo, useState } from 'react'
import { translations } from '../data/translations'

export const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => window.localStorage.getItem('ruan-language') || 'pt')
  const copy = translations[language] || translations.pt

  useEffect(() => {
    window.localStorage.setItem('ruan-language', language)
    document.documentElement.lang = language === 'en' ? 'en' : 'pt-BR'
    document.title = copy.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', copy.meta.description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', copy.meta.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', copy.meta.description)
  }, [copy, language])

  const value = useMemo(() => ({
    language,
    copy,
    setLanguage,
    toggleLanguage: () => setLanguage((current) => (current === 'pt' ? 'en' : 'pt')),
  }), [copy, language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

