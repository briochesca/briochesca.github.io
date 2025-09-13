"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Star, 
  Clock, 
  Wheat, 
  Heart,
  ChefHat,
  Coffee,
  Cake,
  Cookie,
  Croissant,
  MessageCircle,
  Phone,
  ShoppingCart,
  Plus
} from 'lucide-react'
import Image from 'next/image'
import { FaWhatsapp } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import FloatingCart from '@/components/cart/FloatingCart'

interface Product {
  id: number
  name: string
  category: string
  description: string
  price: string
  image: string
  isPopular: boolean
  preparationTime: string
  ingredients: string[]
}

function CatalogoProductosContent() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('todos')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const categories = [
    { id: 'todos', name: 'Todos', icon: ChefHat },
    { id: 'tradicionales', name: 'Tradicionales', icon: Wheat },
    { id: 'gourmet', name: 'Gourmet', icon: Star },
    { id: 'postres', name: 'Postres', icon: Cake },
    { id: 'bebidas', name: 'Bebidas', icon: Coffee }
  ]

  const products: Product[] = [
    // === PRODUCTOS DISPONIBLES CON IMÁGENES REALES ===
    {
      id: 1,
      name: "Acema Andina",
      category: "tradicionales",
      description: "Pan tradicional venezolano, suave y esponjoso, perfecto para acompañar cualquier comida. Elaborado con técnicas artesanales y receta ancestral.",
      price: "Bs. 8.50 (paquete)",
      image: "/acema-andina-transparent.png",
      isPopular: true,
      preparationTime: "5 horas",
      ingredients: ["Harina de trigo", "Agua", "Sal", "Levadura", "Azúcar", "Manteca"]
    },
    {
      id: 2,
      name: "Pan de Hamburguesa",
      category: "gourmet",
      description: "Pan fresco y suave especialmente diseñado para hamburguesas. Con la textura perfecta para mantener todos los ingredientes en su lugar.",
      price: "Bs. 12.00 (paquete de 6)",
      image: "/pan-hamburguesa.webp",
      isPopular: true,
      preparationTime: "4 horas",
      ingredients: ["Harina de trigo", "Leche", "Mantequilla", "Huevo", "Semillas de sésamo", "Levadura"]
    },
    {
      id: 3,
      name: "Arepas de Yuca",
      category: "gourmet",
      description: "Deliciosas arepas elaboradas con yuca fresca, una alternativa única y sabrosa a las arepas tradicionales. Sin gluten y llenas de sabor.",
      price: "Bs. 10.00 (paquete de 6)",
      image: "/arepa-yuca.webp",
      isPopular: true,
      preparationTime: "3 horas",
      ingredients: ["Yuca fresca", "Sal", "Aceite vegetal", "Agua"]
    },
    {
      id: 4,
      name: "Bolos de Canela",
      category: "postres",
      description: "Deliciosos dulces tradicionales venezolanos con canela, perfectos para acompañar el café o como postre. Suaves, aromáticos y llenos de sabor casero.",
      price: "Bs. 15.00 (bandeja)",
      image: "/bolos-canela-completo.png",
      isPopular: true,
      preparationTime: "4 horas",
      ingredients: ["Harina de trigo", "Azúcar", "Mantequilla", "Huevos", "Canela", "Vainilla"]
    },
    
    // === PRODUCTOS FUTUROS (Para referencia y desarrollo futuro) ===
    {
      id: 5,
      name: "Pan Canilla Tradicional",
      category: "tradicionales",
      description: "Nuestro clásico pan canilla, elaborado con receta tradicional venezolana desde 1950",
      price: "Desde Bs. 2.50",
      image: "🥖",
      isPopular: false,
      preparationTime: "4 horas",
      ingredients: ["Harina de trigo", "Agua", "Sal", "Levadura", "Azúcar"]
    },
    {
      id: 6,
      name: "Pan de Jamón Navideño",
      category: "gourmet",
      description: "Especialidad navideña con jamón, aceitunas, pasas y papelón",
      price: "Bs. 25.00 - 45.00",
      image: "🎄",
      isPopular: false,
      preparationTime: "6 horas",
      ingredients: ["Masa brioche", "Jamón ahumado", "Aceitunas", "Pasas", "Papelón"]
    },
    {
      id: 7,
      name: "Croissant de Mantequilla",
      category: "gourmet",
      description: "Croissant francés con capas perfectas de mantequilla artesanal",
      price: "Bs. 8.00",
      image: "🥐",
      isPopular: false,
      preparationTime: "12 horas",
      ingredients: ["Harina francesa", "Mantequilla europea", "Huevo", "Leche"]
    },
    {
      id: 8,
      name: "Torta Tres Leches",
      category: "postres",
      description: "Clásica torta tres leches con canela y crema batida",
      price: "Bs. 35.00 (8 porciones)",
      image: "🍰",
      isPopular: false,
      preparationTime: "3 horas + refrigeración",
      ingredients: ["Bizcocho esponja", "Leche condensada", "Leche evaporada", "Crema de leche"]
    },
    {
      id: 9,
      name: "Quesillo Casero",
      category: "postres",
      description: "Tradicional quesillo venezolano con caramelo de papelón",
      price: "Bs. 18.00",
      image: "🍮",
      isPopular: false,
      preparationTime: "2 horas + refrigeración",
      ingredients: ["Huevos", "Leche condensada", "Leche líquida", "Papelón", "Vainilla"]
    },
    {
      id: 10,
      name: "Café Tostado Venezolano",
      category: "bebidas",
      description: "Café 100% venezolano, tostado artesanalmente",
      price: "Bs. 15.00 (250g)",
      image: "☕",
      isPopular: false,
      preparationTime: "Disponible",
      ingredients: ["Granos de café venezolano", "Tostado medio"]
    },
    {
      id: 11,
      name: "Cachitos de Jamón",
      category: "tradicionales",
      description: "Tiernos cachitos rellenos de jamón ahumado",
      price: "Bs. 4.50 c/u",
      image: "🌭",
      isPopular: false,
      preparationTime: "3 horas",
      ingredients: ["Masa de pan", "Jamón ahumado", "Queso blanco"]
    },
    {
      id: 12,
      name: "Golfeados Tradicionales",
      category: "tradicionales",
      description: "Dulces golfeados con papelón y queso blanco rallado",
      price: "Bs. 6.00 c/u",
      image: "🍯",
      isPopular: false,
      preparationTime: "4 horas",
      ingredients: ["Masa dulce", "Papelón", "Queso blanco", "Anís"]
    }
  ]

  const filteredProducts = selectedCategory === 'todos' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  const { addToCart } = useCart()

  const orderWhatsApp = (product: Product) => {
    const message = `¡Hola! Me interesa ordenar: ${product.name} - ${product.price}`
    window.open(`https://wa.me/584129586725?text=${encodeURIComponent(message)}`, '_blank')
  }

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-wine-50 via-white to-green-50">
      <FloatingCart />
      {/* Header */}
      <div className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/')}
              className="flex items-center space-x-1 sm:space-x-2 text-wine-600 hover:text-wine-700 transition-colors"
            >
              <ArrowLeft className="w-4 sm:w-5 h-4 sm:h-5" />
              <span className="font-medium text-sm sm:text-base">Volver</span>
            </motion.button>
            
            <h1 className="text-lg sm:text-2xl font-bold text-wine-700 text-center flex-1 mx-4">Catálogo de Productos</h1>
            
            <div className="text-xs sm:text-sm text-gray-600 hidden sm:block">
              Enero 2025
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center px-2">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-6 py-2 sm:py-3 rounded-full transition-all text-sm sm:text-base ${
                  selectedCategory === category.id
                    ? 'bg-wine-600 text-white shadow-lg'
                    : 'bg-white text-wine-600 border border-wine-200 hover:bg-wine-50'
                }`}
              >
                <category.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-medium hidden xs:inline sm:inline">{category.name}</span>
                <span className="font-medium xs:hidden sm:hidden">{category.name.slice(0, 3)}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Product Image */}
              <div className="relative bg-gradient-to-br from-orange-100 via-yellow-50 to-orange-100 h-40 sm:h-48 flex items-center justify-center p-4">
                {product.image.startsWith('/') ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={180}
                    height={160}
                    className="object-contain max-h-36 w-auto"
                  />
                ) : (
                  <div className="text-5xl sm:text-6xl">{product.image}</div>
                )}
                {product.isPopular && (
                  <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded-full flex items-center space-x-1 text-xs font-bold">
                    <Star className="w-3 h-3 fill-current" />
                    <span>Popular</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-wine-700 mb-2 group-hover:text-wine-800 transition-colors">
                  {product.name}
                </h3>
                
                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-2">
                  <div className="text-base sm:text-lg font-bold text-green-600">
                    {product.price}
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs">{product.preparationTime}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-wine-600 hover:bg-wine-700 text-white py-2 sm:py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors text-sm sm:text-base"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Agregar al Carrito</span>
                    <span className="sm:hidden">Agregar</span>
                  </motion.button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => orderWhatsApp(product)}
                      className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium flex items-center justify-center space-x-1 transition-colors text-xs sm:text-sm"
                    >
                      <FaWhatsapp className="w-3 h-3" />
                      <span className="hidden sm:inline">Directo</span>
                      <span className="sm:hidden">Directo</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedProduct(product)}
                      className="bg-wine-100 hover:bg-wine-200 text-wine-700 py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm"
                    >
                      <span className="hidden sm:inline">Ver</span>
                      <span className="sm:hidden">Ver</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 sm:mt-16 text-center px-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-wine-700 mb-4">¿Necesitas algo especial?</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              Hacemos pedidos personalizados y tortas para ocasiones especiales
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://wa.me/584129586725?text=Hola, necesito hacer un pedido personalizado', '_blank')}
                className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <FaWhatsapp className="w-4 sm:w-5 h-4 sm:h-5" />
                <span>WhatsApp</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('tel:+584129586725', '_blank')}
                className="bg-wine-600 hover:bg-wine-700 text-white px-4 sm:px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <Phone className="w-4 sm:w-5 h-4 sm:h-5" />
                <span>Llamar</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedProduct(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              {selectedProduct.image.startsWith('/') ? (
                <div className="mb-4 flex justify-center">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    width={200}
                    height={200}
                    className="object-contain max-h-48 w-auto"
                  />
                </div>
              ) : (
                <div className="text-8xl mb-4">{selectedProduct.image}</div>
              )}
              <h2 className="text-2xl font-bold text-wine-700 mb-2">
                {selectedProduct.name}
              </h2>
              <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
              <div className="text-xl font-bold text-green-600 mb-4">
                {selectedProduct.price}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-wine-700 mb-2 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Tiempo de preparación
                </h3>
                <p className="text-gray-600">{selectedProduct.preparationTime}</p>
              </div>

              <div>
                <h3 className="font-bold text-wine-700 mb-2 flex items-center">
                  <Wheat className="w-4 h-4 mr-2" />
                  Ingredientes principales
                </h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  {selectedProduct.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-wine-400 rounded-full mr-2"></span>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  handleAddToCart(selectedProduct)
                  setSelectedProduct(null)
                }}
                className="w-full bg-wine-600 hover:bg-wine-700 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar al Carrito</span>
              </motion.button>
              
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => orderWhatsApp(selectedProduct)}
                  className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  <span>Directo</span>
                </motion.button>
                
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-medium transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default function CatalogoProductos() {
  return <CatalogoProductosContent />
}