"use client";

import { useState, use, useTransition } from "react";
import { motion } from "motion/react";
import { Catalog } from "@prisma/client";
import { createProduct } from "@/services/product";

type CatalogsPromise = Promise<Catalog[]>;

export default function ClientProducts({ catalogs }: { catalogs: CatalogsPromise }) {
  const catalogsData = use(catalogs);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [stock, setStock] = useState('');
  const [selectedCatalogId, setSelectedCatalogId] = useState('');
  const [isImproving, setIsImproving] = useState(false);
  const [isSubmitting, startTransition] = useTransition();

  const handleImproveWithAI = async () => {
    if (!name && !description) {
      alert('Por favor, ingresa un nombre o descripción para mejorar.');
      return;
    }
    setIsImproving(true);
    try {
      const response = await fetch('/api/generate/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
      });
      if (!response.ok) throw new Error('API response not OK');
      const data = await response.json();
      if (data.improvedName) setName(data.improvedName);
      if (data.improvedDescription) setDescription(data.improvedDescription);
    } catch (error) {
      console.error('Error al mejorar con IA:', error);
      alert('Hubo un error al mejorar el texto.');
    } finally {
      setIsImproving(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name || !price) {
      alert("El nombre y el precio son obligatorios.");
      return;
    }
    startTransition(async () => {
      const result = await createProduct(
        {
          name,
          description,
          price: parseFloat(price) || 0,
          imageUrl,
          stock: parseInt(stock) || 0,
        },
        selectedCatalogId || undefined
      );
      if (result.success) {
        alert(result.message);
        setName('');
        setDescription('');
        setPrice('');
        setImageUrl('');
        setStock('');
        setSelectedCatalogId('');
      } else {
        alert(`Error: ${result.message}`);
      }
    });
  };

  return (
    <div className="col-span-4">
      <motion.div
        className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Agregar Producto</h2>
          <button type="button" onClick={handleImproveWithAI} disabled={isImproving} className="px-3 py-1.5 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:bg-purple-300 flex items-center gap-2">
            {isImproving ? 'Mejorando...' : '✨ Mejorar con IA'}
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full input-field" placeholder="Ej: Camiseta de algodón" required />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full input-field" placeholder="Descripción del producto..."></textarea>
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Precio *</label>
            <input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full input-field" placeholder="Ej: 19990" min="0" step="0.01" required />
          </div>
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">URL de imagen</label>
            <input id="imageUrl" type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full input-field" placeholder="https://ejemplo.com/imagen.jpg" />
          </div>
          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
            <input id="stock" type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full input-field" placeholder="Ej: 100" min="0" />
          </div>
          <div>
            <label htmlFor="catalog" className="block text-sm font-medium text-gray-700 mb-1">Asignar a Catálogo (Opcional)</label>
            <select id="catalog" value={selectedCatalogId} onChange={(e) => setSelectedCatalogId(e.target.value)} className="w-full input-field">
              <option value="">No asignar</option>
              {catalogsData.map((catalog) => (
                <option key={catalog.id} value={catalog.id}>{catalog.name}</option>
              ))}
            </select>
          </div>
          <motion.button type="submit" disabled={isSubmitting} className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-focus disabled:opacity-70" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            {isSubmitting ? 'Guardando...' : 'Guardar Producto'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}