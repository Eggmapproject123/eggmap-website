import PaySuccessClient from "../../../components/PaySuccessClient";

export default function PaySuccessPage({ searchParams }) {
  const paymentIntentId =
    typeof searchParams?.payment_intent === "string"
      ? searchParams.payment_intent
      : "";
  const standId =
    typeof searchParams?.standId === "string" ? searchParams.standId : "";

  return (
    <PaySuccessClient
      paymentIntentId={paymentIntentId}
      standId={standId}
    />
  );
}
