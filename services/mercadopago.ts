import { MercadoPagoConfig, PreApproval } from "mercadopago";

const mpClient = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
})

const plans = {
  freeTrial: {
    frequency: 1,
    frequency_type: "days",
    currency_id: "CLP",
    initial_charge: 0,
    max_refunds: 1
  },
  premium: {
    frequency: 1,
    frequency_type: "months",
    currency_id: "CLP",
    initial_charge: 9990,
    max_refunds: 1
  },
  bussiness: {
    frequency: 1,
    frequency_type: "months",
    currency_id: "CLP",
    initial_charge: 26970,
    max_refunds: 1
  }
}

export const createPayment = async (email: string, planSelected: "freeTrial" | "premium" | "bussiness") => {
    const selectedPlan = plans[planSelected]
    console.log(selectedPlan)
    const suscription = await new PreApproval(mpClient).create({
      body: {
        back_url: process.env.APP_URL! || "http://localhost:3000",
        reason: "Suscripción a Venta Click",
        auto_recurring: {
          frequency: selectedPlan.frequency,
          frequency_type: selectedPlan.frequency_type,
          transaction_amount: selectedPlan.initial_charge,
          currency_id: selectedPlan.currency_id,
        },
        payer_email: "test_user_115132710@testuser.com",
        status: "pending",
      },
    });
    return suscription.init_point!;
}