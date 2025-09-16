import type { Metadata } from "next";
import { Montserrat } from 'next/font/google';
import "./globals.css";
import { CartProvider } from '@/contexts/CartContext';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Brioches C.A. - Panes Tradicionales y Gourmet",
  description: "Tradición y calidad en cada pan. Especializados en panes tradicionales, gourmet y repostería artesanal desde hace más de una década. Empresa familiar venezolana dedicada a la excelencia culinaria.",
  authors: [{ name: "Brioches C.A." }],
  keywords: ["panadería", "panes gourmet", "repostería artesanal", "Venezuela", "Brioches", "pan tradicional", "pan francés", "pastelería"],
  creator: "Brioches C.A.",
  publisher: "Brioches C.A.",
  robots: "index, follow",
  openGraph: {
    title: "Brioches C.A. - Panes Tradicionales y Gourmet",
    description: "Tradición y calidad en cada pan. Especializados en panes tradicionales, gourmet y repostería artesanal.",
    url: "https://briochesca.com/",
    siteName: "Brioches C.A.",
    locale: "es_VE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brioches C.A. - Panes Tradicionales y Gourmet",
    description: "Tradición y calidad en cada pan. Especializados en panes tradicionales, gourmet y repostería artesanal.",
  },
  icons: [
    {
      rel: "icon",
      url: "/icon",
      sizes: "512x512",
    },
    {
      rel: "apple-touch-icon", 
      url: "/apple-icon",
      sizes: "180x180",
    },
  ],
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={montserrat.variable}>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js')
                  .then(function(registration) {
                    console.log('SW registered: ', registration);
                  }, function(registrationError) {
                    console.log('SW registration failed: ', registrationError);
                  });
              });
            }
          `
        }} />
      </head>
      <body className="antialiased font-montserrat">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
