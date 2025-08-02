'use client';

import { useState } from 'react';

interface ContactCenter {
  id: string;
  title: string;
  director?: string;
  directorTitle?: string;
  deputy?: string;
  deputyTitle?: string;
  office: string;
  phone: string;
  email: string;
  website?: string;
  workingHours?: string;
  additionalPhone?: string;
}

const contactCenters: ContactCenter[] = [
  {
    id: 'hotro',
    title: 'TRUNG TÂM HỖ TRỢ SINH VIÊN',
    director: 'ThS. Đinh Xuân Tỏa',
    directorTitle: 'Giám đốc',
    office: 'Phòng 1.04, Tòa nhà A, Cơ sở chính, 69/68 Đặng Thùy Trâm, Phường Bình Lợi Trung, TP. Hồ Chí Minh',
    phone: '028.7109 9218 - EXT: 3310, 3311',
    email: 't.sv@vlu.edu.vn'
  },
  {
    id: 'phatriennl',
    title: 'TRUNG TÂM PHÁT TRIỂN NĂNG LỰC SINH VIÊN',
    director: 'ThS. Ngô Cao Hoài Linh',
    directorTitle: 'Giám đốc',
    office: 'Phòng 2.28, Tòa nhà A, Cơ sở chính, 69/68 Đặng Thùy Trâm, Phường Bình Lợi Trung, TP. Hồ Chí Minh',
    phone: '028.7109 9224 – EXT: 3560, 3561',
    email: 't.ptnl@vlu.edu.vn, qhdn@vlu.edu.vn (Bộ phận Quan hệ Doanh nghiệp)'
  },
  {
    id: 'tamvan',
    title: 'TRUNG TÂM THAM VẤN TÂM LÝ',
    director: 'PGS. TS. Lê Thị Minh Hà',
    directorTitle: 'Trưởng Phòng',
    office: 'Phòng 12.02 Tòa nhà G, Cơ sở chính, 69/68 Đặng Thùy Trâm, Phường Bình Lợi Trung, TP. Hồ Chí Minh',
    workingHours: 'buổi sáng từ 8h - 11h; buổi chiều từ 13h - 16h',
    phone: '028.7109 9274',
    email: 'p.tvtl@vlu.edu.vn'
  },
  {
    id: 'yte',
    title: 'TRUNG TÂM Y TẾ',
    director: 'ThS. Đinh Xuân Tỏa',
    directorTitle: 'Giám đốc trung tâm',
    office: 'Phòng M6 - Tòa A, Cơ sở chính, 69/68 Đặng Thùy Trâm, Phường Bình Lợi Trung, TP. Hồ Chí Minh',
    phone: 'Cơ sở 1: 028.7108 9199 - EXT: 3315',
    additionalPhone: 'Cơ sở 2: 028.3576 5046 Cơ sở 3: 028.7109 9218 - EXT: 3313',
    email: 'ytetruonghoc@vlu.edu.vn'
  },
  {
    id: 'thuvien',
    title: 'THƯ VIỆN',
    director: 'ThS. Thái Thị Thu Thắm',
    directorTitle: 'Giám đốc',
    deputy: 'ThS. Phan Văn Khoa',
    deputyTitle: 'Phó Giám đốc',
    office: 'Lầu 6 - Tòa nhà A, Cơ sở chính, 69/68 Đặng Thùy Trâm, Phường Bình Lợi Trung, TP. Hồ Chí Minh',
    website: 'https://thuvien.vanlanguni.edu.vn/',
    phone: '028.7109 9217 - EXT: 3220, 3221',
    email: 'thuvien@vlu.edu.vn'
  }
];

export default function ContactAccordion() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-secondary mb-12">Thông tin liên hệ</h1>
        
        <div className="space-y-4">
          {contactCenters.map((center) => (
            <div key={center.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <button
                onClick={() => toggleSection(center.id)}
                className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center"
              >
                <h2 className="text-lg font-semibold text-secondary">{center.title}</h2>
                <svg 
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                    openSection === center.id ? 'rotate-180' : ''
                  }`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openSection === center.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-6 py-4 bg-white">
                  <div className="space-y-3">
                    {center.director && (
                      <div>
                        <span className="font-semibold text-secondary">{center.directorTitle}:</span> {center.director}
                      </div>
                    )}
                    
                    {center.deputy && (
                      <div>
                        <span className="font-semibold text-secondary">{center.deputyTitle}:</span> {center.deputy}
                      </div>
                    )}
                    
                    <div>
                      <span className="font-semibold text-secondary">Văn phòng:</span> {center.office}
                    </div>
                    
                    {center.workingHours && (
                      <div>
                        <span className="font-semibold text-secondary">Thời gian làm việc:</span> {center.workingHours}
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>{center.phone}</span>
                    </div>
                    
                    {center.additionalPhone && (
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>{center.additionalPhone}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>{center.email}</span>
                    </div>
                    
                    {center.website && (
                      <div>
                        <span className="font-semibold text-secondary">Website:</span>{' '}
                        <a href={center.website} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                          {center.website}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
