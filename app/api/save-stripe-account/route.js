import { admin, getDatabase } from "../../../lib/firebaseAdmin";

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch (err) {
    return Response.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const standId = body?.standId;
  const stripeAccountId = body?.stripeAccountId;

  if (!standId || !stripeAccountId) {
    return Response.json(
      { error: "Missing standId or stripeAccountId." },
      { status: 400 }
    );
  }

  const authHeader = request.headers.get("authorization") || "";
  const tokenMatch = authHeader.match(/^Bearer\s+(.+)$/i);
  const idToken = tokenMatch ? tokenMatch[1] : null;

  if (!idToken) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    const db = getDatabase();
    const standRef = db.ref(`stands/${standId}`);
    const standSnap = await standRef.get();

    if (!standSnap.exists()) {
      return Response.json({ error: "Stand not found" }, { status: 404 });
    }

    const standData = standSnap.val();

    if (!standData?.ownerUid || standData.ownerUid !== decoded.uid) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    await standRef.update({ stripeAccountId });

    return Response.json({ success: true });
  } catch (err) {
    console.error("Failed to save Stripe account ID.", err);
    return Response.json(
      { error: "Failed to save stripeAccountId." },
      { status: 500 }
    );
  }
}
