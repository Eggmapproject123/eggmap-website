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

  const typeButtonStyles = {
    Chicken: {
      border: "3px solid #71d7f7",
      background: "linear-gradient(180deg, #c9f6ff 0%, #baf0ff 48%, #a4e7ff 100%)",
      boxShadow:
        "0 8px 18px rgba(91, 206, 255, 0.22), inset 0 2px 0 rgba(255,255,255,0.92)",
      color: "#1d37d8",
    },
    Duck: {
      border: "3px solid #7de7e1",
      background: "linear-gradient(180deg, #d5fffb 0%, #c4fbf4 48%, #b2f1ea 100%)",
      boxShadow:
        "0 8px 18px rgba(97, 224, 214, 0.2), inset 0 2px 0 rgba(255,255,255,0.92)",
      color: "#2442d9",
    },
    Goose: {
      border: "3px solid #93e2b2",
      background: "linear-gradient(180deg, #e8ffe7 0%, #daf9d2 48%, #ccf0bf 100%)",
      boxShadow:
        "0 8px 18px rgba(123, 213, 140, 0.18), inset 0 2px 0 rgba(255,255,255,0.92)",
      color: "#243ed4",
    },
    Quail: {
      border: "3px solid #f0d27d",
      background: "linear-gradient(180deg, #fff7d8 0%, #fff0bf 48%, #fee6a0 100%)",
      boxShadow:
        "0 8px 18px rgba(240, 197, 93, 0.18), inset 0 2px 0 rgba(255,255,255,0.92)",
      color: "#7d28d7",
    },
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `
          radial-gradient(circle at 12% 18%, rgba(255,255,255,0.95) 0 2px, transparent 3px),
          radial-gradient(circle at 88% 12%, rgba(255,255,255,0.9) 0 2px, transparent 3px),
          radial-gradient(circle at 18% 52%, rgba(255,245,186,0.85) 0 2px, transparent 3px),
          radial-gradient(circle at 82% 64%, rgba(255,255,255,0.9) 0 2px, transparent 3px),
          radial-gradient(circle at 30% 78%, rgba(214,245,255,0.9) 0 2px, transparent 3px),
          radial-gradient(circle at 70% 84%, rgba(255,255,255,0.92) 0 2px, transparent 3px),
          linear-gradient(135deg, #eefde9 0%, #f9f6ff 32%, #fff9df 68%, #edfef6 100%)
        `,
        backgroundColor: "#f5fff7",
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
              width: "43px",
              height: "43px",
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
                fontSize: "35px",
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
              padding: "42px 24px 18px",
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
            background: "rgba(255,255,255,0.94)",
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
              background: `
                radial-gradient(circle at 10% 14%, rgba(255,255,255,0.9) 0 2px, transparent 3px),
                radial-gradient(circle at 90% 18%, rgba(255,255,255,0.88) 0 2px, transparent 3px),
                radial-gradient(circle at 14% 82%, rgba(255,242,186,0.9) 0 2px, transparent 3px),
                radial-gradient(circle at 86% 76%, rgba(214,245,255,0.85) 0 2px, transparent 3px),
                linear-gradient(145deg, rgba(255,255,255,0.58) 0%, rgba(226,255,244,0.34) 40%, rgba(255,245,203,0.2) 100%)
              `,
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative" }}>
            <h2
              style={{
                margin: 0,
                fontSize: "25px",
                color: "#aa00ff",
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
                color: "#007bff",
              }}
            >
              What egg types are still available here?
            </p>

            <p
              style={{
                marginTop: 0,
                marginBottom: "18px",
                color: "#0044ff",
                fontSize: "19px",
              }}
            >
              Tap all that still remain.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "14px",
                fontSize: "16px",
                marginTop: "10px",
              }}
            >
              {EGG_TYPES.map((type) => {
                const selected = selectedTypes.includes(type) && !tookLastEggs;
                const typeStyle = typeButtonStyles[type];

                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleType(type)}
                    style={{
                      padding: "9px 16px",
                      borderRadius: "22px",
                      border: typeStyle.border,
                      background: typeStyle.background,
                      filter: selected ? "brightness(0.82)" : "brightness(1)",
transition: "filter 120ms ease, transform 120ms ease, box-shadow 120ms ease",

                      color: typeStyle.color,
                      fontSize: "22px",
                      fontWeight: 700,
                      cursor: "pointer",
                      boxShadow: selected
                        ? `${typeStyle.boxShadow}, 0 0 0 3px rgba(255,255,255,0.78)`
                        : "0 6px 14px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)",
                      textShadow: "0 1px 0 rgba(255,255,255,0.7)",
                      opacity: tookLastEggs ? 0.72 : 1,
                      transform: selected ? "translateY(-1px)" : "none",
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
                  ? "linear-gradient(180deg, #af2a9e 0%, #831372 100%)"
                  : "linear-gradient(180deg, #ff4ce8 0%, #ea30d7 100%)",
                color: "#ffffff",
                fontSize: "17px",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow:
                  "0 10px 20px rgba(156, 0, 164, 0.78), inset 0 2px 0 rgba(255,255,255,0.22)",
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
