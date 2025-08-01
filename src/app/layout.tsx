// src/app/layout.tsx
import './globals.css';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="min-h-screen flex flex-col">
        <header className="bg-blue-600 text-white p-4">…</header>
        <div className="flex flex-1">
          <aside className="w-64 bg-gray-100 p-4">…</aside>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
