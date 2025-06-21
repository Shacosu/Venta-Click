"use client"
import { motion } from "motion/react";

interface PricingFeature {
  name: string;
  included: boolean;
}

interface PricingPlanProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: PricingFeature[];
  highlighted?: boolean;
}

const PricingPlan = ({ name, price, period, description, features, highlighted = false }: PricingPlanProps) => {
  return (
    <motion.div 
      className={`card ${highlighted ? 'bg-primary text-primary-content border-primary' : 'bg-base-100 text-base-content'} shadow-xl`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      <div className="card-body p-8">
        <h3 className="text-2xl font-bold text-center">{name}</h3>
        <div className="text-center my-4">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-sm opacity-80">/{period}</span>
        </div>
        <p className="text-center mb-6 opacity-80">{description}</p>
        <div className="divider"></div>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <motion.li 
              key={index}
              className="flex items-center"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              viewport={{ once: true }}
            >
              <span className={`mr-2 text-lg ${feature.included ? (highlighted ? 'text-primary-content' : 'text-success') : 'text-error'}`}>
                {feature.included ? '✓' : '✕'}
              </span>
              <span className={feature.included ? '' : 'opacity-50 line-through'}>{feature.name}</span>
            </motion.li>
          ))}
        </ul>
        <div className="card-actions justify-center mt-6">
          <motion.button 
            className={`btn ${highlighted ? 'btn-secondary' : 'btn-primary'} btn-block`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Elegir plan
          </motion.button>
        </div>
      </div>
      {highlighted && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <span className="badge badge-secondary py-3 px-4">Más popular</span>
        </div>
      )}
    </motion.div>
  );
};

export default function Pricing() {
  const pricingPlans = [
    {
      name: "Mensual",
      price: "$9.990",
      period: "mes",
      description: "Acceso completo a todas las funcionalidades",
      features: [
        { name: "Catálogo online ilimitado", included: true },
        { name: "Carrito de compras", included: true },
        { name: "Compartir por WhatsApp", included: true },
        { name: "Sin comisiones por venta", included: true },
        { name: "Actualizaciones ilimitadas", included: true },
        { name: "Soporte por email", included: true },
        { name: "Personalización básica", included: true },
        // { name: "Dominio personalizado", included: false }
      ],
      highlighted: true
    },
    {
      name: "Trimestral",
      price: "$26.970",
      period: "3 meses",
      description: "Ahorra un 10% pagando por 3 meses",
      features: [
        { name: "Catálogo online ilimitado", included: true },
        { name: "Carrito de compras", included: true },
        { name: "Compartir por WhatsApp", included: true },
        { name: "Sin comisiones por venta", included: true },
        { name: "Actualizaciones ilimitadas", included: true },
        { name: "Soporte por email", included: true },
        { name: "Personalización básica", included: true },
        // { name: "Dominio personalizado", included: false }
      ],
      highlighted: false
    },
    {
      name: "Anual",
      price: "$95.900",
      period: "año",
      description: "Ahorra un 20% pagando por un año completo",
      features: [
        { name: "Catálogo online ilimitado", included: true },
        { name: "Carrito de compras", included: true },
        { name: "Compartir por WhatsApp", included: true },
        { name: "Sin comisiones por venta", included: true },
        { name: "Actualizaciones ilimitadas", included: true },
        { name: "Soporte prioritario", included: true },
        { name: "Personalización avanzada", included: true },
        // { name: "Dominio personalizado", included: true }
      ],
      highlighted: false
    }
  ];

  return (
    <section id="precios" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">Planes y Precios</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-xl max-w-2xl mx-auto">
            Soluciones flexibles que se adaptan a tus necesidades y presupuesto
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <PricingPlan 
              key={index}
              name={plan.name}
              price={plan.price}
              period={plan.period}
              description={plan.description}
              features={plan.features}
              highlighted={plan.highlighted}
            />
          ))}
        </div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="mb-4 text-lg">¿Necesitas un plan personalizado?</p>
          <button className="btn btn-outline btn-primary btn-lg">Contáctanos</button>
        </motion.div>
      </div>
    </section>
  );
}
