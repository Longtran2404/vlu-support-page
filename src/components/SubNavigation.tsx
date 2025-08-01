'use client';

import { useLang } from './LanguageProvider';
import { useState, useEffect } from 'react';

export default function SubNavigation() {
  const { lang } = useLang();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { 
      href: '#hero', 
      label: {
        vi: 'Trang chủ',
        en: 'Home'
      }
    },
    { 
      href: '#intro', 
      label: {
        vi: 'Giới thiệu',
        en: 'About'
      }
    },
    { 
      href: '#highlights', 
      label: {
        vi: 'Điểm nổi bật',
        en: 'Highlights'
      }
    },
    { 
      href: '#gallery', 
      label: {
        vi: 'Thư viện ảnh',
        en: 'Gallery'
      }
    },
    { 
      href: '#quick-access', 
      label: {
        vi: 'Truy cập nhanh',
        en: 'Quick Access'
      }
    },
    { 
      href: '#contact', 
      label: {
        vi: 'Liên hệ',
        en: 'Contact'
      }
    }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 120; // Account for fixed header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`sticky top-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-sm shadow-lg' 
        : 'bg-secondary'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="flex space-x-1 overflow-x-auto scrollbar-hide py-2">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`
                  whitespace-nowrap px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300
                  ${isScrolled 
                    ? 'text-gray-700 hover:text-primary hover:bg-red-50' 
                    : 'text-white hover:text-yellow-300 hover:bg-white/10'
                  }
                  hover:transform hover:scale-105
                `}
              >
                {item.label[lang as keyof typeof item.label]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
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