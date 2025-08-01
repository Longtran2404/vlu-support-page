// src/components/NavBar.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageProvider';
import LanguageSwitcher from './LanguageSwitcher';

const LOGO_URL = "https://cdn.haitrieu.com/wp-content/uploads/2022/12/Logo-Dai-Hoc-Van-Lang-H.png";

export default function NavBar() {
  const { t } = useLanguage();

  const topNavItems = [
    { href: '#', label: 'Trang chủ', color: 'bg-red-600' },
    { href: '#sinh-vien', label: 'Sinh viên' },
    { href: '#nhan-vien', label: 'Nhân viên' },
    { href: '#cuu-sinh-vien', label: 'Cựu sinh viên' },
  ];

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
                {item.label}
              </Link>
            ))}
            <div className="flex items-center space-x-2">
              <span className="text-sm">🇻🇳 VN</span>
              <LanguageSwitcher />
            </div>
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
              <span className="text-xl font-bold">Trường Đại học Văn Lang - VLU</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
