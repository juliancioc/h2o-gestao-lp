import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { MessageCircle } from "lucide-react";
import PricingHighlight from "@/components/Pricing";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <PricingHighlight />
        <FeaturesSection />
        <HowItWorksSection />
        {/* <PricingSection /> */}
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />

      <a
        href="https://wa.me/5574999215010"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="28"
          height="28"
          fill="currentColor"
        >
          <path d="M16.01 3C8.82 3 3 8.82 3 16.01c0 2.53.74 5 2.13 7.11L3 29l6.06-2.08a13 13 0 0 0 6.95 2.01H16c7.19 0 13.01-5.82 13.01-13.01S23.2 3 16.01 3zm0 23.7a10.7 10.7 0 0 1-5.45-1.49l-.39-.23-3.6 1.24 1.17-3.51-.25-.41a10.72 10.72 0 1 1 8.52 4.4zm5.88-8.02c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1 1.25-.18.21-.36.24-.68.08-.32-.16-1.33-.49-2.53-1.56-.93-.83-1.56-1.86-1.74-2.17-.18-.32-.02-.49.14-.65.14-.14.32-.36.48-.54.16-.18.21-.32.32-.54.11-.21.05-.41-.03-.57-.08-.16-.71-1.72-.98-2.35-.26-.63-.52-.54-.71-.55h-.61c-.21 0-.54.08-.82.38-.28.3-1.08 1.06-1.08 2.58s1.11 2.99 1.26 3.2c.16.21 2.18 3.33 5.28 4.67.74.32 1.32.51 1.77.65.74.24 1.41.21 1.94.13.59-.09 1.89-.77 2.16-1.51.27-.74.27-1.37.19-1.51-.08-.13-.29-.21-.61-.38z" />
        </svg>
      </a>
    </div>
  );
};

export default Index;
