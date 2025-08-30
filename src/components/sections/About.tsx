"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="nosotros" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Acerca de Nosotros</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-blue-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-gray-700 leading-relaxed">
              En Brioches C.A., nos apasiona crear experiencias únicas a través del sabor auténtico de nuestros panes tradicionales y gourmet. Somos una empresa familiar dedicada a la elaboración artesanal de productos de panadería y repostería, donde cada receta se prepara con ingredientes seleccionados y el amor de generaciones.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Nuestra misión es preservar las técnicas tradicionales de panadería mientras innovamos con sabores contemporáneos que deleitan a nuestros clientes. Creemos que cada pan cuenta una historia, y nosotros nos encargamos de que esa historia sea siempre deliciosa.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Desde nuestros inicios, hemos mantenido un compromiso inquebrantable con la calidad, utilizando únicamente ingredientes frescos y naturales, sin conservantes artificiales, para garantizar productos que nutren tanto el cuerpo como el alma.
            </p>
          </motion.div>

          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-orange-100 to-blue-100 rounded-2xl p-8 shadow-lg">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-center space-y-4">
                  <div className="text-6xl">🍞</div>
                  <h3 className="text-2xl font-bold text-gray-900">Panaderos Trabajando</h3>
                  <p className="text-gray-600">Maestros artesanos creando productos únicos con décadas de experiencia</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-orange-500 rounded-full opacity-20"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
