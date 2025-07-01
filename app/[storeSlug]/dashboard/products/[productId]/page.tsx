import { getProductById } from '@/services/product';
import { getCatalogs } from '@/services/catalog';
import EditProductForm from './form-client';

export default async function EditProductPage({ params }: { params: { productId: string } }) {
  const paramsData = (await params)?.productId

  const [product, catalogs] = await Promise.all([
    getProductById(paramsData),
    getCatalogs(),
  ]);

  if (!product) {
    return <div>Producto no encontrado.</div>;
  }

  return <EditProductForm product={product} catalogs={catalogs} />;
}
