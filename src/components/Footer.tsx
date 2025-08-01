'use client'
import Image from 'next/image';
import Link from 'next/link';

const LOGO_URL = "https://cdn.haitrieu.com/wp-content/uploads/2022/12/Logo-Dai-Hoc-Van-Lang-H.png";

export default function Footer() {
  return (
    <footer className="bg-[#1a2233] text-[#e3e6f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          {/* Logo và thông tin liên hệ */}
          <div className="flex flex-col md:w-1/4 mb-6 md:mb-0">
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src={LOGO_URL}
                alt="Văn Lang University"
                width={120}
                height={40}
                className="object-contain"
                unoptimized
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/120x40/C8102E/FFFFFF?text=VLU';
                }}
              />
              <div>
                <h3 className="text-xl font-bold tracking-wide">VANLANG UNIVERSITY</h3>
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <div>Email<br /><span className="font-semibold">truyenthong@vlu.edu.vn</span></div>
              <div>Đào tạo<br /><span className="font-semibold">028.7109 9221</span></div>
              <div>Tuyển sinh<br /><span className="font-semibold">028.7105 9999</span></div>
              <div>Hỗ trợ Sinh Viên (Call Center)<br /><span className="font-semibold">028.7106.1111</span></div>
            </div>
          </div>
          {/* Về chúng tôi */}
          <div className="flex flex-col md:w-1/5 mb-6 md:mb-0">
            <h4 className="text-base font-semibold mb-3">Về chúng tôi</h4>
            <ul className="space-y-1 text-sm">
              <li>Tin tức</li>
              <li>Sự kiện</li>
              <li>Tuyển dụng</li>
              <li>Đảm bảo chất lượng đào tạo</li>
              <li>Trung tâm khảo thí tiếng anh</li>
            </ul>
          </div>
          {/* Truy cập nhanh */}
          <div className="flex flex-col md:w-1/5 mb-6 md:mb-0">
            <h4 className="text-base font-semibold mb-3">Truy cập nhanh</h4>
            <ul className="space-y-1 text-sm">
              <li>Hệ thống Văn bản</li>
              <li>Hệ thống E-Learning</li>
              <li>Thư viện</li>
              <li>HUB</li>
              <li>E-job</li>
              <li>Hội đồng Giáo sư cơ sở</li>
            </ul>
            <div className="flex space-x-3 mt-3">
              <a href="#" aria-label="Facebook" className="hover:text-white"><svg width="20" height="20" fill="currentColor"><path d="M18 0H2C.9 0 0 .9 0 2v16c0 1.1.9 2 2 2h8v-7H7v-3h3V7c0-2.8 1.7-4.3 4.2-4.3 1.2 0 2.5.2 2.5.2v3h-1.4c-1.4 0-1.8.7-1.8 1.7v2.3h3l-.4 3h-2.6v7h5c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2z"/></svg></a>
              <a href="#" aria-label="Youtube" className="hover:text-white"><svg width="20" height="20" fill="currentColor"><path d="M19.6 6.2c-.2-.8-.8-1.4-1.6-1.6C16.2 4.2 10 4.2 10 4.2s-6.2 0-8 .4c-.8.2-1.4.8-1.6 1.6C0 8 0 10 0 10s0 2 .4 3.8c.2.8.8 1.4 1.6 1.6 1.8.4 8 .4 8 .4s6.2 0 8-.4c.8-.2 1.4-.8 1.6-1.6.4-1.8.4-3.8.4-3.8s0-2-.4-3.8zM8 13V7l6 3-6 3z"/></svg></a>
              <a href="#" aria-label="Instagram" className="hover:text-white"><svg width="20" height="20" fill="currentColor"><circle cx="10" cy="10" r="6"/><circle cx="10" cy="10" r="2"/><rect x="2" y="2" width="16" height="16" rx="4"/></svg></a>
              <a href="#" aria-label="Tiktok" className="hover:text-white"><svg width="20" height="20" fill="currentColor"><path d="M15.5 2v10.5c0 2.5-2 4.5-4.5 4.5S6.5 15 6.5 12.5V7h2v5.5c0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5V2h2z"/></svg></a>
            </div>
          </div>
          {/* Các trường và khối đào tạo */}
          <div className="flex flex-col md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-base font-semibold mb-3">Các trường và khối đào tạo</h4>
            <ul className="space-y-1 text-sm">
              <li>Du lịch</li>
              <li className="font-bold">Kiến Trúc</li>
              <li>Khoa học sức khỏe</li>
              <li>Công nghệ - Kỹ thuật</li>
              <li>Kinh doanh - Quản lý</li>
              <li>Thiết kế - Nghệ Thuật</li>
              <li>Luật - Xã hội Nhân văn - Truyền thông</li>
            </ul>
          </div>
        </div>
        <hr className="border-t border-[#2c3446] mt-8 mb-4" />
        <div className="flex flex-col md:flex-row md:justify-between items-center text-xs text-[#e3e6f0] pb-2">
          <div>&copy; 2022 Van Lang University. All rights reserved.</div>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-white">Điều khoản</a>
            <a href="#" className="hover:text-white">Chính sách Bảo mật</a>
            <a href="#" className="hover:text-white">Copyright</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
