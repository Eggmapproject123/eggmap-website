import Stripe from "stripe";
import { getDatabase } from "../../../lib/firebaseAdmin";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const updateStripeOnboardingStatus = async (account) => {
  const accountId = account?.id;
  if (!accountId) return { updatedCount: 0 };

  const detailsSubmitted = account.details_submitted === true;
  const chargesEnabled = account.charges_enabled === true;
  const complete = detailsSubmitted && chargesEnabled;

  const db = getDatabase();
  const standsRef = db.ref("stands");

  const updates = {};
  const standIds = new Set();

  const metadataStandId = account?.metadata?.standId;
  if (metadataStandId) {
    const standSnap = await standsRef.child(metadataStandId).get();
    if (standSnap.exists()) {
      standIds.add(metadataStandId);
    } else {
      console.warn(
        "stripe_webhook: metadata standId not found",
        metadataStandId
      );
    }
  } else {
    const matchSnap = await standsRef
      .orderByChild("stripeAccountId")
      .equalTo(accountId)
      .get();

    if (matchSnap.exists()) {
      matchSnap.forEach((child) => {
        standIds.add(child.key);
      });
    }
  }

  if (standIds.size === 0) {
    console.warn("stripe_webhook: no stand found for account", accountId);
    return { updatedCount: 0 };
  }

  for (const standId of standIds) {
    updates[`${standId}/stripeOnboardingComplete`] = complete;
    updates[`${standId}/charges_enabled`] = chargesEnabled;
    updates[`${standId}/details_submitted`] = detailsSubmitted;
  }

  await standsRef.update(updates);
  return { updatedCount: standIds.size };
};

export async function POST(request) {
  console.log("stripe_webhook: request received");
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("stripe_webhook: missing STRIPE_WEBHOOK_SECRET");
    return new Response("Webhook secret not configured.", { status: 500 });
  }
  console.log("stripe_webhook: signature present", Boolean(signature));

  let event;

  try {
    const payload = await request.text();
    console.log("stripe_webhook: payload length", payload.length);
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    console.log("stripe_webhook: signature verified");
  } catch (err) {
    console.error("stripe_webhook: signature verification failed", {
      message: err?.message,
      type: err?.type,
    });
    return new Response("Webhook Error", { status: 400 });
  }

  if (event.type === "account.updated") {
    const account = event.data.object;
    try {
      const result = await updateStripeOnboardingStatus(account);
      console.log("stripe_webhook: account.updated processed", {
        updatedCount: result?.updatedCount ?? 0,
      });
    } catch (err) {
      console.error("stripe_webhook: account.updated failed", {
        message: err?.message,
      });
    }
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
