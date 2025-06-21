import { getCarts, createCart } from "@/services/cart";
import { Suspense } from "react";

import List from "./list";
import Carts from "./client";

export default async function CartsPage() {
  const cartsPromise = getCarts()
  return (
    <>
      <h1 className="text-2xl font-bold">Gestión de Carritos</h1>
      <div className="grid grid-cols-12 gap-6 w-full p-6">
        <Suspense fallback={<div>Loading...</div>}>
          <Carts createCartAction={createCart} />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <List cartsPromise={cartsPromise} />
        </Suspense>
      </div>
    </>
  )
}