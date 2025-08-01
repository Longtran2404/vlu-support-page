import HeroBanner from '../components/HeroBanner';
import IntroSection from '../components/IntroSection';
import HighlightsSlider from '../components/HighlightsSlider';
import GallerySection from '../components/GallerySection';
import ContactForm from '../components/ContactForm';

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <IntroSection />
      <HighlightsSlider />
      <GallerySection />
      <ContactForm />
    </>
  );
}
