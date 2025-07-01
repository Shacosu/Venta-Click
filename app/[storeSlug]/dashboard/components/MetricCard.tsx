"use client"
import { motion } from "motion/react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: React.ReactNode;
}

export default function MetricCard({ title, value, change, isPositive = true, icon }: MetricCardProps) {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          
          {change && (
            <div className="flex items-center mt-2">
              <span className={`text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? '↑' : '↓'} {change}
              </span>
              <span className="text-xs text-gray-500 ml-1">vs mes anterior</span>
            </div>
          )}
        </div>
        
        <div className={`p-3 rounded-full ${isPositive ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}
