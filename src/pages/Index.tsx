import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";
import { About } from "@/components/About";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
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
        <Stats />
        <Services />
        <Work />
        <About />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
