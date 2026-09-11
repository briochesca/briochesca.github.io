"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface CartItem {
  id: number
  name: string
  price: string
  image: string
  quantity: number
  category: string
}

export interface CustomerData {
  name: string
  phone: string
  address: string
  email: string
}

interface CartTotals {
  ves: number
  usd: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getSubtotal: () => CartTotals
  getTotal: () => CartTotals
  generateWhatsAppMessage: (customerData?: CustomerData) => string
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('brioches-cart')

    if (savedCart) {
      try {
        const parsedItems = JSON.parse(savedCart)
        setItems(parsedItems)
      } catch (error) {
        // Silent error handling
      }
    }
    setIsLoaded(true)
  }, [])

  // Save cart to localStorage whenever items change (only after initial load)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('brioches-cart', JSON.stringify(items))
    }
  }, [items, isLoaded])

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      
      return [...prevItems, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const parsePrice = (priceString: string): { ves: number; usd: number } => {
    
    let vesPrice = 0;
    let usdPrice = 0;

    // Buscar precio en bolívares (puede usar , como decimal)
    const vesMatch = priceString.match(/Bs\.\s*S?\s*([\d]+[,.]?\d*)/);
    if (vesMatch) {
      // Reemplazar coma por punto para el decimal
      vesPrice = parseFloat(vesMatch[1].replace(',', '.')) || 0;
    }

    // Buscar precio en dólares en paréntesis
    const usdMatch = priceString.match(/\(\$?([\d]+[,.]?\d*)\)/);
    if (usdMatch) {
      usdPrice = parseFloat(usdMatch[1].replace(',', '.')) || 0;
    }

    // Si no hay precio en bolívares pero hay en dólares, buscar solo números
    if (vesPrice === 0 && usdPrice === 0) {
      const numberMatch = priceString.match(/([\d]+[,.]?\d*)/);
      if (numberMatch) {
        const price = parseFloat(numberMatch[1].replace(',', '.')) || 0;
        // Si es menor a 10, probablemente es USD, sino VES
        if (price < 10) {
          usdPrice = price;
        } else {
          vesPrice = price;
        }
      }
    }

    return { ves: vesPrice, usd: usdPrice };
  }

  const getSubtotal = (): CartTotals => {
    return items.reduce((total, item) => {
      const itemPrices = parsePrice(item.price);
      return {
        ves: total.ves + (itemPrices.ves * item.quantity),
        usd: total.usd + (itemPrices.usd * item.quantity)
      };
    }, { ves: 0, usd: 0 });
  }

  const getTotal = (): CartTotals => {
    // Por ahora el total es igual al subtotal
    // Aquí se pueden agregar impuestos, envío, etc. en el futuro
    return getSubtotal();
  }

  const generateWhatsAppMessage = (customerData?: CustomerData) => {
    if (items.length === 0) {
      return '¡Hola! Me interesa consultar sobre sus productos.'
    }

    let message = '¡Hola! Me interesa solicitar una cotización para los siguientes productos:\n\n'
    
    if (customerData) {
      message += `👤 DATOS DEL CLIENTE:\n`
      message += `• Nombre: ${customerData.name}\n`
      message += `• Teléfono: ${customerData.phone}\n`
      message += `• Dirección: ${customerData.address}\n`
      if (customerData.email) {
        message += `• Email: ${customerData.email}\n`
      }
      message += `\n`
    }
    
    message += `🛍️ PRODUCTOS SOLICITADOS:\n\n`
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`
      message += `   • Cantidad: ${item.quantity}\n\n`
    })

    message += `📊 RESUMEN DEL PEDIDO:\n`
    message += `• Total de productos: ${getTotalItems()}\n\n`
    message += '¿Podrían confirmar disponibilidad, precios y tiempo de entrega? ¡Gracias!'

    return message
  }

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getSubtotal,
    getTotal,
    generateWhatsAppMessage
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}