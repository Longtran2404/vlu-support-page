'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const slides = [
  { title: 'Tiện ích sinh viên', text: 'Quản lý và giải quyết các vấn đề...' },
  { title: 'Chính sách rèn luyện',  text: 'Thực hiện các chính sách và...' },
  { title: 'Hoạt động phong trào',  text: 'Phối hợp với Đoàn - Hội tổ chức...' },
  { title: 'Ký túc xá',            text: 'Hệ thống an ninh và cơ sở vật chất...' },
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
          modules={[Navigation, Pagination]}
          breakpoints={{ 
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
        >
          {slides.map((s, i) => (
            <SwiperSlide key={i}>
              <div className="p-6 border rounded-lg h-full">
                <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-gray-600">{s.text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
