import PaySuccessClient from "../../../components/PaySuccessClient";

export default async function PaySuccessPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;

  const paymentIntentId =
    typeof resolvedSearchParams?.payment_intent === "string"
      ? resolvedSearchParams.payment_intent
      : "";

  const standId =
    typeof resolvedSearchParams?.standId === "string"
      ? resolvedSearchParams.standId
      : "";

  return (
    <PaySuccessClient
      paymentIntentId={paymentIntentId}
      standId={standId}
    />
  );
}
