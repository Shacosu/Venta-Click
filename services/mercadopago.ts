import { MercadoPagoConfig, PreApproval, PreApprovalPlan } from "mercadopago";

export const mpClient = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
})

const plans = {
  mensual: {
    frequency: 1,
    frequency_type: "months",
    currency_id: "CLP",
    initial_charge: 14990,
    max_refunds: 1
  },
  trimestral: {
    frequency: 3,
    frequency_type: "months",
    currency_id: "CLP",
    initial_charge: 39990,
    max_refunds: 1
  },
  anual: {
    frequency: 12,
    frequency_type: "months",
    currency_id: "CLP",
    initial_charge: 149900,
    max_refunds: 1
  }
}

export const createPayment = async (email: string, planSelected: "mensual" | "trimestral" | "anual", userId: string) => {
    const selectedPlan = plans[planSelected]
    console.log({
      email,
      planSelected,
      selectedPlan,
      userId
    })
    const suscription = await new PreApproval(mpClient).create({
      body: {
        payer_email: email,
        back_url: process.env.APP_URL! || "http://localhost:3000",
        reason: "Suscripción a Venta Click",
        auto_recurring: {
          frequency: selectedPlan.frequency,
          frequency_type: selectedPlan.frequency_type,
          transaction_amount: selectedPlan.initial_charge,
          currency_id: selectedPlan.currency_id,
        },
        status: "pending",
        external_reference: userId,
      },
    });
    return suscription.init_point!;
}