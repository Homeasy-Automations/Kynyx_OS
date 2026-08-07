import { useSEO } from '../hooks/useSEO';
import { AISection } from '../sections/home/AISection';
import { Capabilities } from '../sections/home/Capabilities';
import { FinalCTA } from '../sections/home/FinalCTA';
import { Hero } from '../sections/home/Hero';
import { IndustriesSection } from '../sections/home/IndustriesSection';
import { InsightsSection } from '../sections/home/InsightsSection';
import { Intro } from '../sections/home/Intro';
import { ProcessSection } from '../sections/home/ProcessSection';
import { SelectedWork } from '../sections/home/SelectedWork';
import { ServicesSection } from '../sections/home/ServicesSection';
import { StatsSection } from '../sections/home/StatsSection';
import { TestimonialsSection } from '../sections/home/TestimonialsSection';
import { WhyKynyx } from '../sections/home/WhyKynyx';

/** The KYNYX homepage — a single scroll narrative. */
export default function HomePage() {
  useSEO(
    'KYNYX',
    'KYNYX designs and engineers digital products, intelligent AI systems and scalable technology for ambitious businesses. Web. Mobile. AI. Design. Growth.',
  );

  return (
    <>
      <Hero />
      <Intro />
      <ServicesSection />
      <SelectedWork />
      <Capabilities />
      <AISection />
      <ProcessSection />
      <WhyKynyx />
      <StatsSection />
      <IndustriesSection />
      <TestimonialsSection />
      <InsightsSection />
      <FinalCTA />
    </>
  );
}
