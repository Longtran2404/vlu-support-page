// src/components/NavBar.tsx
'use client'
import Link from 'next/link'
import LanguageSwitcher from './LanguageSwitcher'
import { useLang } from './LanguageProvider'

const navItems = [
  { key: 'home', href: '/' },
  { key: 'center', href: '/#center' },
  { key: 'contact', href: '/#contact' },
]

const t: Record<string, { vi: string; en: string }> = {
  home: { vi: 'Trang chủ', en: 'Home' },
  center: { vi: 'Trung tâm', en: 'Center' },
  contact: { vi: 'Liên hệ', en: 'Contact Us' },
}

export default function NavBar() {
  const { lang } = useLang()
  return (
    <header className="bg-blue-700 text-white shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          VLU
        </Link>
        <nav className="hidden md:flex space-x-6">
          {navItems.map(item => (
            <Link
              key={item.key}
              href={item.href}
              className="hover:underline"
            >
              {t[item.key][lang]}
            </Link>
          ))}
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  )
}
