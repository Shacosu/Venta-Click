"use client"
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const storeSlug = pathname.split('/')[1];

  const menuItems = [
    { id: "overview", label: "General", icon: "📊", href: `/${storeSlug}/dashboard`, disabled: false },
    { id: "products", label: "Productos", icon: "📦", href: `/${storeSlug}/dashboard/products`, disabled: false },
    { id: "customers", label: "Catálogos", icon: "📚", href: `/${storeSlug}/dashboard/catalogs`, disabled: false },
    { id: "segments", label: "Clientes", icon: "👥", href: `/${storeSlug}/dashboard/customers`, disabled: true },
    { id: "regions", label: "Regiones", icon: "🌎", href: `/${storeSlug}/dashboard/regions`, disabled: true },
    { id: "revenue", label: "Ingresos", icon: "💰", href: `/${storeSlug}/dashboard/revenue`, disabled: true },
    { id: "orders", label: "Pedidos", icon: "📝", href: `/${storeSlug}/dashboard/orders`, disabled: true },
    { id: "discounts", label: "Descuentos", icon: "🏷️", href: `/${storeSlug}/dashboard/discounts`, disabled: true },
    { id: "configuration", label: "Configuración", icon: "⚙️", href: `/${storeSlug}/dashboard/configuration`, disabled: false },
  ];

 

  return (
    <div className="w-64 bg-primary text-white h-screen shadow-md flex flex-col">
      <div className="p-2 border-b border-gray-200">
        <Link href={`/${storeSlug}/dashboard`} className="flex items-center">
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
                className={`flex items-center w-full px-3 text-white py-2 text-sm rounded-lg cursor-pointer disabled:opacity-50 ${
                  pathname === item.href
                    ? "bg-gray-100/20 text-primary font-medium"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => router.push(item.href)}
                disabled={item.disabled}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                title={item.disabled ? "Proximamente" : item.label}
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
                className={`flex items-center w-full px-3 text-white py-2 text-sm rounded-lg cursor-pointer disabled:opacity-50 ${
                  pathname === item.href
                    ? "bg-gray-100/20 text-primary font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => router.push(item.href)}
                disabled={item.disabled}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                title={item.disabled ? "Proximamente" : item.label}
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
                className={`flex items-center w-full px-3 text-white py-2 text-sm rounded-lg cursor-pointer disabled:opacity-50 ${
                  pathname === item.href
                    ? "bg-gray-100/20 text-primary font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => router.push(item.href)}
                disabled={item.disabled}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                title={item.disabled ? "Proximamente" : item.label}
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
