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
    const onboardingComplete = chargesEnabled;

    console.log("stripe_onboarding_status", {
      standId,
      ownerUid: stand.ownerUid || null,
      details_submitted: detailsSubmitted,
      charges_enabled: chargesEnabled,
      stripeOnboardingComplete: onboardingComplete,
    });

    await standRef.update({
      charges_enabled: chargesEnabled,
      details_submitted: detailsSubmitted,
      stripeChargesEnabled: chargesEnabled,
      stripeDetailsSubmitted: detailsSubmitted,
      stripeOnboardingComplete: onboardingComplete,
    });

    return Response.json({
      complete: onboardingComplete,
      stripeOnboardingComplete: onboardingComplete,
      details_submitted: detailsSubmitted,
      charges_enabled: chargesEnabled,
      stripeDetailsSubmitted: detailsSubmitted,
      stripeChargesEnabled: chargesEnabled,
    });

  } catch (err) {
    console.error("Stripe onboarding status check failed.", err);
    return Response.json(
      { error: "Failed to check onboarding status." },
      { status: 500 }
    );
  }
}
