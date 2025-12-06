import { Hero } from '@/components/Landing/Hero';
import { HowItWorks } from '@/components/Landing/HowItWorks';
import { Features } from '@/components/Landing/Features';
import { StoreIntegrationSection } from '@/components/Landing/StoreIntegrationSection';
import { StartCTA } from '@/components/Landing/StartCTA';
import { Footer } from '@/components/Landing/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <HowItWorks />
      <Features />
      <StoreIntegrationSection />
      <StartCTA />
      <Footer />
    </main>
  );
}