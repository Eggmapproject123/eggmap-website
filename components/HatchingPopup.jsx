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
              "radial-gradient(circle at 50% 45%, #cb5a0e 0%, #ff5601 45%, #ff3c00 70%, #ff2d2d 100%)",
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
