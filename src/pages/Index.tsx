import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CoreOfferings } from "@/components/CoreOfferings";
import { Stats } from "@/components/Stats";
import { Services } from "@/components/Services";
import { RestaurantSystems } from "@/components/RestaurantSystems";
import { Work } from "@/components/Work";
import { About } from "@/components/About";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import { Pricing } from "@/components/Pricing";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { useReveal } from "@/hooks/use-reveal";

const Index = () => {
  const ref = useReveal();
  return (
    <div ref={ref} className="min-h-screen bg-bg-deep text-text-primary">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <CoreOfferings />
        <Stats />
        <Services />
        <RestaurantSystems />
        <Work />
        <About />
        <Process />
        <Testimonials />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
