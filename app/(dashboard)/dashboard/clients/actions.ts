"use server";

import { db } from "@/services/db";
import { auth } from "@/auth";

type ClientInput = {
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
};

// Obtener todos los clientes del usuario actual
export async function getClients() {
  const session = await auth();
  
  if (!session?.user?.id) {
    throw new Error("No autorizado");
  }
  
  return await db.client.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });
}

// Obtener un cliente por ID
export async function getClientById(id: string) {
  const session = await auth();
  
  if (!session?.user?.id) {
    throw new Error("No autorizado");
  }
  
  return await db.client.findFirst({
    where: { 
      id,
      userId: session.user.id 
    },
  });
}

// Crear un nuevo cliente
export async function createClient(data: ClientInput) {
  const session = await auth();
  
  if (!session?.user?.id) {
    throw new Error("No autorizado");
  }
  
  return await db.client.create({
    data: {
      ...data,
      user: { connect: { id: session.user.id } },
    },
  });
}

// Actualizar un cliente existente
export async function updateClient(id: string, data: ClientInput) {
  const session = await auth();
  
  if (!session?.user?.id) {
    throw new Error("No autorizado");
  }
  
  // Verificar que el cliente pertenece al usuario
  const client = await db.client.findFirst({
    where: { 
      id,
      userId: session.user.id 
    },
  });
  
  if (!client) {
    throw new Error("Cliente no encontrado o no autorizado");
  }
  
  return await db.client.update({
    where: { id },
    data,
  });
}

// Eliminar un cliente
export async function deleteClient(id: string) {
  const session = await auth();
  
  if (!session?.user?.id) {
    throw new Error("No autorizado");
  }
  
  // Verificar que el cliente pertenece al usuario
  const client = await db.client.findFirst({
    where: { 
      id,
      userId: session.user.id 
    },
  });
  
  if (!client) {
    throw new Error("Cliente no encontrado o no autorizado");
  }
  
  return await db.client.delete({
    where: { id },
  });
}