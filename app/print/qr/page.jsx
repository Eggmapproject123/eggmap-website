import { redirect } from "next/navigation";

export default async function PrintQrPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const standId = resolvedSearchParams?.standId;

  if (standId && typeof standId === "string") {
    redirect(`/print/qr/${encodeURIComponent(standId)}`);
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Stand not found</h1>
        <p style={styles.text}>
          This print link is missing a stand ID. Please return to the app and
          try again.
        </p>
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    background: "#ffffff",
    color: "#111111",
    fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
  },
  card: {
    maxWidth: 520,
    textAlign: "center",
    border: "1px solid #e5e5e5",
    padding: "24px",
    borderRadius: "16px",
    background: "#fafafa",
  },
  title: {
    margin: 0,
    fontSize: "24px",
    fontWeight: 700,
  },
  text: {
    marginTop: "10px",
    fontSize: "15px",
    color: "#555",
  },
};
