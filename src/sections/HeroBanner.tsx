import Image from 'next/image'
import { useLang } from '../components/LanguageProvider'

export default function HeroBanner() {
  const { lang } = useLang();

  const content = {
    vi: {
      title: "Trung tâm Hỗ trợ Sinh viên",
      subtitle: "Luôn đồng hành cùng bạn",
      description: "Trung tâm Hỗ trợ Sinh viên luôn đồng hành cùng các bạn sinh viên Văn Lang, tạo môi trường học tập lành mạnh và phát triển toàn diện.",
      cta: "Liên hệ ngay",
      stats: [
        { number: "10,000+", label: "Sinh viên được hỗ trợ" },
        { number: "24/7", label: "Hỗ trợ trực tuyến" },
        { number: "50+", label: "Dịch vụ hỗ trợ" }
      ]
    },
    en: {
      title: "Student Support Center",
      subtitle: "Always by your side",
      description: "The Student Support Center is always with Van Lang students, creating a healthy learning environment and comprehensive development.",
      cta: "Contact now",
      stats: [
        { number: "10,000+", label: "Students supported" },
        { number: "24/7", label: "Online support" },
        { number: "50+", label: "Support services" }
      ]
    }
  };

  const currentContent = content[lang as keyof typeof content];

  return (
    <section className="relative h-[600px] md:h-[700px] w-full overflow-hidden">
      <Image
        src="/images/campus1.jpg"
        alt="Trung tâm Hỗ trợ Sinh viên"
        fill
        className="object-cover"
        priority
        unoptimized
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = 'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=1200&q=80';
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <div className="mb-4">
              <span className="inline-block bg-primary/90 text-white px-4 py-2 rounded-full text-sm font-medium">
                VAN LANG UNIVERSITY
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold mb-4 leading-tight">
              {currentContent.title}
            </h1>
            
            <h2 className="text-xl md:text-2xl text-primary font-semibold mb-6">
              {currentContent.subtitle}
            </h2>
            
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl">
              {currentContent.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a 
                href="#contact" 
                className="bg-primary hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:transform hover:scale-105 text-center"
              >
                {currentContent.cta}
              </a>
              <a 
                href="#intro" 
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold transition-all duration-300 text-center"
              >
                {lang === 'vi' ? 'Tìm hiểu thêm' : 'Learn more'}
              </a>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              {currentContent.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm md:text-base text-gray-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  )
}
