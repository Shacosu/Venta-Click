import { db } from "@/services/db";
import { notFound } from "next/navigation";
import Link from 'next/link';
import Image from 'next/image';
import { Prisma } from "@prisma/client";
import { ChevronLeft, PackageOpen } from 'lucide-react';
import AddToCartButton from '@/components/ui/AddToCartButton';
import CartButton from '@/components/ui/CartButton';

// Define the type for the catalog, including the store, items, and products.
type CatalogWithProducts = Prisma.CatalogGetPayload<{
  include: {
    store: true; // Include store data to use brand colors, etc.
    items: {
      include: {
        product: true;
      };
    };
  };
}>;

interface CatalogPageProps {
  params: {
    storeSlug: string;
    catalogSlug: string;
  };
}

export default async function CatalogPage({ params }: CatalogPageProps) {
  const { storeSlug, catalogSlug } = await params;

  const catalog: CatalogWithProducts | null = await db.catalog.findFirst({
    where: {
      slug: catalogSlug,
      store: {
        slug: storeSlug,
      },
    },
    include: {
      store: true,
      items: {
        orderBy: { product: { name: 'asc' } }, // Order products alphabetically
        include: {
          product: true,
        },
      },
    },
  });

  if (!catalog) {
    notFound();
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        {/* Page Header */}
        <div className="mb-8">
          <Link href={`/${storeSlug}`} className="inline-flex items-center  text-primary font-medium rounded ">
            <ChevronLeft className="h-5 w-5 mr-2" />
            Volver a la tienda
          </Link>
          <div className="text-center mt-4">
            <h1
              className="text-4xl md:text-5xl font-bold capitalize"
              style={{ color: catalog.store.brandColor || '#1F2937' }}
            >
              {catalog.name}
            </h1>
            {catalog.notes && (
              <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto capitalize">
                {catalog.notes}
              </p>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {catalog.items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {catalog.items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden group border border-gray-200 flex flex-col"
              >
                <div className="relative h-64 w-full">
                  {item.product.imageUrl ? (
                    <Image
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                  <div className="flex items-center justify-center h-full bg-gray-100">
                    <PackageOpen className="h-16 w-16 text-gray-300" />
                  </div>
                  )}
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <h2 className="text-lg font-bold text-gray-900 truncate capitalize">{item.product.name}</h2>
                  {item.product.description && (
                    <p className="text-sm text-gray-500 capitalize line-clamp-2 mt-1 flex-grow" title={item.product.description}>
                      {item.product.description}
                    </p>
                  )}
                  <p className="text-2xl font-extrabold text-gray-800 mt-4">
                    $ {item.price.toLocaleString('es-CL')}
                  </p>
                  <AddToCartButton product={{
                    id: item.product.id,
                    name: item.product.name,
                    price: item.price,
                    imageUrl: item.product.imageUrl
                  }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <PackageOpen className="mx-auto h-20 w-20 text-gray-300" />
            <h2 className="mt-6 text-2xl font-bold text-gray-800">Este catálogo está vacío</h2>
            <p className="mt-2 text-base text-gray-500">Aún no se han agregado productos a este catálogo. ¡Vuelve pronto!</p>
          </div>
        )}
      </div>
      {/* Floating Cart Button */}
      {catalog.store.phone && <CartButton storePhoneNumber={catalog.store.phone} />}
    </div>
  );
}
