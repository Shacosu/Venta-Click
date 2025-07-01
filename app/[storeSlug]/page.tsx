import { db } from "@/services/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import ShareButton from "./components/ShareButton";
import CatalogDisplay from "./components/CatalogDisplay";
import { CheckCircle } from "lucide-react";

interface StorePageProps {
  params: {
    storeSlug: string;
  };
}

export default async function StorePage({ params }: StorePageProps) {
  const { storeSlug } = await params;

  const store = await db.store.findUnique({
    where: { slug: storeSlug },
    include: {
      catalogs: true, // La relación ahora es directa
    },
  });

  if (!store) {
    notFound();
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        {/* Store Header */}
        <div className="relative text-center mt-2  p-8 rounded-lg ">
          {store.logoUrl && (
            <div className="mx-auto mb-6 w-32 h-32 relative">
              <Image
                src={store.logoUrl}
                alt={`${store.name} logo`}
                layout="fill"
                objectFit="cover"
                className="rounded-full shadow-md"
              />
              {/* top seller */}
              {/* <div className=" bg-indigo-600 text-white px-2 py-1 text-xs font-semibold rounded-full absolute -bottom-2 right-0 left-0">
                <CheckCircle className="inline-block w-4 h-4 ml-1" />
                Top Seller
              </div> */}
            </div>
          )}
          <h1
            className="text-4xl md:text-5xl font-bold"
            style={{ color: store.brandColor || '#1F2937' }}
          >
            {store.name}
          </h1>
          <p className="text-lg text-gray-600 my-2">Explora nuestros catálogos</p>
          <div>
            <ShareButton />
          </div>
        </div>

        <CatalogDisplay catalogs={store.catalogs} storeSlug={store.slug} />
      </div>
    </div>
  );
}
