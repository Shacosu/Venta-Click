"use client"
import Link from "next/link"

export default function NotFound() {

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">404 - Página no encontrada</h1>
      <p className="mt-2">La página que estás buscando no existe o ha sido movida.</p>
      <Link href="/" className="mt-4 btn btn-primary">Volver</Link>
    </div>
  )
}
