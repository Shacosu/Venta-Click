import NextAuth, { type DefaultUser } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { User } from "@prisma/client"

import { db } from "@/services/db"

// Extender los tipos de NextAuth
declare module "next-auth" {
  interface User {
    hasStore?: boolean;
    storeSlug?: string | null;
    subscription?: {
      plan: string;
      status: string;
    } | null;
  }
  
  interface Session {
    user: {
      id: string;
      email?: string | null;
      plan?: string | null;
      hasStore?: boolean | null;
      storeSlug?: string | null;
    }
  }
}
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {},
      async authorize(credentials: any) {
        if (!credentials.email || !credentials.password) {
          return null;
        }
        const userFromDb = await db.user.findUnique({
          where: { email: credentials.email },
          include: { subscription: true, store: true },
        });

        if (!userFromDb || !userFromDb.password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, userFromDb.password);

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: userFromDb.id,
          email: userFromDb.email,
          hasStore: !!userFromDb.store,
          storeSlug: userFromDb.store?.slug || null,
        };
      },
    }),
  ],
  
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Al iniciar sesión, `user` está disponible. Lo usamos para establecer el token inicial.
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.hasStore = user.hasStore;
        token.storeSlug = user.storeSlug;
      }

      // Si la sesión se actualiza manualmente (desde el cliente), `trigger` será "update".
      // `session` contendrá los datos que pasamos a la función `update()`.
      // Si la sesión se actualiza manualmente (desde el cliente), `trigger` será "update".
      if (trigger === "update" && session) {
        token.hasStore = session.hasStore;
        token.storeSlug = session.storeSlug;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.hasStore = token.hasStore as boolean;
        session.user.storeSlug = token.storeSlug as string;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/sign-in",
    newUser: "/sign-up"
  },
  
})