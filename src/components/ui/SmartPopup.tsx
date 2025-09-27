"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Clock, Star } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'

interface SmartPopupProps {
  delay?: number // Delay in milliseconds (default: 10 seconds)
  showOnCatalog?: boolean // Whether to show on catalog page (default: false)
}

export default function SmartPopup({ delay = 10000, showOnCatalog = false }: SmartPopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasShown, setHasShown] = useState(false)
  const router = useRouter()
  const { getTotalItems, items } = useCart()

  const totalItems = getTotalItems()

  useEffect(() => {
    // Check if popup was shown recently (within 30 minutes)
    const popupData = sessionStorage.getItem('brioches-popup-shown')
    if (popupData) {
      const { timestamp } = JSON.parse(popupData)
      const thirtyMinutes = 30 * 60 * 1000 // 30 minutes in milliseconds
      const now = Date.now()

      if (now - timestamp < thirtyMinutes) {
        setHasShown(true)
        return
      } else {
        // Clear old popup data if more than 30 minutes passed
        sessionStorage.removeItem('brioches-popup-shown')
      }
    }

    // Set timer to show popup after delay
    const timer = setTimeout(() => {
      if (!hasShown) {
        setIsVisible(true)
        setHasShown(true)
        sessionStorage.setItem('brioches-popup-shown', JSON.stringify({
          timestamp: Date.now()
        }))
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [delay, hasShown])

  const closeModal = () => {
    setIsVisible(false)
  }

  const goToCatalog = () => {
    setIsVisible(false)
    router.push('/catalogo-productos')
  }

  const goToCart = () => {
    setIsVisible(false)
    // Could open cart modal or navigate to cart page
    // For now, we'll go to catalog where cart modal can be opened
    router.push('/catalogo-productos')
  }

  // Development utility: Reset popup state (can be called from browser console)
  if (typeof window !== 'undefined') {
    (window as any).resetBriochesPopup = () => {
      sessionStorage.removeItem('brioches-popup-shown')
      setHasShown(false)
      setIsVisible(false)
    }
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={closeModal}
        />

        {/* Modal Content */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-xs sm:max-w-md w-full mx-2 sm:mx-0 overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <X className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
          </button>

          {/* Content based on cart state */}
          {totalItems > 0 ? (
            // Has items in cart - encourage completion
            <div className="p-4 sm:p-6 text-center">
              {/* Header with cart icon */}
              <div className="relative mx-auto w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-wine-500 to-wine-600 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs font-bold">
                  {totalItems}
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                ¡Tienes productos en tu carrito!
              </h3>

              <p className="text-sm sm:text-base text-gray-600 mb-4">
                Tienes <span className="font-semibold text-wine-600">{totalItems} producto{totalItems > 1 ? 's' : ''}</span> esperando por ti.
                ¡No pierdas la oportunidad de disfrutar nuestros deliciosos productos artesanales!
              </p>

              {/* Show first 2 items as preview */}
              <div className="bg-gray-50 rounded-lg p-2 sm:p-3 mb-4">
                <div className="text-xs text-gray-500 mb-2">En tu carrito:</div>
                {items.slice(0, 2).map((item) => (
                  <div key={item.id} className="flex justify-between text-xs sm:text-sm mb-1">
                    <span className="text-gray-700 truncate mr-2">{item.name}</span>
                    <span className="text-wine-600 font-medium flex-shrink-0">x{item.quantity}</span>
                  </div>
                ))}
                {items.length > 2 && (
                  <div className="text-xs text-gray-500 mt-2">
                    +{items.length - 2} producto{items.length - 2 > 1 ? 's' : ''} más
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center text-xs sm:text-sm text-orange-600 mb-4">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                <span className="text-center">Los precios pueden cambiar según la tasa oficial BCV</span>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <button
                  onClick={goToCart}
                  className="w-full bg-gradient-wine text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold text-sm sm:text-base hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Finalizar Pedido
                </button>

                <button
                  onClick={closeModal}
                  className="w-full text-gray-500 hover:text-gray-700 text-xs sm:text-sm transition-colors py-1"
                >
                  Continuar navegando
                </button>
              </div>
            </div>
          ) : (
            // Empty cart - encourage browsing
            <div className="p-4 sm:p-6 text-center">
              {/* Header with star icon */}
              <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                ¡Descubre Nuestros Productos Artesanales!
              </h3>

              <p className="text-sm sm:text-base text-gray-600 mb-4">
                Con más de <span className="font-semibold text-green-600">4 años de experiencia</span>,
                creamos los mejores panes tradicionales y productos gourmet de Venezuela.
              </p>

              {/* Features highlight */}
              <div className="bg-green-50 rounded-lg p-3 sm:p-4 mb-4 text-left">
                <div className="text-xs sm:text-sm space-y-2">
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">Productos 100% artesanales</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">Precios actualizados según la tasa BCV</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">Pedidos por WhatsApp</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <button
                  onClick={goToCatalog}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold text-sm sm:text-base hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Ver Catálogo Completo
                </button>

                <button
                  onClick={closeModal}
                  className="w-full text-gray-500 hover:text-gray-700 text-xs sm:text-sm transition-colors py-1"
                >
                  Quizás más tarde
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}