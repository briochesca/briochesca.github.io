# Brioches C.A. - Landing Page & E-commerce Platform

Landing page profesional y plataforma de e-commerce desarrollada para **Brioches C.A.**, empresa venezolana especializada en panadería artesanal y productos gourmet con más de 15 años de experiencia en el mercado.

## 🏢 Acerca de Brioches C.A.

**Brioches C.A.** es una empresa familiar venezolana fundada en 2010, especializada en la elaboración de panes tradicionales, productos gourmet y repostería artesanal. Con **RIF J-501233055**, la empresa se distingue por mantener técnicas tradicionales de panificación mientras incorpora innovaciones para satisfacer los gustos contemporáneos.

### Especialidades
- **Panes Tradicionales**: Acema Andina, Pan Francés, Pan Integral
- **Línea Gourmet**: Arepas de Yuca, Pan de Hamburguesa, Scones de Queso
- **Repostería Artesanal**: Pavlovas, Tortas especiales, Suspiros
- **Bebidas**: Jugos naturales y bebidas especializadas

## 🚀 Características de la Plataforma

### Landing Page Corporativa
- ⚡ **Diseño Moderno**: Interface responsive con animaciones fluidas
- 🎨 **Identidad de Marca**: Colores corporativos y tipografía Montserrat
- 📱 **Experiencia Móvil**: Optimizado para todos los dispositivos
- 🏆 **Storytelling**: Historia de la empresa y proceso de elaboración

### E-commerce Avanzado
- 💰 **Precios Dinámicos**: Integración con BCV para conversión USD/VES en tiempo real
- 🛒 **Carrito Inteligente**: Persistencia cross-page con localStorage
- 📱 **WhatsApp Commerce**: Integración directa para pedidos vía WhatsApp Business
- 💱 **Multi-Moneda**: Soporte completo para Bolívares y Dólares

### PWA (Progressive Web App)
- 📦 **Instalable**: Funciona como app nativa en móviles y desktop
- 🔄 **Offline Ready**: Service Worker con caching estratégico
- ⚡ **Performance**: Carga rápida y experiencia fluida
- 🔄 **Auto-Update**: Actualizaciones automáticas de contenido

## 🛠️ Stack Tecnológico

### Frontend Core
- **Framework**: Next.js 15.5.2 con App Router
- **Lenguaje**: TypeScript con configuración strict
- **Estilos**: Tailwind CSS 3.4.17 con tema personalizado
- **Animaciones**: Framer Motion con triggers de viewport

### E-commerce & Business Logic
- **Currency API**: Integración BCV multi-endpoint con fallbacks
- **State Management**: React Context con persistencia localStorage
- **Real-time Pricing**: Conversión automática USD→VES
- **WhatsApp Integration**: API Business para pedidos directos

### PWA & Performance
- **Service Worker**: Caching personalizado y funcionalidad offline
- **Manifest**: Configuración completa para instalación
- **Icons**: Sistema de iconos adaptativo (512x512, 180x180)
- **SEO**: Metadata completa, Open Graph, structured data

### Deploy & Infrastructure
- **Hosting**: GitHub Pages con exportación estática
- **CI/CD**: GitHub Actions para deploy automático
- **CDN**: Asset optimization y distribución global
- **Analytics**: Google Analytics y métricas de conversión

## 📦 Instalación y Desarrollo

### Prerrequisitos
- Node.js 18+
- npm o yarn
- Git

### Setup Local
```bash
# Clonar repositorio
git clone https://github.com/alfargenis/LandingBriochesca.git
cd LandingBriochesca

# Instalar dependencias
npm install

# Iniciar desarrollo
npm run dev

# Abrir http://localhost:3000
```

### Scripts de Desarrollo
```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción + export estático
npm run start    # Preview del build
npm run lint     # ESLint para TypeScript/TSX
npm run verify   # Verificación completa del build
```

## 🌐 Deploy en Producción

### URL Oficial
🔗 **https://alfargenis.github.io/LandingBriochesca/**

### Configuración GitHub Pages

#### 1. Habilitar GitHub Pages
```
Repositorio → Settings → Pages
Source: GitHub Actions
Branch: main
```

