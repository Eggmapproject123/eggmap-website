"use client";

import { useState, useEffect } from "react";

const LAUNCH_DATE = new Date("2026-03-15T09:00:00").getTime();

export default function HatchingPopup() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const handler = () => setPopupOpen(true);
    window.addEventListener("openHatchingPopup", handler);
    return () => window.removeEventListener("openHatchingPopup", handler);
  }, []);

  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const diff = LAUNCH_DATE - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleAddToCalendar = () => {
    const url =
      "https://www.google.com/calendar/render?action=TEMPLATE" +
      "&text=EggMap%20Launch" +
      "&dates=20260315T090000Z/20260315T100000Z" +
      "&details=EggMap%20is%20hatching!%20Come%20back%20and%20see%20all%20the%20local%20egg%20stands." +
      "&sf=true&output=xml";
    window.open(url, "_blank");
  };

  if (!popupOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2000,
      }}
      onClick={handleClosePopup}
    >
      <div
        style={{
          width: "520px",
          maxWidth: "95%",
          background: "#fffafc",
          borderRadius: "22px",
          padding: "28px 34px 32px",
          boxShadow: "0 12px 32px rgba(0,0,0,0.28)",
          position: "relative",
          textAlign: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close X */}
        <button
          onClick={handleClosePopup}
          style={{
            position: "absolute",
            top: "12px",
            right: "14px",
            border: "none",
            background: "transparent",
            fontSize: "24px",
            cursor: "pointer",
            lineHeight: 1,
          }}
        >
          ×
        </button>

        {/* TITLE */}
        <h2
          style={{
            fontFamily: "Fredoka, sans-serif",
            fontSize: "40px",
            marginBottom: "10px",
            marginTop: "4px",
            color: "#ffffffff",
            textShadow: `
              0 0 4px #ff00d0ff,
              0 0 8px #ff00c8ff,
              -3px -3px 0 #ff2ddc,
               3px -3px 0 #ff2ddc,
              -3px  3px 0 #ff2ddc,
               3px  3px 0 #ff00c3ff,
              0 0 14px #ff64e0,
              0 0 22px #ff64e0,
              0 0 32px #ff64e0
            `,
          }}
        >
          EggMap is hatching soon!
        </h2>

        {/* Launch line */}
        <p
          style={{
            marginTop: "2px",
            fontSize: "20px",
            fontWeight: "700",
            color: "#12e354",
            textShadow: "0 0 4px rgba(18,227,84,0.4)",
          }}
        >
          Launching March 15th – 2026!
        </p>

        {/* Green box: ONLY the 3 bullets */}
        <div
          style={{
            marginTop: "16px",
            textAlign: "left",
            fontSize: "16px",
            lineHeight: "1.32",
            color: "#003300",
            backgroundColor: "#e7ffcc",
            borderRadius: "14px",
            padding: "12px 16px",
            boxShadow: "0 0 6px rgba(0,0,0,0.05)",
          }}
        >
          <ul style={{ paddingLeft: "20px", margin: 0 }}>
            <li>See all local egg stands in your area</li>
            <li>Get instant directions</li>
            <li>Know if they are in or out of stock before driving</li>
          </ul>
        </div>

        {/* Standalone note (NOT inside green) */}
        <p
          style={{
            marginTop: "12px",
            textAlign: "left",
            fontSize: "14px",
            color: "#1a04c1ff",
          }}
        >
          EggMap hasn’t officially launched yet, but you can explore what the app will offer
          right here on the website.
        </p>

        {/* Red-outline "stop" box */}
        <div
          style={{
            marginTop: "12px",
            textAlign: "left",
            background: "#fffafc",
            borderRadius: "14px",
            padding: "12px 16px",
            border: "2px solid rgba(255, 0, 0, 1)",
            boxShadow: "0 0 6px rgba(0,0,0,0.04)",
          }}
        >
          <strong style={{ color: "#ff0000ff" }}>Unavailable until March 15, 2026:</strong>
          <ul style={{ paddingLeft: "18px", margin: "8px 0 0" }}>
            <li>Verified Farmer applications</li>
            <li>Online ordering & payments</li>
            <li>Account creation (may be available in January)</li>
          </ul>

          <p style={{ marginTop: "8px", marginBottom: 0 }}>
            The EggMap app is expected in the App Store around <strong>late January</strong>.
          </p>
        </div>

        {/* Countdown */}
        <div
          style={{
            marginTop: "22px",
            fontSize: "34px",
            fontWeight: "700",
            fontFamily: "Orbitron, sans-serif",
            color: "white",
            letterSpacing: "2px",
            textShadow: `
              -2px -2px 0 #0056ff,
               2px -2px 0 #0056ff,
              -2px  2px 0 #0056ff,
               2px  2px 0 #0056ff,
              0 0 12px #4dc4ff,
              0 0 22px #4dc4ff,
              0 0 36px #4dc4ff
            `,
          }}
        >
          {timeLeft.days}d · {timeLeft.hours}h · {timeLeft.minutes}m ·{" "}
          {timeLeft.seconds.toString().padStart(2, "0")}s
        </div>

        {/* Calendar button */}
        <button
          onClick={handleAddToCalendar}
          style={{
            marginTop: "22px",
            padding: "12px 22px",
            borderRadius: "24px",
            border: "none",
            background: "#d24dff",
            color: "white",
            fontWeight: "700",
            fontSize: "16px",
            cursor: "pointer",
            boxShadow: "0 3px 8px rgba(0,0,0,0.25)",
          }}
        >
          Add launch to my calendar
        </button>
      </div>
    </div>
  );
} 