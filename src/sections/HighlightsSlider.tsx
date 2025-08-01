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
    image: 'https://www.vlu.edu.vn/_next/image?url=https%3A%2F%2Fvluwebmedia.s3.ap-southeast-1.amazonaws.com%2F1_2_2024_24355a1eec.png&w=1920&q=75'
  },
  { 
    title: 'Kiến tạo môi trường học tập',  
    text: 'Xây dựng môi trường học tập hiện đại, sáng tạo và phù hợp với từng sinh viên',
    image: 'https://www.vlu.edu.vn/_next/image?url=https%3A%2F%2Fvluwebmedia.s3.ap-southeast-1.amazonaws.com%2Fandrew_neel_ute2_XAFQU_2_I_unsplash_57b973f279.jpg&w=1920&q=50'
  },
  { 
    title: 'Hoạt động phong trào',  
    text: 'Phối hợp với Đoàn - Hội tổ chức các hoạt động phong trào sinh viên sôi nổi',
    image: 'https://www.vlu.edu.vn/_next/image?url=https%3A%2F%2Fvluwebmedia.s3.ap-southeast-1.amazonaws.com%2F1_f2bae11e9d.jpeg&w=1920&q=75'
  },
  { 
    title: 'Ký túc xá',            
    text: 'Hệ thống an ninh và cơ sở vật chất hiện đại, tạo không gian sống thoải mái',
    image: 'https://www.vlu.edu.vn/_next/image?url=https%3A%2F%2Fvluwebmedia.s3.ap-southeast-1.amazonaws.com%2F1_f2bae11e9d.jpeg&w=1920&q=75'
  },
]

export default function HighlightsSlider() {
  return (
    <section className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <Swiper 
          spaceBetween={20} 
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
        >
          {slides.map((s, i) => (
            <SwiperSlide key={i}>
              <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-semibold mb-2 text-white">{s.title}</h3>
                  <p className="text-gray-200 text-sm">{s.text}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
