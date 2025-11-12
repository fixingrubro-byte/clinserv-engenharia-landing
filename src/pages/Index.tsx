import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Differentials from "@/components/Differentials";
import About from "@/components/About";
import Products from "@/components/Products";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <Differentials />
      <About />
      <Products />
      <Testimonials />
      <ContactForm />
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </div>
  );
};

export default Index;
