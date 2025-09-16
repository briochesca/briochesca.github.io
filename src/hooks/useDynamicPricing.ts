"use client";

import { useState, useEffect, useCallback } from 'react';
import { currencyService } from '@/services/currencyService';

interface ProductPricing {
  usd: number;
  ves: number;
  rate: number;
  lastUpdated: string;
  isLoading: boolean;
  error: string | null;
}

interface ProductWithPricing {
  id: number;
  name: string;
  baseUsdPrice: number;
  pricing: ProductPricing;
}

export const useDynamicPricing = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number>(0); // Sin valor inicial hardcodeado
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [rateSource, setRateSource] = useState<'API' | 'FALLBACK' | 'CACHE'>('API');
  const [apiEndpoint, setApiEndpoint] = useState<string>('');

  /**
   * Inicializa el servicio de moneda y carga cache si existe
   */
  useEffect(() => {
    const initializeCurrency = async () => {
      try {
        setIsLoading(true);
        
        // Cargar cache si existe
        currencyService.loadCacheFromStorage();
        
        // Inicializar actualizaciones automáticas
        currencyService.startAutoUpdate();
        
        // Obtener tasas actualizadas del día
        console.log('🚀 Obteniendo tasa exacta del BCV para hoy...');
        const rates = await currencyService.getBCVRates();
        setExchangeRate(rates.USD.rate);
        setLastUpdated(rates.USD.date);
        setRateSource(rates.USD.source);
        setApiEndpoint(rates.USD.endpoint || '');
        setError(null);
        
        console.log(`✅ Tasa BCV cargada: ${rates.USD.rate} Bs/$`, {
          source: rates.USD.source,
          endpoint: rates.USD.endpoint,
          date: rates.USD.date
        });
      } catch (err) {
        console.error('Error initializing currency service:', err);
        setError('Usando tasa de respaldo temporal');
        // Establecer tasa de respaldo funcional
        setExchangeRate(160.45);
        setLastUpdated(new Date().toISOString());
        setRateSource('FALLBACK');
        setApiEndpoint('ERROR_FALLBACK');
      } finally {
        setIsLoading(false);
      }
    };

    initializeCurrency();
  }, []);

  /**
   * Convierte precio USD a VES
   */
  const convertPrice = useCallback(async (usdPrice: number): Promise<ProductPricing> => {
    try {
      const pricing = await currencyService.getProductPrice(usdPrice);
      
      return {
        usd: pricing.usd,
        ves: pricing.ves,
        rate: pricing.rate,
        lastUpdated: pricing.lastUpdated,
        isLoading: false,
        error: null
      };
    } catch (err) {
      console.error('Error converting price:', err);
      
      // Fallback usando última tasa conocida
      return {
        usd: usdPrice,
        ves: usdPrice * exchangeRate,
        rate: exchangeRate,
        lastUpdated: lastUpdated,
        isLoading: false,
        error: 'Error al convertir precio'
      };
    }
  }, [exchangeRate, lastUpdated]);

  /**
   * Procesa múltiples productos con precios dinámicos
   */
  const processProductsPricing = useCallback(async (products: Array<{
    id: number;
    name: string;
    baseUsdPrice: number;
  }>): Promise<ProductWithPricing[]> => {
    const processedProducts: ProductWithPricing[] = [];

    for (const product of products) {
      const pricing = await convertPrice(product.baseUsdPrice);
      processedProducts.push({
        ...product,
        pricing
      });
    }

    return processedProducts;
  }, [convertPrice]);

  /**
   * Formatea precio para mostrar
   */
  const formatPrice = useCallback((amount: number, currency: 'USD' | 'VES'): string => {
    if (currency === 'USD') {
      return currencyService.formatUSDPrice(amount);
    } else {
      return currencyService.formatVESPrice(amount);
    }
  }, []);

  /**
   * Obtiene precio formateado para display
   */
  const getDisplayPrice = useCallback((usdPrice: number, showBoth: boolean = true): string => {
    if (exchangeRate === 0 || isLoading) {
      return 'Obteniendo precio...';
    }
    
    if (error) {
      return 'Precio no disponible';
    }
    
    const vesPrice = usdPrice * exchangeRate;
    
    if (showBoth) {
      return `${currencyService.formatVESPrice(vesPrice)} (${currencyService.formatUSDPrice(usdPrice)})`;
    } else {
      return currencyService.formatVESPrice(vesPrice);
    }
  }, [exchangeRate, isLoading, error]);

  /**
   * Refresca las tasas de cambio manualmente
   */
  const refreshRates = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Limpiar cache para forzar actualización
      currencyService.clearCache();
      
      const rates = await currencyService.getBCVRates();
      setExchangeRate(rates.USD.rate);
      setLastUpdated(rates.USD.date);
    } catch (err) {
      console.error('Error refreshing rates:', err);
      setError('Error al actualizar tasas');
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Hook para un producto individual
   */
  const useProductPricing = (baseUsdPrice: number) => {
    const [productPricing, setProductPricing] = useState<ProductPricing>({
      usd: baseUsdPrice,
      ves: baseUsdPrice * exchangeRate,
      rate: exchangeRate,
      lastUpdated: lastUpdated,
      isLoading: true,
      error: null
    });

    useEffect(() => {
      const updatePricing = async () => {
        if (!isLoading && exchangeRate > 0) {
          const pricing = await convertPrice(baseUsdPrice);
          setProductPricing(pricing);
        }
      };

      updatePricing();
    }, [baseUsdPrice, convertPrice, isLoading]);

    return productPricing;
  };

  return {
    // Estado general
    isLoading,
    error,
    exchangeRate,
    lastUpdated,
    rateSource,
    apiEndpoint,
    
    // Funciones
    convertPrice,
    processProductsPricing,
    formatPrice,
    getDisplayPrice,
    refreshRates,
    
    // Hook para productos individuales
    useProductPricing
  };
};

/**
 * Hook simplificado para un solo producto
 */
export const useProductPrice = (baseUsdPrice: number) => {
  const { useProductPricing } = useDynamicPricing();
  return useProductPricing(baseUsdPrice);
};