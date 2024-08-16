import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const formatAmountForStripe = (amount) => {
  return Math.round(amount * 100);
};

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const session_id = searchParams.get("session_id");

  if (!session_id) {
    return new NextResponse(
      JSON.stringify({ error: { message: "Invalid session_id" } }),
      {
        status: 400,
      }
    );
  }

  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
  return new NextResponse.json(checkoutSession, {
    status: 200,
  });
}

export async function POST(req) {
  try {
    const params = {
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Premium Plan",
            },
            unit_amount: formatAmountForStripe(9.99), // $9.99 in cents
            recurring: {
              interval: "month",
              interval_count: 1,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.get(
        "Referer"
      )}result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get(
        "Referer"
      )}result?session_id={CHECKOUT_SESSION_ID}`,
    };

    const checkoutSession = await stripe.checkout.sessions.create(params);
    return new NextResponse.json(checkoutSession, {
      status: 200,
    });
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
