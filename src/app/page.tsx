"use client";
import HeroBanner from '../sections/HeroBanner';
import IntroSection from '../sections/IntroSection';
import HighlightsSlider from '../sections/HighlightsSlider';
import GallerySection from '../sections/GallerySection';
import ContactForm from '../sections/ContactForm';
import Chatbot from '../components/Chatbot';

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <IntroSection />
      <HighlightsSlider />
      <GallerySection />
      <ContactForm />
      <Chatbot />
    </>
  );
}
