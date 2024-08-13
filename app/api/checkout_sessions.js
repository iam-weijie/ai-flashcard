import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
  } catch (e) {
    console.log("Error creating checkout session:", e);
    return new NextResponse(JSON.stringify({ error: { message: e.message } }));
  }
}

export async function POST(req) {
  try {
    const params = {
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [],
    };
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new NextResponse(
      JSON.stringify({ error: { message: error.message } }),
      {
        status: 500,
      }
    );
  }
}
