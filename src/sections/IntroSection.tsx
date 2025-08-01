export default function IntroSection() {
  return (
    <section className="py-8">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-6 text-secondary">
            Đồng hành cùng sinh viên trên hành trình VLU
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Trung tâm Hỗ trợ Sinh viên luôn đặt mục tiêu mang đến những trải nghiệm tốt nhất cho sinh viên trong suốt quá trình học tập tại Văn Lang.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Chúng tôi cam kết tạo ra một môi trường học tập lành mạnh, sáng tạo và phù hợp với từng cá nhân, giúp sinh viên phát triển toàn diện cả về kiến thức và kỹ năng sống.
          </p>
          <ul className="text-gray-700 space-y-2">
            <li>✓ Hỗ trợ học tập và sinh hoạt</li>
            <li>✓ Tư vấn tâm lý và định hướng nghề nghiệp</li>
            <li>✓ Tổ chức các hoạt động ngoại khóa</li>
            <li>✓ Quản lý ký túc xá và dịch vụ sinh viên</li>
          </ul>
        </div>
        <div className="flex justify-center">
          <div className="bg-primary/10 p-8 rounded-lg">
            <h3 className="text-xl font-semibold text-primary mb-4">Liên hệ với chúng tôi</h3>
            <div className="space-y-2 text-gray-600">
              <p>📍 45 Nguyễn Khắc Nhu, Tân Phú, TPHCM</p>
              <p>📞 (028) 3823 4567</p>
              <p>📧 hotrosinhvien@vlu.edu.vn</p>
              <p>🕒 Thứ 2 - Thứ 6: 7:30 - 17:00</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
