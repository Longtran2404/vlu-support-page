// src/app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body className="bg-[#ccd] text-[#171717] font-sans min-h-screen">
        <header className="bg-black text-white py-3 px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="https://insacmau.com/wp-content/uploads/2023/02/logo-van-lang-600x686.png" alt="VLU Logo" className="w-10 h-10 rounded-full" />
            <span className="font-bold text-lg">Trường Đại học Văn Lang - VLU</span>
          </div>
          <nav className="hidden md:flex gap-6 font-bold">
            <a href="/" className="hover:text-blue-400">Trang chủ</a>
            <a href="#" className="hover:text-blue-400">Trung tâm</a>
            <a href="#" className="hover:text-blue-400">Liên hệ</a>
          </nav>
        </header>
        <main className="max-w-4xl mx-auto bg-white rounded shadow p-8 my-8 border-b-8 border-black" style={{ backgroundImage: "url('/backblue.gif')", backgroundRepeat: "no-repeat", backgroundPosition: "top right" }}>
          {children}
        </main>
        <footer className="bg-[#000] text-white text-center py-3 mt-8">
          &copy; {new Date().getFullYear()} Trường Đại học Văn Lang - VLU | Van Lang University
        </footer>
      </body>
    </html>
  )
}
