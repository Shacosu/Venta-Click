"use client";

import { motion } from "motion/react";
import { Cart } from "@prisma/client";
import { use } from "react";
import Link from "next/link";

interface List {
  cartsPromise: Promise<Cart[]>
}

export default function List({ cartsPromise }: List) {
  const carts = use(cartsPromise)

  // Format date to local string
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <motion.div
      className="col-span-8 bg-white p-6 rounded-xl shadow-md border border-gray-100 overflow-x-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h2 className="text-xl font-semibold mb-4">Listado de Carritos</h2>

      <div className="space-y-4">
        {carts.length > 0 ? carts.map((cart) => (
          <motion.div
            key={cart.id}
            className="border border-gray-200 rounded-lg p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-medium">
                    Carrito #{cart.id.substring(0, 8)}
                  </h3>
                </div>
                <p className="text-sm text-gray-500">
                  {formatDate(cart.createdAt)}
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/dashboard/carts/${cart.id}`}
                  className="text-primary hover:text-primary-focus text-sm font-medium"
                >
                  Editar
                </Link>
                <button
                  // onClick={() => handleDelete(cart.id)}
                  className="text-red-600 hover:text-red-900 text-sm font-medium"
                >
                  Eliminar
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-3">
              <div>
                <span className="text-sm text-gray-500 block">Cliente</span>
                {/* <span className="font-medium">{cart.client ? cart.client.name : "Sin cliente"}</span> */}
              </div>
              <div>
                <span className="text-sm text-gray-500 block">Total</span>
                {/* <span className="font-medium">${cart.total.toLocaleString()}</span> */}
              </div>
              <div>
                <span className="text-sm text-gray-500 block">Productos</span>
                {/* <span className="font-medium">{cart.items.length}</span> */}
              </div>
            </div>

            {cart.notes && (
              <div className="mb-3">
                <span className="text-sm text-gray-500 block">Notas</span>
                <p className="text-sm">{cart.notes}</p>
              </div>
            )}

            {carts.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Productos en el carrito:</h4>
                <div className="bg-gray-50 rounded-lg p-3 max-h-40 overflow-y-auto">
                  <ul className="space-y-2">
                    {!!carts && carts?.items?.length > 0 ? carts.items.map((cart) => (
                      <li key={cart.id} className="flex justify-between text-sm">
                        <span>
                          {cart.product.name}
                          <span className="text-gray-500">x{cart.quantity}</span>
                        </span>
                        <span className="font-medium">
                          ${(cart.price * cart.quantity).toLocaleString()}
                        </span>
                      </li>
                    )) : <p className="text-sm text-gray-500">No hay productos en el carrito</p>}
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
            <p>No hay carritos disponibles</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}