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
        background:
          "linear-gradient(180deg, #f4fff7 0%, #f8fff7 18%, #f8f7ff 50%, #fff9ef 100%)",
        padding: "28px 16px 40px",
        color: "#15443b",
        fontFamily: "'Fredoka', sans-serif",
      }}
    >
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        <div
          style={{
            position: "relative",
            marginBottom: "22px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-16px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "86px",
              height: "86px",
              borderRadius: "999px",
              background:
                "radial-gradient(circle at 30% 30%, #d5ffe8 0%, #8df5a9 50%, #58d978 100%)",
              border: "4px solid #d8fff1",
              boxShadow:
                "0 10px 26px rgba(78, 205, 123, 0.35), 0 0 0 6px rgba(213,255,232,0.55)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
            }}
          >
            <div
              style={{
                fontSize: "40px",
                lineHeight: 1,
                color: "#ffffff",
                textShadow: "0 2px 6px rgba(0,0,0,0.18)",
              }}
            >
              ✓
            </div>
          </div>

          <section
            style={{
              background: "rgba(255,255,255,0.96)",
              padding: "72px 24px 26px",
              borderRadius: "32px",
              border: "3px solid #eadbff",
              boxShadow:
                "0 16px 34px rgba(149, 114, 255, 0.12), inset 0 1px 0 rgba(255,255,255,0.95)",
              marginBottom: "0",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: "0",
                background:
                  "linear-gradient(135deg, rgba(195,255,231,0.28) 0%, rgba(255,245,193,0.18) 50%, rgba(234,219,255,0.26) 100%)",
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative" }}>
              <h1
                style={{
                  margin: 0,
                  fontSize: "24px",
                  color: "#15b730",
                  textAlign: "center",
                  textShadow: "0 1px 0 rgba(255,255,255,0.9)",
                }}
              >
                Payment Successful
              </h1>

              <p
                style={{
                  marginTop: "14px",
                  marginBottom: 0,
                  color: "#198d45",
                  fontSize: "18px",
                  lineHeight: 1.4,
                  textAlign: "center",
                }}
              >
                Thank you for supporting local egg stands! Your payment has been
                received.
              </p>
            </div>
          </section>
        </div>

        <section
          style={{
            background: "rgba(255,255,255,0.96)",
            padding: "24px 22px 28px",
            borderRadius: "32px",
            border: "3px solid #dff6f2",
            boxShadow:
              "0 18px 36px rgba(129, 214, 203, 0.14), inset 0 1px 0 rgba(255,255,255,0.95)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: "0",
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.55) 0%, rgba(226,255,244,0.38) 40%, rgba(255,245,203,0.22) 100%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative" }}>
            <h2
              style={{
                margin: 0,
                fontSize: "23px",
                color: "#8d19ea",
                textShadow: "0 1px 0 rgba(255,255,255,0.9)",
              }}
            >
              Help the next customer out:
            </h2>

            <p
              style={{
                marginTop: "14px",
                marginBottom: "6px",
                fontWeight: 700,
                fontSize: "18px",
                lineHeight: 1.2,
                color: "#ff8500",
              }}
            >
              What egg types are still available here?
            </p>

            <p
              style={{
                marginTop: 0,
                marginBottom: "18px",
                color: "#228d4d",
                fontSize: "17px",
              }}
            >
              Tap all that still remain.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "14px",
                marginTop: "10px",
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
                      padding: "15px 16px",
                      borderRadius: "22px",
                      border: selected
                        ? "3px solid #64ddf4"
                        : "3px solid #d9ebe5",
                      background: selected
                        ? "linear-gradient(180deg, #dffff4 0%, #c7f1e1 100%)"
                        : "linear-gradient(180deg, #ffffff 0%, #f8fffb 100%)",
                      color: "#143dff",
                      fontSize: "22px",
                      fontWeight: 700,
                      cursor: "pointer",
                      boxShadow: selected
                        ? "0 8px 18px rgba(92, 220, 245, 0.22), inset 0 2px 0 rgba(255,255,255,0.9)"
                        : "0 6px 14px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)",
                      textShadow: "0 1px 0 rgba(255,255,255,0.65)",
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
                marginTop: "18px",
                padding: "16px 20px",
                borderRadius: "24px",
                border: "3px solid #ff8ef4",
                background: tookLastEggs
                  ? "linear-gradient(180deg, #de37c7 0%, #b91da2 100%)"
                  : "linear-gradient(180deg, #ff4ce8 0%, #ea30d7 100%)",
                color: "#ffffff",
                fontSize: "17px",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow:
                  "0 10px 20px rgba(234, 48, 215, 0.26), inset 0 2px 0 rgba(255,255,255,0.22)",
                textShadow: "0 1px 4px rgba(0,0,0,0.18)",
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
                marginTop: "16px",
                padding: "16px 20px",
                borderRadius: "24px",
                border: "3px solid #58d784",
                background:
                  !canSubmit || isSubmitting || submitState === "success"
                    ? "linear-gradient(180deg, #7ed099 0%, #47b768 100%)"
                    : "linear-gradient(180deg, #80f59a 0%, #37bd65 100%)",
                color: "#0f5f28",
                fontSize: "20px",
                fontWeight: 700,
                cursor:
                  !canSubmit || isSubmitting || submitState === "success"
                    ? "not-allowed"
                    : "pointer",
                opacity:
                  !canSubmit || isSubmitting || submitState === "success"
                    ? 0.72
                    : 1,
                boxShadow:
                  "0 12px 24px rgba(57,181,106,0.22), inset 0 2px 0 rgba(255,255,255,0.32)",
                textShadow: "0 1px 0 rgba(255,255,255,0.5)",
              }}
            >
              {isSubmitting ? "Submitting..." : "Submit update"}
            </button>

            {!initialPaymentIntentId || !standId ? (
              <p
                style={{
                  marginTop: "16px",
                  color: "#b33a3a",
                  fontWeight: 700,
                  fontSize: "16px",
                  textAlign: "center",
                }}
              >
                Missing checkout context. Stock update is unavailable for this
                page load.
              </p>
            ) : null}

            {message ? (
              <p
                style={{
                  marginTop: "16px",
                  color: submitState === "error" ? "#b33a3a" : "#1c8b4c",
                  fontWeight: 700,
                  fontSize: "17px",
                  textAlign: "center",
                }}
              >
                {message}
              </p>
            ) : null}

            <div style={{ textAlign: "center" }}>
              <a
                href="/"
                style={{
                  display: "inline-block",
                  marginTop: "20px",
                  padding: "12px 26px",
                  borderRadius: "999px",
                  background: "linear-gradient(180deg, #b91eff 0%, #8b09e8 100%)",
                  border: "3px solid #c566ff",
                  color: "#ffe94d",
                  fontWeight: 700,
                  fontSize: "18px",
                  textDecoration: "none",
                  boxShadow:
                    "0 10px 18px rgba(137, 9, 232, 0.22), inset 0 2px 0 rgba(255,255,255,0.18)",
                  textShadow: "0 1px 0 rgba(112, 0, 168, 0.28)",
                }}
              >
                Back to Home
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 
