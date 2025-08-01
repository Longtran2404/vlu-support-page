import Image from 'next/image';
import { useState, useCallback } from 'react';

interface GalleryImage {
  src: string;
  title: string;
  desc: string;
  blurDataUrl?: string; // Base64 blur placeholder
}

const images: GalleryImage[] = [
  {
    src: 'https://www.vlu.edu.vn/_next/image?url=https%3A%2F%2Fvluwebmedia.s3.ap-southeast-1.amazonaws.com%2F1_f2bae11e9d.jpeg&w=1920&q=75',
    title: 'Khuôn viên chính',
    desc: 'Tòa nhà chính của trường Đại học Văn Lang',
  },
  {
    src: 'https://www.vlu.edu.vn/_next/image?url=https%3A%2F%2Fvluwebmedia.s3.ap-southeast-1.amazonaws.com%2F1_2_2024_24355a1eec.png&w=1920&q=75',
    title: 'Thư viện',
    desc: 'Không gian học tập hiện đại',
  },
  {
    src: 'https://www.vlu.edu.vn/_next/image?url=https%3A%2F%2Fvluwebmedia.s3.ap-southeast-1.amazonaws.com%2Fandrew_neel_ute2_XAFQU_2_I_unsplash_57b973f279.jpg&w=1920&q=50',
    title: 'Phòng thí nghiệm',
    desc: 'Trang thiết bị hiện đại',
  },
  {
    src: 'https://www.vlu.edu.vn/_next/image?url=https%3A%2F%2Fvluwebmedia.s3.ap-southeast-1.amazonaws.com%2FVLU_View010000_Post_moi_2022_077ecc58a4.jpg&w=1920&q=75',
    title: 'Khu thể thao',
    desc: 'Sân thể thao đa năng',
  },
  {
    src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    title: 'Căn tin',
    desc: 'Không gian ẩm thực',
  },
  {
    src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80',
    title: 'Sự kiện',
    desc: 'Hoạt động ngoại khóa',
  }
];

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const handleImageClick = useCallback((image: GalleryImage) => {
    setSelectedImage(image);
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, i) => (
          <div 
            key={i} 
            className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
            onClick={() => handleImageClick(img)}
          >
            <div className="aspect-w-16 aspect-h-9">
              <Image
                src={img.src}
                alt={img.title}
                width={400}
                height={300}
                className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-110"
                unoptimized // Using unoptimized for external images
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h3 className="text-white font-bold text-lg">{img.title}</h3>
              <p className="text-white text-sm">{img.desc}</p>
              <button className="mt-2 text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm">
                Xem chi tiết
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" 
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="bg-white rounded-lg overflow-hidden">
              <Image
                src={selectedImage.src}
                alt={selectedImage.title}
                width={1200}
                height={800}
                className="object-contain w-full h-auto max-h-[80vh]"
                unoptimized
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
                <p className="text-gray-600">{selectedImage.desc}</p>
              </div>
            </div>
            <button
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
