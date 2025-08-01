'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Image from 'next/image'

const slides = [
  { 
    title: 'Đồng hành cùng sinh viên', 
    text: 'Luôn đồng hành và hỗ trợ sinh viên trong suốt quá trình học tập tại Văn Lang',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80'
  },
  { 
    title: 'Kiến tạo môi trường học tập',  
    text: 'Xây dựng môi trường học tập hiện đại, sáng tạo và phù hợp với từng sinh viên',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&q=80'
  },
  { 
    title: 'Hoạt động phong trào',  
    text: 'Phối hợp với Đoàn - Hội tổ chức các hoạt động phong trào sinh viên sôi nổi',
    image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=1200&q=80'
  },
  { 
    title: 'Ký túc xá',            
    text: 'Hệ thống an ninh và cơ sở vật chất hiện đại, tạo không gian sống thoải mái',
    image: 'https://www.vlu.edu.vn/_next/image?url=https%3A%2F%2Fvluwebmedia.s3.ap-southeast-1.amazonaws.com%2F1_f2bae11e9d.jpeg&w=1920&q=75'
  },
]

export default function HighlightsSlider() {
  return (
    <section className="bg-white">
      <div className="w-full">
        <Swiper 
          spaceBetween={0} 
          slidesPerView={1} 
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          modules={[Navigation, Pagination, Autoplay]}
          breakpoints={{ 
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2 }
          }}
          className="w-full"
        >
          {slides.map((s, i) => (
            <SwiperSlide key={i}>
              <div className="relative h-96 overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover w-full h-full"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-bold mb-3 text-white">{s.title}</h3>
                  <p className="text-gray-200 text-base max-w-lg">{s.text}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
