"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="nosotros" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Acerca de <span className="text-primary-wine">Nosotros</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-wine to-primary-orange mx-auto rounded-full"></div>
          <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
            Una empresa familiar venezolana dedicada a la excelencia culinaria, construyendo tradición con cada producto artesanal
          </p>
        </motion.div>

        {/* Content Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="max-w-3xl mx-auto space-y-6 text-center mb-12">
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              En <span className="font-semibold text-primary-wine">Brioches C.A.</span>, nos apasiona crear experiencias únicas a través del sabor auténtico de nuestros panes tradicionales y gourmet. Somos una empresa familiar dedicada a la elaboración artesanal de productos de panadería y repostería, donde cada receta se prepara con ingredientes seleccionados y el amor de generaciones.
            </p>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              Nuestra misión es preservar las técnicas tradicionales de panadería mientras innovamos con sabores contemporáneos que deleitan a nuestros clientes. Creemos que cada pan cuenta una historia, y nosotros nos encargamos de que esa historia sea siempre deliciosa.
            </p>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              Desde nuestros inicios, hemos mantenido un compromiso inquebrantable con la calidad, utilizando únicamente ingredientes frescos y naturales, sin conservantes artificiales, para garantizar productos que nutren tanto el cuerpo como el alma.
            </p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 gap-4 sm:gap-6 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="text-center p-4 sm:p-6 bg-white rounded-xl shadow-md border border-gray-100">
            <div className="text-4xl sm:text-5xl font-black text-primary-wine mb-2">+4</div>
            <div className="text-sm sm:text-base text-gray-600 font-medium">Años de Experiencia</div>
          </div>
          <div className="text-center p-4 sm:p-6 bg-white rounded-xl shadow-md border border-gray-100">
            <div className="text-4xl sm:text-5xl font-black text-primary-green mb-2">100%</div>
            <div className="text-sm sm:text-base text-gray-600 font-medium">Artesanal</div>
          </div>
        </motion.div>

        {/* Visual Element - Image Card */}
        <motion.div
          className="mb-12 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-primary-wine/10 to-primary-blue/10 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
              <div className="text-center space-y-4 sm:space-y-6">
                <div className="flex justify-center">
                  <img
                    src="/maestros-panaderos.jpeg"
                    alt="Maestros Panaderos de Brioches C.A."
                    className="w-full max-w-[280px] sm:max-w-sm h-auto object-contain rounded-xl shadow-lg"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900">Maestros Panaderos</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Artesanos especializados creando productos únicos con técnicas ancestrales transmitidas de generación en generación
                </p>

                {/* Values */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6 pt-6 border-t border-gray-100">
                  <div className="text-center">
                    <div className="w-3 h-3 bg-primary-wine rounded-full mx-auto mb-2"></div>
                    <div className="text-xs sm:text-sm font-medium text-gray-600">Tradición</div>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 bg-primary-green rounded-full mx-auto mb-2"></div>
                    <div className="text-xs sm:text-sm font-medium text-gray-600">Calidad</div>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 bg-primary-orange rounded-full mx-auto mb-2"></div>
                    <div className="text-xs sm:text-sm font-medium text-gray-600">Pasión</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          className="mt-12 sm:mt-16 md:mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-primary-wine to-primary-blue rounded-2xl sm:rounded-3xl p-1">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12">
              <h3 className="text-lg sm:text-2xl md:text-3xl font-black text-gray-900 mb-3 sm:mb-4">
                &ldquo;Tradición, Calidad y Sabor en cada producto&rdquo;
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
                Empresa familiar venezolana comprometida con la excelencia culinaria
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
