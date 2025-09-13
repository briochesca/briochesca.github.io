"use client";

import { motion } from "framer-motion";

const timeline = [
  {
    year: "2021",
    title: "Fundación de la Empresa",
    description: "Brioches C.A. inicia operaciones como una pequeña panadería familiar con la visión de crear productos artesanales de la más alta calidad, aplicando técnicas que han pasado de generación en generación por años."
  },
  {
    year: "2022",
    title: "Expansión de la Línea Gourmet",
    description: "Introducimos nuestra línea de panes gourmet, incorporando ingredientes premium y técnicas innovadoras que nos distinguen en el mercado."
  },
  {
    year: "2023",
    title: "Reconocimiento Regional",
    description: "Nos hemos dado a conocer a nivel regional debido a la alta calidad de nuestros productos, donde cada vez hemos ido ganando más reputación y reconocimiento entre nuestros clientes."
  },
  {
    year: "2024",
    title: "Diversificación de Productos",
    description: "Hemos ido agregando productos no solo artesanales y gourmet, sino también una gran variedad de postres únicos en la región, ampliando nuestra oferta gastronómica."
  },
  {
    year: "2024",
    title: "Consolidación Empresarial",
    description: "Cada vez más la empresa ha ido tomando forma sólida, expandiendo nuestras bases y fortaleciendo nuestra presencia en el mercado regional con productos de calidad superior."
  },
  {
    year: "2025",
    title: "Presente y Futuro",
    description: "Continuamos creciendo con bases sólidas y compromiso inquebrantable. Seguiremos mejorando nuestros productos y añadiendo cada vez más variedad a nuestra producción artesanal."
  }
];

export default function Timeline() {
  return (
    <section id="trayectoria" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Nuestra Trayectoria</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-blue-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-500 to-blue-500 hidden md:block"></div>
          
          <motion.div 
            className="space-y-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                className={`flex items-center md:flex-row flex-col md:gap-8 ${
                  index % 2 === 0 ? "" : "md:flex-row-reverse"
                }`}
                initial={{ opacity: 0, x: -50, scale: 0.8 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                  <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-orange-500">
                    <div className="text-orange-500 font-bold text-xl mb-2">{item.year}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
                
                {/* Timeline dot */}
                <div className="hidden md:flex w-8 h-8 bg-orange-500 rounded-full items-center justify-center z-10 my-4">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
                
                <div className="hidden md:block md:w-1/2"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
