'use client'
import { useLang } from './LanguageProvider'

import Image from 'next/image'

export default function Footer() {
  const { lang } = useLang()
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 pb-4 mt-auto">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo & Contact */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <Image src="/vlu-static/icons/favicon_logo.png" alt="VLU Logo" width={48} height={48} className="mb-2" />
          <div className="text-lg font-semibold">Trường Đại học Văn Lang</div>
          <div className="text-sm">Email: hotrosinhvien@vlu.edu.vn</div>
        </div>
        {/* Navigation */}
        <nav className="flex flex-col md:flex-row gap-2 md:gap-6 text-sm text-center md:text-left">
          <a href="#hero" className="hover:text-white">Trang chủ</a>
          <a href="#featured_highlight" className="hover:text-white">Nổi bật</a>
          <a href="#gallery" className="hover:text-white">Hình ảnh</a>
          <a href="#form" className="hover:text-white">Liên hệ</a>
        </nav>
      </div>
      <div className="max-w-6xl mx-auto px-4 mt-6 text-center text-xs text-gray-400">
        {lang === 'vi'
          ? `© ${new Date().getFullYear()} Đại học Văn Lang. All rights reserved.`
          : `© ${new Date().getFullYear()} Van Lang University. All rights reserved.`}
      </div>
    </footer>
  )
}
