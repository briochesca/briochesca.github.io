"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ShoppingCart } from "lucide-react";

const products = [
  {
    icon: "🥖",
    title: "Acema Andina",
    description: "Pan tradicional venezolano, suave y esponjoso, perfecto para acompañar cualquier comida. Elaborado con técnicas artesanales y receta ancestral.",
    image: "/acema-andina-transparent.png",
    featured: true
  },
  {
    icon: "🍔",
    title: "Pan de Hamburguesa",
    description: "Pan fresco y suave especialmente diseñado para hamburguesas. Con la textura perfecta para mantener todos los ingredientes en su lugar.",
    image: "/pan-hamburguesa.webp",
    featured: true
  },
  {
    icon: "🫓",
    title: "Arepas de Yuca",
    description: "Deliciosas arepas elaboradas con yuca fresca, una alternativa única y sabrosa a las arepas tradicionales. Sin gluten y llenas de sabor.",
    image: "/arepa-yuca.webp",
    featured: true
  },
  {
    icon: "🍩",
    title: "Bolos de Canela",
    description: "Deliciosos dulces tradicionales venezolanos con canela, perfectos para acompañar el café o como postre. Suaves, aromáticos y llenos de sabor casero.",
    image: "/bolos-canela-completo.png",
    featured: true
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
                {product.image && product.featured ? (
                  <div className="h-48 bg-gradient-to-br from-orange-100 via-yellow-50 to-orange-100 flex justify-center items-start p-2">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={product.title === "Acema Andina" ? 320 : 240}
                      height={product.title === "Acema Andina" ? 300 : 220}
                      className={product.title === "Acema Andina" ? "object-contain h-48 w-auto mt-5" : product.title === "Arepas de Yuca" ? "object-contain h-44 w-auto mt-6" : product.title === "Bolos de Canela" ? "object-contain h-44 w-auto mt-6" : "object-contain h-44 w-auto mt-4"}
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-orange-100 via-yellow-50 to-orange-100 flex items-center justify-center">
                    <div className="text-8xl">{product.icon}</div>
                  </div>
                )}
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

        {/* Botón Ver Catálogo Completo */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link href="/catalogo-productos">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary-wine to-primary-blue text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center space-x-3 mx-auto"
            >
              <ShoppingCart className="w-6 h-6" />
              <span>Ver Catálogo Completo</span>
              <ExternalLink className="w-5 h-5" />
            </motion.button>
          </Link>
          <motion.p 
            className="text-gray-600 mt-3 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Descubre todos nuestros productos, precios y haz tu pedido online
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
