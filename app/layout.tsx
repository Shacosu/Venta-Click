import type { Metadata } from "next";
import "@/styles/globals.css";
import { oswald } from "@/styles/font";
import Providers from "./providers";

export const metadata: Metadata = {
  title: {
    template: "%s | Ventaclick",
    default: "Ventaclick",
  },
  description: "Crea tu catalogo de ventas en minutos - Ventaclick",
  keywords: ["Ventaclick", "Catalogo de ventas", "Ventas en minutos", "crear catalogo de ventas", "crear catalogo de ventas en minutos", "crear catalogo de ventas en minutos con Ventaclick", "paginas web", "paginas web con Ventaclick", "paginas web rapido"],
  authors: [
    {
      name: "Ventaclick",
      url: "https://ventaclick.com",
    },
  ],
  openGraph: {
    title: "Ventaclick",
    description: "Crea tu catalogo de ventas en minutos - Ventaclick",
    url: "https://ventaclick.com",
    siteName: "Ventaclick",
    images: [
      {
        url: "https://ventaclick.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ventaclick",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-theme="lofi">
      <body
        className={`${oswald.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
