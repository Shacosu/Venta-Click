'use server'
import { redirect } from "next/navigation";
import { createPayment } from "@/services/mercadopago";
import { auth } from "@/auth";

export async function handlePlanSelection(formData: FormData) {
  const planName = formData.get('planName') as "freeTrial" | "premium" | "bussiness";

  const session = await auth()

  const paymentUrl = await createPayment(session?.user?.email!, planName);

  redirect(paymentUrl);
}
