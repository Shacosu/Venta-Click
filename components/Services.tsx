"use client"
import { motion } from "motion/react";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
}

const ServiceCard = ({ icon, title, description }: ServiceCardProps) => {
  return (
    <motion.div 
      className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -5 }}
    >
      <div className="card-body">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 text-primary">
          <span className="text-3xl">{icon}</span>
        </div>
        <h2 className="card-title justify-center text-center mb-2">{title}</h2>
        <p className="text-center text-base-content/80">{description}</p>
      </div>
    </motion.div>
  );
};

export default function Services() {
  const services = [
    {
      icon: "🛒",
      title: "Catálogo Online",
      description: "Crea un catálogo digital de tus productos con imágenes, descripciones y precios en minutos, sin conocimientos técnicos."
    },
    {
      icon: "🛍️",
      title: "Carrito de Compras",
      description: "Tus clientes pueden seleccionar múltiples productos, especificar cantidades y enviar el pedido completo de forma organizada."
    },
    {
      icon: "📱",
      title: "Compartir por WhatsApp",
      description: "Genera un enlace único para compartir tu catálogo directamente con tus clientes a través de WhatsApp u otras redes sociales."
    },
    {
      icon: "💼",
      title: "Para Todo Negocio",
      description: "Ideal para feriantes, emprendedores, pymes o cualquier vendedor que no tenga página web propia."
    },
    {
      icon: "💰",
      title: "Sin Comisiones",
      description: "No cobramos comisión por venta. Solo pagas una suscripción mensual fija, sin importar cuánto vendas."
    },
    {
      icon: "🔄",
      title: "Fácil Actualización",
      description: "Actualiza tu catálogo en cualquier momento, añade nuevos productos o modifica precios sin complicaciones."
    }
  ];

  return (
    <section id="servicios" className="py-20 bg-base-200">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">Nuestros Servicios</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-xl max-w-2xl mx-auto">
            Ofrecemos soluciones digitales completas para hacer crecer tu negocio en línea
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              icon={service.icon} 
              title={service.title} 
              description={service.description} 
            />
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <button className="btn btn-primary btn-lg">Ver todos los servicios</button>
        </motion.div>
      </div>
    </section>
  );
}
