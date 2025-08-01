export default function IntroSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-semibold mb-4">
            Đồng hành cùng sinh viên trên hành trình VLU
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Trung tâm Hỗ trợ Sinh viên luôn đặt mục tiêu mang đến những trải nghiệm toàn diện
            cho sinh viên, góp phần tạo ra những cơ hội tốt nhất…
          </p>
        </div>
        <div className="md:w-1/2">
          <img
            src="https://vluwebmedia.s3.ap-southeast-1.amazonaws.com/1_2_2024_24355a1eec.png"
            alt="Đồng hành cùng sinh viên"
            className="rounded shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}