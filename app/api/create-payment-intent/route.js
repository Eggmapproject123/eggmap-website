import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const body = await request.json();
  const items = Array.isArray(body) ? body : body.items || [];
  const standId = !Array.isArray(body) ? body.standId : undefined;

  const standAccountMap = {
    test123: process.env.STRIPE_TEST_FARMER_ACCOUNT_ID,
  };

  const farmerStripeAccountId =
    (standId && standAccountMap[standId]) ||
    process.env.STRIPE_DEFAULT_FARMER_ACCOUNT_ID;

  if (!farmerStripeAccountId) {
    return Response.json(
      { error: "Farmer Stripe account not found for stand." },
      { status: 400 }
    );
  }

  const normalizedItems = items
    .map((item) => ({
      name: item.name,
      variantLabel: item.variantLabel || "",
      qty: Number(item.qty) || 0,
      unitPriceCents: Number(item.unitPriceCents) || 0,
    }))
    .filter((item) => item.qty > 0 && item.unitPriceCents > 0);

  const subtotalCents = normalizedItems.reduce(
    (sum, item) => sum + item.unitPriceCents * item.qty,
    0
  );

  if (!subtotalCents) {
    return Response.json({ error: "Cart is empty." }, { status: 400 });
  }

  const platformFeeCents = Math.round(subtotalCents * 0.029 + 15);
  const totalAmount = subtotalCents + platformFeeCents;

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
    amount: totalAmount,
    currency: "usd",
    application_fee_amount: platformFeeCents,
    transfer_data: {
      destination: farmerStripeAccountId,
    },
    automatic_payment_methods: { enabled: true },
    metadata: {
      standId: standId ? String(standId) : "unknown",
      items: itemsSummary || "none",
    },
  });

  return Response.json({ clientSecret: paymentIntent.client_secret });
}
