import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import AboutSection from "@/components/AboutSection";
import WorkSection from "@/components/WorkSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import PricingSection from "@/components/PricingSection";
import QRSection from "@/components/QRSection";
import TestimonialsSection from "@/components/TestimonialsSection";

// These are named exports from the ones we just created
import { FAQSection } from "@/components/FAQSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CustomCursor } from "@/components/CustomCursor";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#0a0a0a] text-white overflow-hidden">
      <CustomCursor />
      <WhatsAppButton />
      <Navigation />
      <HeroSection />
      <StatsBar />
      <AboutSection />
      <WorkSection />
      <ServicesSection />
      <ProcessSection />
      <PricingSection />
      <QRSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
