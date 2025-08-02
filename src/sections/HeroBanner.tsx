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
    <section className="relative h-[500px] md:h-[600px] lg:h-[700px] w-full overflow-hidden">
      <Image
        src="https://vluwebmedia.s3.ap-southeast-1.amazonaws.com/1_f2bae11e9d.jpeg"
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
            <div className="mb-3 md:mb-4">
              <span className="inline-block bg-primary/90 text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">
                VAN LANG UNIVERSITY
              </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-bold mb-3 md:mb-4 leading-tight">
              {currentContent.title}
            </h1>
            
            <h2 className="text-lg md:text-xl lg:text-2xl text-primary font-semibold mb-4 md:mb-6">
              {currentContent.subtitle}
            </h2>
            
            <p className="text-base md:text-lg lg:text-xl text-gray-200 mb-6 md:mb-8 leading-relaxed max-w-2xl">
              {currentContent.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-12">
              <a 
                href="#contact" 
                className="bg-primary hover:bg-red-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold transition-all duration-300 hover:transform hover:scale-105 text-center text-sm md:text-base"
              >
                {currentContent.cta}
              </a>
              <a 
                href="#intro" 
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold transition-all duration-300 text-center text-sm md:text-base"
              >
                {lang === 'vi' ? 'Tìm hiểu thêm' : 'Learn more'}
              </a>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8">
              {currentContent.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 md:mb-2">
                    {stat.number}
                  </div>
                  <div className="text-xs md:text-sm lg:text-base text-gray-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-2 md:h-3 bg-white rounded-full mt-1 md:mt-2"></div>
        </div>
      </div>
    </section>
  )
}
