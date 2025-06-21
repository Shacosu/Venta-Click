"use client"
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center">
          <div className="text-xl font-semibold text-gray-800">
            <Link href="/dashboard" className="flex items-center">
              <span>Overview</span>
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button 
              className="flex items-center text-gray-700 focus:outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="mr-2 text-right">
                <div className="text-sm font-medium">{session?.user?.name}</div>
                <div className="text-xs text-gray-500">{session?.user?.email}</div>
              </div>
              <div className="w-8 h-8 overflow-hidden rounded-full bg-gray-200">
                <img 
                  src="https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff" 
                  alt="Admin User" 
                  className="w-full h-full object-cover"
                />
              </div>
            </button>

            {isDropdownOpen && (
              <motion.div 
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Link href="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Mi Perfil
                </Link>
                <Link href="/dashboard/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Configuración
                </Link>
                <div className="border-t border-gray-100 my-1"></div>
                <button onClick={() => signOut()} className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-start cursor-pointer">
                  Cerrar Sesión
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}