"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import emailjs from '@emailjs/browser';
import { CheckCircle, AlertCircle, Send } from "lucide-react";

const contactInfo = [
  {
    icon: "📍",
    title: "Dirección",
    details: ["Calle San Carlos Cantarrana Qta Estefani Nro 34", "Sector Cerro Sabino Cumana Estado Sucre Zona Postal 6101"]
  },
  {
    icon: "📞",
    title: "Teléfono",
    details: ["+58 412 958 6725", "+58 414 089 8289"]
  },
  {
    icon: "✉️",
    title: "Email",
    details: ["briochesca@gmail.com"]
  },
  {
    icon: "🕒",
    title: "Horarios",
    details: ["Lun - Vie: 6:00 AM - 8:00 PM", "Sáb - Dom: 7:00 AM - 6:00 PM"]
  }
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      
      // Preparar los datos para EmailJS
      const templateParams = {
        nombre: formData.get('nombre') as string,
        email: formData.get('email') as string,
        telefono: formData.get('telefono') as string,
        mensaje: formData.get('mensaje') as string,
      };

      // Enviar email usando EmailJS
      await emailjs.send(
        'Brioches CA', // Service ID
        'template_2679s4a', // Template ID
        templateParams,
        '-X30kkksArE9htpR6' // Public Key
      );

      setSubmitStatus('success');
      setMessage('¡Mensaje enviado correctamente! Te responderemos pronto.');
      form.reset();
    } catch (error) {
      setSubmitStatus('error');
      setMessage('Error al enviar el mensaje. Por favor intenta de nuevo.');
      console.error('EmailJS error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section id="contacto" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Contacto</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-blue-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-4 p-4 rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-xl flex-shrink-0">
                  {info.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{info.title}</h3>
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-gray-300 leading-relaxed">
                      {detail}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Envíanos un Mensaje</h3>
              
              {/* Mensaje de estado */}
              {submitStatus !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-6 p-4 rounded-xl flex items-center space-x-3 ${
                    submitStatus === 'success' 
                      ? 'bg-green-500/20 border border-green-500/30' 
                      : 'bg-red-500/20 border border-red-500/30'
                  }`}
                >
                  {submitStatus === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-400" />
                  )}
                  <p className={`text-sm ${submitStatus === 'success' ? 'text-green-200' : 'text-red-200'}`}>
                    {message}
                  </p>
                </motion.div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="nombre" className="block text-sm font-semibold mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/90 text-gray-900 border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/90 text-gray-900 border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="telefono" className="block text-sm font-semibold mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    className="w-full px-4 py-3 rounded-xl bg-white/90 text-gray-900 border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="mensaje" className="block text-sm font-semibold mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    required
                    rows={4}
                    placeholder="Cuéntanos sobre tu pedido especial o consulta..."
                    className="w-full px-4 py-3 rounded-xl bg-white/90 text-gray-900 border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all duration-200 resize-vertical"
                  ></textarea>
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`w-full font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Enviar Mensaje</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
