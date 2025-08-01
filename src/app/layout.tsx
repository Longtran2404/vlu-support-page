// src/app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import LanguageProvider from '../components/LanguageProvider';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body className="bg-gray-100 text-gray-900 font-sans min-h-screen">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
