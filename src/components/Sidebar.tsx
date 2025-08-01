'use client'
import { useLang } from './LanguageProvider'

const links = [
  { key: 'intro', href: '#intro' },
  { key: 'highlights', href: '#highlights' },
  { key: 'gallery', href: '#gallery' },
  { key: 'contact', href: '#contact' },
]

const t: Record<string, { vi: string; en: string }> = {
  intro: { vi: 'Giới thiệu', en: 'Introduction' },
  highlights: { vi: 'Điểm nổi bật', en: 'Highlights' },
  gallery: { vi: 'Thư viện ảnh', en: 'Gallery' },
  contact: { vi: 'Liên hệ', en: 'Contact' },
}

export default function Sidebar() {
  const { lang } = useLang()
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <nav className="flex justify-center space-x-8">
          {links.map(l => (
            <a 
              key={l.key} 
              href={l.href} 
              className="text-secondary hover:text-primary font-medium transition-colors px-4 py-2 rounded-md hover:bg-bg-light"
            >
              {t[l.key][lang]}
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}
