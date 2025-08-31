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
  Phone
} from 'lucide-react'
import { useRouter } from 'next/navigation'

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

export default function CatalogoProductos() {
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
    {
      id: 1,
      name: "Pan Canilla Tradicional",
      category: "tradicionales",
      description: "Nuestro clásico pan canilla, elaborado con receta tradicional venezolana desde 1950",
      price: "Desde Bs. 2.50",
      image: "🥖",
      isPopular: true,
      preparationTime: "4 horas",
      ingredients: ["Harina de trigo", "Agua", "Sal", "Levadura", "Azúcar"]
    },
    {
      id: 2,
      name: "Pan de Jamón Navideño",
      category: "gourmet",
      description: "Especialidad navideña con jamón, aceitunas, pasas y papelón",
      price: "Bs. 25.00 - 45.00",
      image: "🎄",
      isPopular: true,
      preparationTime: "6 horas",
      ingredients: ["Masa brioche", "Jamón ahumado", "Aceitunas", "Pasas", "Papelón"]
    },
    {
      id: 3,
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
      id: 4,
      name: "Torta Tres Leches",
      category: "postres",
      description: "Clásica torta tres leches con canela y crema batida",
      price: "Bs. 35.00 (8 porciones)",
      image: "🍰",
      isPopular: true,
      preparationTime: "3 horas + refrigeración",
      ingredients: ["Bizcocho esponja", "Leche condensada", "Leche evaporada", "Crema de leche"]
    },
    {
      id: 5,
      name: "Quesillo Casero",
      category: "postres",
      description: "Tradicional quesillo venezolano con caramelo de papelón",
      price: "Bs. 18.00",
      image: "🍮",
      isPopular: true,
      preparationTime: "2 horas + refrigeración",
      ingredients: ["Huevos", "Leche condensada", "Leche líquida", "Papelón", "Vainilla"]
    },
    {
      id: 6,
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
      id: 7,
      name: "Cachitos de Jamón",
      category: "tradicionales",
      description: "Tiernos cachitos rellenos de jamón ahumado",
      price: "Bs. 4.50 c/u",
      image: "🌭",
      isPopular: true,
      preparationTime: "3 horas",
      ingredients: ["Masa de pan", "Jamón ahumado", "Queso blanco"]
    },
    {
      id: 8,
      name: "Golfeados Tradicionales",
      category: "tradicionales",
      description: "Dulces golfeados con papelón y queso blanco rallado",
      price: "Bs. 6.00 c/u",
      image: "🍯",
      isPopular: true,
      preparationTime: "4 horas",
      ingredients: ["Masa dulce", "Papelón", "Queso blanco", "Anís"]
    }
  ]

  const filteredProducts = selectedCategory === 'todos' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  const orderWhatsApp = (product: Product) => {
    const message = `¡Hola! Me interesa ordenar: ${product.name} - ${product.price}`
    window.open(`https://wa.me/584140898289?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-wine-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/')}
              className="flex items-center space-x-2 text-wine-600 hover:text-wine-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Volver</span>
            </motion.button>
            
            <h1 className="text-2xl font-bold text-wine-700">Catálogo de Productos</h1>
            
            <div className="text-sm text-gray-600">
              Enero 2025
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all ${
                  selectedCategory === category.id
                    ? 'bg-wine-600 text-white shadow-lg'
                    : 'bg-white text-wine-600 border border-wine-200 hover:bg-wine-50'
                }`}
              >
                <category.icon className="w-5 h-5" />
                <span className="font-medium">{category.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Product Image */}
              <div className="relative bg-gradient-to-br from-wine-100 to-green-100 h-48 flex items-center justify-center">
                <div className="text-6xl">{product.image}</div>
                {product.isPopular && (
                  <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded-full flex items-center space-x-1 text-xs font-bold">
                    <Star className="w-3 h-3 fill-current" />
                    <span>Popular</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-wine-700 mb-2 group-hover:text-wine-800 transition-colors">
                  {product.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-lg font-bold text-green-600">
                    {product.price}
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{product.preparationTime}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => orderWhatsApp(product)}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Ordenar por WhatsApp</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedProduct(product)}
                    className="w-full bg-wine-100 hover:bg-wine-200 text-wine-700 py-2 rounded-lg font-medium transition-colors"
                  >
                    Ver Detalles
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-wine-700 mb-4">¿Necesitas algo especial?</h2>
            <p className="text-gray-600 mb-6">
              Hacemos pedidos personalizados y tortas para ocasiones especiales
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://wa.me/584140898289?text=Hola, necesito hacer un pedido personalizado', '_blank')}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('tel:+584140898289', '_blank')}
                className="bg-wine-600 hover:bg-wine-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2"
              >
                <Phone className="w-5 h-5" />
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
              <div className="text-8xl mb-4">{selectedProduct.image}</div>
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
                onClick={() => orderWhatsApp(selectedProduct)}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Ordenar por WhatsApp</span>
              </motion.button>
              
              <button
                onClick={() => setSelectedProduct(null)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-medium transition-colors"
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}