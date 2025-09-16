/**
 * Servicio para obtener tasas de cambio del BCV (Banco Central de Venezuela)
 * y manejar conversiones de precios USD a VES
 */

interface BCVRates {
  USD: {
    rate: number;
    date: string;
    source: 'API' | 'FALLBACK' | 'CACHE';
    endpoint?: string;
  };
  EUR?: {
    rate: number;
    date: string;
    source: 'API' | 'FALLBACK' | 'CACHE';
    endpoint?: string;
  };
}

interface CacheData {
  rates: BCVRates;
  timestamp: number;
}

export class CurrencyService {
  private static instance: CurrencyService;
  private cache: CacheData | null = null;
  private readonly CACHE_DURATION = 2 * 60 * 60 * 1000; // 2 horas para actualizaciones más frecuentes
  private lastFetchDate: string | null = null;
  private readonly BCV_API_ENDPOINTS = [
    // APIs con proxy para evitar CORS
    'https://cors-anywhere.herokuapp.com/https://api.exchangerate-api.com/v4/latest/USD',
    
    // API que funciona sin CORS
    'https://open.er-api.com/v6/latest/USD',
    
    // API original sin proxy (por si acaso)
    'https://api.exchangerate-api.com/v4/latest/USD',
    
    // API de respaldo
    'https://api.fxratesapi.com/latest?base=USD&currencies=VES'
  ];

  private constructor() {}

  public static getInstance(): CurrencyService {
    if (!CurrencyService.instance) {
      CurrencyService.instance = new CurrencyService();
    }
    return CurrencyService.instance;
  }

  /**
   * Obtiene las tasas de cambio del BCV desde múltiples fuentes
   */
  public async getBCVRates(): Promise<BCVRates> {
    // Verificar cache primero
    if (this.cache && this.isCacheValid()) {
      console.log('📦 Usando tasas desde CACHE');
      const cachedRates = { ...this.cache.rates };
      cachedRates.USD.source = 'CACHE';
      return cachedRates;
    }

    console.log('🌐 Obteniendo tasas del BCV...');

    for (const endpoint of this.BCV_API_ENDPOINTS) {
      try {
        console.log(`🔄 Probando API: ${endpoint}`);
        const rates = await this.fetchFromEndpoint(endpoint);
        if (rates) {
          rates.USD.source = 'API';
          rates.USD.endpoint = endpoint;
          console.log(`✅ ÉXITO - Tasa obtenida de API: ${rates.USD.rate} Bs/$ desde ${endpoint}`);
          this.updateCache(rates);
          return rates;
        }
      } catch (error) {
        console.warn(`❌ Error en endpoint ${endpoint}:`, error);
        continue;
      }
    }

    // Si la API falla, usar valor de respaldo temporal
    console.error('❌ TODAS LAS APIs FALLARON - Usando FALLBACK hardcodeado');
    return {
      USD: {
        rate: 160.45, // Valor de respaldo temporal basado en última tasa conocida
        date: new Date().toISOString(),
        source: 'FALLBACK',
        endpoint: 'HARDCODED_FALLBACK'
      }
    };
  }

  /**
   * Obtiene la tasa desde un endpoint específico
   */
  private async fetchFromEndpoint(endpoint: string): Promise<BCVRates | null> {
    try {
      console.log(`🌐 Haciendo fetch a: ${endpoint}`);
      
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        // Sin Content-Type para evitar preflight CORS
        mode: 'cors',
        // Timeout de 15 segundos
        signal: AbortSignal.timeout(15000)
      });

      console.log(`📡 Respuesta HTTP ${response.status} de: ${endpoint}`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`📝 Datos recibidos de ${endpoint}:`, data);
      
      const normalized = this.normalizeAPIResponse(data, endpoint);
      if (normalized) {
        console.log(`✅ Normalización exitosa:`, normalized);
      } else {
        console.log(`❌ Normalización falló para ${endpoint}`);
      }
      
