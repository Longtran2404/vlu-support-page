'use client'
import Image from 'next/image';
import Link from 'next/link';

const LOGO_URL = "https://cdn.haitrieu.com/wp-content/uploads/2022/12/Logo-Dai-Hoc-Van-Lang-H.png";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo và thông tin chính */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src={LOGO_URL}
                alt="Văn Lang University"
                width={80}
                height={27}
                className="object-contain"
                unoptimized
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/80x27/C8102E/FFFFFF?text=VLU';
                }}
              />
              <div>
                <h3 className="text-lg font-bold">Trường Đại học Văn Lang</h3>
                <p className="text-sm text-gray-300">Van Lang University</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Trung tâm Hỗ trợ Sinh viên luôn đồng hành cùng các bạn sinh viên 
              Văn Lang, tạo môi trường học tập lành mạnh với hoạt động trải 
              nghiệm đa dạng, giúp các bạn có thể phát huy được những thế 
              mạnh của bản thân.
            </p>
          </div>

          {/* Thông tin liên hệ */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Thông tin liên hệ</h4>
            <div className="space-y-2 text-gray-300">
              <p>📍 45 Nguyễn Khắc Nhu, Tân Phú, TPHCM</p>
              <p>📞 (028) 3823 4567</p>
              <p>✉️ support@vlu.edu.vn</p>
              <p>🌐 www.vlu.edu.vn</p>
            </div>
          </div>

          {/* Liên kết nhanh */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liên kết nhanh</h4>
            <div className="space-y-2">
              <Link href="#gioi-thieu" className="block text-gray-300 hover:text-white transition-colors">
                Về Văn Lang
              </Link>
              <Link href="#dao-tao" className="block text-gray-300 hover:text-white transition-colors">
                Đào tạo
              </Link>
              <Link href="#tuyen-sinh" className="block text-gray-300 hover:text-white transition-colors">
                Tuyển sinh
              </Link>
              <Link href="#doi-song" className="block text-gray-300 hover:text-white transition-colors">
                Đời sống Văn Lang
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Trường Đại học Văn Lang. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}
