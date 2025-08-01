'use client'
import { useLang } from './LanguageProvider'

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang()
  return (
    <div className="flex space-x-1 text-sm">
      <button
        onClick={() => setLang('vi')}
        className={lang === 'vi' ? 'font-semibold underline' : 'hover:underline'}
      >
        VI
      </button>
      <span>/</span>
      <button
        onClick={() => setLang('en')}
        className={lang === 'en' ? 'font-semibold underline' : 'hover:underline'}
      >
        EN
      </button>
    </div>
  )
}
