import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST() {
const account = await stripe.accounts.create({
    type: "express",
    country: "US",
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
  }); 

  const accountLink = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: "https://eggmap-website.vercel.app/reauth",
    return_url: "https://eggmap-website.vercel.app/onboarding-complete",
    type: "account_onboarding",
  });

  return Response.json({
    url: accountLink.url,
  });
}
