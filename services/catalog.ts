"use server";

import { db } from "./db";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import slugify from "slugify";
import { Prisma } from "@prisma/client";

// Función auxiliar para obtener la tienda del usuario actual de forma segura
async function getUserStore() {
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }
  const store = await db.store.findUnique({
    where: { userId: session.user.id },
  });
  return store;
}

export async function getCatalogs() {
  const store = await getUserStore();
  if (!store) {
    // Si el usuario no tiene tienda, no tiene catálogos.
    return [];
  }

  try {
    return await db.catalog.findMany({
      where: { storeId: store.id }, // Correcto: buscar por storeId
      orderBy: { createdAt: "desc" },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error al obtener los catálogos:", error);
    return [];
  }
}

export async function createCatalog(name: string, notes: string) {
  const store = await getUserStore();
  if (!store) {
    return {
      success: false,
      message: "No se encontró una tienda para este usuario. No se puede crear el catálogo.",
    };
  }

  const slug = slugify(name, { lower: true, strict: true });

  try {
    await db.catalog.create({
      data: {
        name,
        slug,
        notes,
        storeId: store.id, // Correcto: usar storeId
      },
    });
    revalidatePath("/dashboard/catalogs");
    return {
      success: true,
      message: "Catálogo creado exitosamente",
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          success: false,
          message: "Ya existe un catálogo con un nombre similar. Por favor, elige otro.",
        };
      }
    }
    console.error("Error al crear el catálogo:", error);
    return {
      success: false,
      message: "Ocurrió un error inesperado al crear el catálogo.",
    };
  }
}

export async function getCatalogBySlug(slug: string) {
  const store = await getUserStore();
  if (!store) {
    return null;
  }

  try {
    const catalog = await db.catalog.findFirst({
      where: {
        slug,
        storeId: store.id, // Correcto: asegurar que el catálogo pertenece a la tienda del usuario
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return catalog;
  } catch (error) {
    console.error(`Error al obtener el catálogo por slug (${slug}):`, error);
    return null;
  }
}

export async function deleteCatalog(id: string) {
  const store = await getUserStore();
  if (!store) {
     return {
      success: false,
      message: "No autorizado para realizar esta acción.",
    };
  }

  try {
    // Asegurar que el catálogo pertenece a la tienda del usuario antes de eliminar
    const result = await db.catalog.deleteMany({
      where: {
        id,
        storeId: store.id,
      },
    });

    if (result.count === 0) {
      return {
        success: false,
        message: "No se encontró el catálogo o no tienes permiso para eliminarlo.",
      };
    }

    revalidatePath("/dashboard/catalogs");
    return {
      success: true,
      message: "Catálogo eliminado exitosamente",
    };
  } catch (error) {
    console.error(`Error al eliminar el catálogo (${id}):`, error);
    return {
      success: false,
      message: "Ocurrió un error inesperado al eliminar el catálogo.",
    };
  }
}