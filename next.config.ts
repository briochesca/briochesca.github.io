import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Solo aplicar configuración de export en build de producción
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
    // Sin basePath ni assetPrefix para repositorio raíz
  }),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
