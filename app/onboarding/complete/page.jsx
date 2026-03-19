"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function OnboardingCompletePage() {
  const searchParams = useSearchParams();
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const standId = searchParams.get("standId");
    if (!standId) return;

    fetch(`/api/stripe-onboarding-status?standId=${encodeURIComponent(standId)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.complete) {
          setStatusMessage("Stripe setup complete. You can return to EggMap.");
        } else {
          setStatusMessage("Stripe setup is still in progress. You can reopen onboarding in the app.");
        }
      })
      .catch(() => {
        setStatusMessage("Stripe setup status could not be verified yet. You can retry in the app.");
      });
  }, [searchParams]);

  return (
    <main style={{
      minHeight: "100vh",
      background: "#ffffff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "32px 20px",
      fontFamily: "Arial, sans-serif",
      color: "#222",
      textAlign: "center",
    }}>
      <h1 style={{ fontSize: "28px", marginBottom: "10px" }}>Returning to EggMap…</h1>
      <p style={{ maxWidth: "420px", marginBottom: "18px" }}>
        This page will close once you return to the app.
      </p>
      <a
        href="eggmap://"
        style={{
          display: "inline-block",
          background: "#1e88e5",
          color: "#fff",
          textDecoration: "none",
          padding: "12px 20px",
          borderRadius: "12px",
          fontWeight: 700,
        }}
      >
        Back to App
      </a>
      <p style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
        If the app does not open, return to it manually.
      </p>
      {statusMessage && (
        <p style={{ marginTop: "16px", fontSize: "14px", color: "#444" }}>{statusMessage}</p>
      )}
    </main>
  );
}
