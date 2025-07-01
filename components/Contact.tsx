"use client"
import { motion } from "motion/react";
import { useState } from "react";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulación de envío
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: "📞",
      title: "Llámanos",
      details: "+56 9 1234 5678",
      delay: 0.1
    },
    {
      icon: "✉️",
      title: "Email",
      details: "contacto@ventaclick.com",
      delay: 0.2
    },
    {
      icon: "📍",
      title: "Ubicación",
      details: "Santiago, Chile",
      delay: 0.3
    }
  ];

  return (
    <section id="contacto" className="py-20 bg-base-200">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">Contáctanos</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-xl max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos lo antes posible.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row max-w-6xl mx-auto bg-white rounded-lg overflow-hidden shadow-xl">
          {/* Información de contacto */}
          <div className="lg:w-2/5 bg-base-100 p-8">
            <div className="space-y-8">
              {contactInfo.map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: item.delay, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl mr-4">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                    <p className="text-base-content/70">{item.details}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
              <div className="flex space-x-4">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social, index) => (
                  <motion.a 
                    key={social}
                    href="#"
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social[0].toUpperCase()}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Formulario */}
          <div className="lg:w-3/5 p-8">
            {isSubmitted ? (
              <motion.div 
                className="text-center py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-2xl font-bold mb-2">¡Mensaje enviado!</h3>
                <p>Gracias por contactarnos. Te responderemos pronto.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="">
                  <label className="block text-sm font-medium mb-2">Nombre</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="Escriba su nombre"
                    required 
                  />
                </div>
                
                <div className="">
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className="input input-bordered w-full" 
                    placeholder="Escriba su email"
                    required 
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2">Asunto</label>
                  <select 
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="" disabled>Selecciona un asunto</option>
                    <option value="general">Consulta general</option>
                    <option value="quote">Solicitar presupuesto</option>
                    <option value="support">Soporte técnico</option>
                    <option value="other">Otro</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2">Mensaje</label>
                  <textarea 
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full h-32" 
                    placeholder="Escriba su mensaje"
                    required
                  ></textarea>
                </div>

                <div className="col-span-2">
                  <motion.button 
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="loading loading-spinner loading-sm mr-2"></span>
                        Enviando...
                      </>
                    ) : "Enviar mensaje"}
                  </motion.button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
