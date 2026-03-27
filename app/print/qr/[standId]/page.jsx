import { getDatabase } from "../../../../lib/firebaseAdmin";
import PrintButton from "../PrintButton";

export const dynamic = "force-dynamic";

const PAY_QR_BASE_URL = "https://www.eggmapmobile.com/pay";

export default async function PrintQrPage({ params }) {
  const standId = params?.standId;

  if (!standId || typeof standId !== "string") {
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
    const snap = await db.ref(`stands/${standId}`).get();
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

  const standName = stand?.name || "EggMap Stand";
  const payUrl = `${PAY_QR_BASE_URL}/${encodeURIComponent(standId)}`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=700x700&data=${encodeURIComponent(
    payUrl
  )}`;

  return (
    <main style={styles.page}>
      <div style={styles.printArea}>
        <h1 style={styles.header}>Pay Here</h1>
        <p style={styles.standName}>{standName}</p>
        <img src={qrImageUrl} alt="EggMap QR Code" style={styles.qr} />
        <p style={styles.url}>{payUrl}</p>
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
  standName: {
    fontSize: "20px",
    fontWeight: 600,
    margin: "0 0 18px",
    color: "#333",
  },
  qr: {
    width: "320px",
    height: "320px",
    objectFit: "contain",
    border: "1px solid #eee",
    borderRadius: "12px",
    background: "#fff",
  },
  url: {
    marginTop: "14px",
    fontSize: "12px",
    color: "#555",
    wordBreak: "break-all",
  },
  footer: {
    marginTop: "16px",
    fontSize: "28px",
    fontWeight: 700,
  },
};
