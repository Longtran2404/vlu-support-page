'use client'
import Image from 'next/image';
import Link from 'next/link';

const LOGO_URL = "https://cdn.haitrieu.com/wp-content/uploads/2022/12/Logo-Dai-Hoc-Van-Lang-H.png";

export default function Footer() {
  return (
    <footer className="bg-[#1a2233] text-[#e3e6f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Top row: logo + contact info */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-start mb-8 gap-8">
          <div className="flex justify-center md:justify-start items-center">
            <Image
              src={LOGO_URL}
              alt="Văn Lang University"
              width={200}
              height={80}
              className="object-contain"
              unoptimized
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/200x80/C8102E/FFFFFF?text=VLU';
              }}
            />
          </div>
          <div className="flex flex-wrap md:flex-nowrap gap-x-8 gap-y-2 text-sm md:ml-8">
            <div className="flex flex-col">
              <h4 className="text-base font-semibold text-white mb-1">Email</h4>
              <div className="text-gray-400 mb-2">truyenthong@vlu.edu.vn</div>
            </div>
            <div className="flex flex-col">
              <h4 className="text-base font-semibold text-white mb-1">Đào tạo</h4>
              <div className="text-gray-400 mb-2">028.7109 9221</div>
            </div>
            <div className="flex flex-col">
              <h4 className="text-base font-semibold text-white mb-1">Tuyển sinh</h4>
              <div className="text-gray-400 mb-2">028.7105 9999</div>
            </div>
            <div className="flex flex-col">
              <h4 className="text-base font-semibold text-white mb-1">Hỗ trợ Sinh Viên (Call Center)</h4>
              <div className="text-gray-400 mb-2">028. 7106. 1111</div>
            </div>
          </div>
        </div>
        {/* Footer columns below: Về chúng tôi, Truy cập nhanh, Các trường... */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          {/* Về chúng tôi */}
          <div className="flex flex-col md:w-1/5 mb-6 md:mb-0">
            <h4 className="text-base font-semibold mb-3 text-white">Về chúng tôi</h4>
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
            <h4 className="text-base font-semibold mb-3 text-white">Truy cập nhanh</h4>
            <ul className="space-y-1 text-sm">
              <li><a href="https://vanlangunivn.sharepoint.com/sites/van-ban-so-VLU" className="text-gray-400 hover:text-white transition-colors">Hệ thống Văn bản</a></li>
              <li><a href="https://elearning.vanlanguni.edu.vn/" className="text-gray-400 hover:text-white transition-colors">Hệ thống E-Learning</a></li>
              <li><a href="https://lib.vlu.edu.vn/" className="text-gray-400 hover:text-white transition-colors">Thư viện</a></li>
              <li><a href="https://vhub.vanlanguni.edu.vn/" className="text-gray-400 hover:text-white transition-colors">HUB</a></li>
              <li><a href="https://ejob.vlu.edu.vn/" className="text-gray-400 hover:text-white transition-colors">E-job</a></li>
              <li><a href="https://www.vlu.edu.vn/dynamic/xet-cong-nhan-tieu-chuan-giao-su-pho-giao-su" className="text-gray-400 hover:text-white transition-colors">Hội đồng Giáo sư cơ sở</a></li>
            </ul>
          </div>
          {/* Theo dõi (social media) column with correct SVGs */}
          <div className="flex flex-col md:w-1/5 mb-6 md:mb-0">
            <h4 className="text-base font-semibold mb-3 text-white">Theo dõi</h4>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/truongdaihocvanlang" aria-label="Facebook" className="text-gray-400 hover:text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M22.675 0h-21.35C.6 0 0 .6 0 1.326v21.348C0 23.4.6 24 1.326 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.4 24 24 23.4 24 22.674V1.326C24 .6 23.4 0 22.675 0"/></svg>
              </a>
              <a href="https://www.youtube.com/@vanlanguniversity" aria-label="YouTube" className="text-gray-400 hover:text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.112C19.13 3.5 12 3.5 12 3.5s-7.13 0-9.386.574A2.994 2.994 0 0 0 .502 6.186C0 8.44 0 12 0 12s0 3.56.502 5.814a2.994 2.994 0 0 0 2.112 2.112C4.87 20.5 12 20.5 12 20.5s7.13 0 9.386-.574a2.994 2.994 0 0 0 2.112-2.112C24 15.56 24 12 24 12s0-3.56-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://www.tiktok.com/@vanlanguniversity" aria-label="TikTok" className="text-gray-400 hover:text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.004 2.004h3.996v12.004c0 3.312-2.688 6-6 6s-6-2.688-6-6c0-3.312 2.688-6 6-6v3.996c-1.104 0-2.004.9-2.004 2.004s.9 2.004 2.004 2.004 2.004-.9 2.004-2.004V2.004z"/></svg>
              </a>
              <a href="https://www.instagram.com/vanlanguniversity/" aria-label="Instagram" className="text-gray-400 hover:text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.974 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.974-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.346 3.678 1.327c-.981.981-1.196 2.093-1.255 3.374C2.013 8.332 2 8.741 2 12c0 3.259.013 3.668.072 4.948.059 1.281.274 2.393 1.255 3.374.981.981 2.093 1.196 3.374 1.255C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.281-.059 2.393-.274 3.374-1.255.981-.981 1.196-2.093 1.255-3.374.059-1.28.072-1.689.072-4.948 0-3.259-.013-3.668-.072-4.948-.059-1.281-.274-2.393-1.255-3.374-.981-.981-2.093-1.196-3.374-1.255C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg>
              </a>
            </div>
          </div>
          {/* Các trường và khối đào tạo */}
          <div className="flex flex-col md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-base font-semibold mb-3 text-white">Các trường và khối đào tạo</h4>
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
              <li><a href="https://www.vlu.edu.vn/vi/news-events/events/search" className="text-gray-400 hover:text-white transition-colors">Sự kiện</a></li>
              <li><a href="https://www.vlu.edu.vn/career" className="text-gray-400 hover:text-white transition-colors">Tuyển dụng</a></li>
              <li><a href="https://www.vlu.edu.vn/vi/quality-assurance/dam-bao-chat-luong-dao-tao" className="text-gray-400 hover:text-white transition-colors">Đảm bảo chất lượng đào tạo</a></li>
              <li><a href="https://khaothitienganh.vlu.edu.vn/" className="text-gray-400 hover:text-white transition-colors">Trung tâm khảo thí tiếng anh</a></li>
            </ul>
          </div>
          {/* Truy cập nhanh */}
          <div className="flex flex-col md:w-1/5 mb-6 md:mb-0">
            <h4 className="text-base font-semibold mb-3 text-white">Truy cập nhanh</h4>
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
            <h4 className="text-base font-semibold mb-3 text-white">Các trường và khối đào tạo</h4>
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
