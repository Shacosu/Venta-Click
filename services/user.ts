"use server"

import { db } from "./db"
import bcrypt from "bcryptjs"

export const getUserByEmail = async (email: string) => {
    return await db.user.findUnique({ where: { email } })
}

export const getUserById = async (id: string) => {
    return await db.user.findUnique({ where: { id } })
}

export const createUser = async (email: string, password: string, name: string) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        await db.user.create({ data: { email, password: hashedPassword, name } })
        return {
            success: true,
            message: "Usuario creado exitosamente."
        }
    } catch (error) {
        return {
            success: false,
            message: "Usuario ya existente, por favor intenta con otro correo."
        }
    }
}

export const updateUser = async (id: string, data: any) => {
    return await db.user.update({ where: { id }, data })
}

export const deleteUser = async (id: string) => {
    return await db.user.delete({ where: { id } })
}

export const getAllUsers = async () => {
    return await db.user.findMany()
}