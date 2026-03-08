import Stripe from "stripe";
import { db } from "../../../lib/firebaseAdmin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch (err) {
    return Response.json(
      { error: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  try {
    const items = Array.isArray(body) ? body : body.items || [];
    const standId = !Array.isArray(body) ? body.standId : undefined;

    if (!standId) {
      return Response.json({ error: "Missing standId" }, { status: 400 });
    }

    const standDoc = await db.collection("stands").doc(standId).get();

    if (!standDoc.exists) {
      return Response.json({ error: "Stand not found" }, { status: 404 });
    }

    const stripeAccountId = standDoc.data().stripeAccountId;

    if (!stripeAccountId) {
      return Response.json(
        { error: "Stand missing stripeAccountId" },
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
      destination: stripeAccountId,
    },
      automatic_payment_methods: { enabled: true },
      metadata: {
        standId: standId ? String(standId) : "unknown",
        items: itemsSummary || "none",
      },
    });

    return Response.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("Create payment intent failed.", err);
    return Response.json(
      { error: "Failed to create payment intent." },
      { status: 500 }
    );
  }
}
