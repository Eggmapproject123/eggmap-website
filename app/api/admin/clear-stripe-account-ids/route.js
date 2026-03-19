import { admin, getDatabase } from "../../../lib/firebaseAdmin";

export async function POST(request) {
  const authHeader = request.headers.get("authorization") || "";
  const tokenMatch = authHeader.match(/^Bearer\s+(.+)$/i);
  const idToken = tokenMatch ? tokenMatch[1] : null;

  if (!idToken) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    const db = getDatabase();
    const adminSnap = await db.ref(`admins/${decoded.uid}`).get();
    if (!adminSnap.exists() || adminSnap.val() !== true) {
      return Response.json({ error: "Forbidden." }, { status: 403 });
    }

    const standsSnap = await db.ref("stands").get();
    const stands = standsSnap.val() || {};
    const updates = {};
    const standIds = [];

    for (const [standId, stand] of Object.entries(stands)) {
      if (stand && stand.stripeAccountId) {
        updates[`stands/${standId}/stripeAccountId`] = null;
        standIds.push(standId);
      }
    }

    if (standIds.length > 0) {
      await db.ref().update(updates);
    }

    return Response.json({
      updatedCount: standIds.length,
      standIds,
    });
  } catch (err) {
    console.error("Clear stripeAccountId failed.", err);
    return Response.json(
      { error: "Failed to clear stripeAccountId fields." },
      { status: 500 }
    );
  }
}
