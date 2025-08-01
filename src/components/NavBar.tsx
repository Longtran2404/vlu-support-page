// src/components/NavBar.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';
import { useLang } from './LanguageProvider';

const LOGO_URL = "https://cdn.haitrieu.com/wp-content/uploads/2022/12/Logo-Dai-Hoc-Van-Lang-H.png";

export default function NavBar() {
  const { lang } = useLang();

  const topNavItems = [
    { 
      href: '#', 
      label: {
        vi: 'Trang chủ',
        en: 'Home'
      }, 
      color: 'bg-red-600' 
    },
    { 
      href: '#sinh-vien', 
      label: {
        vi: 'Sinh viên',
        en: 'Students'
      }
    },
    { 
      href: '#nhan-vien', 
      label: {
        vi: 'Nhân viên',
        en: 'Staff'
      }
    },
    { 
      href: '#cuu-sinh-vien', 
      label: {
        vi: 'Cựu sinh viên',
        en: 'Alumni'
      }
    },
  ];

  const universityTitle = {
    vi: 'Trường Đại học Văn Lang - VLU',
    en: 'Van Lang University - VLU'
  };

  return (
    <header className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Centered and responsive */}
          <div className="flex items-center justify-center flex-1 md:flex-initial md:justify-start">
            <Link href="/" className="flex items-center">
              <Image
                src={LOGO_URL}
                alt="Văn Lang University"
                width={150}
                height={50}
                className="object-contain"
                unoptimized
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/150x50/C8102E/FFFFFF?text=VLU';
                }}
              />
            </Link>
          </div>
          
          {/* Navigation và chọn ngôn ngữ - Hidden on mobile, visible on desktop */}
          <div className="hidden md:flex items-center space-x-2">
            {topNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1 text-sm text-white hover:bg-red-700 transition-colors rounded`}
              >
                {item.label[lang as keyof typeof item.label]}
              </Link>
            ))}
            <LanguageSwitcher />
          </div>
          
          {/* Mobile language switcher */}
          <div className="md:hidden">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
