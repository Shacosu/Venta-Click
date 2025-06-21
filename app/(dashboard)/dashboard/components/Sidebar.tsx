"use client"
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  

  const menuItems = [
    { id: "overview", label: "General", icon: "📊", href: "/dashboard" },
    { id: "products", label: "Productos", icon: "📦", href: "/dashboard/products" },
    { id: "customers", label: "Carritos", icon: "🛒", href: "/dashboard/carts" },
    { id: "segments", label: "Clientes", icon: "👥", href: "/dashboard/customers" },
    { id: "regions", label: "Regiones", icon: "🌎", href: "/dashboard/regions" },
    { id: "revenue", label: "Ingresos", icon: "💰", href: "/dashboard/revenue" },
    { id: "orders", label: "Pedidos", icon: "📝", href: "/dashboard/orders" },
    { id: "discounts", label: "Descuentos", icon: "🏷️", href: "/dashboard/discounts" },
    { id: "configuration", label: "Configuración", icon: "⚙️", href: "/dashboard/configuration" },
  ];

 

  return (
    <div className="w-64 bg-primary text-white h-screen shadow-md flex flex-col">
      <div className="p-2 border-b border-gray-200">
        <Link href="/dashboard" className="flex items-center">
          <img src="/images/logo.png" alt="VentaClick Logo" title="VentaClick Logo" className="w-auto h-12 object-contain" />
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <div className="px-4 mb-6">
          <h2 className="text-xs uppercase text-gray-200 font-semibold tracking-wider">Management</h2>
          <nav className="mt-2 space-y-1">
            {menuItems.slice(0, 5).map((item) => (
              <motion.button
                key={item.id}
                className={`flex items-center w-full px-3 text-white py-2 text-sm rounded-lg ${
                  pathname === item.href
                    ? "bg-gray-100/20 text-primary font-medium"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => router.push(item.href)}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </motion.button>
            ))}
          </nav>
        </div>

        <div className="px-4 mb-6">
          <h2 className="text-xs uppercase text-gray-200 font-semibold tracking-wider">Monetization</h2>
          <nav className="mt-2 space-y-1">
            {menuItems.slice(5, 8).map((item) => (
              <motion.button
                key={item.id}
                className={`flex items-center w-full px-3 text-white py-2 text-sm rounded-lg ${
                  pathname === item.href
                    ? "bg-gray-100/20 text-primary font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => router.push(item.href)}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label} {pathname === item.href}
              </motion.button>
            ))}
          </nav>
        </div>

        <div className="px-4">
          <h2 className="text-xs uppercase text-gray-200 font-semibold tracking-wider">Settings</h2>
          <nav className="mt-2 space-y-1">
            {menuItems.slice(8).map((item) => (
              <motion.button
                key={item.id}
                className={`flex items-center w-full px-3 text-white py-2 text-sm rounded-lg ${
                  pathname === item.href
                    ? "bg-gray-100/20 text-primary font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => router.push(item.href)}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label} {pathname === item.href}
              </motion.button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