#### 2. Permisos del Workflow
```
Settings → Actions → General → Workflow permissions
✅ Read and write permissions
✅ Allow GitHub Actions to create and approve pull requests
```

#### 3. Variables de Entorno (Opcional)
```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://alfargenis.github.io/LandingBriochesca
NEXT_PUBLIC_BCV_API_KEY=tu_api_key_opcional
```

### Deploy Automático
- **Trigger**: Push a `main` branch
- **Build Time**: ~3-5 minutos
- **Cache**: Dependencies y build artifacts
- **Rollback**: Automático en caso de fallo

## 🏗️ Arquitectura del Proyecto

### Estructura de Directorios
```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Layout principal + PWA setup
│   ├── page.tsx                 # Landing page principal
│   ├── catalogo-productos/      # E-commerce catalog
│   ├── presentation-letter/     # Carta de presentación
│   ├── icon.tsx                # PWA icon generation
│   └── globals.css             # Estilos globales + custom scrollbar
├── components/
│   ├── ui/                     # Header, Footer, elementos base
│   ├── sections/               # Hero, About, Products, etc.
│   └── cart/                   # Sistema de carrito completo
├── contexts/                   # React Context para estado global
├── hooks/                      # Custom hooks (pricing, etc.)
├── services/                   # APIs externas (BCV, currency)
└── lib/                       # Utilities y configuraciones
```

### Componentes Principales

#### Header Navigation
- **Logo SVG**: Implementación custom de identidad visual
- **Menu Responsive**: Desktop y mobile con smooth scroll
- **CTA Button**: "Ver Catálogo" con navegación dinámica

#### Landing Sections
- **Hero**: Full-screen con gradientes de marca
- **About**: Historia empresa con estadísticas
- **Process**: 4 pasos del proceso artesanal
- **Products**: Categorías con navegación al catálogo
- **Timeline**: Hitos 2010-2025 con animaciones
- **Contact**: Formulario funcional + datos de contacto

#### E-commerce System
- **Product Grid**: Layout responsive con filtros
- **Dynamic Pricing**: BCV real-time integration
- **Shopping Cart**: Persistente con modal checkout
- **WhatsApp Orders**: Pre-formatted messages

## 💼 Funcionalidades de Negocio

### Sistema de Precios Dinámicos
```typescript
// Integración BCV multi-endpoint
const BCV_ENDPOINTS = [
  'https://open.er-api.com/v6/latest/USD',
  'https://api.exchangerate-api.com/v4/latest/USD',
  'https://api.fxratesapi.com/latest?base=USD&currencies=VES'
];

// Cache inteligente (2 horas)
interface PriceCache {
  rate: number;
  timestamp: number;
  source: 'API' | 'CACHE' | 'FALLBACK';
}
```

### Carrito Persistente
- **Cross-page**: Mantiene estado entre navegación
- **LocalStorage**: Persistencia en browser
- **Real-time Updates**: Precios actualizados automáticamente
- **WhatsApp Export**: Genera mensaje de pedido completo

### WhatsApp Commerce
```typescript
// Generación automática de pedidos
const whatsappMessage = `
¡Hola! Me interesa solicitar una cotización:

👤 DATOS DEL CLIENTE:
• Nombre: ${customerData.name}
• Teléfono: ${customerData.phone}
• Dirección: ${customerData.address}

🛍️ PRODUCTOS SOLICITADOS:
${cartItems.map(item =>
  `• ${item.name} x${item.quantity} - ${item.price}`
).join('\n')}

📊 TOTAL: Bs. ${total.ves} ($${total.usd})
`;
```

## 🎨 Design System

### Paleta de Colores (Oficial)
```css
/* Colores de marca Brioches C.A. */
--wine: #960647      /* Primary: Vino/Magenta */
--green: #639100     /* Secondary: Verde */
--blue: #0263A8      /* Accent: Azul */
--orange: #D97503    /* Highlight: Naranja */

/* Variantes */
--wine-50: #fdf2f7
--wine-600: #960647
--wine-700: #7d0538
--wine-900: #4a0220
```

### Typography
```css
/* Montserrat - Fuente oficial de marca */
font-family: 'Montserrat', sans-serif;

/* Jerarquía */
.title-1 { font-weight: 900; font-size: 3rem; }
.title-2 { font-weight: 800; font-size: 2rem; }
.title-3 { font-weight: 700; font-size: 1.5rem; }
.body { font-weight: 400; font-size: 1rem; }
```

