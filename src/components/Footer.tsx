'use client'
import { useLang } from './LanguageProvider'

export default function Footer() {
  const { lang } = useLang()
  return (
    <footer className="bg-gray-800 text-gray-300 py-4 mt-auto">
      <div className="max-w-6xl mx-auto text-center text-sm">
        {lang === 'vi'
          ? `© ${new Date().getFullYear()} Đại học Văn Lang`
          : `© ${new Date().getFullYear()} Van Lang University`}
      </div>
    </footer>
  )
}
