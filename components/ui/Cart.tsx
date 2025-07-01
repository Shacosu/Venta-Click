"use client";

import { useCartContext } from '@/contexts/cart-context';
import { ShoppingBag, X } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  storePhoneNumber: string; // Phone number for WhatsApp checkout
}

export default function Cart({ isOpen, onClose, storePhoneNumber }: CartProps) {
  const { cart, removeItem, updateItemQuantity, getCartTotal, clearCart } = useCartContext();

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) {
      toast.error("Tu carrito está vacío.");
      return;
    }

    let message = "Hola! Me gustaria hacer el siguiente pedido:\n\n";
    cart.forEach(item => {
      message += `*${item.name}*\n`;
      message += `Cantidad: ${item.quantity}\n`;
      message += `Precio Unitario: $${item.price.toLocaleString('es-CL')}\n`;
      message += `Precio Total: $${(item.price * item.quantity).toLocaleString('es-CL')}\n\n`;
    });
    message += `------------------------------------\n`;
    message += `*Total del Pedido: $${getCartTotal().toLocaleString('es-CL')}*\n\n`;
    message += "Gracias!";

    const whatsappUrl = `https://wa.me/${storePhoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    clearCart();
    onClose();
  };

  return (
    <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      {/* Cart Panel */}
      <div className={`absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-medium text-gray-900">Carrito de Compras</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length > 0 ? (
              <ul>
                {cart.map(item => (
                  <li key={item.id} className="flex items-start py-4 border-b">
                    <div className="relative h-20 w-20 rounded-md overflow-hidden">
                      {item.imageUrl ? (
                        <Image src={item.imageUrl} alt={item.name} layout="fill" objectFit="cover" />
                      ) : (
                        <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                          <ShoppingBag className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="ml-4 flex-1 flex flex-col">
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-500">$ {item.price.toLocaleString('es-CL')}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border rounded-md">
                          <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)} className="px-2 py-1 text-gray-600">-</button>
                          <span className="px-3 py-1 text-sm">{item.quantity}</span>
                          <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)} className="px-2 py-1 text-gray-600">+</button>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="font-medium text-indigo-600 hover:text-indigo-500 text-sm">Quitar</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-10">
                <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Tu carrito está vacío</h3>
                <p className="mt-1 text-sm text-gray-500">Añade productos para empezar a comprar.</p>
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t p-4 bg-gray-50">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>$ {getCartTotal().toLocaleString('es-CL')}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">Envío e impuestos calculados al finalizar la compra.</p>
              <div className="mt-6">
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full flex items-center justify-center rounded-md border border-transparent bg-green-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-600"
                >
                  Continuar por WhatsApp
                </button>
              </div>
              <div className="mt-4 flex justify-center text-center text-sm text-gray-500">
                <p>
                  o{' '}
                  <button onClick={onClose} className="font-medium text-indigo-600 hover:text-indigo-500">
                    Seguir comprando
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
