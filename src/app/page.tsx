"use client";

import HeroBanner from '@/sections/HeroBanner';
import ContactForm from '@/sections/ContactForm';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Main Content - Centered */}
      <div className="max-w-7xl mx-auto">
        {/* Main Content Area */}
        <main className="px-4 py-8">
          {/* Hero Banner */}
          <section id="hero" className="mb-12">
            <HeroBanner />
          </section>

          {/* Contact Form */}
          <section id="contact" className="mb-12">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Liên hệ</h2>
              <ContactForm />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
