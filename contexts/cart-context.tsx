"use client";

import { createContext, ReactNode, useContext } from 'react';
import { useCart, CartItem } from '@/hooks/use-cart';

// Define the shape of the context data
interface CartContextType {
  cart: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (itemId: string) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
}

// Create the context with a default undefined value
const CartContext = createContext<CartContextType | undefined>(undefined);

// Custom hook to use the cart context, which provides a nice error message
// if used outside of the provider
export const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};

// The provider component that will wrap our app or parts of it
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const cartState = useCart(); // Our existing hook that handles all the logic
  return (
    <CartContext.Provider value={cartState}>
      {children}
    </CartContext.Provider>
  );
};
