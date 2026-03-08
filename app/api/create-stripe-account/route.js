import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST() {
  const baseUrl = process.env.BASE_URL;

  if (!baseUrl) {
    return Response.json(
      { error: "Missing BASE_URL environment variable." },
      { status: 500 }
    );
  }

  const account = await stripe.accounts.create({
    type: "express",
    capabilities: {
      transfers: { requested: true },
    },
  });

  const accountLink = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: `${baseUrl}/onboarding/refresh`,
    return_url: `${baseUrl}/onboarding/complete`,
    type: "account_onboarding",
  });

  return Response.json({
    stripeAccountId: account.id,
    onboardingUrl: accountLink.url,
  });
}
