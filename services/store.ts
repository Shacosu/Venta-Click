"use server"

import { auth } from "@/auth";
import { db } from "./db";
import { Prisma } from "@prisma/client";
import slugify from "slugify";

export async function createStore(name: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, message: "No autorizado" };
  }

  const slug = slugify(name, { lower: true, strict: true });

  try {
    const newStore = await db.store.create({
      data: {
        name,
        slug,
        userId: session.user.id,
      },
    });
    return { success: true, message: "Tienda creada exitosamente", slug: newStore.slug };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        // El campo 'slug' o 'userId' ya existe, ambos son únicos.
        // Verificamos si es por el userId para saber si ya tiene tienda.
        const existingStore = await db.store.findUnique({
          where: { userId: session.user.id },
        });
        if (existingStore) {
          return {
            success: false,
            message: "Ya tienes una tienda. No puedes crear más de una.",
          };
        }
        return {
          success: false,
          message: "El nombre de la tienda ya está en uso. Por favor, elige otro.",
        };
      }
    }
    console.error("Error al crear la tienda:", error);
    return {
      success: false,
      message: "Ocurrió un error inesperado al crear la tienda.",
    };
  }
}
