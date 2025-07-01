"use client"

import { motion } from "motion/react"
import { useRouter } from "next/navigation";

interface HeroProps {
  title: string;
  subtitle: string;
  buttonText: string;
}

export default function Hero({ title, subtitle, buttonText }: HeroProps) {
  const router = useRouter();
  return (
    <div className="hero min-h-screen relative overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: "url(https://images.unsplash.com/photo-1664455340023-214c33a9d0bd?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          filter: 'brightness(0.7)'
        }}
      />
      
      {/* Static gradient overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-purple-900/50 z-10"
      />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 z-20">
        {[...Array(20)].map((_, i) => {
          // Use deterministic values based on index instead of random
          const size = 2 + (i % 8);
          const leftPos = (i * 5) % 100;
          const topPos = (i * 7) % 100;
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/20"
              style={{
                width: size,
                height: size,
                left: `${leftPos}%`,
                top: `${topPos}%`,
              }}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.7, 0],
                y: [0, -20, 0]
              }}
              transition={{
                duration: 3 + i % 3,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          );
        })}
      </div>

      <div className="hero-content flex-col lg:flex-row-reverse relative z-30 px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
        <motion.img
          src="https://images.unsplash.com/vector-1739803878972-901d7a4fe1aa?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="max-w-sm rounded-lg object-cover"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ scale: 1.05, rotate: 2 }}
        />
        
        <div className="lg:mr-8 text-white">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h1>
          
          <motion.p 
            className="py-6 text-lg md:text-xl text-blue-100 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
          
          <motion.button 
            className="btn btn-primary px-8 py-3 text-lg font-medium rounded-full bg-gradient-to-r from-blue-600 to-purple-600 border-none"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05, boxShadow: '0px 0px 8px rgb(255,255,255)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('#precios')}
          >
            {buttonText}
          </motion.button>
        </div>
      </div>
    </div>
  );
}