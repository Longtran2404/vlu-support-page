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
      {/* Top navigation bar */}
      <div className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end items-center h-10 space-x-4">
            {topNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1 text-sm hover:bg-gray-700 transition-colors ${
                  item.color || ''
                }`}
              >
                {item.label[lang]}
              </Link>
            ))}
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src={LOGO_URL}
                alt="Văn Lang University"
                width={120}
                height={40}
                className="object-contain"
                unoptimized
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/120x40/C8102E/FFFFFF?text=VLU';
                }}
              />
              <span className="text-xl font-bold">{universityTitle[lang]}</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
