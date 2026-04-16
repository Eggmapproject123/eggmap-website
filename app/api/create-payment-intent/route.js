import Stripe from "stripe";
import { getDatabase } from "../../../lib/firebaseAdmin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const MIN_EGG_ITEM_PRICE_CENTS = 300;
const MIN_CUSTOM_ITEM_PRICE_CENTS = 50;
const MIN_CHECKOUT_SUBTOTAL_CENTS = 300;

const createPaymentIntent = async ({ standId, items }) => {
  try {
    if (!standId) {
      return Response.json({ error: "Missing standId" }, { status: 400 });
    }

    const snapshot = await getDatabase()
      .ref(`stands/${standId}`)
      .once("value");

    const stand = snapshot.val();

    if (!stand) {
      return Response.json({ error: "Stand not found" }, { status: 404 });
    }

    const stripeAccountId = stand.stripeAccountId;

    if (!stripeAccountId) {
      return Response.json(
        { error: "Stand missing stripeAccountId" },
        { status: 400 }
      );
    }
    const normalizedItems = items
      .map((item) => ({
        type: item.type === "egg" ? "egg" : "custom",
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
    const underpricedItem = normalizedItems.find((item) => {
      const minimumCents =
        item.type === "egg" ? MIN_EGG_ITEM_PRICE_CENTS : MIN_CUSTOM_ITEM_PRICE_CENTS;

      return item.unitPriceCents < minimumCents;
    });

    if (underpricedItem) {
      return Response.json(
        {
          error:
            underpricedItem.type === "egg"
              ? "Egg items must be at least $3.00."
              : "Non-egg items must be at least $0.50.",
        },
        { status: 400 }
      );
    }

    const nowTs = Date.now();
    const sale = stand?.goldenSale;
    const percentRaw = Number(sale?.percent);
    const saleActive =
      sale &&
      Number.isFinite(percentRaw) &&
      Number.isFinite(sale?.endsAt) &&
      nowTs < sale.endsAt;
    const percentOff = saleActive
      ? Math.max(0, Math.min(100, Math.round(percentRaw)))
      : 0;
    const discountCents =
      saleActive && subtotalCents > 0
        ? Math.round((subtotalCents * percentOff) / 100)
        : 0;
    const discountedSubtotalCents = Math.max(0, subtotalCents - discountCents);
        if (discountedSubtotalCents < MIN_CHECKOUT_SUBTOTAL_CENTS) {
      return Response.json(
        {
          error: "Minimum checkout subtotal is $3.00 before the EggMap fee.",
        },
        { status: 400 }
      );
    }

    const platformFeeCents =
      discountedSubtotalCents > 0
        ? Math.round(discountedSubtotalCents * 0.029 + 15)
        : 0;
    const totalAmount = discountedSubtotalCents + platformFeeCents;

    const itemsSummary = normalizedItems
      .map((item) => {
        const label = item.variantLabel
          ? `${item.name}(${item.variantLabel})`
          : item.name;
        return `${label}x${item.qty}`;
      })
      .join(", ")
      .slice(0, 450);

    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: totalAmount,
        currency: "usd",
        application_fee_amount: platformFeeCents,
        automatic_payment_methods: { enabled: true },
        metadata: {
          standId: standId ? String(standId) : "unknown",
          items: itemsSummary || "none",
        },
      },
      { stripeAccount: stripeAccountId }
    ); 

    return Response.json({
  clientSecret: paymentIntent.client_secret,
  stripeAccountId,
}); 
  } catch (err) {
    console.error("Create payment intent failed.", err);
    return Response.json(
      { error: err?.message || "Failed to create payment intent." },
      { status: 500 }
    );
  }
};

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

  const items = Array.isArray(body) ? body : body.items || [];
  const standId = !Array.isArray(body) ? body.standId : undefined;

  return createPaymentIntent({ standId, items });
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const standId = searchParams.get("standId");
  const amountParam = searchParams.get("amount");
  const amount = Number(amountParam);

  if (!standId) {
    return Response.json({ error: "Missing standId" }, { status: 400 });
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    return Response.json(
      { error: "Missing or invalid amount" },
      { status: 400 }
    );
  }

  const items = [
    {
      name: "Manual Amount",
      variantLabel: "Test",
      qty: 1,
      unitPriceCents: Math.round(amount),
    },
  ];

  return createPaymentIntent({ standId, items });
}
