"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

function PaymentForm({ totalCents }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setIsSubmitting(true);
    setMessage("");

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/pay/success`,
      },
    });

    if (error) {
      setMessage(error.message || "Payment failed. Please try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: "16px" }}>
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || isSubmitting}
        style={{
          width: "100%",
          padding: "14px 18px",
          borderRadius: "16px",
          border: "none",
          background: "#ffbf3a",
          color: "#5a3b00",
          fontSize: "18px",
          fontWeight: 700,
          cursor: !stripe || isSubmitting ? "not-allowed" : "pointer",
          boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
          opacity: !stripe || isSubmitting ? 0.7 : 1,
        }}
      >
        Pay ${(totalCents / 100).toFixed(2)}
      </button>
      {message && (
        <div style={{ color: "#b33a3a", fontWeight: 600 }}>{message}</div>
      )}
    </form>
  );
}

export default function PayPage() {
  const [cartItems, setCartItems] = useState([]);
  const [clientSecret, setClientSecret] = useState("");
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [standId, setStandId] = useState("");

  useEffect(() => {
    const storedCart = sessionStorage.getItem("eggmap_cart");
    const storedStandId = sessionStorage.getItem("eggmap_stand_id");

    if (!storedCart) {
      setError("No cart found. Please return to the stand and add items.");
      setStatus("error");
      return;
    }

    try {
      const parsed = JSON.parse(storedCart);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        setError("Your cart is empty. Please return to the stand.");
        setStatus("error");
        return;
      }
      setCartItems(parsed);
      setStandId(storedStandId || "");
      setStatus("ready");
    } catch (parseError) {
      setError("Cart data is invalid. Please return to the stand.");
      setStatus("error");
    }
  }, []);

  const subtotalCents = cartItems.reduce(
    (sum, item) => sum + item.unitPriceCents * item.qty,
    0
  );
  const platformFeeCents =
    subtotalCents > 0 ? Math.round(subtotalCents * 0.029 + 15) : 0;
  const totalCents = subtotalCents + platformFeeCents;

  useEffect(() => {
    if (status !== "ready") return;

    const createIntent = async () => {
      try {
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: cartItems, standId }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to create payment intent.");
        }

        setClientSecret(data.clientSecret);
      } catch (err) {
        setError(err.message || "Failed to initialize payment.");
        setStatus("error");
      }
    };

    createIntent();
  }, [cartItems, standId, status]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7fff9",
        padding: "32px 20px 48px",
        color: "#0f3a35",
        fontFamily: "'Fredoka', sans-serif",
      }}
    >
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <div style={{ marginBottom: "18px" }}>
          <div style={{ fontSize: "14px", color: "#4a6f6a" }}>Checkout</div>
          <div style={{ fontSize: "22px", fontWeight: 600 }}>
            EggMap Payment
          </div>
        </div>

        <section
          style={{
            background: "#ffffff",
            padding: "22px",
            borderRadius: "16px",
            boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
            marginBottom: "24px",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "20px" }}>Order Summary</h2>
          {cartItems.length === 0 ? (
            <p style={{ marginTop: "12px", color: "#3e6b64" }}>
              Cart is empty.
            </p>
          ) : (
            <div style={{ marginTop: "12px", display: "grid", gap: "8px" }}>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: 600,
                  }}
                >
                  <span>
                    {item.name}
                    {item.variantLabel ? ` (${item.variantLabel})` : ""} x
                    {item.qty}
                  </span>
                  <span>
                    ${(item.unitPriceCents * item.qty / 100).toFixed(2)}
                  </span>
                </div>
              ))}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: 600,
                }}
              >
                <span>Eggs subtotal</span>
                <span>${(subtotalCents / 100).toFixed(2)}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: 600,
                }}
              >
                <span>Processing fee</span>
                <span>${(platformFeeCents / 100).toFixed(2)}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderTop: "1px solid #e1f2ec",
                  paddingTop: "10px",
                  marginTop: "6px",
                  fontWeight: 700,
                }}
              >
                <span>Total</span>
                <span>${(totalCents / 100).toFixed(2)}</span>
              </div>
            </div>
          )}
        </section>

        <section
          style={{
            background: "#ffffff",
            padding: "22px",
            borderRadius: "16px",
            boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
            marginBottom: "24px",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "20px" }}>Payment</h2>
          {error && (
            <p style={{ marginTop: "12px", color: "#b33a3a" }}>{error}</p>
          )}
          {!error && !clientSecret && (
            <p style={{ marginTop: "12px", color: "#3e6b64" }}>
              Preparing secure payment form...
            </p>
          )}
          {clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <div style={{ marginTop: "16px" }}>
                <PaymentForm totalCents={totalCents} />
              </div>
            </Elements>
          )}
        </section>
      </div>
    </div>
  );
}
