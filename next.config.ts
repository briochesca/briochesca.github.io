import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Solo aplicar basePath en producción
  ...(process.env.NODE_ENV === 'production' && {
    basePath: '/LandingBriochesca',
    assetPrefix: '/LandingBriochesca/',
  }),
};

export default nextConfig;