      return normalized;
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          console.error(`⏰ Timeout en ${endpoint} (15 segundos)`);
        } else if (error.message.includes('CORS')) {
          console.error(`🚫 Error CORS en ${endpoint}:`, error);
        } else {
          console.error(`💥 Error en ${endpoint}:`, error);
        }
      } else {
        console.error(`💥 Error desconocido en ${endpoint}:`, error);
      }
      return null;
    }
  }

  /**
   * Normaliza respuestas de diferentes APIs al formato estándar
   */
  private normalizeAPIResponse(data: any, endpoint: string): BCVRates | null {
    try {
      console.log(`🔍 Normalizando respuesta de ${endpoint}:`, data);

      // Para bcv-api.rafnixg.dev - API oficial documentada
      if (endpoint.includes('rafnixg.dev')) {
        // Formato: { "date": "2022-01-01", "currency": "USD", "rate": "160.4479" }
        if (data.rate && data.currency === 'USD') {
          return {
            USD: {
              rate: parseFloat(data.rate) || 0,
              date: data.date ? `${data.date}T12:00:00Z` : new Date().toISOString(),
              source: 'API' as const,
              endpoint: endpoint
            }
          };
        }
      }

      // Para pydolarve.org - API principal del BCV
      if (endpoint.includes('pydolarve')) {
        // Formato: { "price": "160.4479", "date": "15-09-2025", "change": "0.00%" }
        if (data.price || data.monitors?.bcv?.price) {
          const price = data.price || data.monitors?.bcv?.price;
          const date = data.date || data.monitors?.bcv?.last_update;
          return {
            USD: {
              rate: parseFloat(price) || 0,
              date: this.formatDate(date) || new Date().toISOString(),
              source: 'API' as const,
              endpoint: endpoint
            }
          };
        }
      }

      // Para exchangerate.host
      if (endpoint.includes('exchangerate.host')) {
        // Formato: { "rates": { "VES": 160.4479 }, "date": "2025-09-15" }
        if (data.rates && data.rates.VES) {
          return {
            USD: {
              rate: parseFloat(data.rates.VES) || 0,
              date: data.date ? `${data.date}T00:00:00Z` : new Date().toISOString(),
              source: 'API' as const,
              endpoint: endpoint
            }
          };
        }
      }

      // Para exchangerate-api.com y open.er-api.com
      if (endpoint.includes('exchangerate-api.com') || endpoint.includes('open.er-api.com')) {
        // Formato: { "rates": { "VES": 160.4479 } } o { "conversion_rates": { "VES": 160.4479 } }
        const rates = data.rates || data.conversion_rates;
        if (rates && rates.VES) {
          const rate = parseFloat(rates.VES) || 0;
          
          // Filtrar solo tasas realistas (mayor a 100, menor a 300)
          if (rate >= 100 && rate <= 300) {
            console.log(`✅ Tasa válida encontrada desde API: ${rate} Bs/$`);
            return {
              USD: {
                rate: rate,
                date: data.time_last_update_utc || data.date || new Date().toISOString(),
                source: 'API' as const,
                endpoint: endpoint
              }
            };
          } else {
            console.warn(`⚠️ Tasa fuera de rango: ${rate} Bs/$ (esperado: 100-300)`);
            return null;
          }
        }
      }

      // Para fxratesapi.com
      if (endpoint.includes('fxratesapi.com')) {
        // Formato: { "rates": { "VES": 160.4479 }, "base": "USD" }
        if (data.rates && data.rates.VES) {
          const rate = parseFloat(data.rates.VES) || 0;
          
          if (rate >= 100 && rate <= 300) {
            console.log(`✅ Tasa FXRates válida: ${rate} Bs/$`);
            return {
              USD: {
                rate: rate,
                date: data.date || new Date().toISOString(),
                source: 'API' as const,
                endpoint: endpoint
              }
            };
          } else {
            console.warn(`⚠️ Tasa FXRates fuera de rango: ${rate} Bs/$`);
            return null;
          }
        }
      }

      // Para fawazahmed0 currency API (GitHub)
      if (endpoint.includes('fawazahmed0') || endpoint.includes('jsdelivr')) {
        // Formato simple: 160.4479 o { "ves": 160.4479 }
        let rate = 0;
        
        if (typeof data === 'number') {
          rate = data;
        } else if (data.ves || data.VES) {
          rate = parseFloat(data.ves || data.VES) || 0;
        }
        
        // Filtrar solo tasas realistas
        if (rate >= 100 && rate <= 300) {
          console.log(`✅ Tasa GitHub válida: ${rate} Bs/$`);
          return {
            USD: {
              rate: rate,
              date: data.date || new Date().toISOString(),
              source: 'API' as const,
              endpoint: endpoint
            }
          };
        } else if (rate > 0) {
          console.warn(`⚠️ Tasa GitHub fuera de rango: ${rate} Bs/$`);
          return null;
        }
      }

      // Para yadio.io
      if (endpoint.includes('yadio.io')) {
        // Formato: { "USD": { "VES": 160.4479 } }
        if (data.USD && data.USD.VES) {
          return {
            USD: {
              rate: parseFloat(data.USD.VES) || 0,
              date: new Date().toISOString(),
              source: 'API' as const,
              endpoint: endpoint
            }
          };
        }
      }

      // Para bcv-api.vercel.app y similares
      if (endpoint.includes('bcv-api') || endpoint.includes('vercel')) {
        // Múltiples formatos posibles
        if (data.USD || data.rates?.USD || data.usd) {
          const usdData = data.USD || data.rates?.USD || data.usd;
          const rate = typeof usdData === 'object' ? (usdData.rate || usdData.price) : usdData;
          return {
            USD: {
              rate: parseFloat(rate) || 0,
              date: (typeof usdData === 'object' ? usdData.date : data.date) || new Date().toISOString(),
              source: 'API' as const,
              endpoint: endpoint
            }
          };
        }

        // Formato directo de número
        if (typeof data === 'number') {
          return {
            USD: {
              rate: data,
              date: new Date().toISOString(),
              source: 'API' as const,
              endpoint: endpoint
            }
          };
        }
      }

      console.warn(`⚠️ Formato no reconocido para ${endpoint}:`, data);
      return null;
    } catch (error) {
      console.error('Error normalizing API response:', error);
      return null;
    }
  }

  /**
   * Convierte un precio en USD a VES usando la tasa actual del BCV
   */
  public async convertUSDToVES(usdAmount: number): Promise<number> {
    try {
      const rates = await this.getBCVRates();
      const vesAmount = usdAmount * rates.USD.rate;
      return Math.round(vesAmount * 100) / 100; // Redondear a 2 decimales
    } catch (error) {
      console.error('Error converting USD to VES:', error);
      // Usar tasa de respaldo en lugar de lanzar error
      return usdAmount * 160.45;
    }
  }

  /**
   * Obtiene precios dinámicos para productos basados en USD
   */
  public async getProductPrice(baseUsdPrice: number): Promise<{
    usd: number;
    ves: number;
    rate: number;
    lastUpdated: string;
  }> {
    const rates = await this.getBCVRates();
    const vesPrice = await this.convertUSDToVES(baseUsdPrice);

    return {
      usd: baseUsdPrice,
      ves: vesPrice,
      rate: rates.USD.rate,
      lastUpdated: rates.USD.date
    };
  }

  /**
   * Verifica si el cache sigue siendo válido
   * Además de tiempo, verifica si es un nuevo día
   */
  private isCacheValid(): boolean {
    if (!this.cache) return false;
    
    const now = Date.now();
    const timeValid = (now - this.cache.timestamp) < this.CACHE_DURATION;
    
    // Verificar si es un nuevo día (forzar actualización diaria)
    const today = new Date().toDateString();
    const cacheDate = new Date(this.cache.timestamp).toDateString();
    const sameDayAsCache = today === cacheDate;
    
    return timeValid && sameDayAsCache;
  }

  /**
   * Actualiza el cache con nuevas tasas
   */
  private updateCache(rates: BCVRates): void {
    this.cache = {
      rates,
      timestamp: Date.now()
    };

    // Guardar en localStorage para persistencia
    try {
      localStorage.setItem('bcv_rates_cache', JSON.stringify(this.cache));
    } catch (error) {
      console.warn('No se pudo guardar cache en localStorage:', error);
    }
  }

  /**
   * Carga cache desde localStorage al inicializar
   */
  public loadCacheFromStorage(): void {
    try {
      const stored = localStorage.getItem('bcv_rates_cache');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.rates && parsed.timestamp) {
          this.cache = parsed;
        }
      }
    } catch (error) {
      console.warn('No se pudo cargar cache desde localStorage:', error);
    }
  }

  /**
   * Tasas de fallback cuando todas las APIs fallan
   * Usa último valor conocido funcional
   */
  private getFallbackRates(): BCVRates {
    return {
      USD: {
        rate: 160.45, // Último valor conocido que funciona
        date: new Date().toISOString(),
        source: 'FALLBACK',
        endpoint: 'MANUAL_FALLBACK'
      }
    };
  }

  /**
   * Formatea precio en bolívares venezolanos
   */
  public formatVESPrice(amount: number): string {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'VES',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
      .replace(/VES\s?S?/g, 'Bs.')  // Reemplazar VES, VESS, VES S, etc.
      .replace(/Bs\.\s?S/g, 'Bs.'); // También por si aparece Bs.S directamente
  }

  /**
   * Formatea precio en dólares estadounidenses
   */
  public formatUSDPrice(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  }

  /**
   * Limpia el cache manualmente
   */
  public clearCache(): void {
    this.cache = null;
    this.lastFetchDate = null;
    try {
      localStorage.removeItem('bcv_rates_cache');
    } catch (error) {
      console.warn('No se pudo limpiar cache:', error);
    }
  }

  /**
   * Formatea fecha desde diferentes formatos a ISO
   */
  private formatDate(dateStr: string | null): string | null {
    if (!dateStr) return null;

    try {
      // Formato DD-MM-YYYY (común en APIs venezolanas)
      if (dateStr.includes('-') && dateStr.length === 10) {
        const [day, month, year] = dateStr.split('-');
        if (day && month && year) {
          return new Date(`${year}-${month}-${day}T12:00:00Z`).toISOString();
        }
      }

      // Formato DD/MM/YYYY
      if (dateStr.includes('/')) {
        const [day, month, year] = dateStr.split('/');
        if (day && month && year) {
          return new Date(`${year}-${month}-${day}T12:00:00Z`).toISOString();
        }
      }

      // Intentar parsear como fecha directa
      const parsed = new Date(dateStr);
      if (!isNaN(parsed.getTime())) {
        return parsed.toISOString();
      }

      return null;
    } catch (error) {
      console.warn('Error formatting date:', dateStr, error);
      return null;
    }
  }

  /**
   * Inicializa actualizaciones automáticas en background
   */
  public startAutoUpdate(): void {
    // Actualizar cada 2 horas durante el día
    setInterval(async () => {
      try {
        console.log('🔄 Auto-actualización de tasas BCV...');
        await this.getBCVRates();
      } catch (error) {
        console.error('Error en auto-actualización:', error);
      }
    }, this.CACHE_DURATION);

    // Verificar nuevas tasas cada vez que se enfoca la ventana
    if (typeof window !== 'undefined') {
      window.addEventListener('focus', async () => {
        const today = new Date().toDateString();
        if (this.lastFetchDate !== today) {
          console.log('🌅 Nuevo día detectado, actualizando tasas...');
          this.clearCache();
          await this.getBCVRates();
          this.lastFetchDate = today;
        }
      });
    }
  }
}

// Exportar instancia singleton
export const currencyService = CurrencyService.getInstance();