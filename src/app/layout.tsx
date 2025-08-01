// src/app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from '@/context/LanguageProvider';
import NavBar from '@/components/NavBar';
import SubNavigation from '@/components/SubNavigation';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Trung tâm Hỗ trợ Sinh viên - Đại học Văn Lang",
  description: "Trung tâm Hỗ trợ Sinh viên luôn đồng hành cùng các bạn sinh viên Văn Lang",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LanguageProvider>
          <NavBar />
          <SubNavigation />
          <main>{children}</main>
          <Footer />
          <Chatbot />
        </LanguageProvider>
      </body>
    </html>
  );
}
