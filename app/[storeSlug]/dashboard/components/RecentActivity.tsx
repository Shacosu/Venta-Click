"use client"
import { motion } from "motion/react";

interface ActivityItem {
  id: number;
  type: string;
  title: string;
  time: string;
  status?: string;
  amount?: string;
}

export default function RecentActivity() {
  // Datos simulados para la actividad reciente
  const activities: ActivityItem[] = [
    {
      id: 1,
      type: "order",
      title: "Nuevo pedido #1234",
      time: "Hace 5 minutos",
      status: "Pendiente",
      amount: "$45.000"
    },
    {
      id: 2,
      type: "subscription",
      title: "Suscripción renovada",
      time: "Hace 2 horas",
      status: "Completado",
      amount: "$9.990"
    },
    {
      id: 3,
      type: "catalog",
      title: "Catálogo actualizado",
      time: "Hace 3 horas"
    },
    {
      id: 4,
      type: "customer",
      title: "Nuevo cliente registrado",
      time: "Hace 5 horas"
    },
    {
      id: 5,
      type: "order",
      title: "Nuevo pedido #1233",
      time: "Hace 8 horas",
      status: "Completado",
      amount: "$32.500"
    }
  ];

  // Iconos para los diferentes tipos de actividad
  const getIcon = (type: string) => {
    switch (type) {
      case "order":
        return (
          <div className="p-2 bg-blue-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
        );
      case "subscription":
        return (
          <div className="p-2 bg-green-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case "catalog":
        return (
          <div className="p-2 bg-purple-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        );
      case "customer":
        return (
          <div className="p-2 bg-yellow-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="p-2 bg-gray-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  // Estilo para el estado
  const getStatusStyle = (status?: string) => {
    if (!status) return "";
    
    switch (status.toLowerCase()) {
      case "pendiente":
        return "bg-yellow-100 text-yellow-800";
      case "completado":
        return "bg-green-100 text-green-800";
      case "cancelado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Actividad Reciente</h3>
        <button className="text-sm text-primary hover:underline">Ver todo</button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div 
            key={activity.id}
            className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {getIcon(activity.type)}
            
            <div className="ml-4 flex-1">
              <p className="text-sm font-medium text-gray-800">{activity.title}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
            
            <div className="flex flex-col items-end">
              {activity.status && (
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusStyle(activity.status)}`}>
                  {activity.status}
                </span>
              )}
              {activity.amount && (
                <span className="text-sm font-medium mt-1">{activity.amount}</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100 text-center">
        <button className="text-sm text-gray-500 hover:text-primary">Cargar más actividades</button>
      </div>
    </motion.div>
  );
}
