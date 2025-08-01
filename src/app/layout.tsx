// src/app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import LanguageProvider from '../components/LanguageProvider'
import NavBar from '../components/NavBar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import Chatbot from '../components/Chatbot'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
        <LanguageProvider>
          <NavBar />
          <div className="flex flex-1 max-w-6xl mx-auto w-full px-4 py-8 space-x-8 md:px-0">
            <div className="hidden lg:block w-64">
              <Sidebar />
            </div>
            <main className="flex-1 bg-white rounded shadow p-6">
              {children}
            </main>
          </div>
          <Footer />
          <Chatbot />
        </LanguageProvider>
      </body>
    </html>
  )
}
