"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { useCart, CustomerData } from '@/contexts/CartContext'
import CartItem from './CartItem'
import CustomerForm from './CustomerForm'

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, clearCart, getTotalItems, getSubtotal, getTotal, generateWhatsAppMessage } = useCart()
  const [currentStep, setCurrentStep] = useState<'cart' | 'customer'>('cart')
  const [customerData, setCustomerData] = useState<CustomerData | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleProceedToCustomerForm = () => {
    setCurrentStep('customer')
  }

  const handleBackToCart = () => {
    setCurrentStep('cart')
  }

  const handleCustomerSubmit = (data: CustomerData) => {
    setIsProcessing(true)
    setCustomerData(data)
    
    // Simular un pequeño delay para UX
    setTimeout(() => {
      handleWhatsAppOrder(data)
      setIsProcessing(false)
    }, 500)
  }

  const handleWhatsAppOrder = (data?: CustomerData) => {
    const message = generateWhatsAppMessage(data || customerData || undefined)
    const whatsappUrl = `https://wa.me/584129586725?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
    onClose()
  }

  const handleModalClose = () => {
    setCurrentStep('cart')
    setCustomerData(null)
    setIsProcessing(false)
    onClose()
  }

  const handleClearCart = () => {
    if (window.confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      clearCart()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center p-0 sm:p-4 z-50"
          onClick={handleModalClose}
        >
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white rounded-t-3xl sm:rounded-2xl w-full sm:w-full sm:max-w-md max-h-[85vh] sm:max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                {currentStep === 'customer' ? (
                  <>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleBackToCart}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </motion.button>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-wine-700">
                        Datos del Cliente
                      </h2>
                      <p className="text-sm text-gray-600">
                        Paso 2 de 2
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-6 h-6 text-wine-600" />
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-wine-700">
                        Mi Carrito
                      </h2>
                      <p className="text-sm text-gray-600">
                        {getTotalItems()} {getTotalItems() === 1 ? 'producto' : 'productos'}
                      </p>
                    </div>
                  </>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                {currentStep === 'cart' && items.length > 0 && (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClearCart}
                    className="p-2 bg-red-100 hover:bg-red-200 rounded-full transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </motion.button>
                )}
                
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleModalClose}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </motion.button>
              </div>
            </div>

            {/* Dynamic Content */}
            {currentStep === 'cart' ? (
              <>
                {/* Cart Content */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                  {items.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        Tu carrito está vacío
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Agrega productos para comenzar tu pedido
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <AnimatePresence>
                        {items.map((item) => (
                          <CartItem key={item.id} item={item} />
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                {items.length > 0 && (
                  <div className="p-4 sm:p-6 border-t border-gray-200 space-y-4">
                    {/* Totales */}
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Subtotal ({getTotalItems()} productos):</span>
                        <div className="text-right">
                          <div className="font-medium">Bs. {getSubtotal().ves.toFixed(2).replace('.', ',')}</div>
                          {getSubtotal().usd > 0 && (
                            <div className="text-xs text-gray-500">${getSubtotal().usd.toFixed(2)}</div>
                          )}
                        </div>
                      </div>
                      <div className="border-t border-gray-200 pt-2">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-wine-700">Total Estimado:</span>
                          <div className="text-right">
                            <div className="font-bold text-lg text-wine-700">Bs. {getTotal().ves.toFixed(2).replace('.', ',')}</div>
                            {getTotal().usd > 0 && (
                              <div className="text-sm text-wine-600">${getTotal().usd.toFixed(2)}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                      <div className="flex items-start space-x-2">
                        <div className="w-4 h-4 rounded-full bg-orange-400 flex-shrink-0 mt-0.5 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">!</span>
                        </div>
                        <div className="text-xs text-orange-800">
                          <p className="font-semibold mb-1">Precios Estimados</p>
                          <p>Los precios mostrados son estimados y pueden variar al momento de la cotización final. Confirmaremos disponibilidad y precios exactos por WhatsApp.</p>
                        </div>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleProceedToCustomerForm}
                      className="w-full bg-wine-600 hover:bg-wine-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-3 text-base shadow-lg"
                    >
                      <span>Continuar con el Pedido</span>
                    </motion.button>
                    
                    <p className="text-xs text-center text-gray-500">
                      Necesitaremos algunos datos para procesar tu pedido
                    </p>
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Customer Form */}
                <div className="flex-1 overflow-y-auto">
                  <CustomerForm
                    onSubmit={handleCustomerSubmit}
                    onBack={handleBackToCart}
                    isLoading={isProcessing}
                  />
                </div>

                {/* Form Footer - Summary */}
                <div className="p-4 sm:p-6 border-t border-gray-200">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Resumen del pedido:</span>
                      <div className="text-right">
                        <div className="font-medium text-wine-700">{getTotalItems()} productos</div>
                        <div className="font-bold text-wine-700">Bs. {getTotal().ves.toFixed(2).replace('.', ',')}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}