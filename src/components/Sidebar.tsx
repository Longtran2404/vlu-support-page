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
    <aside className="w-64 bg-white rounded shadow-lg p-6 space-y-4 h-fit">
      <h3 className="font-bold text-lg text-secondary border-b border-gray-200 pb-2">
        {lang === 'vi' ? 'Danh mục' : 'Categories'}
      </h3>
      <nav className="space-y-2">
        {links.map(l => (
          <a 
            key={l.key} 
            href={l.href} 
            className="block hover:text-primary hover:bg-bg-light p-2 rounded transition-colors"
          >
            {t[l.key][lang]}
          </a>
        ))}
      </nav>
      <div className="border-t pt-4">
        <h3 className="font-semibold mb-2 text-secondary">
          {lang === 'vi' ? 'Thông tin liên hệ' : 'Contact Information'}
        </h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>
            {lang === 'vi'
              ? 'Địa chỉ: 45 Nguyễn Khắc Nhu, Tân Phú, TPHCM'
              : 'Address: 45 Nguyen Khac Nhu, Tan Phu, HCMC'}
          </p>
          <p>📞 (028) 3823 4567</p>
          <p>📧 support@vlu.edu.vn</p>
        </div>
      </div>
    </aside>
  )
}
