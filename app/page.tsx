import Hero from "@/components/landing/Hero";
import { Products } from "@/components/landing/Products";
import { Connect } from "@/components/landing/connect";

export default function Home() {
  return (
    <div className="max-w-[1440px] mx-auto pt-8">
      <Hero />
      <Products />
      <Connect />
    </div>
  );
}
