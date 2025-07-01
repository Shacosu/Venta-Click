"use client";

import { useState, useMemo } from 'react';
import type { Catalog } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { Search, LayoutGrid, List, ChevronRight, FileSearch2 } from 'lucide-react';

// This component will render a single catalog card for the grid view.
function CatalogCard({ catalog, storeSlug }: { catalog: Catalog & { notes: string | null }, storeSlug: string }) {
  return (
    <Link
      href={`/${storeSlug}/${catalog.slug}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden group border border-gray-200"
    >
      <div className="relative h-56 w-full">
        {catalog.imageUrl ? (
          <Image
            src={catalog.imageUrl}
            alt={catalog.name}
            layout="fill"
            objectFit="cover"
            className=" group-hover:scale-110"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-black/30 bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
            <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">Ver Catálogo</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 truncate capitalize">{catalog.name}</h3>
        <p className="text-sm text-gray-500 capitalize line-clamp-2 mt-1" title={catalog?.notes || "Catálogo sin descripción"}>{catalog?.notes || "Catálogo sin descripción"}</p>
      </div>
    </Link>
  );
}

// This component will render a single catalog item for the list view.
function CatalogListItem({ catalog, storeSlug }: { catalog: Catalog & { notes: string | null }, storeSlug: string }) {
  return (
    <Link
      href={`/${storeSlug}/${catalog.slug}`}
      className="flex items-center bg-white p-4 rounded-lg shadow-sm hover:bg-gray-50 hover:shadow-md transition-all duration-300 ease-in-out border border-gray-200"
    >
      <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-gray-100 mr-5 flex-shrink-0">
        {catalog.imageUrl ? (
          <Image
            src={catalog.imageUrl}
            alt={catalog.name}
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </div>
        )}
      </div>
      <div className="flex-grow">
        <h3 className="text-lg font-bold text-gray-900 capitalize">{catalog.name}</h3>
        <p className="text-sm text-gray-500 capitalize line-clamp-2 mt-1" title={catalog?.notes || "Catálogo sin descripción"}>{catalog?.notes || "Catálogo sin descripción"}</p>
      </div>
      <ChevronRight className="h-6 w-6 text-gray-400 ml-4 flex-shrink-0" />
    </Link>
  );
}

interface CatalogDisplayProps {
  catalogs: (Catalog & { notes: string | null })[];
  storeSlug: string;
}

export default function CatalogDisplay({ catalogs, storeSlug }: CatalogDisplayProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  const filteredCatalogs = useMemo(() => {
    return catalogs.filter(catalog =>
      catalog.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [catalogs, searchTerm]);

  return (
    <div>
      {/* Controls: Search and Layout Toggle */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-1/2 lg:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar catálogos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="flex items-center gap-2 p-1 bg-gray-200 rounded-md">
          <button
            onClick={() => setLayout('grid')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${layout === 'grid' ? 'bg-white text-primary shadow' : 'text-gray-600 hover:bg-gray-300'}`}
          >
            <LayoutGrid className="h-5 w-5" />
          </button>
          <button
            onClick={() => setLayout('list')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${layout === 'list' ? 'bg-white text-primary shadow' : 'text-gray-600 hover:bg-gray-300'}`}
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Catalog List/Grid */}
      {filteredCatalogs.length > 0 ? (
        layout === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCatalogs.map((catalog) => (
              <CatalogCard key={catalog.id} catalog={catalog} storeSlug={storeSlug} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCatalogs.map((catalog) => (
              <CatalogListItem key={catalog.id} catalog={catalog} storeSlug={storeSlug} />
            ))}
          </div>
        )
      ) : (
        <div className="text-center py-20 px-6 ">
          <FileSearch2 className="mx-auto h-16 w-16 text-gray-300" />
          <h2 className="mt-6 text-2xl font-bold text-gray-800">No se encontraron catálogos</h2>
          <p className="mt-2 text-base text-gray-500">No hay catálogos que coincidan con tu búsqueda. Intenta con otras palabras.</p>
        </div>
      )}
    </div>
  );
}
