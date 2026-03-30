import { getDatabase } from "../../../../lib/firebaseAdmin";
import PrintButton from "../PrintButton";

export const dynamic = "force-dynamic";

const PAY_QR_BASE_URL = "https://www.eggmapmobile.com/pay";

export default async function PrintQrPage({ params }) {
  const resolvedParams = await params;
  const standId = Array.isArray(resolvedParams?.standId)
    ? resolvedParams.standId[0]
    : resolvedParams?.standId;
  const normalizedStandId =
    typeof standId === "string" ? standId.trim() : "";

  if (
    !normalizedStandId ||
    normalizedStandId === "undefined" ||
    normalizedStandId === "null"
  ) {
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

  let stand = null;
  try {
    const db = getDatabase();
    const snap = await db.ref(`stands/${normalizedStandId}`).get();
    stand = snap.exists() ? snap.val() : null;
  } catch (err) {
    stand = null;
  }

  if (!stand) {
    return (
      <main style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>Stand not found</h1>
          <p style={styles.text}>
            The stand ID is invalid or the stand no longer exists. Please return
            to the app and try again.
          </p>
        </div>
      </main>
    );
  }

  const payUrl = `${PAY_QR_BASE_URL}/${encodeURIComponent(normalizedStandId)}`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=700x700&data=${encodeURIComponent(
    payUrl
  )}`;

  return (
    <main style={styles.page}>
      <div style={styles.printArea}>
        <h1 style={styles.header}>Pay Here</h1>
        <img src={qrImageUrl} alt="EggMap QR Code" style={styles.qr} />
        <p style={styles.footer}>With EggMap</p>
        <PrintButton />
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
  printArea: {
    width: "100%",
    maxWidth: "680px",
    textAlign: "center",
    border: "1px solid #e5e5e5",
    borderRadius: "20px",
    padding: "32px 24px 36px",
    background: "#ffffff",
  },
  header: {
    fontSize: "56px",
    margin: "0 0 8px",
    fontWeight: 800,
    lineHeight: 1.05,
  },
  qr: {
    width: "320px",
    height: "320px",
    objectFit: "contain",
    border: "1px solid #eee",
    borderRadius: "12px",
    background: "#fff",
  },
  footer: {
    marginTop: "16px",
    fontSize: "28px",
    fontWeight: 700,
  },
};
