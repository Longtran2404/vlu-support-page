'use client';

import Link from 'next/link';

export default function SubNavigation() {
  const navItems = [
    { href: '#gioi-thieu', label: 'Về Văn Lang' },
    { href: '#dao-tao', label: 'Đào tạo' },
    { href: '#tuyen-sinh', label: 'Tuyển sinh' },
    { href: '#nghien-cuu', label: 'Nghiên cứu khoa học' },
    { href: '#doi-song', label: 'Đời sống Văn Lang' },
    { href: '#tin-tuc', label: 'Tin tức & Sự kiện' },
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
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}