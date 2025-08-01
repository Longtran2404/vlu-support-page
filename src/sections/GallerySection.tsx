import Image from 'next/image';
const images = [
  '/vlu-static/vluwebmedia.s3.ap-southeast-1.amazonaws.com/DSC_0281_e074597c0e.jpg',
  '/vlu-static/vluwebmedia.s3.ap-southeast-1.amazonaws.com/VLU_0296_93a9306bb9.jpg',
  '/vlu-static/vluwebmedia.s3.ap-southeast-1.amazonaws.com/VL_102002_5c84c21dff.jpg',
  '/vlu-static/vluwebmedia.s3.ap-southeast-1.amazonaws.com/6_1b2150fefb.jpeg',
  '/vlu-static/vluwebmedia.s3.ap-southeast-1.amazonaws.com/MG_4580_9c940e7ecb.jpg',
  '/vlu-static/vluwebmedia.s3.ap-southeast-1.amazonaws.com/1_f2bae11e9d.jpeg',
];

export default function GallerySection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <h2 className="text-3xl font-bold text-secondary mb-4">Gallery</h2>
        <p className="text-gray-600">Một số hình ảnh nổi bật của Văn Lang</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {images.map((src, i) => (
          <div key={i} className="overflow-hidden rounded-xl shadow-lg bg-gray-100 flex items-center justify-center h-64 group relative">
            <Image src={src} alt={`gallery-${i}`} width={400} height={250} className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" />
            <button type="button" className="absolute bottom-4 right-4 bg-red-600 text-white px-3 py-1 rounded shadow hover:bg-red-700 text-sm">Phóng to</button>
          </div>
        ))}
      </div>
    </section>
  );
}
