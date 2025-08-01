// src/app/page.tsx
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">
        Trang Trung tâm Hỗ trợ Sinh viên VLU
      </h1>
      {/* TODO: Thêm các section nội dung ở đây */}
      <p className="text-base mb-4">
        Chào mừng bạn đến với chatbot hỗ trợ sinh viên VLU. Hãy bấm vào icon chat để bắt đầu hỏi!
      </p>
    </Layout>
  );
}
