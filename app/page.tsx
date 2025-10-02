import Hero from "@/components/landing/Hero";
import { Products } from "@/components/landing/Products";
import { Connect } from "@/components/landing/connect";
import { Trust } from "@/components/landing/trust";
import { Ecosystem } from "@/components/landing/ecosystem";
import { Faq } from "@/components/landing/faq";
import Footer from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="max-w-[1440px] mx-auto pt-8">
      <Hero />
      <Products />
      <Connect />
      <Trust />
      <Ecosystem />
      <Faq />
      <Footer />
    </div>
  );
}
