"use client";

import { motion } from "framer-motion";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Background con gradiente de marca */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-wine via-primary-blue to-primary-green">
        {/* Overlay para mejorar legibilidad */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Elementos decorativos animados */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Formas geométricas inspiradas en el logo */}
        <motion.div 
          className="absolute w-32 h-32 bg-primary-orange/20 rounded-lg rotate-45"
          style={{ left: '10%', top: '20%' }}
          animate={{ 
            y: [0, -20, 0],
            rotate: [45, 65, 45] 
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        
        <motion.div 
          className="absolute w-20 h-20 bg-primary-green/30 rounded-lg rotate-12"
          style={{ right: '15%', top: '30%' }}
          animate={{ 
            y: [0, 15, 0],
            rotate: [12, -12, 12] 
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1 
          }}
        />

        <motion.div 
          className="absolute w-16 h-16 bg-primary-blue/25 rounded-full"
          style={{ left: '20%', bottom: '25%' }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3] 
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2 
          }}
        />

        {/* Patrón de puntos decorativo - posiciones fijas para evitar hydration mismatch */}
        <div className="absolute inset-0">
          {[
            { left: 10, top: 15, delay: 0 },
            { left: 25, top: 35, delay: 0.5 },
            { left: 40, top: 20, delay: 1 },
            { left: 60, top: 45, delay: 1.5 },
            { left: 75, top: 25, delay: 2 },
            { left: 85, top: 50, delay: 2.5 },
            { left: 15, top: 70, delay: 3 },
            { left: 35, top: 80, delay: 3.5 },
            { left: 55, top: 75, delay: 4 },
            { left: 80, top: 85, delay: 4.5 },
            { left: 5, top: 55, delay: 5 },
            { left: 20, top: 90, delay: 5.5 },
            { left: 45, top: 10, delay: 6 },
            { left: 70, top: 65, delay: 6.5 },
            { left: 90, top: 30, delay: 7 },
            { left: 12, top: 40, delay: 7.5 },
            { left: 65, top: 5, delay: 8 },
            { left: 30, top: 60, delay: 8.5 },
            { left: 50, top: 95, delay: 9 },
            { left: 95, top: 75, delay: 9.5 },
          ].map((dot, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/10 rounded-full"
              style={{
                left: `${dot.left}%`,
                top: `${dot.top}%`,
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: dot.delay,
              }}
            />
          ))}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Badge superior */}
        <motion.div 
          className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          ✨ Más de una década de tradición artesanal
        </motion.div>

        {/* Título principal */}
        <motion.h1 
          className="text-5xl sm:text-6xl lg:text-8xl font-black text-white mb-6 leading-none tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <span className="block">BRIOCHES</span>
          <span className="block text-primary-orange bg-gradient-to-r from-primary-orange to-orange-400 bg-clip-text text-transparent">
            C.A.
          </span>
        </motion.h1>
        
        {/* Subtítulo */}
        <motion.p 
          className="text-xl sm:text-2xl lg:text-3xl text-white/90 mb-4 max-w-4xl mx-auto leading-relaxed font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Tradición y <span className="font-semibold text-primary-orange">calidad</span> en cada pan
        </motion.p>

        {/* Descripción */}
        <motion.p 
          className="text-lg text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Especializados en panes tradicionales, gourmet y repostería artesanal. 
          Una empresa familiar venezolana dedicada a la excelencia culinaria.
        </motion.p>
        
        {/* Botones de acción */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.button 
            onClick={() => scrollToSection("productos")}
            className="bg-gradient-wine text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 min-w-[200px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ver Productos
          </motion.button>
          
          <motion.button 
            onClick={() => scrollToSection("nosotros")}
            className="border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm min-w-[200px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Nuestra Historia
          </motion.button>
        </motion.div>

        {/* Indicadores de calidad */}
        <motion.div 
          className="flex flex-wrap justify-center gap-8 mt-16 text-white/70"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary-orange rounded-full"></div>
            <span className="text-sm font-medium">100% Artesanal</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary-green rounded-full"></div>
            <span className="text-sm font-medium">Ingredientes Premium</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary-blue rounded-full"></div>
            <span className="text-sm font-medium">Tradición Familiar</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <motion.div 
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div 
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
