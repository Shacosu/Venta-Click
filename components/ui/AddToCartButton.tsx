"use client";

import { useCartContext } from '@/contexts/cart-context';
import { toast } from 'sonner';
import { ShoppingCart, PlusCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

// Define the type for the product prop, which is a subset of the CartItem
interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl?: string | null;
}

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem, cart } = useCartContext();
  const [itemInCart, setItemInCart] = useState(false);

  // Check if the item is already in the cart on component mount and when cart changes
  useEffect(() => {
    const found = cart.some(item => item.id === product.id);
    setItemInCart(found);
  }, [cart, product.id]);

  const handleAddToCart = () => {
    addItem(product);
    toast.success(`${product.name} - añadido al carrito!`);
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`w-full mt-4 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors duration-200 cursor-pointer ${
        itemInCart
          ? 'bg-green-500 hover:bg-green-700' // Keep it green but active
          : 'bg-indigo-600 hover:bg-indigo-800'
      } focus:outline-none`}
    >
      {itemInCart ? (
        <>
          <PlusCircle className="-ml-1 mr-2 h-5 w-5" />
          Añadir otro
        </>
      ) : (
        <>
          <ShoppingCart className="-ml-1 mr-2 h-5 w-5" />
          Añadir al carrito
        </>
      )}
    </button>
  );
}
