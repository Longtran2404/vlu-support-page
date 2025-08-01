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
            src="https://upload.wikimedia.org/wikipedia/vi/thumb/8/85/Logo_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_V%C4%83n_Lang.png/200px-Logo_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_V%C4%83n_Lang.png"
            alt="VLU Logo"
            width={40}
            height={40}
            className="object-contain"
            unoptimized
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/images/vlu-logo.svg';
            }}
          />
          <Link href="/" className="text-xl font-bold text-white">
            Trường Đại học Văn Lang
          </Link>
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
