'use client'
import { useLang } from './LanguageProvider'
import { useState } from 'react'

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang()
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ]

  const currentLang = languages.find(l => l.code === lang) || languages[0]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        <span className="text-base">{currentLang.flag}</span>
        <span className="font-medium">{currentLang.code.toUpperCase()}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-50 min-w-[140px]">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => {
                setLang(language.code as 'vi' | 'en')
                setIsOpen(false)
              }}
              className={`w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-gray-50 ${
                lang === language.code ? 'bg-red-50 text-red-600' : 'text-gray-700'
              }`}
            >
              <span className="text-base">{language.flag}</span>
              <span>{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
