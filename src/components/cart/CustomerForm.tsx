"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Phone, MapPin, Mail } from 'lucide-react'
import { CustomerData } from '@/contexts/CartContext'

interface CustomerFormProps {
  onSubmit: (data: CustomerData) => void
  onBack: () => void
  isLoading?: boolean
}

export default function CustomerForm({ onSubmit, onBack, isLoading = false }: CustomerFormProps) {
  const [formData, setFormData] = useState<CustomerData>({
    name: '',
    phone: '',
    address: '',
    email: ''
  })

  const [errors, setErrors] = useState<Partial<CustomerData>>({})

  // Cargar datos guardados del localStorage al montar el componente
  useEffect(() => {
    const savedCustomerData = localStorage.getItem('brioches-customer-data')
    if (savedCustomerData) {
      try {
        const parsedData = JSON.parse(savedCustomerData) as CustomerData
        setFormData(parsedData)
      } catch (error) {
        console.error('Error loading customer data from localStorage:', error)
      }
    }
  }, [])

  const validateForm = (): boolean => {
    const newErrors: Partial<CustomerData> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido'
    } else if (!/^(0414|0424|0412|0416|0426|0238|0212|0251|0261|0271|0281|0287|0291|0295|04\d{2})\d{7}$/.test(formData.phone.replace(/\s|-/g, ''))) {
      newErrors.phone = 'Formato de teléfono inválido (ej: 0414-1234567)'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'La dirección es requerida'
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Formato de email inválido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      // Guardar datos en localStorage para futuros pedidos
      localStorage.setItem('brioches-customer-data', JSON.stringify(formData))
      onSubmit(formData)
    }
  }

  const handleInputChange = (field: keyof CustomerData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleClearSavedData = () => {
    if (window.confirm('¿Estás seguro de que quieres borrar los datos guardados?')) {
      localStorage.removeItem('brioches-customer-data')
      setFormData({
        name: '',
        phone: '',
        address: '',
        email: ''
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 sm:p-6"
    >
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-wine-700 mb-2">
              Datos para el Pedido
            </h3>
            <p className="text-sm text-gray-600">
              Por favor, completa tus datos para procesar tu pedido de manera más eficiente
            </p>
          </div>
          {(formData.name || formData.phone || formData.address) && (
            <button
              type="button"
              onClick={handleClearSavedData}
              className="text-xs text-gray-500 hover:text-red-600 underline transition-colors"
            >
              Limpiar datos
            </button>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre completo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Nombre Completo *</span>
            </div>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-wine-500 transition-colors ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Ej: María González"
            disabled={isLoading}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>Teléfono *</span>
            </div>
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-wine-500 transition-colors ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Ej: 0414-1234567"
            disabled={isLoading}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Dirección */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Dirección de Entrega *</span>
            </div>
          </label>
          <textarea
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            rows={3}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-wine-500 transition-colors resize-none ${
              errors.address ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Ej: Av. Principal, Edificio Los Pinos, Apto 5-B, Zona Centro, Caracas"
            disabled={isLoading}
          />
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">{errors.address}</p>
          )}
        </div>

        {/* Email (opcional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>Email (opcional)</span>
            </div>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-wine-500 transition-colors ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="tu.email@ejemplo.com"
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Notas informativas */}
        <div className="space-y-3 mt-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <div className="w-4 h-4 rounded-full bg-green-400 flex-shrink-0 mt-0.5 flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <div className="text-xs text-green-800">
                <p className="font-semibold mb-1">Datos Guardados</p>
                <p>Tus datos se guardarán automáticamente en tu dispositivo para facilitar futuros pedidos.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <div className="w-4 h-4 rounded-full bg-blue-400 flex-shrink-0 mt-0.5 flex items-center justify-center">
                <span className="text-white text-xs font-bold">i</span>
              </div>
              <div className="text-xs text-blue-800">
                <p className="font-semibold mb-1">Protección de Datos</p>
                <p>Tus datos solo serán utilizados para procesar tu pedido y contactarte. No compartimos información personal con terceros.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="flex space-x-3 pt-4">
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            disabled={isLoading}
            className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Volver al Carrito
          </motion.button>
          
          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
            className="flex-1 bg-wine-600 hover:bg-wine-700 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Procesando...' : 'Continuar'}
          </motion.button>
        </div>
      </form>
    </motion.div>
  )
}