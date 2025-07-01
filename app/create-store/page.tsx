import CreateStoreForm from "./client";

export default function CreateStorePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div>
          <h1 className="text-2xl font-bold text-center">¡Bienvenido a VentaClick!</h1>
          <p className="mt-2 text-center text-gray-600">
            Para continuar, por favor crea tu tienda. Será tu espacio único y personalizado.
          </p>
        </div>
        <CreateStoreForm />
      </div>
    </div>
  );
}
