"use client";

import HeroBanner from '@/sections/HeroBanner';
import HighlightsSlider from '@/sections/HighlightsSlider';
import IntroSection from '@/sections/IntroSection';
import GallerySection from '@/sections/GallerySection';
import ContactForm from '@/sections/ContactForm';
import ContactAccordion from '@/components/ContactAccordion';
import { useLang } from '../components/LanguageProvider';

export default function HomePage() {
  const { lang } = useLang();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Full width */}
      <section id="hero" className="w-full">
        <HeroBanner />
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-3 md:px-4 lg:px-8">
        {/* Featured Highlights */}
        <section id="highlights" className="py-8 md:py-16">
          <div className="mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-secondary mb-3 md:mb-4">
              {lang === 'vi' ? 'Điểm nổi bật' : 'Highlights'}
            </h2>
            <div className="w-16 md:w-20 h-1 bg-primary mx-auto"></div>
          </div>
          <HighlightsSlider />
        </section>

        {/* Introduction Section */}
        <section id="intro" className="py-8 md:py-16">
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-8 lg:p-12">
            <div className="mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-secondary mb-3 md:mb-4">
                {lang === 'vi' ? 'Giới thiệu về Trung tâm' : 'About Our Center'}
              </h2>
              <div className="w-16 md:w-20 h-1 bg-primary mx-auto"></div>
            </div>
            <IntroSection />
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="py-8 md:py-16">
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-8 lg:p-12">
            <div className="mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-secondary mb-3 md:mb-4">
                {lang === 'vi' ? 'Thư viện ảnh' : 'Photo Gallery'}
              </h2>
              <div className="w-16 md:w-20 h-1 bg-primary mx-auto"></div>
            </div>
            <GallerySection />
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="py-8 md:py-16">
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-8 lg:p-12">
            <div className="mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-secondary mb-3 md:mb-4">
                {lang === 'vi' ? 'Liên hệ với chúng tôi' : 'Contact Us'}
              </h2>
              <div className="w-16 md:w-20 h-1 bg-primary mx-auto"></div>
            </div>
            <ContactForm />
          </div>
        </section>

        {/* Quick Access Section */}
        <section id="quick-access" className="py-16">
          <div className="bg-gradient-to-r from-primary to-red-700 rounded-xl shadow-lg p-6 md:p-12 text-white">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-white">
                {lang === 'vi' ? 'Truy cập nhanh' : 'Quick Access'}
              </h2>
              <p className="text-lg md:text-xl text-white opacity-90">
                {lang === 'vi' ? 'Các dịch vụ và hệ thống hỗ trợ sinh viên' : 'Student support services and systems'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <a href="https://elearning.vanlanguni.edu.vn/" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 md:p-6 transition-all duration-300 hover:transform hover:scale-105">
                <div className="text-center">
                  <div className="bg-white/20 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7v10c0 5.55 3.84 9.77 9 11 5.16-1.23 9-5.45 9-11V7l-10-5z"/>
                    </svg>
                  </div>
                  <h3 className="text-base md:text-lg font-semibold mb-2 text-white">E-Learning</h3>
                  <p className="text-xs md:text-sm text-white opacity-90">{lang === 'vi' ? 'Hệ thống học trực tuyến' : 'Online Learning System'}</p>
                </div>
              </a>
              
              <a href="https://lib.vlu.edu.vn/" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 md:p-6 transition-all duration-300 hover:transform hover:scale-105">
                <div className="text-center">
                  <div className="bg-white/20 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                    </svg>
                  </div>
                  <h3 className="text-base md:text-lg font-semibold mb-2 text-white">{lang === 'vi' ? 'Thư viện' : 'Library'}</h3>
                  <p className="text-xs md:text-sm text-white opacity-90">{lang === 'vi' ? 'Hệ thống thư viện điện tử' : 'Digital Library System'}</p>
                </div>
              </a>
              
              <a href="https://ejob.vlu.edu.vn/" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 md:p-6 transition-all duration-300 hover:transform hover:scale-105">
                <div className="text-center">
                  <div className="bg-white/20 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14 6V4h-4v2h4zM4 8v11h16V8H4zm16-2c1.11 0 2 .89 2 2v11c0 1.11-.89 2-2 2H4c-1.11 0-2-.89-2-2V8c0-1.11.89-2 2-2h16z"/>
                    </svg>
                  </div>
                  <h3 className="text-base md:text-lg font-semibold mb-2 text-white">E-Job</h3>
                  <p className="text-xs md:text-sm text-white opacity-90">{lang === 'vi' ? 'Hệ thống tuyển dụng' : 'Job Portal System'}</p>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Contact Accordion Section */}
        <ContactAccordion />
      </div>
    </div>
  );
}
