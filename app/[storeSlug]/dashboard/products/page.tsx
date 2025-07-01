import { getProducts } from "@/services/product"
import { getCatalogs } from "@/services/catalog";
import { Suspense } from "react"

import ClientProducts from "./client"
import List from "./list"
import ClientProductsSkeleton from "./components/ClientProductsSkeleton"
import ListSkeleton from "./components/ListSkeleton"

export default async function Products() {
  const products = getProducts();
  const catalogs = getCatalogs();

  return (
    <>
      <h1 className="text-2xl font-bold">Gestión de Productos</h1>
      <div className="grid grid-cols-12 gap-6 w-full p-6">
        <Suspense fallback={<ClientProductsSkeleton />}>
          <ClientProducts catalogs={catalogs} />
        </Suspense>
        <Suspense fallback={<ListSkeleton />}>
          <List productsData={products} />
        </Suspense>
      </div>
    </>
  )
}