"use client";

import { useState } from "react";

export default function StandPage({ params }) {
  const { standId } = params;
  const [showOtherItems, setShowOtherItems] = useState(false);
  const [quantities, setQuantities] = useState({});

  const eggItems = [
    {
      name: "Chicken Eggs",
      variants: [
        { label: "Dozen", price: 5 },
        { label: "Half Dozen", price: 3 },
      ],
    },
    {
      name: "Duck Eggs",
      variants: [{ label: "Dozen", price: 7 }],
    },
    {
      name: "Quail Eggs",
      variants: [{ label: "Dozen", price: 6 }],
    },
    {
      name: "Goose Eggs",
      variants: [{ label: "Dozen", price: 8 }],
    },
  ];

  const otherItems = [
    { name: "Bread", price: 7.5 },
    { name: "Cake Pops", price: 7 },
    { name: "Maple Syrup", price: 12 },
  ];

  const eggVariantItems = eggItems.flatMap((item) =>
    item.variants.map((variant) => ({
      id: `${item.name}__${variant.label}`,
      name: item.name,
      variant: variant.label,
      price: variant.price,
    }))
  );

  const otherFlatItems = otherItems.map((item) => ({
    id: item.name,
    name: item.name,
    variant: null,
    price: item.price,
  }));

  const allItems = [...eggVariantItems, ...otherFlatItems];

  const adjustQuantity = (id, delta) => {
    setQuantities((prev) => {
      const next = { ...prev };
      const current = next[id] || 0;
      const updated = Math.max(0, current + delta);

      if (updated === 0) {
        delete next[id];
      } else {
        next[id] = updated;
      }

      return next;
    });
  };

  const formatPrice = (value) => {
    if (Number.isInteger(value)) return `$${value}`;
    return `$${value.toFixed(2)}`;
  };

  const cartItems = allItems
    .filter((item) => (quantities[item.id] || 0) > 0)
    .map((item) => ({
      ...item,
      qty: quantities[item.id],
    }));

  const subtotalCents = cartItems.reduce(
    (sum, item) => sum + Math.round(item.price * 100) * item.qty,
    0
  );
  const platformFeeCents =
    subtotalCents > 0 ? Math.round(subtotalCents * 0.029 + 15) : 0;
  const totalCents = subtotalCents + platformFeeCents;

  const handleCheckout = () => {
    const cartPayload = cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      variantLabel: item.variant || null,
      unitPriceCents: Math.round(item.price * 100),
      qty: item.qty,
    }));

    sessionStorage.setItem("eggmap_cart", JSON.stringify(cartPayload));
    sessionStorage.setItem("eggmap_stand_id", standId);
    window.location.href = "/pay";
  };

  const quantityButtonStyle = {
    width: "28px",
    height: "28px",
    borderRadius: "8px",
    border: "1px solid #cceae1",
    background: "#ffffff",
    color: "#0f3a35",
    fontWeight: 700,
    cursor: "pointer",
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
            {eggVariantItems.map((item) => {
              const qty = quantities[item.id] || 0;

              return (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 14px",
                    background: "#eafff7",
                    borderRadius: "12px",
                    gap: "12px",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600 }}>{item.name}</div>
                    <div style={{ color: "#1c5e57", fontSize: "14px" }}>
                      {item.variant} - {formatPrice(item.price)}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => adjustQuantity(item.id, -1)}
                      disabled={qty === 0}
                      style={{
                        ...quantityButtonStyle,
                        opacity: qty === 0 ? 0.5 : 1,
                        cursor: qty === 0 ? "not-allowed" : "pointer",
                      }}
                    >
                      -
                    </button>
                    <span style={{ minWidth: "20px", textAlign: "center" }}>
                      {qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => adjustQuantity(item.id, 1)}
                      style={quantityButtonStyle}
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
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
                {otherFlatItems.map((item) => {
                  const qty = quantities[item.id] || 0;

                  return (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px 12px",
                        background: "#f3fffb",
                        borderRadius: "12px",
                        gap: "12px",
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600 }}>{item.name}</div>
                        <div style={{ color: "#1c5e57", fontSize: "14px" }}>
                          {formatPrice(item.price)}
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => adjustQuantity(item.id, -1)}
                          disabled={qty === 0}
                          style={{
                            ...quantityButtonStyle,
                            opacity: qty === 0 ? 0.5 : 1,
                            cursor: qty === 0 ? "not-allowed" : "pointer",
                          }}
                        >
                          -
                        </button>
                        <span style={{ minWidth: "20px", textAlign: "center" }}>
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => adjustQuantity(item.id, 1)}
                          style={quantityButtonStyle}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        <section
          style={{
            background: "#ffffff",
            padding: "22px",
            borderRadius: "16px",
            boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
            marginBottom: "24px",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "20px" }}>Cart</h2>
          {cartItems.length === 0 ? (
            <p style={{ marginTop: "10px", color: "#3e6b64" }}>
              No items selected yet.
            </p>
          ) : (
            <div style={{ marginTop: "12px", display: "grid", gap: "8px" }}>
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-cart`}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: 600,
                  }}
                >
                  <span>
                    {item.name}
                    {item.variant ? ` (${item.variant})` : ""} x{item.qty}
                  </span>
                  <span>{formatPrice(item.price * item.qty)}</span>
                </div>
              ))}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderTop: "1px solid #e1f2ec",
                  paddingTop: "10px",
                  marginTop: "6px",
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

        <button
          type="button"
          onClick={handleCheckout}
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
          Checkout • ${(totalCents / 100).toFixed(2)}
        </button>
      </div>
    </div>
  );
}
