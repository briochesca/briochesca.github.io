"use client";

import { useState, useEffect } from "react";

// Componente del Logo Brioches - Dos L casi tocándose
const BriochesLogo = ({ className = "w-10 h-10" }) => (
  <div className={`${className} flex-shrink-0`}>
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* L izquierda - Vinotinto (magenta) externa */}
      <path d="M10 8 L52 8 L52 18 L20 18 L20 78 L10 78 Z" fill="#960647"/>
      
      {/* L izquierda - Verde interna */}
      <path d="M20 18 L47 18 L47 28 L30 28 L30 68 L20 68 Z" fill="#639100"/>
      
      {/* L derecha - Naranja externa (casi tocando) */}
      <path d="M90 8 L90 78 L48 78 L48 68 L80 68 L80 8 Z" fill="#D97503"/>
      
      {/* L derecha - Azul interna (casi tocando) */}
      <path d="M80 18 L80 68 L53 68 L53 58 L70 58 L70 18 Z" fill="#0263A8"/>
    </svg>
  </div>
);

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: "inicio", label: "Inicio" },
    { id: "nosotros", label: "Nosotros" },
    { id: "elaboracion", label: "Proceso" },
    { id: "productos", label: "Productos" },
    { id: "trayectoria", label: "Historia" },
    { id: "contacto", label: "Contacto" },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100" 
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            
            {/* Logo y marca */}
            <div 
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => scrollToSection("inicio")}
            >
              <BriochesLogo className="w-8 h-8 lg:w-10 lg:h-10 group-hover:scale-110 transition-transform duration-300" />
              <div className="flex flex-col">
                <span className={`font-black text-lg lg:text-xl tracking-tight transition-colors duration-300 ${
                  isScrolled ? "text-primary-wine" : "text-white"
                }`}>
                  BRIOCHES
                </span>
                <span className={`text-xs font-medium -mt-1 transition-colors duration-300 ${
                  isScrolled ? "text-primary-blue" : "text-gray-200"
                }`}>
                  C.A.
                </span>
              </div>
            </div>

            {/* Navigation Desktop */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative font-semibold text-sm uppercase tracking-wide transition-all duration-300 group ${
                    isScrolled 
                      ? "text-gray-700 hover:text-primary-wine" 
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                    isScrolled ? "bg-primary-wine" : "bg-white"
                  }`}></span>
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <button 
                onClick={() => scrollToSection("contacto")}
                className="bg-gradient-wine text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-wine-500/25"
              >
                Contáctanos
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-md transition-colors duration-300 ${
                  isScrolled 
                    ? "text-gray-700 hover:text-primary-wine hover:bg-gray-100" 
                    : "text-white hover:text-gray-200 hover:bg-white/10"
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="fixed top-16 right-0 bottom-0 w-64 bg-white shadow-xl">
            <div className="p-6 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left py-3 px-4 rounded-lg text-gray-700 hover:text-primary-wine hover:bg-gray-50 font-semibold transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
              <button 
                onClick={() => scrollToSection("contacto")}
                className="w-full mt-6 bg-gradient-wine text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Contáctanos
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
