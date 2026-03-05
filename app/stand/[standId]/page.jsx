"use client";

import { useState } from "react";

export default function StandPage({ params }) {
  const { standId } = params;
  const [showOtherItems, setShowOtherItems] = useState(false);

  const eggItems = [
    { name: "Chicken Eggs", price: "$5", unit: "dozen" },
    { name: "Duck Eggs", price: "$7", unit: "dozen" },
    { name: "Quail Eggs", price: "$6", unit: "dozen" },
    { name: "Goose Eggs", price: "$8", unit: "dozen" },
  ];

  const otherItems = [
    { name: "Bread", price: "$7.50" },
    { name: "Cake Pops", price: "$7" },
    { name: "Maple Syrup", price: "$12" },
  ];

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
        <div style={{ marginBottom: "18px" }}>
          <div style={{ fontSize: "14px", color: "#4a6f6a" }}>Stand</div>
          <div style={{ fontSize: "22px", fontWeight: 600 }}>{standId}</div>
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
          <h2 style={{ margin: 0, fontSize: "20px" }}>Eggs</h2>
          <div style={{ marginTop: "14px", display: "grid", gap: "12px" }}>
            {eggItems.map((item) => (
              <div
                key={item.name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 14px",
                  background: "#eafff7",
                  borderRadius: "12px",
                }}
              >
                <span style={{ fontWeight: 600 }}>{item.name}</span>
                <span style={{ color: "#1c5e57" }}>
                  {item.price} / {item.unit}
                </span>
              </div>
            ))}
          </div>
        </section>

        {otherItems.length > 0 && (
          <section
            style={{
              background: "#ffffff",
              padding: "22px",
              borderRadius: "16px",
              boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
              marginBottom: "24px",
            }}
          >
            <h2 style={{ margin: 0, fontSize: "20px" }}>Other Items</h2>
            <p style={{ margin: "10px 0 14px", color: "#3e6b64" }}>
              This stand sells other items
            </p>
            <button
              type="button"
              onClick={() => setShowOtherItems((prev) => !prev)}
              style={{
                padding: "10px 16px",
                borderRadius: "999px",
                border: "none",
                background: "#07ffd6",
                color: "#004b46",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 6px 14px rgba(0,0,0,0.12)",
              }}
            >
              See other items
            </button>

            {showOtherItems && (
              <div style={{ marginTop: "16px", display: "grid", gap: "10px" }}>
                {otherItems.map((item) => (
                  <div
                    key={item.name}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px 12px",
                      background: "#f3fffb",
                      borderRadius: "12px",
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>{item.name}</span>
                    <span style={{ color: "#1c5e57" }}>{item.price}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        <button
          type="button"
          style={{
            width: "100%",
            padding: "14px 18px",
            borderRadius: "16px",
            border: "none",
            background: "#ffbf3a",
            color: "#5a3b00",
            fontSize: "18px",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
