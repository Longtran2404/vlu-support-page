import Image from 'next/image'

export default function HeroBanner() {
  return (
    <section className="relative h-[500px] w-full overflow-hidden">
      <Image
        src="/static/banner.jpg" // thay bằng đường dẫn tĩnh bạn đã mirror
        alt="Trung tâm Hỗ trợ Sinh viên"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start px-6 md:px-20">
        <h1 className="text-4xl md:text-6xl text-white font-bold mb-4">
          Trung tâm Hỗ trợ Sinh viên
        </h1>
        <p className="max-w-2xl text-lg text-white">
          Trung tâm Hỗ trợ Sinh viên luôn đồng hành cùng các bạn sinh viên Văn Lang, tạo môi trường học tập lành mạnh...
        </p>
      </div>
    </section>
  )
}
