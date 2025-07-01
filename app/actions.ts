'use server'
import { redirect } from "next/navigation";
import { createPayment } from "@/services/mercadopago";
import { auth } from "@/auth";

export async function handlePlanSelection(formData: FormData) {
  const planName = formData.get('planName') as "monthly" | "trimestral" | "annual";

  const session = await auth()
  
  if (!session?.user?.id) {
    throw new Error("Usuario no autenticado");
  }

  const paymentUrl = await createPayment(session.user.email!, planName, session.user.id);
  redirect(paymentUrl);
}
