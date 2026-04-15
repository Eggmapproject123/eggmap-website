import Stripe from "stripe";
import { getDatabase } from "../../../lib/firebaseAdmin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const EGG_TYPES = ["Chicken", "Duck", "Goose", "Quail"];

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch (err) {
    return Response.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const paymentIntentId = String(body?.paymentIntentId || "").trim();
  const standId = String(body?.standId || "").trim();
  const tookLastEggs = body?.tookLastEggs === true;
  const remainingTypes = Array.isArray(body?.remainingTypes)
    ? body.remainingTypes
        .map((value) => String(value || "").trim())
        .filter((value) => EGG_TYPES.includes(value))
    : [];

  if (!paymentIntentId) {
    return Response.json({ error: "Missing paymentIntentId." }, { status: 400 });
  }

  if (!standId) {
    return Response.json({ error: "Missing standId." }, { status: 400 });
  }

  if (!tookLastEggs && remainingTypes.length === 0) {
    return Response.json(
      { error: "Select at least one egg type or choose last eggs." },
      { status: 400 }
    );
  }

  try {
    const db = getDatabase();
    const standSnap = await db.ref(`stands/${standId}`).get();
    const stand = standSnap.val();

    if (!stand) {
      return Response.json({ error: "Stand not found." }, { status: 404 });
    }

    const stripeAccountId = stand?.stripeAccountId;
    if (!stripeAccountId) {
      return Response.json(
        { error: "Stand missing stripeAccountId." },
        { status: 400 }
      );
    }

    const markerRef = db.ref(`checkout_stock_updates/${paymentIntentId}`);
    const markerSnap = await markerRef.get();

    if (markerSnap.exists()) {
      return Response.json(
        { error: "This checkout has already submitted a stock update." },
        { status: 409 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentIntentId,
      {},
      { stripeAccount: stripeAccountId }
    );

    if (!paymentIntent || paymentIntent.status !== "succeeded") {
      return Response.json(
        { error: "Payment is not successful." },
        { status: 400 }
      );
    }

    const metadataStandId = String(paymentIntent?.metadata?.standId || "").trim();
    if (metadataStandId !== standId) {
      return Response.json(
        { error: "Payment standId does not match." },
        { status: 400 }
      );
    }

    const stock = tookLastEggs
      ? {}
      : {
          Chicken: remainingTypes.includes("Chicken"),
          Duck: remainingTypes.includes("Duck"),
          Goose: remainingTypes.includes("Goose"),
          Quail: remainingTypes.includes("Quail"),
        };

    const inStock = tookLastEggs ? false : Object.values(stock).some(Boolean);
    const lastUpdated = Date.now();

    const updates = {};
    updates[`stands/${standId}/stock`] = stock;
    updates[`stands/${standId}/inStock`] = inStock;
    updates[`stands/${standId}/lastUpdated`] = lastUpdated;
    updates[`checkout_stock_updates/${paymentIntentId}`] = {
      standId,
      paymentIntentId,
      tookLastEggs,
      remainingTypes,
      submittedAt: lastUpdated,
      source: "website_checkout_success",
    };

    await db.ref().update(updates);

    return Response.json({
      success: true,
      stock,
      inStock,
      lastUpdated,
    });
  } catch (err) {
    console.error("Checkout stock update failed.", err);
    return Response.json(
      { error: err?.message || "Failed to update stock." },
      { status: 500 }
    );
  }
} 
