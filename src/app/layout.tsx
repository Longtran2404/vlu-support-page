// src/app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'

type Props = { children: ReactNode }

export default function RootLayout({ children }: Props) {
  return (
    <html lang="vi">
      <body className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-blue-600 text-white p-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-xl font-semibold">
              Trung tâm Hỗ trợ Sinh viên VLU
            </h1>
          </div>
        </header>

        {/* Content area */}
        <div className="flex flex-1 max-w-6xl mx-auto w-full">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-100 p-4 hidden md:block">
            <nav>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Trang chủ</a></li>
                <li><a href="#" className="hover:underline">Dịch vụ</a></li>
                <li><a href="#" className="hover:underline">Liên hệ</a></li>
              </ul>
            </nav>
          </aside>

          {/* Main */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
