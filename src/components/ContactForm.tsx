import { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', role: '', question: '' });

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: gọi API hoặc webhook
    alert('Cảm ơn bạn đã gửi, chúng tôi sẽ liên hệ sớm!');
  }

  return (
    <section className="py-16 bg-blue-900 text-white">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 space-y-4">
          <h3 className="text-3xl font-semibold">Liên hệ để nhận thông tin tư vấn & hỗ trợ</h3>
          <p>Liên hệ chúng tôi<br/>Trung tâm Hỗ trợ Sinh viên<br/>Email: hotrosinhvien@vlu.edu.vn</p>
        </div>
        <form onSubmit={onSubmit} className="md:w-1/2 bg-white text-gray-900 p-6 rounded shadow space-y-4">
          <input name="name" onChange={onChange} required placeholder="Họ và tên" className="w-full p-2 border rounded" />
          <select name="role" onChange={onChange} className="w-full p-2 border rounded">
            <option value="">Bạn là (vui lòng chọn)</option>
            <option value="student">Sinh viên</option>
            <option value="staff">Nhân viên</option>
          </select>
          <input name="phone" onChange={onChange} required placeholder="Số điện thoại" className="w-full p-2 border rounded" />
          <input name="email" onChange={onChange} required type="email" placeholder="Email" className="w-full p-2 border rounded" />
          <textarea name="question" onChange={onChange} placeholder="Câu hỏi của bạn" rows={4} className="w-full p-2 border rounded" />
          <button type="submit" className="w-full bg-red-800 text-white py-2 rounded">
            Gửi
          </button>
        </form>
      </div>
    </section>
  );
}