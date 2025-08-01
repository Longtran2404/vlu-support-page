const images = ['/gallery/1.jpg', '/gallery/2.jpg', '/gallery/3.jpg', /*...*/]

export default function GallerySection() {
  return (
    <section className="bg-blue-900 py-16">
      <div className="max-w-6xl mx-auto px-4 text-white mb-8">
        <h2 className="text-3xl font-semibold">Gallery</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto px-4">
        {images.map((src, i) => (
          <div key={i} className="overflow-hidden rounded-lg">
            <img src={src} alt={`gallery-${i}`} className="w-full h-full object-cover transition-transform hover:scale-105" />
          </div>
        ))}
      </div>
    </section>
  )
}
