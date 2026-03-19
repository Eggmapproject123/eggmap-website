import Stripe from "stripe";
import { getDatabase } from "../../../lib/firebaseAdmin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const standId = searchParams.get("standId");
  if (!standId) {
    return Response.json({ error: "Missing standId." }, { status: 400 });
  }

  try {
    const db = getDatabase();
    const standRef = db.ref(`stands/${standId}`);
    const standSnap = await standRef.get();

    if (!standSnap.exists()) {
      return Response.json({ error: "Stand not found." }, { status: 404 });
    }

    const stand = standSnap.val() || {};
    const stripeAccountId = stand.stripeAccountId;
    if (!stripeAccountId) {
      return Response.json({ complete: false, error: "Missing stripeAccountId." });
    }

    const account = await stripe.accounts.retrieve(stripeAccountId);
    const detailsSubmitted = account.details_submitted === true;
    const chargesEnabled = account.charges_enabled === true;

    console.log("stripe_onboarding_status", {
      standId,
      ownerUid: stand.ownerUid || null,
      details_submitted: detailsSubmitted,
      charges_enabled: chargesEnabled,
    });

    const complete = detailsSubmitted && chargesEnabled;
    if (complete && stand.stripeOnboardingComplete !== true) {
      await standRef.update({ stripeOnboardingComplete: true });
    }

    return Response.json({
      complete,
      details_submitted: detailsSubmitted,
      charges_enabled: chargesEnabled,
    });
  } catch (err) {
    console.error("Stripe onboarding status check failed.", err);
    return Response.json(
      { error: "Failed to check onboarding status." },
      { status: 500 }
    );
  }
}
