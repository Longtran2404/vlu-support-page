'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [activeTab, setActiveTab] = useState<'contact' | 'support'>('contact');
  const [formData, setFormData] = useState({
    fullname: '',
    role: '',
    phone: '',
    email: '',
    question: '',
    faculty: '',
    file: null as File | null
  });

  const faculties = [
    'Khoa Điều dưỡng',
    'Khoa Kỹ thuật Y học',
    'Khoa Dược',
    'Khoa Răng Hàm Mặt',
    'Khoa Y',
    'Khoa Kiến trúc',
    'Khoa Quan hệ Công chúng và Truyền thông',
    'Khoa Xã hội và Nhân văn',
    'Khoa Luật',
    'Khoa Ngôn ngữ và Văn hóa Hàn Quốc',
    'Khoa Ngoại Ngữ',
    'Khoa Du lịch',
    'Khoa Quản trị Kinh doanh',
    'Khoa Tài chính - Ngân hàng',
    'Khoa Thương Mại',
    'Khoa Kế toán & Kiểm toán',
    'Khoa Mỹ thuật & Thiết kế',
    'Khoa Âm nhạc, Sân khấu, Điện ảnh',
    'Khoa Xây Dựng',
    'Khoa Công nghệ ứng dụng',
    'Khoa Môi trường',
    'Khoa Công nghệ sáng tạo',
    'Khoa Kỹ thuật Ô tô',
    'Khoa Công nghệ thông tin',
    'Khoa Kỹ thuật Cơ - Điện và Máy tính'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData = new FormData();
    submitData.append('fullname', formData.fullname);
    submitData.append('role', formData.role);
    submitData.append('phone', formData.phone);
    submitData.append('email', formData.email);
    
    if (activeTab === 'contact') {
      submitData.append('question', formData.question);
      submitData.append('type', 'contact');
    } else {
      submitData.append('faculty', formData.faculty);
      submitData.append('type', 'GKSK');
      if (formData.file) {
        submitData.append('file', formData.file);
      }
    }

    try {
      const response = await fetch('https://reindeer-tight-firstly.ngrok-free.app/webhook-test/e7c634f6-fc01-44f3-b774-fbccee4a9de6', {
        method: 'POST',
        body: submitData,
      });
      
      if (response.ok) {
        alert('Gửi thành công!');
        setFormData({
          fullname: '',
          role: '',
          phone: '',
          email: '',
          question: '',
          faculty: '',
          file: null
        });
      } else {
        alert('Có lỗi xảy ra, vui lòng thử lại!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra, vui lòng thử lại!');
    }
  };

  return (
    <section className="bg-blue-900 py-16">
      <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row gap-8">
        {/* Info */}
        <div className="flex-1 text-white">
          <h2 className="text-3xl font-semibold mb-4 text-white">Liên hệ để nhận thông tin tư vấn & hỗ trợ</h2>
          <p className="text-white">Trung tâm Hỗ trợ Sinh viên</p>
          <p className="text-white">Email: hotrosinhvien@vlu.edu.vn</p>
        </div>
        
        {/* Form Container */}
        <div className="flex-1 bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('contact')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                activeTab === 'contact'
                  ? 'bg-primary text-white border-b-2 border-primary'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              Liên hệ
            </button>
            <button
              onClick={() => setActiveTab('support')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                activeTab === 'support'
                  ? 'bg-primary text-white border-b-2 border-primary'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              Hỗ trợ GKSK
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="fullname" className="text-sm font-medium mb-1">Họ và tên <span className="text-red-600">*</span></label>
                <input 
                  id="fullname" 
                  name="fullname"
                  type="text" 
                  placeholder="Nhập họ và tên" 
                  required 
                  className="border p-3 rounded"
                  value={formData.fullname}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="role" className="text-sm font-medium mb-1">Bạn là <span className="text-red-600">*</span></label>
                <select 
                  id="role" 
                  name="role"
                  required 
                  className="border p-3 rounded"
                  value={formData.role}
                  onChange={handleInputChange}
                >
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
                <input 
                  id="phone" 
                  name="phone"
                  type="tel" 
                  placeholder="Nhập số điện thoại" 
                  required 
                  pattern="[0-9]{10,11}" 
                  className="border p-3 rounded"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="text-sm font-medium mb-1">Email <span className="text-red-600">*</span></label>
                <input 
                  id="email" 
                  name="email"
                  type="email" 
                  placeholder="Nhập email" 
                  required 
                  className="border p-3 rounded"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Show faculty selection only for students in support tab */}
            {activeTab === 'support' && formData.role === 'sv' && (
              <div className="flex flex-col">
                <label htmlFor="faculty" className="text-sm font-medium mb-1">Khoa <span className="text-red-600">*</span></label>
                <select 
                  id="faculty" 
                  name="faculty"
                  required 
                  className="border p-3 rounded"
                  value={formData.faculty}
                  onChange={handleInputChange}
                >
                  <option value="">Chọn khoa</option>
                  {faculties.map((faculty, index) => (
                    <option key={index} value={faculty}>{faculty}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Contact form specific fields */}
            {activeTab === 'contact' && (
              <div className="flex flex-col">
                <label htmlFor="question" className="text-sm font-medium mb-1">Câu hỏi của bạn <span className="text-red-600">*</span></label>
                <textarea 
                  id="question" 
                  name="question"
                  placeholder="Nhập câu hỏi của bạn" 
                  rows={5} 
                  required 
                  className="border p-3 rounded w-full"
                  value={formData.question}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            )}

            {/* Support form specific fields */}
            {activeTab === 'support' && (
              <div className="flex flex-col">
                <label htmlFor="file" className="text-sm font-medium mb-1">Upload hồ sơ khám sức khỏe <span className="text-red-600">*</span></label>
                <input 
                  id="file" 
                  name="file"
                  type="file" 
                  required 
                  className="border p-3 rounded"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Chấp nhận file: PDF, DOC, DOCX, JPG, PNG (tối đa 10MB)
                </p>
              </div>
            )}

            <button 
              type="submit" 
              className="w-full bg-red-700 text-white py-3 rounded hover:bg-red-800 transition font-semibold text-lg"
            >
              {activeTab === 'contact' ? 'Gửi liên hệ' : 'Gửi hồ sơ GKSK'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
