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
    src: 'https://vluwebmedia.s3.ap-southeast-1.amazonaws.com/1_f2bae11e9d.jpeg',
    title: 'Khuôn viên chính VLU',
    desc: 'Tòa nhà chính của trường Đại học Văn Lang với kiến trúc hiện đại',
  },
  {
    src: 'https://vluwebmedia.s3.ap-southeast-1.amazonaws.com/1_f2bae11e9d.jpeg',
    title: 'Hội trường VLU',
    desc: 'Không gian tổ chức sự kiện và hoạt động học thuật',
  },
  {
    src: 'https://vluwebmedia.s3.ap-southeast-1.amazonaws.com/1_f2bae11e9d.jpeg',
    title: 'Phòng học thông minh',
    desc: 'Trang thiết bị hiện đại phục vụ giảng dạy và học tập',
  },
  {
    src: 'https://vluwebmedia.s3.ap-southeast-1.amazonaws.com/1_f2bae11e9d.jpeg',
    title: 'Khu vực sinh hoạt',
    desc: 'Không gian thư giãn và giao lưu của sinh viên',
  },
  {
    src: 'https://vluwebmedia.s3.ap-southeast-1.amazonaws.com/andrew_neel_ute2_XAFQU_2_I_unsplash_57b973f279.jpg',
    title: 'Môi trường học tập đa sắc màu',
    desc: 'Kiến tạo môi trường học tập và trải nghiệm đa sắc màu cho sinh viên',
  },
  {
    src: 'https://vluwebmedia.s3.ap-southeast-1.amazonaws.com/1_2_2024_24355a1eec.png',
    title: 'Đồng hành cùng sinh viên',
    desc: 'Đồng hành cùng sinh viên trên hành trình VLU',
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
            className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer bg-white"
            onClick={() => handleImageClick(img)}
          >
            <div className="relative w-full h-64 md:h-72 lg:h-80">
              <Image
                src={img.src}
                alt={img.title}
                fill
                className="object-cover transform transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                unoptimized
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h3 className="text-white font-bold text-lg mb-1">{img.title}</h3>
              <p className="text-white/90 text-sm mb-3">{img.desc}</p>
              <button className="self-start text-white bg-primary hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
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
