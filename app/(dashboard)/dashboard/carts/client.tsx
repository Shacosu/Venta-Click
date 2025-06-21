"use client";

import { motion } from "motion/react";
import { useState, startTransition } from "react";
import { Cart } from "@prisma/client";
import { useSession } from "next-auth/react";

interface Carts {
  createCartAction: (name: string, notes: string, userId: string) => Promise<{ success: boolean; message: string; }>
}

export default function Carts({ createCartAction }: Carts) {
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');

  const { data: session } = useSession();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      await createCartAction(name, notes, session?.user?.id as string);
    });
  };

  return (
    <div className="col-span-4">

      <div className="">
        {/* Form Section */}
        <motion.div
          className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-4">Crear Nuevo Carrito</h2>

          {/* {error && (
            <motion.div 
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.div>
          )}
          
          {success && (
            <motion.div 
              className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              {success}
            </motion.div>
          )} */}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del carrito *
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Nombre del carrito"
              />
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Notas (opcional)
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Instrucciones o notas adicionales"
              ></textarea>
            </div>

            <motion.button
              type="submit"
              disabled={!name}
              className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              Crear Carrito
            </motion.button>

          </form>
        </motion.div>


      </div>
    </div>
  );
}