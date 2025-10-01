"use client"

import { useState, useEffect } from 'react'
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
  Plus,
  RefreshCw,
  DollarSign
} from 'lucide-react'
import Image from 'next/image'
import { FaWhatsapp } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import FloatingCart from '@/components/cart/FloatingCart'
import { useDynamicPricing } from '@/hooks/useDynamicPricing'

interface Product {
  id: number
  name: string
  category: string
  description: string
  baseUsdPrice: number
  quantity: string
  oldPrice?: string
  image: string
  isPopular: boolean
  preparationTime: string
  ingredients: string[]
}

function CatalogoProductosContent() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('todos')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const { 
    isLoading: ratesLoading, 
    error: ratesError, 
    exchangeRate, 
    lastUpdated, 
    rateSource,
    apiEndpoint,
    getDisplayPrice, 
    refreshRates 
  } = useDynamicPricing()

  const categories = [
    { id: 'todos', name: 'Todos', icon: ChefHat },
    { id: 'tradicionales', name: 'Tradicionales', icon: Wheat },
    { id: 'gourmet', name: 'Gourmet', icon: Star },
    { id: 'postres', name: 'Postres', icon: Cake },
    { id: 'bebidas', name: 'Bebidas', icon: Coffee }
  ]

  const products: Product[] = [
    {
      id: 1,
      name: "Acema Andina",
      category: "tradicionales",
      description: "Pan tradicional venezolano, suave y esponjoso, perfecto para acompañar cualquier comida. Elaborado con técnicas artesanales y receta ancestral.",
      baseUsdPrice: 2.00,      quantity: "Paquete de 5 unidades",
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
      baseUsdPrice: 2.00,      quantity: "Paquete de 4 unidades",
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
      baseUsdPrice: 7.50,      quantity: "Paquete de 12 unidades",
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
      baseUsdPrice: 2.00,      quantity: "2 unidades",
      image: "/bolos-canela-completo.png",
      isPopular: true,
      preparationTime: "4 horas",
      ingredients: ["Harina de trigo", "Azúcar", "Mantequilla", "Huevos", "Canela", "Vainilla"]
    },
    {
      id: 6,
      name: "Pan de Jamón Navideño",
      category: "gourmet",
      description: "Especialidad navideña con jamón, aceitunas, pasas y papelón",
      baseUsdPrice: 15.00,      quantity: "1 unidad completa",
      image: "/pan de jamon.png",
      isPopular: false,
      preparationTime: "6 horas",
      ingredients: ["Masa brioche", "Jamón ahumado", "Aceitunas", "Pasas", "Papelón"]
    },
    {
      id: 8,
      name: "Torta Tres Leches",
      category: "postres",
      description: "Clásica torta tres leches con canela y crema batida",
      baseUsdPrice: 4.00,      quantity: "Porción individual",
      image: "/torta-tres-leches.png",
      isPopular: false,
      preparationTime: "3 horas + refrigeración",
      ingredients: ["Bizcocho esponja", "Leche condensada", "Leche evaporada", "Crema de leche"]
    },
    {
      id: 9,
      name: "Quesillo Casero",
      category: "postres",
      description: "Tradicional quesillo venezolano con caramelo de papelón",
      baseUsdPrice: 3.50,      quantity: "Porción individual",
      image: "/quesillo.png",
      isPopular: false,
      preparationTime: "2 horas + refrigeración",
      ingredients: ["Huevos", "Leche condensada", "Leche líquida", "Papelón", "Vainilla"]
    },
    {
      id: 12,
      name: "Golfeados Tradicionales",
      category: "tradicionales",
      description: "Dulces golfeados con papelón y queso blanco rallado",
      baseUsdPrice: 1.30,      quantity: "2 unidades",
      image: "/golfeados.png",
      isPopular: false,
      preparationTime: "4 horas",
      ingredients: ["Masa dulce", "Papelón", "Queso blanco", "Anís"]
    },
    {
      id: 13,
      name: "Roles de Ajoporro",
      category: "gourmet",
      description: "Deliciosos roles salados rellenos de ajoporro fresco, perfectos para cualquier ocasión",
      baseUsdPrice: 6.00,      quantity: "Paquete de 12 unidades",
      image: "/roles-ajoporro.png",
      isPopular: true,
      preparationTime: "3 horas",
      ingredients: ["Masa de pan", "Ajoporro fresco", "Mantequilla", "Queso blanco", "Especias"]
    },
    {
      id: 14,
      name: "Empanadas de Yuca",
      category: "tradicionales",
      description: "Empanadas crujientes hechas con masa de yuca, rellenas de carne mechada o pollo",
      baseUsdPrice: 7.00,      quantity: "Paquete de 12 unidades",
      image: "/empanadas-yuca.png",
      isPopular: true,
      preparationTime: "4 horas",
      ingredients: ["Yuca rallada", "Carne mechada", "Pollo desmenuzado", "Cebolla", "Ají dulce"]
    },
    {
      id: 15,
      name: "Torta Beso de Ángel",
      category: "postres",
      description: "Exquisita torta de merengue con crema pastelera y durazno, suave como un beso celestial",
      baseUsdPrice: 4.00,      quantity: "Porción individual",
      image: "/torta-beso-angel.png",
      isPopular: false,
      preparationTime: "5 horas + refrigeración",
      ingredients: ["Merengue", "Crema pastelera", "Duraznos en almíbar", "Crema chantilly", "Vainilla"]
    },
    {
      id: 16,
      name: "Torta Red Velvet",
      category: "postres",
      description: "Clásica torta red velvet con capas de bizcocho rojo aterciopelado y frosting de queso crema",
      baseUsdPrice: 4.00,      quantity: "Porción individual",
      image: "/torta-red-velvet.png",
      isPopular: false,
      preparationTime: "4 horas + refrigeración",
      ingredients: ["Harina", "Cacao", "Colorante rojo", "Queso crema", "Mantequilla", "Azúcar glass"]
    },
    {
      id: 17,
      name: "Galletas de Ajonjolí",
      category: "tradicionales",
      description: "Deliciosas galletas artesanales con ajonjolí tostado, crujientes por fuera y suaves por dentro",
      baseUsdPrice: 0.20,      quantity: "Paquete de 4 unidades",
      image: "/galletas-ajonjoli.png",
      isPopular: false,
      preparationTime: "2 horas",
      ingredients: ["Harina de trigo", "Ajonjolí", "Mantequilla", "Azúcar", "Huevos", "Vainilla"]
    },
    {
      id: 18,
      name: "Pavlova de Melocotones",
      category: "postres",
      description: "Elegante postre de merengue crujiente con crema batida y melocotones frescos",
      baseUsdPrice: 1.20,      quantity: "Porción individual",
      image: "/pavlova-melocotones.png",
      isPopular: false,
      preparationTime: "4 horas + refrigeración",
      ingredients: ["Merengue", "Crema batida", "Melocotones frescos", "Azúcar glass", "Vainilla"]
    },
    {
      id: 19,
      name: "Torta de Piña",
      category: "postres",
      description: "Tropical torta con capas de bizcocho de piña y crema de mantequilla, refrescante y dulce",
      baseUsdPrice: 1.10,      quantity: "Porción individual",
      image: "/torta-pina.png",
      isPopular: false,
      preparationTime: "4 horas",
      ingredients: ["Bizcocho de piña", "Piña fresca", "Crema de mantequilla", "Azúcar", "Huevos"]
    },
    {
      id: 20,
      name: "Isla Flotante",
      category: "postres",
      description: "Clásico postre francés de merengue flotando sobre crema inglesa, delicado y elegante. Una experiencia única que se deshace suavemente en la boca.",
      baseUsdPrice: 0.65,      quantity: "Porción individual",
      image: "/isla-flotante.png",
      isPopular: false,
      preparationTime: "3 horas + refrigeración",
      ingredients: ["Merengue", "Crema inglesa", "Huevos", "Leche", "Azúcar", "Vainilla"]
    },
    {
      id: 21,
      name: "Scones de Queso",
      category: "gourmet",
      description: "Scones esponjosos y hojaldrados con queso, perfectos para el té de la tarde o desayuno. Textura irresistible con el equilibrio perfecto entre mantequilla y queso.",
      baseUsdPrice: 0.25,      quantity: "1 unidad",
      image: "/scones-queso.png",
      isPopular: false,
      preparationTime: "2 horas",
      ingredients: ["Harina", "Queso cheddar", "Mantequilla", "Crema de leche", "Polvo de hornear"]
    },
    {
      id: 22,
      name: "Torta de Parchita",
      category: "postres",
      description: "Refrescante torta tropical con crema de parchita, ideal para el clima venezolano",
      baseUsdPrice: 1.15,      quantity: "Porción individual",
      image: "/torta-parchita.png",
      isPopular: false,
      preparationTime: "4 horas + refrigeración",
      ingredients: ["Bizcocho", "Parchita fresca", "Crema pastelera", "Merengue", "Gelatina sin sabor"]
    },
    {
      id: 23,
      name: "Suspiros",
      category: "postres",
      description: "Delicados merengues que se deshacen en la boca, ligeros como suspiros celestiales",
      baseUsdPrice: 1.50,      quantity: "Paquete de 12 unidades",
      image: "/suspiros.png",
      isPopular: false,
      preparationTime: "3 horas",
      ingredients: ["Clara de huevo", "Azúcar refinada", "Cremor tártaro", "Esencia de vainilla"]
    }
  ]

  const filteredProducts = selectedCategory === 'todos' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  const { addToCart } = useCart()

  const orderWhatsApp = (product: Product) => {
    const displayPrice = ratesLoading ? 'Precio pendiente' : getDisplayPrice(product.baseUsdPrice, true)
    const message = `¡Hola! Me interesa ordenar: ${product.name} - ${displayPrice}`
    window.open(`https://wa.me/584129586725?text=${encodeURIComponent(message)}`, '_blank')
  }

  const handleAddToCart = (product: Product) => {
    const displayPrice = ratesLoading ? 'Precio pendiente' : getDisplayPrice(product.baseUsdPrice, true)
    addToCart({
      id: product.id,
      name: product.name,
      price: displayPrice,
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
              Octubre 2025
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Exchange Rate Info - Subtle Corner */}
        <div className="mb-6 flex justify-end">
          <div className="inline-flex items-center space-x-2 text-sm text-gray-600 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-gray-200/50">
            <DollarSign className="w-3.5 h-3.5" />
            <span className="font-medium">
              {ratesLoading ? 'Cargando...' : 
                exchangeRate > 0 ? `${exchangeRate.toFixed(2)} Bs/$` : 'Error'}
            </span>
            {!ratesLoading && rateSource && (
              <span className={`w-2 h-2 rounded-full ${
                rateSource === 'API' ? 'bg-green-500' :
                rateSource === 'CACHE' ? 'bg-blue-500' :
                'bg-orange-500'
              }`} title={rateSource === 'API' ? 'En vivo' : rateSource === 'CACHE' ? 'Cache' : 'Respaldo'}>
              </span>
            )}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={refreshRates}
              disabled={ratesLoading}
              className="text-gray-500 hover:text-gray-700 disabled:opacity-50 ml-1"
            >
              <RefreshCw className={`w-3 h-3 ${ratesLoading ? 'animate-spin' : ''}`} />
            </motion.button>
          </div>
        </div>

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 items-stretch">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full"
            >
              {/* Product Image */}
              <div className="relative bg-gradient-to-br from-orange-100 via-yellow-50 to-orange-100 h-40 sm:h-48 flex items-center justify-center p-4">
                {product.image.startsWith('/') ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={180}
                    height={160}
                    className="object-contain w-auto h-auto max-h-44 max-w-50"
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
              <div className="p-4 sm:p-6 flex flex-col h-full">
                <h3 className="text-lg sm:text-xl font-bold text-wine-700 mb-2 group-hover:text-wine-800 transition-colors">
                  {product.name}
                </h3>

                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 flex-grow">
                  {product.description}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4">
                  <div className="space-y-1">
                    <div className="text-base sm:text-lg font-bold text-green-600">
                      {ratesLoading ? 'Calculando...' : getDisplayPrice(product.baseUsdPrice, false)}
                    </div>
                    <div className="text-xs text-gray-500">
                      Base: ${product.baseUsdPrice.toFixed(2)} USD
                    </div>
                    <div className="text-xs text-wine-600 font-medium">
                      {product.quantity}
                    </div>
                  </div>
                  <div className="flex items-center justify-end text-xs text-gray-500 min-h-[2.5rem] sm:min-h-[1.5rem] sm:text-right">
                    {product.preparationTime.includes('refrigeración') ? (
                      <div className="flex flex-col items-end">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 flex-shrink-0" />
                          <span className="text-xs leading-tight">
                            {product.preparationTime.split(' + ')[0]}
                          </span>
                        </div>
                        <span className="text-xs leading-tight text-blue-500">
                          + refrigeración
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 flex-shrink-0" />
                        <span className="text-xs leading-tight">
                          {product.preparationTime}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 mt-auto">
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
                    className="object-contain w-auto h-auto mx-auto max-h-48 max-w-48"
                  />
                </div>
              ) : (
                <div className="text-8xl mb-4">{selectedProduct.image}</div>
              )}
              <h2 className="text-2xl font-bold text-wine-700 mb-2">
                {selectedProduct.name}
              </h2>
              <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
              <div className="space-y-2 mb-4">
                <div className="text-xl font-bold text-green-600">
                  {ratesLoading ? 'Calculando...' : getDisplayPrice(selectedProduct.baseUsdPrice, false)}
                </div>
                <div className="text-sm text-gray-500">
                  Precio base: ${selectedProduct.baseUsdPrice.toFixed(2)} USD
                </div>
                <div className="text-sm text-wine-600 font-medium">
                  {selectedProduct.quantity}
                </div>
                <div className="text-xs text-gray-400">
                  Tasa BCV: {exchangeRate > 0 ? `${exchangeRate.toFixed(4)} Bs/$` : 'N/A'} • {lastUpdated ? new Date(lastUpdated).toLocaleDateString('es-VE') : 'Fecha no disponible'}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-wine-700 mb-2 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Tiempo de preparación
                </h3>
                <div className="text-gray-600">
                  {selectedProduct.preparationTime.includes('refrigeración') ? (
                    <div className="flex items-center space-x-2">
                      <span>{selectedProduct.preparationTime.split(' + ')[0]}</span>
                      <span className="text-blue-500 font-medium">+ refrigeración</span>
                    </div>
                  ) : (
                    <div>{selectedProduct.preparationTime}</div>
                  )}
                </div>
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