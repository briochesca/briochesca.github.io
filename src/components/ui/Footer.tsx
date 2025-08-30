"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, MessageCircle } from "lucide-react";

// Componente del Logo Brioches para el footer
const BriochesLogoFooter = ({ className = "w-16 h-16" }) => (
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

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Patrón de fondo sutil */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-wine via-primary-green to-primary-blue"></div>
      </div>
      
      <div className="relative z-10">
        {/* Contenido principal del footer */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            
            {/* Columna 1: Logo y descripción */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div 
                className="flex items-center space-x-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <BriochesLogoFooter className="w-12 h-12" />
                <div>
                  <h3 className="text-2xl font-black text-white tracking-tight">BRIOCHES</h3>
                  <p className="text-primary-blue font-medium -mt-1">C.A.</p>
                </div>
              </motion.div>
              
              <motion.p 
                className="text-gray-300 text-lg leading-relaxed max-w-md"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                Más de <span className="text-primary-green font-semibold">15 años</span> creando momentos especiales con nuestros panes tradicionales y gourmet. 
                <span className="text-primary-orange font-medium"> Tradición familiar venezolana.</span>
              </motion.p>
              
              <motion.p 
                className="text-gray-400 font-mono text-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
              >
                RIF: J-501233055
              </motion.p>
            </div>

            {/* Columna 2: Enlaces rápidos */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-bold text-primary-wine border-b border-primary-wine/20 pb-2">
                Navegación
              </h4>
              <ul className="space-y-3">
                {[
                  { id: "inicio", label: "Inicio" },
                  { id: "nosotros", label: "Nosotros" },
                  { id: "elaboracion", label: "Proceso" },
                  { id: "productos", label: "Productos" },
                  { id: "trayectoria", label: "Historia" },
                  { id: "contacto", label: "Contacto" },
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="text-gray-300 hover:text-primary-orange transition-colors duration-300 text-sm font-medium hover:translate-x-1 transform transition-transform"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Columna 3: Información de contacto */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-bold text-primary-green border-b border-primary-green/20 pb-2">
                Contacto
              </h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Phone className="w-4 h-4 text-primary-blue flex-shrink-0" />
                  <div className="text-sm">
                    <p>+58 424 123 4567</p>
                    <p>+58 212 987 6543</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="w-4 h-4 text-primary-orange flex-shrink-0" />
                  <p className="text-sm">info@briochesca.com</p>
                </div>
                <div className="flex items-start space-x-3 text-gray-300">
                  <MapPin className="w-4 h-4 text-primary-wine flex-shrink-0 mt-0.5" />
                  <p className="text-sm">Caracas, Venezuela</p>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Clock className="w-4 h-4 text-primary-green flex-shrink-0" />
                  <p className="text-sm">Lun - Dom: 6:00 AM - 8:00 PM</p>
                </div>
              </div>
            </motion.div>

          </motion.div>

          {/* Separador */}
          <motion.div 
            className="border-t border-gradient-to-r from-primary-wine via-primary-green to-primary-blue my-12 opacity-20"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 0.2, scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            viewport={{ once: true }}
          />

          {/* Footer bottom */}
          <motion.div 
            className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center md:text-left">
              <p className="text-gray-300 text-sm">
                © 2025 Brioches C.A. Todos los derechos reservados.
              </p>
              <p className="text-gray-400 text-xs mt-1 italic">
                &ldquo;Horneando tradición, creando momentos especiales&rdquo;
              </p>
            </div>
            
            {/* Redes sociales */}
            <motion.div 
              className="flex space-x-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Facebook - Azul original */}
              <button className="w-10 h-10 bg-[#1877F2] hover:bg-[#166FE5] rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25">
                <Facebook className="w-4 h-4 text-white" />
              </button>
              
              {/* Instagram - Gradiente original */}
              <button className="w-10 h-10 bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/25">
                <Instagram className="w-4 h-4 text-white" />
              </button>
              
              {/* WhatsApp - Verde original */}
              <button className="w-10 h-10 bg-[#25D366] hover:bg-[#128C7E] rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.484 3.488"/>
                </svg>
              </button>
              
              {/* Email - Gris elegante */}
              <button className="w-10 h-10 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/25">
                <Mail className="w-4 h-4 text-white" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
