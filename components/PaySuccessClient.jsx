"use client";

import { useEffect, useMemo, useState } from "react";

const EGG_TYPES = ["Chicken", "Duck", "Goose", "Quail"];

export default function PaySuccessClient({
  paymentIntentId: initialPaymentIntentId = "",
  standId: initialStandId = "",
}) {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [tookLastEggs, setTookLastEggs] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState("idle");
  const [message, setMessage] = useState("");
  const [standId, setStandId] = useState(initialStandId);

  useEffect(() => {
    if (initialStandId) {
      setStandId(initialStandId);
      return;
    }

    const storedStandId =
      typeof window !== "undefined"
        ? sessionStorage.getItem("eggmap_stand_id") || ""
        : "";

    if (storedStandId) {
      setStandId(storedStandId);
    }
  }, [initialStandId]);

  const canSubmit = useMemo(() => {
    if (!initialPaymentIntentId || !standId) return false;
    if (tookLastEggs) return true;
    return selectedTypes.length > 0;
  }, [initialPaymentIntentId, standId, tookLastEggs, selectedTypes]);

  const toggleType = (type) => {
    setTookLastEggs(false);
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type]
    );
  };

  const handleLastEggs = () => {
    setSelectedTypes([]);
    setTookLastEggs((prev) => !prev);
  };

  const handleSubmit = async () => {
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitState("idle");
    setMessage("");

    try {
      const response = await fetch("/api/checkout-stock-update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentIntentId: initialPaymentIntentId,
          standId,
          tookLastEggs,
          remainingTypes: tookLastEggs ? [] : selectedTypes,
        }),
      });

     let data = null;
const rawBody = await response.text();

if (rawBody) {
  try {
    data = JSON.parse(rawBody);
  } catch (parseError) {
    data = null;
  }
}

if (!response.ok) {
  throw new Error(
    data?.error || rawBody || "Failed to submit stock update."
  );
} 


      setSubmitState("success");
      setMessage("Thank you. The stock update was submitted.");
    } catch (err) {
      setSubmitState("error");
      setMessage(err?.message || "Failed to submit stock update.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        <section
          style={{
            background: "#ffffff",
            padding: "26px",
            borderRadius: "16px",
            boxShadow: "0 10px 24px rgba(98, 0, 255, 0.08)",
            marginBottom: "20px",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "24px", color: "#00bc03" }}>Payment Successful</h1>

          <p style={{ marginTop: "12px", color: "#129745" }}>
            Thank you for supporting local egg stands! Your payment has been
            received.
          </p>
        </section>

        <section
          style={{
            background: "#ffffff",
            padding: "26px",
            borderRadius: "16px",
            boxShadow: "0 10px 24px rgba(0, 21, 255, 0.08)",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "22px", color: "#9000dd" }}>

            Help the next customer out:
          </h2>

          <p style={{ marginTop: "12px", marginBottom: "6px", fontWeight: 700, fontSize: "19px", color: "#ff7b00" }}>
            What egg types are still available here?
          </p>

          <p style={{ marginTop: 0, color: "#178626" }}>
            Tap all that still remain.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "12px",
              marginTop: "18px",
            }}
          >
            {EGG_TYPES.map((type) => {
              const selected = selectedTypes.includes(type) && !tookLastEggs;

              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleType(type)}
                  style={{
                    padding: "14px 16px",
                    borderRadius: "14px",
                    border: selected ? "2px solid #43ddf1" : "2px solid #d7ece3",
                    background: selected ? "#dff7eb" : "#ffffff",
                    color: "#002fff",
                    fontSize: "20px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {type}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleLastEggs}
            style={{
              width: "100%",
              marginTop: "16px",
              padding: "14px 18px",
              borderRadius: "14px",
              border: "none",
              background: tookLastEggs ? "#d20000" : "#ff37b2",
              color: "#faa6e9",
              fontSize: "18px",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 8px 18px rgba(198,40,40,0.18)",
            }}
          >
            I took the last ones/this stand is out of eggs
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit || isSubmitting || submitState === "success"}
            style={{
              width: "100%",
              marginTop: "14px",
              padding: "14px 18px",
              borderRadius: "14px",
              border: "none",
              background: "#39b56a",
              color: "#007122",
              fontSize: "20px",
              fontWeight: 700,
              cursor:
                !canSubmit || isSubmitting || submitState === "success"
                  ? "not-allowed"
                  : "pointer",
              opacity:
                !canSubmit || isSubmitting || submitState === "success" ? 0.65 : 1,
              boxShadow: "0 10px 22px rgba(57,181,106,0.22)",
            }}
          >
            {isSubmitting ? "Submitting..." : "Submit update"}
          </button>

          {!initialPaymentIntentId || !standId ? (
            <p style={{ marginTop: "14px", color: "#b33a3a", fontWeight: 600 }}>
              Missing checkout context. Stock update is unavailable for this page load.
            </p>
          ) : null}

          {message ? (
            <p
              style={{
                marginTop: "14px",
                color: submitState === "error" ? "#b33a3a" : "#2d7d57",
                fontWeight: 600,
              }}
            >
              {message}
            </p>
          ) : null}

          <a
            href="/"
            style={{
              display: "inline-block",
              marginTop: "18px",
              padding: "10px 18px",
              borderRadius: "999px",
              background: "#ac07ff",
              color: "#ffe346",
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 6px 14px rgba(0,0,0,0.12)",
            }}
          >
            Back to Home
          </a>
        </section>
      </div>
    </div>
  );
}
