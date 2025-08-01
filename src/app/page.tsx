import HeroBanner from '../sections/HeroBanner';
import IntroSection from '../sections/IntroSection';
import HighlightsSlider from '../sections/HighlightsSlider';
import GallerySection from '../sections/GallerySection';
import ContactForm from '../sections/ContactForm';

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
