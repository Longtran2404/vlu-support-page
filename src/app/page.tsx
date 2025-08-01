"use client";

import HeroBanner from '../sections/HeroBanner';
import HighlightsSlider from '../sections/HighlightsSlider';
import IntroSection from '../sections/IntroSection';
import GallerySection from '../sections/GallerySection';
import ContactForm from '../sections/ContactForm';
import NavBar from '../components/NavBar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';

export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        {/* Navigation */}
        <NavBar />

        {/* Main Content Area */}
        <main className="container mx-auto px-4 py-8">
          {/* Hero Banner */}
          <section id="hero" className="mb-12">
            <HeroBanner />
          </section>

          {/* Featured Highlights */}
          <section id="highlights" className="mb-12 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Điểm nổi bật</h2>
            <HighlightsSlider />
          </section>

          {/* Introduction */}
          <section id="intro" className="mb-12 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Giới thiệu</h2>
            <IntroSection />
          </section>

          {/* Gallery */}
          <section id="gallery" className="mb-12">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Thư viện ảnh</h2>
              <GallerySection />
            </div>
          </section>

          {/* Contact Form */}
          <section id="contact" className="mb-12">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Liên hệ</h2>
              <ContactForm />
            </div>
          </section>
        </main>

        {/* Footer */}
        <Footer />

        {/* Chatbot - Fixed Position */}
        <div className="fixed bottom-4 right-4 z-50">
          <Chatbot />
        </div>
      </div>
    </div>
  );
}
