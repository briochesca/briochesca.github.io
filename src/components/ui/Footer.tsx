"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
            BRIOCHES C.A.
          </div>
          <p className="text-gray-400 font-mono">J-501233055</p>
          <div className="border-t border-gray-800 pt-6 mt-6">
            <p className="text-gray-300">© 2025 Brioches C.A. Todos los derechos reservados.</p>
            <p className="text-gray-400 mt-2 italic">Tradición, Calidad y Sabor en cada producto.</p>
          </div>
          <motion.div 
            className="flex justify-center space-x-6 pt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors duration-300">
              📘
            </button>
            <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors duration-300">
              📷
            </button>
            <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors duration-300">
              🐦
            </button>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
