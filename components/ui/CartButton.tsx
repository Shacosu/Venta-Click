"use client";

import { useState } from 'react';
import { useCartContext } from '@/contexts/cart-context';
import { ShoppingCart } from 'lucide-react';
import Cart from './Cart';

interface CartButtonProps {
  storePhoneNumber: string;
}

export default function CartButton({ storePhoneNumber }: CartButtonProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getItemCount } = useCartContext();
  const itemCount = getItemCount();

  return (
    <>
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-110 z-40"
        aria-label={`Ver carrito de compras con ${itemCount} productos`}
      >
        <ShoppingCart className="h-8 w-8" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold">
            {itemCount}
          </span>
        )}
      </button>
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        storePhoneNumber={storePhoneNumber}
      />
    </>
  );
}
