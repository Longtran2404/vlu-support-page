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
          <Image 
            src="https://insacmau.com/wp-content/uploads/2023/02/logo-van-lang-600x686.png" 
            alt="VLU Logo" 
            width={48} 
            height={48} 
            className="mb-2 rounded-full" 
          />
          <div className="text-lg font-semibold">Trường Đại học Văn Lang</div>
          <div className="text-sm">Email: hotrosinhvien@vlu.edu.vn</div>
          <div className="text-sm">Điện thoại: (028) 3823 4567</div>
        </div>
        {/* Navigation */}
        <nav className="flex flex-col md:flex-row gap-2 md:gap-6 text-sm text-center md:text-left">
          <a href="#hero" className="hover:text-white transition-colors">
            {lang === 'vi' ? 'Trang chủ' : 'Home'}
          </a>
          <a href="#highlights" className="hover:text-white transition-colors">
            {lang === 'vi' ? 'Điểm nổi bật' : 'Highlights'}
          </a>
          <a href="#gallery" className="hover:text-white transition-colors">
            {lang === 'vi' ? 'Thư viện ảnh' : 'Gallery'}
          </a>
          <a href="#contact" className="hover:text-white transition-colors">
            {lang === 'vi' ? 'Liên hệ' : 'Contact'}
          </a>
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