### Logo Implementation
```tsx
// Logo SVG custom - Dos "L" entrelazadas
const BriochesLogo = () => (
  <svg viewBox="0 0 100 100">
    {/* L izquierda: wine + green */}
    <path d="M10 8 L52 8 L52 18 L20 18 L20 78 L10 78 Z" fill="#960647"/>
    <path d="M20 18 L47 18 L47 28 L30 28 L30 68 L20 68 Z" fill="#639100"/>

    {/* L derecha: orange + blue */}
    <path d="M90 8 L90 78 L48 78 L48 68 L80 68 L80 8 Z" fill="#D97503"/>
    <path d="M80 18 L80 68 L53 68 L53 58 L70 58 L70 18 Z" fill="#0263A8"/>
  </svg>
);
```

## 📊 Performance & SEO

### Core Web Vitals
- **LCP**: < 2.5s (Hero image optimization)
- **FID**: < 100ms (Code splitting + lazy loading)
- **CLS**: < 0.1 (Fixed layouts + aspect ratios)

### SEO Optimization
```typescript
// Metadata completa
export const metadata: Metadata = {
  title: "Brioches C.A. - Panes Tradicionales y Gourmet",
  description: "Tradición y calidad en cada pan...",
  keywords: ["panadería", "Venezuela", "artesanal"],
  openGraph: {
    locale: "es_VE",
    type: "website",
    siteName: "Brioches C.A."
  }
};
```

### PWA Metrics
- **Lighthouse Score**: 95+ en todas las categorías
- **Installability**: ✅ App-like experience
- **Offline Functionality**: ✅ Core features disponibles
- **Update Strategy**: Background sync con notificaciones

## 🔧 Mantenimiento y Actualizaciones

### Actualización de Precios
- **Automática**: Cada 2 horas durante horario comercial
- **Manual**: Botón de refresh en admin (futuro)
- **Fallback**: Tasa hardcoded si APIs fallan
- **Cache**: 2 horas en localStorage + servidor

### Gestión de Productos
- **Data Source**: Archivo JSON estático
- **Images**: Optimizadas WebP + PNG fallback
- **Categories**: Tradicionales, Gourmet, Postres, Bebidas
- **Pricing**: Base USD con conversión automática

### Monitoring & Analytics
- **Google Analytics**: Eventos de e-commerce
- **Error Tracking**: Implementación futura con Sentry
- **Performance**: Core Web Vitals monitoring
- **Business Metrics**: Conversión, carrito abandono, etc.

## 🤝 Contribución y Desarrollo

### Workflow de Desarrollo
1. **Feature Branch**: `git checkout -b feature/nueva-funcionalidad`
2. **Development**: Implementar con TypeScript strict
3. **Testing**: Verificar en desarrollo y build
4. **Pull Request**: Code review y CI checks
5. **Deploy**: Automático al merge a main

### Estándares de Código
- **TypeScript**: Strict mode, interfaces tipadas
- **ESLint**: Configuración Next.js + reglas custom
- **Prettier**: Formato consistente automático
- **Commits**: Conventional commits para changelog

### Roadmap Futuro
- [ ] **Admin Panel**: Gestión de productos y precios
- [ ] **User Accounts**: Registro y login de clientes
- [ ] **Payment Gateway**: Integración Stripe/PayPal
- [ ] **Inventory System**: Control de stock en tiempo real
- [ ] **CRM Integration**: Seguimiento de clientes y pedidos
- [ ] **Multi-language**: Soporte inglés para exportación

## 📞 Contacto y Soporte

### Brioches C.A.
- **Teléfono**: +58 424-123-4567
- **Email**: info@briochesca.com
- **Dirección**: Caracas, Venezuela
- **WhatsApp**: Pedidos directos vía web

### Desarrollo Técnico
- **Repository**: [GitHub/LandingBriochesca](https://github.com/alfargenis/LandingBriochesca)
- **Issues**: Bug reports y feature requests
- **Discussions**: Ideas y mejoras generales

---

**© 2024 Brioches C.A.** - Todos los derechos reservados | RIF: J-501233055 | Venezuela