"use server"
import { createUser } from "@/services/user"

export const signUp = async (email: string, password: string, name: string) => {
    return await createUser(email, password, name)
}