"use client"

import { motion } from 'framer-motion'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { CartItem as CartItemType, useCart } from '@/contexts/CartContext'
import Image from 'next/image'

interface CartItemProps {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart()

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3"
    >
      {/* Product Image */}
      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-100 via-yellow-50 to-orange-100 rounded-lg flex items-center justify-center overflow-hidden">
        {item.image.startsWith('/') ? (
          <Image
            src={item.image}
            alt={item.name}
            width={48}
            height={48}
            className="object-contain w-full h-full"
          />
        ) : (
          <span className="text-xl">{item.image}</span>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-wine-700 truncate">
          {item.name}
        </h4>
        <p className="text-xs text-green-600 font-semibold">
          {item.price}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="w-7 h-7 bg-wine-100 hover:bg-wine-200 rounded-full flex items-center justify-center transition-colors"
        >
          <Minus className="w-3 h-3 text-wine-600" />
        </motion.button>
        
        <span className="w-8 text-center text-sm font-medium text-wine-700">
          {item.quantity}
        </span>
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="w-7 h-7 bg-wine-100 hover:bg-wine-200 rounded-full flex items-center justify-center transition-colors"
        >
          <Plus className="w-3 h-3 text-wine-600" />
        </motion.button>
      </div>

      {/* Remove Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => removeFromCart(item.id)}
        className="w-7 h-7 bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center transition-colors"
      >
        <Trash2 className="w-3 h-3 text-red-600" />
      </motion.button>
    </motion.div>
  )
}