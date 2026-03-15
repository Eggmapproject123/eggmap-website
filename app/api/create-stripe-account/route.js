import Stripe from "stripe";
import { admin, getDatabase } from "../../../lib/firebaseAdmin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const baseUrl = process.env.BASE_URL || "https://www.eggmapmobile.com";

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
    if (!stripeAccountId) {
      const account = await stripe.accounts.create({
        type: "express",
        capabilities: {
          transfers: { requested: true },
        },
      });
      stripeAccountId = account.id;
      await standRef.update({ stripeAccountId });
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
    return Response.json(
      { error: "Failed to start Stripe onboarding." },
      { status: 500 }
    );
  }
}



