"use client";

import { motion } from "motion/react";
import { useState, startTransition, useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import slugify from "slugify";

interface CatalogsProps {
  createCatalogAction: (name: string, notes: string, userId: string) => Promise<{ success: boolean; message: string; }>
}

export default function Catalogs({ createCatalogAction }: CatalogsProps) {
  const storeSlug = usePathname().split('/')[1];
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [notes, setNotes] = useState('');

  const { data: session } = useSession();

  useEffect(() => {
    const generatedSlug = slugify(name, { lower: true, strict: true });
    setSlug(generatedSlug);
  }, [name]);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await createCatalogAction(name, notes, session?.user?.id as string);
      if (result.success) {
        setName('');
        setNotes('');
      } else {
        alert(result.message);
      }
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
          <h2 className="text-xl font-semibold mb-4">Crear Nuevo Catálogo</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del catálogo *
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Nombre del catálogo"
              />
              {name && (
                <div className="mt-2 text-sm text-gray-500 bg-gray-50 p-2 rounded-md">
                  <span className="font-semibold">URL:</span> ventaclick.app/{storeSlug}/<span className="text-primary font-medium">{slug}</span>
                </div>
              )}
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
              Crear Catálogo
            </motion.button>

          </form>
        </motion.div>


      </div>
    </div>
  );
}