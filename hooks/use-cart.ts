"use client";

import { useState, useEffect, useCallback } from 'react';

// Define the types for our cart items
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string | null;
}

// Define the structure of our custom hook's return value
interface UseCartReturn {
  cart: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (itemId: string) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
}

export const useCart = (): UseCartReturn => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('ventaclick-cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      setCart([]);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ventaclick-cart', JSON.stringify(cart));
  }, [cart]);

  const addItem = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        // If item exists, increase quantity
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // If item doesn't exist, add it with quantity 1
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  }, []);

  const updateItemQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      // If quantity is 0 or less, remove the item
      removeItem(itemId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    }
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const getCartTotal = useCallback(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const getItemCount = useCallback(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  return { cart, addItem, removeItem, updateItemQuantity, clearCart, getCartTotal, getItemCount };
};
