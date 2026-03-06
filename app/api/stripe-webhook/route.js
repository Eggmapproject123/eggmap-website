import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("Missing STRIPE_WEBHOOK_SECRET");
    return new Response("Webhook secret not configured.", { status: 500 });
  }

  let event;

  try {
    const payload = await request.text();
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed.", err);
    return new Response("Webhook Error", { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;

    const standId = paymentIntent.metadata?.standId || "unknown";
    const items = paymentIntent.metadata?.items || "";
    const totalCents = paymentIntent.amount || 0;
    const platformFeeCents = paymentIntent.application_fee_amount || 0;
    const subtotalCents = totalCents - platformFeeCents;

    const order = {
      orderId: paymentIntent.id,
      standId,
      items,
      subtotalCents,
      platformFeeCents,
      totalCents,
      status: "pending",
      createdAt: new Date(event.created * 1000).toISOString(),
    };

    console.log("New EggMap order created", order);
    // Future step: save orders to a database (Firebase or similar).
  }

  return Response.json({ received: true });
}
