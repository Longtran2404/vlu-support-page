export default function ContactForm() {
  return (
    <section className="bg-blue-900 py-16">
      <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row gap-8">
        {/* Info */}
        <div className="flex-1 text-white">
          <h2 className="text-3xl font-semibold mb-4 text-white">Liên hệ để nhận thông tin tư vấn & hỗ trợ</h2>
          <p className="text-white">Trung tâm Hỗ trợ Sinh viên</p>
          <p className="text-white">Email: hotrosinhvien@vlu.edu.vn</p>
        </div>
        {/* Form */}
        <form action="#" className="flex-1 space-y-4 bg-white p-6 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="fullname" className="text-sm font-medium mb-1">Họ và tên <span className="text-red-600">*</span></label>
              <input id="fullname" type="text" placeholder="Nhập họ và tên" required className="border p-3 rounded" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="role" className="text-sm font-medium mb-1">Bạn là <span className="text-red-600">*</span></label>
              <select id="role" required className="border p-3 rounded">
                <option value="">Vui lòng chọn</option>
                <option value="sv">Sinh viên Văn Lang</option>
                <option value="ph">Phụ huynh Văn Lang</option>
                <option value="gv">Giảng viên Văn Lang</option>
                <option value="al">Cựu sinh viên Văn Lang</option>
                <option value="khac">Khác</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone" className="text-sm font-medium mb-1">Số điện thoại <span className="text-red-600">*</span></label>
              <input id="phone" type="tel" placeholder="Nhập số điện thoại" required pattern="[0-9]{10,11}" className="border p-3 rounded" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium mb-1">Email <span className="text-red-600">*</span></label>
              <input id="email" type="email" placeholder="Nhập email" required className="border p-3 rounded" />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="question" className="text-sm font-medium mb-1">Câu hỏi của bạn <span className="text-red-600">*</span></label>
            <textarea id="question" placeholder="Nhập câu hỏi của bạn" rows={5} required className="border p-3 rounded w-full"></textarea>
          </div>
          <button type="submit" className="w-full bg-red-700 text-white py-3 rounded hover:bg-red-800 transition font-semibold text-lg">
            Gửi
          </button>
        </form>
      </div>
    </section>
  )
}
