# LandingBriochesca

Landing page moderna construida con Next.js, TypeScript y Tailwind CSS.

## 🚀 Características

- ⚡ **Next.js 15** con App Router
- 🎨 **Tailwind CSS 4** para estilos
- 📱 **Diseño responsive** y moderno
- 🎭 **Framer Motion** para animaciones
- 🔧 **TypeScript** para type safety
- 📦 **Exportación estática** para GitHub Pages

## 🛠️ Tecnologías

- **Framework**: Next.js 15.5.2
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS 4
- **Animaciones**: Framer Motion
- **Iconos**: Lucide React, React Icons
- **Deploy**: GitHub Pages + GitHub Actions

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/[tu-usuario]/LandingBriochesca.git
cd LandingBriochesca

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

## 🚀 Deploy

El proyecto está configurado para deploy automático en GitHub Pages.

### URL de Producción
🌐 **https://[tu-usuario].github.io/LandingBriochesca/**

### Configuración de GitHub Pages

1. **Habilitar GitHub Pages**:
   - Ve a tu repositorio → Settings → Pages
   - Source: GitHub Actions
   - Guardar

2. **Configurar permisos**:
   - Settings → Actions → General
   - Workflow permissions: Read and write permissions
   - Allow GitHub Actions to create and approve pull requests

3. **Verificar configuración**:
   ```bash
   npm run verify
   ```

### Solución de Problemas

Si el deploy falla:

1. **Verificar build local**:
   ```bash
   npm install
   npm run build
   ```

2. **Revisar logs de GitHub Actions**:
   - Ve a la pestaña Actions en tu repositorio
   - Revisa los logs del workflow "Deploy to GitHub Pages"

3. **Problemas comunes**:
   - ✅ Build funciona localmente
   - ✅ Carpeta `out` se genera correctamente
   - ✅ GitHub Pages está habilitado
   - ✅ Permisos del workflow configurados

## 📁 Estructura del Proyecto

```
src/
├── app/                 # App Router de Next.js
│   ├── layout.tsx      # Layout principal
│   ├── page.tsx        # Página principal
│   └── globals.css     # Estilos globales
├── components/         # Componentes React
│   ├── sections/       # Secciones de la landing
│   └── ui/            # Componentes de UI
├── lib/               # Utilidades y datos
└── types/             # Definiciones de TypeScript
```

## 🎯 Scripts Disponibles

```bash
npm run dev      # Desarrollo local
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Linting con ESLint
npm run verify   # Verificar build completo
```

## 🔧 Configuración

### Next.js Config
El proyecto está configurado para exportación estática con:
- `output: 'export'` para generar archivos estáticos
- `basePath: '/LandingBriochesca'` para GitHub Pages
- `trailingSlash: true` para compatibilidad

### Variables de Entorno
Si necesitas variables de entorno, crea un archivo `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://[tu-usuario].github.io/LandingBriochesca
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

- **GitHub**: [@tu-usuario](https://github.com/[tu-usuario])
- **Proyecto**: [LandingBriochesca](https://github.com/[tu-usuario]/LandingBriochesca)
