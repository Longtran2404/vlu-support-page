const IMAGES = [
  '/vlu-static/images/img1.jpg',
  '/vlu-static/images/img2.jpg',
  '/vlu-static/images/img3.jpg',
  // … thêm các đường dẫn tĩnh bạn đã mirror
];

export default function GallerySection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <h3 className="text-2xl font-semibold mb-6">Gallery</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {IMAGES.map((src, i) => (
            <img key={i} src={src} alt={`VLU gallery ${i}`} className="rounded-lg shadow" />
          ))}
        </div>
      </div>
    </section>
  );
}