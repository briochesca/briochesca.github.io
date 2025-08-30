import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brioches C.A. - Panes Tradicionales y Gourmet",
  description: "Tradición y calidad en cada pan. Especializados en panes tradicionales, gourmet y repostería artesanal desde hace más de una década. Empresa familiar venezolana dedicada a la excelencia culinaria.",
  authors: [{ name: "Brioches C.A." }],
  keywords: ["panadería", "panes gourmet", "repostería artesanal", "Venezuela", "Brioches", "pan tradicional", "pan francés", "pastelería"],
  creator: "Brioches C.A.",
  publisher: "Brioches C.A.",
  robots: "index, follow",
  googlebot: "index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1",
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
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
