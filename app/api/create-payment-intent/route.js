import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const body = await request.json();
  const items = Array.isArray(body) ? body : body.items || [];
  const standId = !Array.isArray(body) ? body.standId : undefined;

  const normalizedItems = items
    .map((item) => ({
      name: item.name,
      variantLabel: item.variantLabel || "",
      qty: Number(item.qty) || 0,
      unitPriceCents: Number(item.unitPriceCents) || 0,
    }))
    .filter((item) => item.qty > 0 && item.unitPriceCents > 0);

  const amount = normalizedItems.reduce(
    (sum, item) => sum + item.unitPriceCents * item.qty,
    0
  );

  if (!amount) {
    return Response.json({ error: "Cart is empty." }, { status: 400 });
  }

  const itemsSummary = normalizedItems
    .map((item) => {
      const label = item.variantLabel
        ? `${item.name}(${item.variantLabel})`
        : item.name;
      return `${label}x${item.qty}`;
    })
    .join(", ")
    .slice(0, 450);

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    automatic_payment_methods: { enabled: true },
    metadata: {
      standId: standId ? String(standId) : "unknown",
      items: itemsSummary || "none",
    },
  });

  return Response.json({ clientSecret: paymentIntent.client_secret });
}
