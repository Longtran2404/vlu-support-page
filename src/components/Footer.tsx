'use client'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaPhone, FaEnvelope, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const LOGO_URL = "https://cdn.haitrieu.com/wp-content/uploads/2022/12/Logo-Dai-Hoc-Van-Lang-H.png";

interface ContactSection {
  title: string;
  content: {
    address?: string;
    phone?: string;
    email?: string;
    departments?: Array<{
      name: string;
      phone?: string;
      email?: string;
    }>;
  };
}

const contactSections: ContactSection[] = [
  {
    title: "Trung tâm Hỗ trợ Sinh viên",
    content: {
      address: "Tầng 4, Tòa B, 233A Phan Văn Trị, Phường 11, Quận Bình Thạnh, TP. HCM",
      phone: "028.7106.1111",
      email: "hotrosinhvien@vlu.edu.vn",
      departments: [
        { name: "Phòng Quản lý Sinh viên", phone: "028.7109.9220", email: "quanlysinhvien@vlu.edu.vn" },
        { name: "Phòng Công tác Sinh viên", phone: "028.7109.9224", email: "congtacsinhvien@vlu.edu.vn" },
        { name: "Phòng Học vụ", phone: "028.7109.9221", email: "hocvu@vlu.edu.vn" }
      ]
    }
  },
  {
    title: "Trung tâm Phát triển Sinh viên",
    content: {
      address: "Tầng 5, Tòa A, 233A Phan Văn Trị, Phường 11, Quận Bình Thạnh, TP. HCM",
      phone: "028.7109.9230",
      email: "phatriensinhvien@vlu.edu.vn",
      departments: [
        { name: "Phòng Tư vấn Nghề nghiệp", phone: "028.7109.9231", email: "tuvannghiepnghiep@vlu.edu.vn" },
        { name: "Phòng Kỹ năng mềm", phone: "028.7109.9232", email: "kynangmem@vlu.edu.vn" }
      ]
    }
  },
  {
    title: "Trung tâm Tư vấn Tâm lý",
    content: {
      address: "Tầng 2, Tòa C, 233A Phan Văn Trị, Phường 11, Quận Bình Thạnh, TP. HCM",
      phone: "028.7109.9240",
      email: "tuvantamly@vlu.edu.vn",
      departments: [
        { name: "Phòng Tư vấn cá nhân", phone: "028.7109.9241" },
        { name: "Phòng Tư vấn nhóm", phone: "028.7109.9242" }
      ]
    }
  },
  {
    title: "Trung tâm Y tế",
    content: {
      address: "Tầng 1, Tòa B, 233A Phan Văn Trị, Phường 11, Quận Bình Thạnh, TP. HCM",
      phone: "028.7109.9250",
      email: "yte@vlu.edu.vn",
      departments: [
        { name: "Phòng Khám tổng quát", phone: "028.7109.9251" },
        { name: "Phòng Cấp cứu", phone: "028.7109.9252" }
      ]
    }
  },
  {
    title: "Thư viện",
    content: {
      address: "Tầng 6-7-8, Tòa A, 233A Phan Văn Trị, Phường 11, Quận Bình Thạnh, TP. HCM",
      phone: "028.7109.9260",
      email: "thuvien@vlu.edu.vn",
      departments: [
        { name: "Phòng Mượn trả sách", phone: "028.7109.9261" },
        { name: "Phòng Tài liệu điện tử", phone: "028.7109.9262" }
      ]
    }
  }
];

export default function Footer() {
  const [expandedSections, setExpandedSections] = useState<number[]>([]);

  const toggleSection = (index: number) => {
    setExpandedSections(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <footer className="bg-[#1a2233] text-[#e3e6f0] font-light" style={{ fontFamily: 'Maison, sans-serif' }}>
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

        {/* Expandable Contact Information Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Thông tin liên hệ chi tiết</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contactSections.map((section, index) => (
              <div key={index} className="bg-[#243245] rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection(index)}
                  className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-[#2c3e52] transition-colors"
                >
                  <h3 className="font-semibold text-white">{section.title}</h3>
                  {expandedSections.includes(index) ? (
                    <FaChevronUp className="text-gray-400" />
                  ) : (
                    <FaChevronDown className="text-gray-400" />
                  )}
                </button>
                {expandedSections.includes(index) && (
                  <div className="px-4 pb-4 text-sm">
                    {section.content.address && (
                      <div className="mb-3">
                        <p className="text-gray-300 font-medium mb-1">Địa chỉ:</p>
                        <p className="text-gray-400">{section.content.address}</p>
                      </div>
                    )}
                    {section.content.phone && (
                      <div className="mb-3 flex items-center">
                        <FaPhone className="text-gray-400 mr-2 text-xs" />
                        <span className="text-gray-400">{section.content.phone}</span>
                      </div>
                    )}
                    {section.content.email && (
                      <div className="mb-3 flex items-center">
                        <FaEnvelope className="text-gray-400 mr-2 text-xs" />
                        <span className="text-gray-400">{section.content.email}</span>
                      </div>
                    )}
                    {section.content.departments && (
                      <div>
                        <p className="text-gray-300 font-medium mb-2">Phòng ban:</p>
                        {section.content.departments.map((dept, deptIndex) => (
                          <div key={deptIndex} className="mb-2 pl-2 border-l-2 border-gray-600">
                            <p className="text-gray-300 font-medium text-xs">{dept.name}</p>
                            {dept.phone && (
                              <div className="flex items-center mt-1">
                                <FaPhone className="text-gray-500 mr-1 text-xs" />
                                <span className="text-gray-500 text-xs">{dept.phone}</span>
                              </div>
                            )}
                            {dept.email && (
                              <div className="flex items-center mt-1">
                                <FaEnvelope className="text-gray-500 mr-1 text-xs" />
                                <span className="text-gray-500 text-xs">{dept.email}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@vanlanguniversity" aria-label="YouTube" className="text-gray-400 hover:text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@vanlanguniversity" aria-label="TikTok" className="text-gray-400 hover:text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/vanlanguniversity/" aria-label="Instagram" className="text-gray-400 hover:text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
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
