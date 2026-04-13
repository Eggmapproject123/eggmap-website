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
    if (!standId || standId === "unknown") {
      console.warn("stripe_webhook: missing standId, skipping analytics write");
      return Response.json({ received: true });
    }

    const items = paymentIntent.metadata?.items || "";
    const totalCents = paymentIntent.amount || 0;
    const platformFeeCents = paymentIntent.application_fee_amount || 0;
    const itemsSubtotalCents = Math.max(0, totalCents - platformFeeCents);

    let stripeFeeCents = 0;
    if (paymentIntent.latest_charge) {
      const connectedAccountId = event.account || null;

      const charge = connectedAccountId
        ? await stripe.charges.retrieve(
            paymentIntent.latest_charge,
            { expand: ["balance_transaction"] },
            { stripeAccount: connectedAccountId }
          )
        : await stripe.charges.retrieve(paymentIntent.latest_charge, {
            expand: ["balance_transaction"],
          });

      stripeFeeCents = charge?.balance_transaction?.fee || 0;
    } 

    const stripeFeeAllocatedToItemsCents =
      totalCents > 0
        ? Math.round(stripeFeeCents * (itemsSubtotalCents / totalCents))
        : 0;

    const netItemsAfterStripeFeeCents = Math.max(
      0,
      itemsSubtotalCents - stripeFeeAllocatedToItemsCents
    );

    const db = getDatabase();
    const saleRef = db.ref(`analytics/sales/${standId}/${paymentIntent.id}`);

    await saleRef.set({
      type: "stripe",
      amount: Number((netItemsAfterStripeFeeCents / 100).toFixed(2)),
      note: items,
      timestamp: event.created * 1000,
      paymentIntentId: paymentIntent.id,
      currency: paymentIntent.currency || "usd",
      itemsSubtotalCents,
      platformFeeCents,
      totalCents,
      stripeFeeCents,
      stripeFeeAllocatedToItemsCents,
      netItemsAfterStripeFeeCents,
      source: "qr_checkout",
      status: "succeeded",
    });

    console.log("stripe_webhook: analytics sale saved", {
      standId,
      paymentIntentId: paymentIntent.id,
      netItemsAfterStripeFeeCents,
    });
  } 

  return Response.json({ received: true });
}
