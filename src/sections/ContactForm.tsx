export default function ContactForm() {
  return (
    <section className="bg-blue-900 py-16">
      <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row gap-8">
        {/* Info */}
        <div className="flex-1 text-white">
          <h2 className="text-3xl font-semibold mb-4">Liên hệ để nhận thông tin tư vấn & hỗ trợ</h2>
          <p>Trung tâm Hỗ trợ Sinh viên</p>
          <p>Email: hotrosinhvien@vlu.edu.vn</p>
        </div>
        {/* Form */}
        <form action="#" className="flex-1 space-y-4 bg-white p-6 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Họ và tên *" required className="border p-3 rounded" />
            <select required className="border p-3 rounded">
              <option value="">Bạn là (Vui lòng chọn)</option>
              <option value="sv">Sinh viên</option>
              <option value="gv">Giảng viên</option>
              <option value="khac">Khác</option>
            </select>
            <input type="tel" placeholder="Số điện thoại *" required className="border p-3 rounded" />
            <input type="email" placeholder="Email *" required className="border p-3 rounded" />
          </div>
          <textarea placeholder="Câu hỏi của bạn" rows={5} className="border p-3 rounded w-full"></textarea>
          <button type="submit" className="w-full bg-red-800 text-white py-3 rounded hover:bg-red-900 transition">
            Gửi
          </button>
        </form>
      </div>
    </section>
  )
}
