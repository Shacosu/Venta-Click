'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { updateProduct } from '@/services/product';
import { Catalog, Product } from '@prisma/client';
import { Package, DollarSign, Warehouse, Folder, Image as ImageIcon, Save, Eye } from 'lucide-react';
import { formatCurrency } from '@/utils/functions';

type EditProductFormProps = {
  product: (Product & { catalogId: string | null });
  catalogs: Catalog[];
};

export default function EditProductForm({ product, catalogs }: EditProductFormProps) {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description || '');
  const [price, setPrice] = useState(product.price.toString());
  const [imageUrl, setImageUrl] = useState(product.imageUrl || '');
  const [stock, setStock] = useState(product.stock.toString());
  const [selectedCatalogId, setSelectedCatalogId] = useState(product.catalogId || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name || !price) {
      toast.error('El nombre y el precio son obligatorios.');
      return;
    }
    setIsSubmitting(true);
    try {
      const productData = {
        name,
        description,
        price: parseFloat(price),
        imageUrl,
        stock: parseInt(stock, 10),
      };

      const result = await updateProduct(
        product.id,
        productData,
        selectedCatalogId || null
      );

      if (result.success) {
        toast.success('Producto actualizado con éxito');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Ocurrió un error al actualizar el producto.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="">
        <h1 className="text-2xl font-bold mb-6">Editar Producto</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Columna del Formulario */}
            <div className="lg:col-span-2">
                <CardSection title="Detalles del Producto" icon={<Package className="w-5 h-5" />}>
                    <FormInput label="Nombre del Producto" id="name" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} required />
                    <FormTextArea label="Descripción" id="description" value={description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)} />
                    <FormInput label="URL de la Imagen" id="imageUrl" value={imageUrl} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImageUrl(e.target.value)} placeholder="https://ejemplo.com/imagen.png" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput label="Precio" id="price" type="number" value={price} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)} required />
                        <FormInput label="Stock" id="stock" type="number" value={stock} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStock(e.target.value)} icon={<Warehouse className="w-4 h-4 text-gray-400" />} />
                    </div>
                    <FormSelect label="Catálogo" id="catalog" value={selectedCatalogId} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCatalogId(e.target.value)} options={catalogs} />
                </CardSection>
            </div>

            {/* Columna de Vista Previa y Acciones */}
            <div className="lg:col-span-1 grid gap-6 min-h-full">
                <CardSection title="Vista Previa" icon={<Eye className="w-5 h-5" />}>
                    <ProductPreview name={name} description={description} price={Number(price)} imageUrl={imageUrl} />
                </CardSection>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                    <button type="submit" disabled={isSubmitting} className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-primary-focus disabled:bg-primary-light transition-colors">
                        <Save className="w-5 h-5" />
                        {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
                    </button>
                </motion.div>
            </div>
        </form>
    </div>
  );
}

// --- Componentes Reutilizables ---

const CardSection = ({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) => (
    <motion.div className="bg-white p-6 rounded-xl shadow-md border border-gray-100" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-3 mb-4">
            <div className="bg-gray-100 p-2 rounded-lg">{icon}</div>
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        </div>
        <div className="space-y-4">{children}</div>
    </motion.div>
);

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    icon?: React.ReactNode;
}

const FormInput = ({ label, id, icon, ...props }: FormInputProps) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <div className="relative">
            {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>}
            <input id={id} {...props} className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${icon ? 'pl-10' : ''}`} />
        </div>
    </div>
);

interface FormTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    id: string;
}

const FormTextArea = ({ label, id, ...props }: FormTextAreaProps) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <textarea id={id} rows={4} {...props} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"></textarea>
    </div>
);

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    id: string;
    options: Catalog[];
}

const FormSelect = ({ label, id, value, onChange, options, ...props }: FormSelectProps) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <select id={id} value={value} onChange={onChange} {...props} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary">
            <option value="">Sin catálogo</option>
            {options.map((catalog: Catalog) => (
              <option key={catalog.id} value={catalog.id}>{catalog.name}</option>
            ))}
        </select>
    </div>
);

interface ProductPreviewProps {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

const ProductPreview = ({ name, description, price, imageUrl }: ProductPreviewProps) => {
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        setImageError(false);
    }, [imageUrl]);

    const handleImageError = () => {
        setImageError(true);
    };

    const displayImageUrl = !imageUrl || imageError ? `https://placehold.co/600x400` : imageUrl;

    return (
        <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-200 h-48 flex items-center justify-center">
                <img 
                    src={displayImageUrl} 
                    alt={name} 
                    className="w-full h-full object-cover" 
                    onError={handleImageError}
                />
            </div>
            <div className="p-4">
                <h3 className="font-bold text-lg truncate">{name || 'Nombre del Producto'}</h3>
                <p className="text-gray-500 text-sm h-10 overflow-hidden">{description || 'Descripción del producto...'}</p>
                <p className="font-bold text-primary text-xl mt-2">{formatCurrency(Number(price))}</p>
            </div>
        </div>
    );
};
