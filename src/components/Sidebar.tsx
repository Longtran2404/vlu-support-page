'use client'
import { useLang } from './LanguageProvider'

const links = [
  { key: 'intro', href: '#intro' },
  { key: 'activity', href: '#activity' },
  { key: 'news', href: '#news' },
  { key: 'contactInfo', href: '#contact' },
]

const t: Record<string, { vi: string; en: string }> = {
  intro: { vi: 'Giới thiệu', en: 'Introduction' },
  activity: { vi: 'Hoạt động', en: 'Activities' },
  news: { vi: 'Tin tức', en: 'News' },
  contactInfo: { vi: 'Liên hệ', en: 'Contact Info' },
}

export default function Sidebar() {
  const { lang } = useLang()
  return (
    <aside className="bg-white rounded shadow p-4 space-y-4">
      <nav className="space-y-2">
        {links.map(l => (
          <a key={l.key} href={l.href} className="block hover:text-blue-700">
            {t[l.key][lang]}
          </a>
        ))}
      </nav>
      <div className="border-t pt-4">
        <h3 className="font-semibold mb-2">
          {lang === 'vi' ? 'Thông tin liên hệ' : 'Contact Information'}
        </h3>
        <p>
          {lang === 'vi'
            ? 'Địa chỉ: 45 Nguyễn Khắc Nhu, Tân Phú, TPHCM'
            : 'Address: 45 Nguyen Khac Nhu, Tan Phu, HCMC'}
        </p>
        <p>(028) 3823 4567</p>
        <p>support@vlu.edu.vn</p>
      </div>
    </aside>
  )
}
