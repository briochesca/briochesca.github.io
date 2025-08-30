"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-green-500/20 to-blue-500/20"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-4 h-4 bg-white/10 rounded-full" style={{ left: '10%', top: '20%' }}></div>
        <div className="absolute w-4 h-4 bg-white/10 rounded-full" style={{ left: '25%', top: '40%' }}></div>
        <div className="absolute w-4 h-4 bg-white/10 rounded-full" style={{ left: '40%', top: '60%' }}></div>
        <div className="absolute w-4 h-4 bg-white/10 rounded-full" style={{ left: '55%', top: '20%' }}></div>
        <div className="absolute w-4 h-4 bg-white/10 rounded-full" style={{ left: '70%', top: '40%' }}></div>
        <div className="absolute w-4 h-4 bg-white/10 rounded-full" style={{ left: '85%', top: '60%' }}></div>
      </div>

      <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
        <motion.h1 
          className="text-6xl md:text-7xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span>BRIOCHES C.A.</span>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Tradición y calidad en cada pan. Especializados en panes tradicionales, gourmet y repostería artesanal desde hace más de una década.
        </motion.p>
        
        <motion.button 
          className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Descubre Nuestros Sabores
        </motion.button>
      </div>
    </section>
  );
}
