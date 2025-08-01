// src/components/NavBar.tsx
'use client'
import Link from 'next/link'
import LanguageSwitcher from './LanguageSwitcher'
import { useLang } from './LanguageProvider'

export default function NavBar() {
  const { lang } = useLang()
  return (
    <header className="bg-secondary text-white shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-2xl font-bold">
          VLU
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-accent">Trang chủ</Link>
          {/* … các link khác */}
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  )
}
