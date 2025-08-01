// src/components/NavBar.tsx
'use client'
import Link from 'next/link'
import Image from 'next/image'
import LanguageSwitcher from './LanguageSwitcher'
import { useLang } from './LanguageProvider'

export default function NavBar() {
  const { lang } = useLang()
  return (
    <header className="bg-secondary text-white shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Image
            src="https://cdn.haitrieu.com/wp-content/uploads/2022/12/Logo-Dai-Hoc-Van-Lang-H.png"
            alt="VLU Logo"
            width={120}
            height={40}
            className="object-contain"
          />
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-accent transition-colors">
            {lang === 'vi' ? 'Trang chủ' : 'Home'}
          </Link>
          <Link href="#intro" className="hover:text-accent transition-colors">
            {lang === 'vi' ? 'Giới thiệu' : 'About'}
          </Link>
          <Link href="#gallery" className="hover:text-accent transition-colors">
            {lang === 'vi' ? 'Thư viện ảnh' : 'Gallery'}
          </Link>
          <Link href="#contact" className="hover:text-accent transition-colors">
            {lang === 'vi' ? 'Liên hệ' : 'Contact'}
          </Link>
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  )
}
