"use client"

import { Catalog, CatalogItem, Product } from "@prisma/client";
import Link from "next/link";
import { motion } from "motion/react";
import { use } from "react";
import { startTransition } from "react";
import { deleteCatalog } from "@/services/catalog";

// Define the type for a catalog that includes its items and the product details for each item.
type CatalogWithItems = Catalog & {
  items: (CatalogItem & {
    product: Product;
  })[];
};

// Format date to a more readable local string.
const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export default function List({ catalogs }: { catalogs: Promise<CatalogWithItems[]> }) {
  const catalogsData = use(catalogs)

  const handleDelete = async (id: string) => {
    startTransition(async () => {
      const result = await deleteCatalog(id);
      if (result.success) {
        alert(result.message);
      } else {
        alert(result.message);
      }
    });
  }
    
  return (
    <motion.div
      className="col-span-8 bg-white p-6 rounded-xl shadow-md border border-gray-100 overflow-x-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h2 className="text-xl font-semibold mb-4">Listado de Catálogos</h2>

      <div className="space-y-4 max-h-[calc(100vh-20rem)] overflow-y-auto">
        {catalogsData.length > 0 ? catalogsData.map((catalog) => (
          <motion.div
            key={catalog.id}
            className="border border-gray-200 rounded-lg p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-medium">
                    {catalog.name}
                  </h3>
                </div>
                <p className="text-sm text-gray-500">
                  Creado el: {formatDate(catalog.createdAt)}
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/dashboard/catalogs/${catalog.slug}`}
                  className="text-primary hover:text-primary-focus text-sm font-medium"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(catalog.id)}
                  className="text-red-600 hover:text-red-900 text-sm font-medium"
                >
                  Eliminar
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-3">
              <div>
                <span className="text-sm text-gray-500 block">Productos</span>
                <span className="font-medium">{catalog.items.length}</span>
              </div>
            </div>

            {catalog.notes && (
              <div className="mb-3">
                <span className="text-sm text-gray-500 block">Notas</span>
                <p className="text-sm">{catalog.notes}</p>
              </div>
            )}

            {catalog.items.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Productos en el catálogo:</h4>
                <div className="bg-gray-50 rounded-lg p-3 max-h-40 overflow-y-auto">
                  <ul className="space-y-2">
                    {catalog.items.map((item) => (
                      <li key={item.id} className="flex justify-between text-sm">
                        <span>
                          {item.product.name}
                          <span className="text-gray-500"> x{item.quantity}</span>
                        </span>
                        <span className="font-medium">
                          ${(item.price * item.quantity).toLocaleString()}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </motion.div>
        )) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p>No hay catálogos disponibles. ¡Crea uno para empezar!</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}