import { getProducts } from "@/services/product"
import { Suspense } from "react"

import ClientProducts from "./client"
import List from "./list"

export default async function Products() {
  const products = getProducts()
  return (
    <>
      <h1 className="text-2xl font-bold">Gestión de Productos</h1>
      <div className="grid grid-cols-12 gap-6 w-full p-6">
        <Suspense fallback={<div>Loading...</div>}>
          <ClientProducts />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <List productsData={products} />
        </Suspense>
      </div>
    </>
  )
}