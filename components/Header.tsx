"use client"
import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";

const navbarLinks = [
  { href: "#precios", label: "Precios" },
  { href: "#servicios", label: "Servicios" },
  { href: "#contacto", label: "Contacto" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });
  }, []);


  return (
    <div className={`navbar px-4 sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-accent/95 backdrop-blur-md shadow-md' : 'bg-accent'} text-white`}>
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden hover:bg-accent-focus">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-accent rounded-lg z-[100] mt-3 w-52 p-2 shadow-lg border border-accent-focus">
            <li>
              <motion.a
                className="font-medium hover:text-accent-content"
                whileHover={{ x: 5 }}
              >
                {navbarLinks[0].label}
              </motion.a>
            </li>
            <li>
              <motion.a
                className="font-medium hover:text-accent-content"
                whileHover={{ x: 5 }}
              >
                {navbarLinks[1].label}
              </motion.a>
              <ul className="p-2 bg-accent-focus/90 rounded-lg">
                <li>
                  <motion.a
                    className="hover:text-accent-content"
                    whileHover={{ x: 5 }}
                  >
                    Servicio 1
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    className="hover:text-accent-content"
                    whileHover={{ x: 5 }}
                  >
                    Servicio 2
                  </motion.a>
                </li>
              </ul>
            </li>
            <li>
              <motion.a
                className="font-medium hover:text-accent-content"
                whileHover={{ x: 5 }}
              >
                {navbarLinks[2].label}
              </motion.a>
            </li>
          </ul>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}>
          <Link href="/">
            <img src="/images/logo.png" alt="VentaClick Logo" title="VentaClick Logo" className="w-auto h-12 object-contain" />
          </Link>
        </motion.div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-6">
          {navbarLinks.map((link, index) => (
            <li key={index}>
              <motion.a
                href={`/${link.href}`}
                className="font-medium hover:text-accent-content hover:bg-accent-focus transition-colors"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -3 }}
              >
                {link.label}
              </motion.a>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end gap-2">
        {session && (
          <>
            <motion.a
              href="/dashboard"
              className="btn btn-primary btn-sm md:btn-md text-white"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, boxShadow: '0px 0px 8px rgba(255,255,255,0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              Dashboard
            </motion.a>
            <motion.button
              onClick={() => signOut()}
              className="btn btn-secondary btn-sm md:btn-md text-white"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, boxShadow: '0px 0px 8px rgba(255,255,255,0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              Cerrar sesión
            </motion.button>
          </>
        )}
        {!session && (
          <motion.a
            href="/sign-in"
            className="btn btn-secondary btn-sm md:btn-md text-white"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, boxShadow: '0px 0px 8px rgba(255,255,255,0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            Iniciar sesión
          </motion.a>
        )}

      </div>
    </div>
  );
}