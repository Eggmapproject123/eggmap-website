import { admin, getDatabase } from "../../../../lib/firebaseAdmin";

const isAuthorized = async (request) => {
  const secret = process.env.ADMIN_RESET_SECRET || "";
  const headerSecret = request.headers.get("x-admin-secret") || "";

  if (secret && headerSecret && headerSecret === secret) {
    return { ok: true, method: "secret" };
  }

  const authHeader = request.headers.get("authorization") || "";
  const tokenMatch = authHeader.match(/^Bearer\s+(.+)$/i);
  const idToken = tokenMatch ? tokenMatch[1] : null;

  if (!idToken) {
    return { ok: false, status: 401, error: "Unauthorized." };
  }

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    const db = getDatabase();
    const adminSnap = await db.ref(`admins/${decoded.uid}`).get();
    if (!adminSnap.exists() || adminSnap.val() !== true) {
      return { ok: false, status: 403, error: "Forbidden." };
    }
    return { ok: true, method: "adminUid", uid: decoded.uid };
  } catch (err) {
    return { ok: false, status: 401, error: "Unauthorized." };
  }
};

export async function POST(request) {
  const auth = await isAuthorized(request);
  if (!auth.ok) {
    return Response.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const db = getDatabase();
    const standsRef = db.ref("stands");
    const standsSnap = await standsRef.get();

    if (!standsSnap.exists()) {
      return Response.json({
        updatedCount: 0,
        message: "No stands found.",
      });
    }

    const stands = standsSnap.val() || {};
    const updates = {};
    let updatedCount = 0;

    for (const standId of Object.keys(stands)) {
      updates[`${standId}/ownerUid`] = null;
      updates[`${standId}/stripeAccountId`] = null;
      updates[`${standId}/stripeOnboardingComplete`] = false;
      updates[`${standId}/charges_enabled`] = false;
      updates[`${standId}/details_submitted`] = false;
      updates[`${standId}/ownershipStatus`] = "unowned";
      updatedCount += 1;
    }

    if (updatedCount > 0) {
      await standsRef.update(updates);
    }

    return Response.json({
      updatedCount,
      method: auth.method,
      message: "Stand ownership + Stripe fields reset.",
    });
  } catch (err) {
    console.error("Reset stands failed.", err);
    return Response.json(
      { error: "Failed to reset stands." },
      { status: 500 }
    );
  }
}
