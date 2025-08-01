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
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm mb-2">
              <div className="text-gray-400">Email</div>
              <div className="text-white font-semibold">truyenthong@vlu.edu.vn</div>
              <div className="text-gray-400">Đào tạo</div>
              <div className="text-white font-semibold">028.7109 9221</div>
              <div className="text-gray-400">Tuyển sinh</div>
              <div className="text-white font-semibold">028.7105 9999</div>
              <div className="text-gray-400">Hỗ trợ Sinh Viên (Call Center)</div>
              <div className="text-white font-semibold">028.7106.1111</div>
            </div>
          </div>
          {/* Về chúng tôi */}
          <div className="flex flex-col md:w-1/5 mb-6 md:mb-0">
            <h4 className="text-base font-semibold mb-3">Về chúng tôi</h4>
            <ul className="space-y-1 text-sm">
              <li><a href="https://www.vlu.edu.vn/vi/news-events/news/search" className="text-gray-400 hover:text-white transition-colors">Tin tức</a></li>
              <li><a href="https://www.vlu.edu.vn/vi/news-events/events/search" className="text-gray-400 hover:text-white transition-colors">Sự kiện</a></li>
              <li><a href="https://www.vlu.edu.vn/career" className="text-gray-400 hover:text-white transition-colors">Tuyển dụng</a></li>
              <li><a href="https://www.vlu.edu.vn/vi/quality-assurance/dam-bao-chat-luong-dao-tao" className="text-gray-400 hover:text-white transition-colors">Đảm bảo chất lượng đào tạo</a></li>
              <li><a href="https://khaothitienganh.vlu.edu.vn/" className="text-gray-400 hover:text-white transition-colors">Trung tâm khảo thí tiếng anh</a></li>
            </ul>
          </div>
          {/* Truy cập nhanh */}
          <div className="flex flex-col md:w-1/5 mb-6 md:mb-0">
            <h4 className="text-base font-semibold mb-3">Truy cập nhanh</h4>
            <ul className="space-y-1 text-sm">
              <li><a href="https://vanlangunivn.sharepoint.com/sites/van-ban-so-VLU" className="text-gray-400 hover:text-white transition-colors">Hệ thống Văn bản</a></li>
              <li><a href="https://elearning.vanlanguni.edu.vn/" className="text-gray-400 hover:text-white transition-colors">Hệ thống E-Learning</a></li>
              <li><a href="https://lib.vlu.edu.vn/" className="text-gray-400 hover:text-white transition-colors">Thư viện</a></li>
              <li><a href="https://vhub.vanlanguni.edu.vn/" className="text-gray-400 hover:text-white transition-colors">HUB</a></li>
              <li><a href="https://ejob.vlu.edu.vn/" className="text-gray-400 hover:text-white transition-colors">E-job</a></li>
              <li><a href="https://www.vlu.edu.vn/dynamic/xet-cong-nhan-tieu-chuan-giao-su-pho-giao-su" className="text-gray-400 hover:text-white transition-colors">Hội đồng Giáo sư cơ sở</a></li>
            </ul>
            <div className="flex space-x-3 mt-3">
              <a href="https://www.facebook.com/truongdaihocvanlang" aria-label="Facebook" className="text-gray-400 hover:text-white"><svg width="20" height="20" fill="currentColor"><path d="M18 0H2C.9 0 0 .9 0 2v16c0 1.1.9 2 2 2h8v-7H7v-3h3V7c0-2.8 1.7-4.3 4.2-4.3 1.2 0 2.5.2 2.5.2v3h-1.4c-1.4 0-1.8.7-1.8 1.7v2.3h3l-.4 3h-2.6v7h5c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2z"/></svg></a>
              <a href="https://www.youtube.com/@vanlanguniversity" aria-label="Youtube" className="text-gray-400 hover:text-white"><svg width="20" height="20" fill="currentColor"><path d="M19.6 6.2c-.2-.8-.8-1.4-1.6-1.6C16.2 4.2 10 4.2 10 4.2s-6.2 0-8 .4c-.8.2-1.4.8-1.6 1.6C0 8 0 10 0 10s0 2 .4 3.8c.2.8.8 1.4 1.6 1.6 1.8.4 8 .4 8 .4s6.2 0 8-.4c.8-.2 1.4-.8 1.6-1.6.4-1.8.4-3.8.4-3.8s0-2-.4-3.8zM8 13V7l6 3-6 3z"/></svg></a>
              <a href="https://www.instagram.com/vanlanguniversity/" aria-label="Instagram" className="text-gray-400 hover:text-white"><svg width="20" height="20" fill="currentColor"><circle cx="10" cy="10" r="6"/><circle cx="10" cy="10" r="2"/><rect x="2" y="2" width="16" height="16" rx="4"/></svg></a>
              <a href="https://www.tiktok.com/@vanlanguniversity" aria-label="Tiktok" className="text-gray-400 hover:text-white"><svg width="20" height="20" fill="currentColor"><path d="M15.5 2v10.5c0 2.5-2 4.5-4.5 4.5S6.5 15 6.5 12.5V7h2v5.5c0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5V2h2z"/></svg></a>
            </div>
          </div>
          {/* Các trường và khối đào tạo */}
          <div className="flex flex-col md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-base font-semibold mb-3">Các trường và khối đào tạo</h4>
            <ul className="space-y-1 text-sm">
              <li><a href="https://www.vlu.edu.vn/academics/faculty-group?faculty=khoa-khach-san-du-lich-va-su-kien#faculties" className="text-gray-400 hover:text-white transition-colors">Du lịch</a></li>
              <li><a href="https://www.vlu.edu.vn/academics/faculty-group?faculty=kien-truc#faculties" className="font-bold text-gray-400 hover:text-white transition-colors">Kiến Trúc</a></li>
              <li><a href="https://www.vlu.edu.vn/academics/faculty-group?faculty=khoa-hoc-suc-khoe#faculties" className="text-gray-400 hover:text-white transition-colors">Khoa học sức khỏe</a></li>
              <li><a href="https://www.vlu.edu.vn/academics/faculty-group?faculty=truong-cong-nghe-van-lang#faculties" className="text-gray-400 hover:text-white transition-colors">Công nghệ - Kỹ thuật</a></li>
              <li><a href="https://www.vlu.edu.vn/academics/faculty-group?faculty=kinh-doanh-quan-ly#faculties" className="text-gray-400 hover:text-white transition-colors">Kinh doanh - Quản lý</a></li>
              <li><a href="https://www.vlu.edu.vn/academics/faculty-group?faculty=thiet-ke-nghe-thuat#faculties" className="text-gray-400 hover:text-white transition-colors">Thiết kế - Nghệ Thuật</a></li>
              <li><a href="https://www.vlu.edu.vn/academics/faculty-group?faculty=luat-xa-hoi-nhan-van-truyen-thong#faculties" className="text-gray-400 hover:text-white transition-colors">Luật - Xã hội Nhân văn - Truyền thông</a></li>
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
