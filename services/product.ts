"use server"

import { db } from "./db";
import { Product } from "@prisma/client";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function getProducts() {
  const session = await auth();
  if (!session?.user?.id) {
    return [];
  }
  try {
    return await db.product.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error al obtener productos del usuario:", error);
    return [];
  }
}

export async function getProductById(id: string) {
  const session = await auth();
  if (!session?.user?.id) return null;

  try {
    const product = await db.product.findFirst({
      where: { id, userId: session.user.id },
    });

    if (!product) return null;

    const catalogItem = await db.catalogItem.findFirst({
      where: { productId: id },
      select: { catalogId: true },
    });

    return {
      ...product,
      catalogId: catalogItem?.catalogId || null,
    };
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    return null;
  }
}

// Tipado para los datos de creación, excluyendo campos gestionados por el servidor
type ProductCreationData = Omit<Product, "id" | "createdAt" | "updatedAt" | "userId">;

export async function createProduct(
  data: ProductCreationData,
  catalogId?: string
) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, message: "Usuario no autenticado." };
  }

  try {
    const productData = { ...data, userId: session.user.id };

    if (catalogId) {
      // Transacción para crear producto y añadirlo al catálogo
      const newProduct = await db.$transaction(async (prisma) => {
        const createdProduct = await prisma.product.create({
          data: productData,
        });

        await prisma.catalogItem.create({
          data: {
            productId: createdProduct.id,
            catalogId: catalogId,
            quantity: 1, // Cantidad por defecto
            price: createdProduct.price,
          },
        });
        return createdProduct;
      });

      revalidatePath("/dashboard/products");
      revalidatePath("/dashboard/catalogs");
      return {
        success: true,
        message: "Producto creado y añadido al catálogo.",
        product: newProduct,
      };
    } else {
      // Crear solo el producto
      const newProduct = await db.product.create({ data: productData });
      revalidatePath("/dashboard/products");
      return {
        success: true,
        message: "Producto creado exitosamente.",
        product: newProduct,
      };
    }
  } catch (error) {
    console.error("Error al crear el producto:", error);
    return {
      success: false,
      message: "Ocurrió un error inesperado al crear el producto.",
    };
  }
}

export async function updateProduct(
  id: string,
  data: Partial<ProductCreationData>,
  catalogId?: string | null
) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, message: "Usuario no autenticado." };
  }

  try {
    await db.$transaction(async (prisma) => {
      const updatedProduct = await prisma.product.update({
        where: { id, userId: session.user.id },
        data,
      });

      const existingCatalogItem = await prisma.catalogItem.findFirst({
        where: { productId: id },
      });

      if (catalogId) {
        if (existingCatalogItem) {
          await prisma.catalogItem.update({
            where: { id: existingCatalogItem.id },
            data: { catalogId: catalogId, price: updatedProduct.price },
          });
        } else {
          await prisma.catalogItem.create({
            data: {
              productId: id,
              catalogId: catalogId,
              quantity: 1,
              price: updatedProduct.price,
            },
          });
        }
      } else if (existingCatalogItem) {
        await prisma.catalogItem.delete({
          where: { id: existingCatalogItem.id },
        });
      }
    });

    revalidatePath("/dashboard/products");
    revalidatePath("/dashboard/catalogs");
    return { success: true, message: "Producto actualizado." };
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    return { success: false, message: "Error al actualizar." };
  }
}

export async function deleteProduct(id: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, message: "Usuario no autenticado." };
  }

  try {
    await db.product.delete({ where: { id, userId: session.user.id } });
    revalidatePath("/dashboard/products");
    return { success: true, message: "Producto eliminado." };
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    return { success: false, message: "Error al eliminar." };
  }
}