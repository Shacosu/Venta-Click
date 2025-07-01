import { PreApproval, Payment as MercadoPagoPayment } from "mercadopago";
import { NextResponse } from "next/server";
import { mpClient } from "@/services/mercadopago";
import { db } from "@/services/db";

export async function POST(req: Request) {
    const body = await req.json();
    if (body.type === "subscription_preapproval") {
      const preApproval = await new PreApproval(mpClient).get({
        id: body.data.id,
      });
      try {
        const userId = preApproval.external_reference;
        if (!userId) {
          return NextResponse.json({ error: "Referencia de usuario no encontrada" }, { status: 400 });
        }

        const user = await db.user.findUnique({ where: { id: userId } });
        if (!user) {
          return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
        }

        let planType = "monthly";
        if (preApproval.auto_recurring?.frequency === 3) {
          planType = "trimestral";
        } else if (preApproval.auto_recurring?.frequency === 12) {
          planType = "annual";
        }

        switch (preApproval.status) {
          case "authorized":
            await db.subscription.upsert({
              where: { userId: user.id },
              update: {
                status: preApproval.status,
                plan: planType,
                mercadopagoPreapprovalId: preApproval.id,
                planEnds: preApproval.next_payment_date ? new Date(preApproval.next_payment_date) : null,
                updatedAt: new Date(),
              },
              create: {
                userId: user.id,
                plan: planType,
                status: preApproval.status,
                mercadopagoPreapprovalId: preApproval.id,
                planEnds: preApproval.next_payment_date ? new Date(preApproval.next_payment_date) : null,
              },
            });
            break;

          case "cancelled":
          case "paused":
          case "rejected":
            await db.subscription.updateMany({
              where: {
                userId: user.id,
                mercadopagoPreapprovalId: preApproval.id,
              },
              data: {
                status: preApproval.status,
                updatedAt: new Date(),
              },
            });
            break;
        }
      } catch (error) {
        console.error("Error al procesar la suscripción:", error);
        return NextResponse.json({ error: "Error al procesar la suscripción" }, { status: 500 });
      }
    } else if (body.type === "payment") {
      try {
        const paymentResponse = await new MercadoPagoPayment(mpClient).get({ id: body.data.id });
        const payment = paymentResponse as any;

        if (payment && payment.status === 'approved' && payment.preapproval_id) {
          // El pago está aprobado y está asociado a una suscripción
          const subscription = await db.subscription.findUnique({
            where: {
              mercadopagoPreapprovalId: payment.preapproval_id
            }
          });

          if (subscription) {
            // Registrar el pago en la base de datos
            await db.payment.create({
              data: {
                mercadopagoId: String(payment.id!),
                amount: payment.transaction_amount!,
                currency: payment.currency_id!,
                status: payment.status!,
                user: {
                  connect: { id: subscription.userId }
                },
                subscription: {
                  connect: { id: subscription.id }
                }
              }
            });

            // Extender la fecha de finalización del plan
            const currentPlanEnds = subscription.planEnds ? new Date(subscription.planEnds) : new Date();
            let newPlanEnds: Date;

            switch (subscription.plan) {
              case "monthly":
                newPlanEnds = new Date(currentPlanEnds.setMonth(currentPlanEnds.getMonth() + 1));
                break;
              case "trimestral":
                newPlanEnds = new Date(currentPlanEnds.setMonth(currentPlanEnds.getMonth() + 3));
                break;
              case "annual":
                newPlanEnds = new Date(currentPlanEnds.setFullYear(currentPlanEnds.getFullYear() + 1));
                break;
              default:
                newPlanEnds = new Date(currentPlanEnds.setMonth(currentPlanEnds.getMonth() + 1));
            }

            await db.subscription.update({
              where: { id: subscription.id },
              data: { planEnds: newPlanEnds }
            });
          }
        }
      } catch (error) {
        console.error("Error al procesar el pago:", error);
        return NextResponse.json({ error: "Error al procesar el pago" }, { status: 500 });
      }
    }
    return NextResponse.json({ success: true }, {
        status: 200,
    });
}
