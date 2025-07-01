"use client"
import { motion } from "motion/react";
import { useState } from "react";

export default function OverviewChart() {
  const [activeTab, setActiveTab] = useState("week");
  
  // Datos simulados para el gráfico
  const chartData = {
    labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
    values: [12, 19, 15, 22, 30, 28, 25]
  };
  
  // Altura máxima para las barras (en píxeles)
  const maxBarHeight = 150;
  const maxValue = Math.max(...chartData.values);
  
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Resumen de Actividad</h3>
        
        <div className="flex space-x-2 bg-gray-100 rounded-lg p-1">
          <button 
            className={`px-3 py-1 text-sm rounded-md transition-all ${
              activeTab === "week" ? "bg-white shadow-sm text-primary" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("week")}
          >
            Semana
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded-md transition-all ${
              activeTab === "month" ? "bg-white shadow-sm text-primary" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("month")}
          >
            Mes
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded-md transition-all ${
              activeTab === "year" ? "bg-white shadow-sm text-primary" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("year")}
          >
            Año
          </button>
        </div>
      </div>
      
      <div className="mt-8">
        <div className="flex items-end justify-between h-[180px] mb-2">
          {chartData.values.map((value, index) => {
            const height = (value / maxValue) * maxBarHeight;
            const delay = index * 0.05;
            
            return (
              <motion.div
                key={index}
                className="relative group"
                initial={{ height: 0 }}
                animate={{ height }}
                transition={{ duration: 0.5, delay }}
              >
                <div className="w-10 bg-primary/20 rounded-t-md relative overflow-hidden">
                  <motion.div 
                    className="absolute bottom-0 w-full bg-primary rounded-t-md"
                    initial={{ height: 0 }}
                    animate={{ height }}
                    transition={{ duration: 0.5, delay }}
                  />
                </div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                    {value} pedidos
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        <div className="flex justify-between mt-2">
          {chartData.labels.map((label, index) => (
            <div key={index} className="text-xs text-gray-500 w-10 text-center">
              {label}
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-gray-500">Total de Pedidos</p>
            <p className="text-xl font-bold mt-1">152</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Promedio Diario</p>
            <p className="text-xl font-bold mt-1">21.7</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Crecimiento</p>
            <p className="text-xl font-bold mt-1 text-green-600">+12.5%</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
