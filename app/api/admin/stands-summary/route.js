import { admin, getDatabase } from "../../../../lib/firebaseAdmin";

const getAuth = async (request) => {
  const secret =
    process.env.ADMIN_READ_SECRET || process.env.ADMIN_RESET_SECRET || "";
  const headerSecret = request.headers.get("x-admin-secret") || "";

  if (secret && headerSecret && headerSecret === secret) {
    return { ok: true, method: "secret" };
  }

  const authHeader = request.headers.get("authorization") || "";
  const tokenMatch = authHeader.match(/^Bearer\\s+(.+)$/i);
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

const increment = (obj, key) => {
  obj[key] = (obj[key] || 0) + 1;
};

export async function GET(request) {
  const auth = await getAuth(request);
  if (!auth.ok) {
    return Response.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const db = getDatabase();
    const standsRef = db.ref("stands");
    const standsSnap = await standsRef.get();

    if (!standsSnap.exists()) {
      return Response.json({
        totalStands: 0,
        message: "No stands found.",
      });
    }

    const stands = standsSnap.val() || {};
    const fieldCounts = {};
    const ownershipStatusCounts = {};

    let totalStands = 0;
    let ownerUidCount = 0;
    let ownerEmailCount = 0;
    let ownershipStatusCount = 0;
    let ownerUidMissingEmail = 0;
    let ownerEmailMissingUid = 0;

    let stripeAccountIdCount = 0;
    let stripeOnboardingCompleteTrue = 0;
    let stripeOnboardingCompleteFalse = 0;
    let chargesEnabledTrue = 0;
    let chargesEnabledFalse = 0;
    let detailsSubmittedTrue = 0;
    let detailsSubmittedFalse = 0;

    let goldenSaleCount = 0;
    let goldenSaleTrue = 0;
    let goldenSaleHistoryCount = 0;

    for (const [standId, stand] of Object.entries(stands)) {
      if (!stand || typeof stand !== "object") continue;
      totalStands += 1;

      for (const key of Object.keys(stand)) {
        increment(fieldCounts, key);
      }

      if (stand.ownerUid) ownerUidCount += 1;
      if (stand.ownerEmail) ownerEmailCount += 1;
      if (stand.ownershipStatus != null) {
        ownershipStatusCount += 1;
        increment(ownershipStatusCounts, String(stand.ownershipStatus));
      }

      if (stand.ownerUid && !stand.ownerEmail) ownerUidMissingEmail += 1;
      if (!stand.ownerUid && stand.ownerEmail) ownerEmailMissingUid += 1;

      if (stand.stripeAccountId) stripeAccountIdCount += 1;
      if (stand.stripeOnboardingComplete === true)
        stripeOnboardingCompleteTrue += 1;
      if (stand.stripeOnboardingComplete === false)
        stripeOnboardingCompleteFalse += 1;
      if (stand.charges_enabled === true) chargesEnabledTrue += 1;
      if (stand.charges_enabled === false) chargesEnabledFalse += 1;
      if (stand.details_submitted === true) detailsSubmittedTrue += 1;
      if (stand.details_submitted === false) detailsSubmittedFalse += 1;

      if (stand.goldenSale != null) {
        goldenSaleCount += 1;
        if (stand.goldenSale === true) goldenSaleTrue += 1;
      }
      if (stand.goldenSaleHistory != null) goldenSaleHistoryCount += 1;
    }

    return Response.json({
      totalStands,
      authMethod: auth.method,
      fields: fieldCounts,
      ownership: {
        ownerUidCount,
        ownerEmailCount,
        ownershipStatusCount,
        ownershipStatusCounts,
        ownerUidMissingEmail,
        ownerEmailMissingUid,
      },
      stripe: {
        stripeAccountIdCount,
        stripeOnboardingCompleteTrue,
        stripeOnboardingCompleteFalse,
        chargesEnabledTrue,
        chargesEnabledFalse,
        detailsSubmittedTrue,
        detailsSubmittedFalse,
      },
      sales: {
        goldenSaleCount,
        goldenSaleTrue,
        goldenSaleHistoryCount,
      },
    });
  } catch (err) {
    console.error("stands summary failed", err);
    return Response.json(
      { error: "Failed to read stands summary." },
      { status: 500 }
    );
  }
}
