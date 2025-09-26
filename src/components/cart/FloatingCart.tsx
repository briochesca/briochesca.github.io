"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import CartModal from './CartModal'

export default function FloatingCart() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  if (totalItems === 0) {
    return null
  }

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-wine-600 hover:bg-wine-700 text-white rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center shadow-2xl transition-colors"
      >
        <div className="relative">
          <ShoppingBag className="w-6 h-6 sm:w-7 sm:h-7" />
          <AnimatePresence>
            {totalItems > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs font-bold"
              >
                {totalItems > 99 ? '99+' : totalItems}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>

      <CartModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}