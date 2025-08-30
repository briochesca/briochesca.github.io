"use client";

import { motion } from "framer-motion";

const products = [
  {
    icon: "🥖",
    title: "Panes Tradicionales",
    description: "Pan francés, integral, de molde y campesino. Elaborados con recetas tradicionales que han sido perfeccionadas a lo largo de los años."
  },
  {
    icon: "🥐",
    title: "Línea Gourmet",
    description: "Panes especiales con ingredientes premium: pan de nueces, centeno, multicereales, focaccia y creaciones únicas de temporada."
  },
  {
    icon: "🧁",
    title: "Repostería Artesanal",
    description: "Tortas, pasteles, cookies, muffins y postres elaborados con técnicas artesanales y los mejores ingredientes naturales."
  },
  {
    icon: "🎂",
    title: "Productos Especiales",
    description: "Creaciones personalizadas para eventos, celebraciones y ocasiones especiales. Diseños únicos según tus necesidades."
  }
];

export default function Products() {
  return (
    <section id="productos" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Nuestros Productos</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-blue-500 mx-auto rounded-full"></div>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {products.map((product, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="relative">
                <div className="h-48 bg-gradient-to-br from-orange-100 via-yellow-50 to-orange-100 flex items-center justify-center">
                  <div className="text-8xl">{product.icon}</div>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-orange-600">
                    PRODUCTO
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{product.title}</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
