import { db } from "./db";
import { Product } from "@prisma/client";

export async function getProducts() {
  try {
    return await db.product.findMany();
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
}

export async function getProductById(id: string) {
  return await db.product.findUnique({ where: { id } });
}

export async function createProduct(data: Product) {
  return await db.product.create({
    data: {
      ...data,
    },
  });
}

export async function updateProduct(id: string, data: Product) {
  return await db.product.update({ where: { id }, data });
}

export async function deleteProduct(id: string) {
  return await db.product.delete({ where: { id } });
}