import { getDatabase } from "../../../../lib/firebaseAdmin";

export async function GET(request, { params }) {
  const resolvedParams = await params;
  const standId = Array.isArray(resolvedParams?.standId)
    ? resolvedParams.standId[0]
    : resolvedParams?.standId;

  if (!standId) {
    return Response.json({ error: "Missing standId" }, { status: 400 });
  }

  try {
    const db = getDatabase();
    const snapshot = await db.ref(`stands/${standId}`).get();

    if (!snapshot.exists()) {
      return Response.json({ error: "Stand not found" }, { status: 404 });
    }

    const stand = snapshot.val();
    const name = stand?.name || stand?.standName || stand?.title || "";
    const products = Array.isArray(stand?.storeConfig?.products)
      ? stand.storeConfig.products
      : stand?.storeConfig?.products
      ? [stand.storeConfig.products]
      : [];

    return Response.json({ id: standId, name, products });
  } catch (error) {
    console.error("Failed to load stand data:", error);
    return Response.json({ error: "Failed to load stand data" }, { status: 500 });
  }
}
