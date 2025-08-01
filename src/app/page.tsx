"use client";

import HeroBanner from '../sections/HeroBanner';
import HighlightsSlider from '../sections/HighlightsSlider';
import IntroSection from '../sections/IntroSection';
import GallerySection from '../sections/GallerySection';
import ContactForm from '../sections/ContactForm';
import Chatbot from '../components/Chatbot';
import Footer from '../components/Footer';
export default function HomePage() {
  return (
    <>
      {/* Hero Banner */}
      <section id="hero">
        <HeroBanner />
      </section>

      {/* Featured Highlight (Slider) */}
      <section id="featured_highlight" className="mt-8">
        <HighlightsSlider />
      </section>

      {/* Highlight Message */}
      <section id="highlight_message" className="mt-8">
        <IntroSection />
      </section>

      {/* Gallery */}
      <section id="gallery" className="mt-8">
        <GallerySection />
      </section>

      {/* Contact Form */}
      <section id="form" className="mt-8">
        <ContactForm />
      </section>

      {/* Chatbot */}
      <section id="chatbot" className="mt-8">
        <Chatbot />
      </section>
      
      {/* Footer */}
      <Footer />
// ...existing code...
    </>
  );
}
