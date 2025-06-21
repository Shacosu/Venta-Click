"use server";

import { db } from "./db";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";


export async function getCarts() {
  const session = await auth()
  if (!session?.user?.id) {
    return [];
  }
  return await db.cart.findMany({
    orderBy: { createdAt: "desc" },
    where: { userId: session.user.id },
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  });
}

export async function createCart(name: string, notes: string, userId: string) {
  const cartData = {
    name,
    notes,
    userId
  }

  await db.cart.create({
    data: {
      ...cartData,
      items: {
        create: []
      }
    }
  });
  revalidatePath("/dashboard/carts");
  return {
    success: true,
    message: "Carrito creado exitosamente"
  }
}

