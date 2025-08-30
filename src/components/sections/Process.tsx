"use client";

import { motion } from "framer-motion";

const processes = [
  {
    icon: "🌾",
    title: "Selección de Ingredientes",
    description: "Seleccionamos cuidadosamente cada ingrediente, desde harinas de la más alta calidad hasta levaduras naturales y especias importadas, garantizando la excelencia en cada producto."
  },
  {
    icon: "👨‍🍳",
    title: "Amasado Artesanal",
    description: "Nuestros maestros panaderos utilizan técnicas tradicionales de amasado, respetando los tiempos de fermentación natural para desarrollar sabores únicos y texturas perfectas."
  },
  {
    icon: "🔥",
    title: "Horneado Tradicional",
    description: "Cada pan se hornea en nuestros hornos tradicionales a temperaturas precisas, siguiendo recetas familiares transmitidas de generación en generación."
  },
  {
    icon: "✅",
    title: "Control de Calidad",
    description: "Implementamos rigurosos controles de calidad en cada etapa del proceso, asegurando que solo los mejores productos lleguen a nuestros clientes."
  }
];

export default function Process() {
  return (
    <section id="elaboracion" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Nuestro Proceso de Elaboración</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-blue-500 mx-auto rounded-full"></div>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {processes.map((process, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-orange-200"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">{process.icon}</div>
                <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-6 flex items-center justify-center">
                  <span className="text-gray-500 text-sm font-medium">PROCESO {index + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{process.title}</h3>
                <p className="text-gray-600 leading-relaxed">{process.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
