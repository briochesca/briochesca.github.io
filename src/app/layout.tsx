import type { Metadata } from "next";
import { Montserrat } from 'next/font/google';
import "./globals.css";

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
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={montserrat.variable}>
      <body className="antialiased font-montserrat">
        {children}
      </body>
    </html>
  );
}
