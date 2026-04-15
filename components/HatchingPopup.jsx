"use client";

import { useState, useEffect } from "react";
export function CheckoutConfirmPopup({ onConfirm }) {
  const [open, setOpen] = useState(true);
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) return null;

  const buttonShadow = pressed
    ? "0 6px 14px rgba(255, 120, 40, 0.35)"
    : hovered
    ? "0 14px 26px rgba(255, 120, 40, 0.5)"
    : "0 12px 22px rgba(255, 120, 40, 0.45)";
  const buttonTransform = pressed
    ? "translateY(2px) scale(0.98)"
    : hovered
    ? "translateY(-1px) scale(1.01)"
    : "translateY(0)";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(30, 16, 48, 0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 3000,
        backdropFilter: "blur(2px)",
        touchAction: "none",
      }}
    >
      <div
        style={{
          width: "560px",
          maxWidth: "92%",
          borderRadius: "28px",
          padding: "28px 30px 30px",
          textAlign: "center",
          background:
            "linear-gradient(145deg, #cbb3ff 0%, #e4ccff 45%, #f8e9ff 100%)",
          boxShadow:
            "0 18px 36px rgba(77, 39, 128, 0.35), inset 0 2px 0 rgba(255,255,255,0.7)",
          border: "2px solid rgba(255,255,255,0.6)",
        }}
      >
        <div
          style={{
            fontSize: "28px",
            fontWeight: 700,
            color: "#4b2378",
            marginBottom: "10px",
          }}
        >
          🥚 Quick check!
        </div>
        <p
          style={{
            margin: 0,
            fontSize: "16px",
            color: "#3a225c",
            lineHeight: 1.5,
          }}
        >
          Please make sure the items you are purchasing are currently available
          before paying.
        </p>

        <button
          type="button"
          onClick={() => {
            setOpen(false);
            if (typeof onConfirm === "function") onConfirm();
          }}
          onMouseDown={() => setPressed(true)}
          onMouseUp={() => setPressed(false)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => {
            setHovered(false);
            setPressed(false);
          }}
          onTouchStart={() => setPressed(true)}
          onTouchEnd={() => setPressed(false)}
          style={{
            marginTop: "20px",
            padding: "12px 28px",
            borderRadius: "999px",
            border: "none",
            color: "#ffffff",
            fontSize: "16px",
            fontWeight: 700,
            cursor: "pointer",
            background:
              "radial-gradient(circle at 50% 45%, #ffb347 0%, #ff8c00 45%, #ff5a00 70%, #ff2d2d 100%)",
            boxShadow: buttonShadow,
            transform: buttonTransform,
            transition: "transform 120ms ease, box-shadow 120ms ease",
          }}
        >
          I Confirm
        </button>
      </div>
    </div>
  );
}

export default function HatchingPopup() {
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const handler = () => setPopupOpen(true);
    window.addEventListener("openHatchingPopup", handler);
    return () => window.removeEventListener("openHatchingPopup", handler);
  }, []);

  const handleClosePopup = () => {
    setPopupOpen(false);
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
          Launching in April – 2026!
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
          <strong
            style={{
              color: "#ff0000ff",
              display: "block",
              textAlign: "center",
              marginBottom: "8px",
            }}
          >
            The App is under review by Apple! it will be out very soon - apologies for the delay!
          </strong>
          <ul style={{ paddingLeft: "18px", margin: "8px 0 0" }}>
           
          </ul>

          <p style={{ marginTop: "8px", marginBottom: 0 }}>
          </p>
        </div>
      </div>
    </div>
  );
} 
