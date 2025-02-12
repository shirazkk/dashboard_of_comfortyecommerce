import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-01-27.acacia",
});

export async function GET() {
  try {
    const payments = await stripe.paymentIntents.list({
      limit: 100, 
    });

    // Sum up successful payments
    const totalRevenue = payments.data
      .filter((payment) => payment.status === "succeeded")
      .reduce((sum, payment) => sum + (payment.amount_received / 100), 0); // Convert cents to dollars

    return NextResponse.json({ totalRevenue });
  } catch (error) {
    console.error("Error fetching revenue:", error);
    return NextResponse.json({ error: "Error fetching revenue" }, { status: 500 });
  }
}
