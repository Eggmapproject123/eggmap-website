import Stripe from "stripe";
import { admin, getDatabase } from "../../../lib/firebaseAdmin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const baseUrl = process.env.BASE_URL || "https://www.eggmapmobile.com";
  const stripeKey = process.env.STRIPE_SECRET_KEY || "";
  const stripeKeyMode = stripeKey.startsWith("sk_live_")
    ? "live"
    : stripeKey.startsWith("sk_test_")
      ? "test"
      : "unknown";

  console.log("stripe_key_mode:", stripeKeyMode);
  console.log("stripe_key_prefix:", stripeKey.slice(0, 7));

  let body;
  try {
    body = await request.json();
  } catch (err) {
    return Response.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const standId = body?.standId;
  if (!standId) {
    return Response.json({ error: "Missing standId." }, { status: 400 });
  }

  const authHeader = request.headers.get("authorization") || "";

  console.log("Authorization header:", authHeader);
  const tokenMatch = authHeader.match(/^Bearer\s+(.+)$/i);
  const idToken = tokenMatch ? tokenMatch[1] : null;

  if (!idToken) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const db = getDatabase();
    const decoded = await admin.auth().verifyIdToken(idToken);
    const standRef = db.ref(`stands/${standId}`);
    const pendingRef = db.ref(`pending_stands/${standId}`);
    const [standSnap, pendingSnap] = await Promise.all([
      standRef.get(),
      pendingRef.get(),
    ]);

    if (!standSnap.exists()) {
      return Response.json({ error: "Stand not found." }, { status: 404 });
    }

    const stand = standSnap.val() || {};
    const pending = pendingSnap.exists() ? pendingSnap.val() : null;

    console.log("standId:", standId);
    console.log("decoded.uid:", decoded.uid);
    console.log("stand.ownerUid:", stand?.ownerUid);
    console.log("pending.ownerUid:", pending?.ownerUid);
    const ownerUid = stand?.ownerUid || pending?.ownerUid;
    if (!ownerUid || ownerUid !== decoded.uid) {
      return Response.json({ error: "Forbidden." }, { status: 403 });
    }

    let stripeAccountId = stand.stripeAccountId;
    let stripeAccount = null;
    if (!stripeAccountId) {
      stripeAccount = await stripe.accounts.create({
        type: "express",
        capabilities: {
          transfers: { requested: true },
        },
        business_profile: {
          product_description: "Fresh eggs and farm products sold locally",
        },
      });
      stripeAccountId = stripeAccount.id;
      await standRef.update({ stripeAccountId });
    }

    if (!stripeAccount) {
      stripeAccount = await stripe.accounts.retrieve(stripeAccountId);
    }

    const detailsSubmitted = stripeAccount.details_submitted === true;
    const chargesEnabled = stripeAccount.charges_enabled === true;

    console.log("stripe_onboarding_status", {
      standId,
      ownerUid,
      details_submitted: detailsSubmitted,
      charges_enabled: chargesEnabled,
    });

    if (detailsSubmitted && chargesEnabled) {
      await standRef.update({ stripeOnboardingComplete: true });
    }

    const accountLink = await stripe.accountLinks.create({
      account: stripeAccountId,
      refresh_url: `${baseUrl}/onboarding/refresh?standId=${standId}`,
      return_url: `${baseUrl}/onboarding/complete?standId=${standId}`,
      type: "account_onboarding",
    });

    return Response.json({
      onboardingUrl: accountLink.url,
    });
  } catch (err) {
    console.error("Stripe onboarding failed.", err);
    console.error("Stripe error details:", {
      message: err?.message,
      type: err?.type,
      code: err?.code,
      rawType: err?.rawType,
      requestId: err?.requestId,
      statusCode: err?.statusCode,
      raw: err?.raw,
    });
    return Response.json(
      { error: "Failed to start Stripe onboarding." },
      { status: 500 }
    );
  }
}
