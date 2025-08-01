import { useState } from 'react';

interface Highlight {
  title: string;
  content: string;
}

const HIGHLIGHTS: Highlight[] = [
  { title: 'Tiện ích sinh viên', content: 'Trung tâm Hỗ trợ Sinh viên quản lý…' },
  { title: 'Chính sách rèn luyện', content: 'Trung tâm Hỗ trợ Sinh viên có chức năng…' },
  { title: 'Hoạt động phong trào', content: 'Trung tâm Hỗ trợ Sinh viên phối hợp…' },
  { title: 'Ký túc xá', content: 'Trung tâm Hỗ trợ Sinh viên đặc biệt chú trọng…' },
];

export default function HighlightsSlider() {
  const [idx, setIdx] = useState(0);

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto">
        <h3 className="text-2xl font-semibold mb-6">Các hoạt động nổi bật</h3>
        <div className="relative">
          <div className="p-6 bg-white rounded shadow">
            <h4 className="text-xl font-medium mb-2">{HIGHLIGHTS[idx].title}</h4>
            <p className="text-gray-700">{HIGHLIGHTS[idx].content}</p>
          </div>
          <button
            onClick={() => setIdx((idx + HIGHLIGHTS.length - 1) % HIGHLIGHTS.length)}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full"
          >
            ‹
          </button>
          <button
            onClick={() => setIdx((idx + 1) % HIGHLIGHTS.length)}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}