'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

type Lang = 'vi' | 'en'
interface LangContextProps {
  lang: Lang
  setLang: (l: Lang) => void
}

const LangContext = createContext<LangContextProps | undefined>(undefined)

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be inside LanguageProvider')
  return ctx
}

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('vi')
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  )
}
