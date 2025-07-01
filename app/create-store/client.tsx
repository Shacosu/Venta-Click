"use client";


import { useState, useTransition } from "react";
import { createStore } from "@/services/store";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react"; // Importar useSession

export default function CreateStoreForm() {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { update } = useSession(); // Obtener la función de actualización

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    if (!name.trim()) {
      setError("El nombre de la tienda no puede estar vacío.");
      return;
    }

    startTransition(async () => {
      const result = await createStore(name);
      if (result.success && result.slug) {
        // Primero, actualizamos la sesión con el nuevo estado y el slug de la tienda
        await update({ hasStore: true, storeSlug: result.slug });
        // Luego, redirigimos al nuevo dashboard dinámico
        router.push(`/${result.slug}/dashboard`);
      } else {
        setError(result.message || "Ocurrió un error al crear la tienda.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">
          Nombre de la Tienda
        </label>
        <div className="mt-1">
          <input
            id="storeName"
            name="storeName"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            placeholder="Mi Tienda Increíble"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
        >
          {isPending ? "Creando tienda..." : "Crear Tienda y Continuar"}
        </button>
      </div>
    </form>
  );
}
