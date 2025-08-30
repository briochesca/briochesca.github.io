import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Solo aplicar configuración de export en build de producción
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
    basePath: '/LandingBriochesca',
    assetPrefix: '/LandingBriochesca/',
  }),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
