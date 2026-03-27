"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      style={{
        marginTop: "20px",
        backgroundColor: "#111111",
        color: "#ffffff",
        fontWeight: 700,
        padding: "10px 18px",
        borderRadius: "999px",
        border: "none",
        cursor: "pointer",
      }}
    >
      Print
    </button>
  );
}
