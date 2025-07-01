import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import VideoSection from "@/components/VideoSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero
        title="Venta Click - Catálogo online con carrito para WhatsApp"
        subtitle="Crea tu catálogo de productos, comparte por WhatsApp y recibe pedidos sin comisiones. ¡Ideal para emprendedores y pymes!"
        buttonText="Comenzar por $9.990/mes"
      />
      <Services />
      <VideoSection />
      <Pricing />
      <Contact />
    </main>
  )
}
