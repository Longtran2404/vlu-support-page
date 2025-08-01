'use client';

import Link from 'next/link';
import { useLang } from './LanguageProvider';

export default function SubNavigation() {
  const { lang } = useLang();

  const navItems = [
    { 
      href: '#gioi-thieu', 
      label: {
        vi: 'Về Văn Lang',
        en: 'About VLU'
      }
    },
    { 
      href: '#dao-tao', 
      label: {
        vi: 'Đào tạo',
        en: 'Education'
      }
    },
    { 
      href: '#tuyen-sinh', 
      label: {
        vi: 'Tuyển sinh',
        en: 'Admission'
      }
    },
    { 
      href: '#nghien-cuu', 
      label: {
        vi: 'Nghiên cứu khoa học',
        en: 'Research'
      }
    },
    { 
      href: '#doi-song', 
      label: {
        vi: 'Đời sống Văn Lang',
        en: 'Campus Life'
      }
    },
    { 
      href: '#tin-tuc', 
      label: {
        vi: 'Tin tức & Sự kiện',
        en: 'News & Events'
      }
    },
  ];

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-center space-x-8 py-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-700 hover:text-red-600 px-3 py-2 text-sm font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-red-600"
            >
              {item.label[lang]}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}