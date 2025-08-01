import Image from 'next/image';

export default function HeroBanner() {
  return (
    <section className="relative h-[60vh] md:h-[80vh]">
      <Image
        src="https://vluwebmedia.s3.ap-southeast-1.amazonaws.com/VL_101760_6f17bcc53a.jpg"
        alt="Trung tâm Hỗ trợ Sinh viên Banner"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          Trung tâm Hỗ trợ Sinh viên
        </h1>
        <p className="mt-4 text-lg md:text-2xl text-white max-w-2xl">
          Trung tâm Hỗ trợ Sinh viên luôn đồng hành cùng các bạn sinh viên Văn Lang, tạo môi
          trường học tập lành mạnh với hoạt động trải nghiệm đa diện…
        </p>
      </div>
    </section>
  );
}