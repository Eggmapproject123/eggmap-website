export default function PayCancelPage() {
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
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <section
          style={{
            background: "#ffffff",
            padding: "26px",
            borderRadius: "16px",
            boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "24px" }}>Payment Canceled</h1>
          <p style={{ marginTop: "12px", color: "#3e6b64" }}>
            Your payment was canceled. You can return to the stand and try
            again.
          </p>
          <a
            href="/"
            style={{
              display: "inline-block",
              marginTop: "16px",
              padding: "10px 18px",
              borderRadius: "999px",
              background: "#07ffd6",
              color: "#004b46",
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
