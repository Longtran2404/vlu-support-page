import Image from 'next/image'

export default function HeroBanner() {
  return (
    <section className="relative h-[500px] w-full overflow-hidden rounded-lg">
      <Image
        src="https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=1200&q=80"
        alt="Trung tâm Hỗ trợ Sinh viên"
        fill
        className="object-cover"
        priority
        unoptimized
      />
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start px-6 md:px-20">
        <h1 className="text-4xl md:text-6xl text-white font-bold mb-4">
          Trung tâm Hỗ trợ Sinh viên
        </h1>
        <p className="max-w-2xl text-lg text-white mb-6">
          Trung tâm Hỗ trợ Sinh viên luôn đồng hành cùng các bạn sinh viên Văn Lang, tạo môi trường học tập lành mạnh và phát triển toàn diện.
        </p>
        <button className="bg-primary hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
          Liên hệ ngay
        </button>
      </div>
    </section>
  )
}
