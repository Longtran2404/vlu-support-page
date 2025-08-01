// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import LanguageProvider from '../components/LanguageProvider';
import NavBar from '../components/NavBar';
import SubNavigation from '../components/SubNavigation';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';

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
      <body className="antialiased font-sans">
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
