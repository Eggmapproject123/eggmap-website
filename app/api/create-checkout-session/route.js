import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const origin = request.headers.get("origin");

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "EggMap Test Payment",
          },
          unit_amount: 1000,
        },
        quantity: 1,
      },
    ],
    success_url: `${origin}/success`,
    cancel_url: `${origin}/cancel`,
  });

  return Response.json({ url: session.url });
}
