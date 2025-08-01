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
            src="https://upload.wikimedia.org/wikipedia/vi/thumb/8/85/Logo_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_V%C4%83n_Lang.png/200px-Logo_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_V%C4%83n_Lang.png" 
            alt="VLU Logo" 
            width={60} 
            height={60} 
            className="mb-2 object-contain" 
            unoptimized
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/60x60/C8102E/FFFFFF?text=VLU';
            }}
          />
          <div className="text-lg font-semibold">Trường Đại học Văn Lang</div>
          <div className="text-sm">📍 45 Nguyễn Khắc Nhu, Tân Phú, TPHCM</div>
          <div className="text-sm">📧 hotrosinhvien@vlu.edu.vn</div>
          <div className="text-sm">📞 (028) 3823 4567</div>
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
