"use client"

import { motion } from "motion/react"
import { Product } from "@prisma/client"
import { use } from "react"
import Link from "next/link"

interface ListProps {
  productsData: Promise<Product[]>
}

export default function List({ productsData }: ListProps) {
  const products = use(productsData)
  return (
    <motion.div
      className="col-span-8 bg-white p-6 rounded-xl shadow-md border border-gray-100 overflow-x-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h2 className="text-xl font-semibold mb-4">Listado de Productos</h2>

      {products.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {product.imageUrl ? (
                      <div className="flex-shrink-0 h-10 w-10 mr-4">
                        <img className="h-10 w-10 rounded-full object-cover" src={product.imageUrl} alt={product.name} />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
                        <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      {product.description && (
                        <div className="text-sm text-gray-500 truncate max-w-xs">{product.description}</div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${product.price}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.stock}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    href={`/dashboard/products/${product.id}`}
                    className="text-primary hover:text-primary-focus mr-4"
                  >
                    Editar
                  </Link>
                  <button
                    // onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p>No hay productos disponibles</p>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}