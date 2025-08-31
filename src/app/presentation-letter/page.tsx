"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Instagram, 
  MessageCircle, 
  Phone, 
  MapPin, 
  Clock, 
  Star,
  ExternalLink,
  Utensils,
  ChefHat,
  Cake
} from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'

export default function PresentationLetter() {
  const [copiedPhone, setCopiedPhone] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedPhone(true)
    setTimeout(() => setCopiedPhone(false), 2000)
  }

  const contactButtons = [
    {
      title: "¡SÍGUENOS! Instagram Oficial",
      subtitle: "Fotos de nuestros productos frescos diarios",
      icon: Instagram,
      color: "from-pink-500 to-purple-600",
      action: () => window.open('https://instagram.com/briochesca', '_blank'),
      emoji: "📸"
    },
    {
      title: "ATENCIÓN INMEDIATA",
      subtitle: "[ORDEN PARA ENTREGA/ENVÍO INMEDIATO]",
      icon: FaWhatsapp,
      color: "from-green-500 to-green-600",
      action: () => window.open('https://wa.me/584140898289?text=¡Hola! Me interesa hacer un pedido de Brioches C.A.', '_blank'),
      emoji: "📱"
    },
    {
      title: "Ventas [Asesor Principal]",
      subtitle: "[Consultas y Pedidos Especiales]",
      icon: Phone,
      color: "from-wine-600 to-wine-700",
      action: () => copyToClipboard('+58 414-089-8289'),
      emoji: "☎️"
    },
    {
      title: "Catálogo Virtual",
      subtitle: "[Última actualización: ENERO 2025]",
      icon: Cake,
      color: "from-orange-500 to-orange-600",
      action: () => window.open('/catalogo-productos', '_blank'),
      emoji: "📋"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-wine-50 via-green-50 to-blue-50">
      {/* Hero Section with Cork Board Effect */}
      <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
        {/* Cork Board Background Pattern */}
        <div className="absolute inset-0 opacity-10" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23960647' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
               backgroundSize: '30px 30px'
             }}>
        </div>

        {/* Scattered Photos Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-24 h-24 bg-white rounded-lg shadow-lg rotate-12 opacity-20"></div>
          <div className="absolute top-32 right-20 w-20 h-28 bg-white rounded-lg shadow-lg -rotate-6 opacity-20"></div>
          <div className="absolute bottom-32 left-20 w-28 h-20 bg-white rounded-lg shadow-lg rotate-3 opacity-20"></div>
          <div className="absolute bottom-20 right-16 w-22 h-22 bg-white rounded-lg shadow-lg -rotate-12 opacity-20"></div>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          {/* Company Logo Area */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center space-x-4 mb-6">
              {/* Custom Brioches Logo */}
              <div className="w-20 h-20 flex-shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
                  {/* L izquierda - Vinotinto (magenta) externa */}
                  <path d="M10 8 L52 8 L52 18 L20 18 L20 78 L10 78 Z" fill="#960647"/>
                  
                  {/* L izquierda - Verde interna */}
                  <path d="M20 18 L47 18 L47 28 L30 28 L30 68 L20 68 Z" fill="#639100"/>
                  
                  {/* L derecha - Naranja externa (casi tocando) */}
                  <path d="M90 8 L90 78 L48 78 L48 68 L80 68 L80 8 Z" fill="#D97503"/>
                  
                  {/* L derecha - Azul interna (casi tocando) */}
                  <path d="M80 18 L80 68 L53 68 L53 58 L70 58 L70 18 Z" fill="#0263A8"/>
                </svg>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-wine-700 mb-4 font-montserrat">
              Brioches C.A.
            </h1>
            <p className="text-xl text-wine-600 mb-2">RIF: J-501233055</p>
            <p className="text-lg text-gray-700 mb-6">
              Panadería Artesanal Venezolana • Desde 2010
            </p>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-wine-800 mb-4">
              Las calidades más altas de la industria
            </h2>
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
            </div>
            <p className="text-lg text-gray-700 mb-8">
              Solo aquí encontrarás la verdadera tradición venezolana 👇
            </p>
          </motion.div>

          {/* Contact Buttons */}
          <div className="space-y-4">
            {contactButtons.map((button, index) => (
              <motion.button
                key={index}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={button.action}
                className={`w-full max-w-md mx-auto bg-gradient-to-r ${button.color} text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden`}
              >
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{button.emoji}</div>
                    <div className="text-left">
                      <h3 className="font-bold text-lg leading-tight">
                        {button.title}
                      </h3>
                      <p className="text-sm opacity-90 mt-1">
                        {button.subtitle}
                      </p>
                    </div>
                  </div>
                  <button.icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </div>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
              </motion.button>
            ))}
          </div>

          {/* Business Info */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg"
          >
            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
              <div className="flex items-center justify-center space-x-2">
                <MapPin className="w-4 h-4 text-wine-600" />
                <span>Caracas, Venezuela</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Clock className="w-4 h-4 text-wine-600" />
                <span>Lun-Sáb 6:00 AM - 8:00 PM</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <ChefHat className="w-4 h-4 text-wine-600" />
                <span>15+ años de experiencia</span>
              </div>
            </div>
          </motion.div>

          {/* Copy Notification */}
          {copiedPhone && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
            >
              ¡Número copiado!
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}