import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/contexts/cart-context";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>
        {children}
        <Toaster position="top-right" duration={2000} richColors/>
      </CartProvider>
    </SessionProvider>
  )
}