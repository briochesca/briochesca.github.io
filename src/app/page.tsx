"use client"

import Header from "@/components/ui/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Process from "@/components/sections/Process";
import Products from "@/components/sections/Products";
import Timeline from "@/components/sections/Timeline";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/ui/Footer";
import FloatingCart from "@/components/cart/FloatingCart";
import SmartPopup from "@/components/ui/SmartPopup";

export default function Home() {
  return (
    <div className="min-h-screen">
      <FloatingCart />
      <SmartPopup delay={10000} />
      <Header />
      <main>
        <Hero />
        <About />
        <Process />
        <Products />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
