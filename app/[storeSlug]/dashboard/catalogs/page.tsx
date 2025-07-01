import { Suspense } from "react";
import { getCatalogs, createCatalog } from "@/services/catalog";
import Catalogs from "./client";
import List from "./list";
import CatalogsSkeleton from "./components/CatalogsSkeleton";
import ListSkeleton from "./components/ListSkeleton";


export default function CatalogsPage() {
  const catalogs = getCatalogs()

  return (
    <>
      <h1 className="text-2xl font-bold">Gestión de Catálogos</h1>
      <div className="grid grid-cols-12 gap-6 w-full p-6">
        <Suspense fallback={<CatalogsSkeleton />}>
          <Catalogs createCatalogAction={createCatalog} />
        </Suspense>
        <Suspense fallback={<ListSkeleton />}>
          <List catalogs={catalogs} />
        </Suspense>
      </div>
    </>
  );
}