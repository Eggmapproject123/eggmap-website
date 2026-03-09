import admin from "firebase-admin";

let cachedDb;
let cachedRtdb;

const initAdmin = (requireDatabaseUrl = false) => {
  if (admin.apps.length) {
    if (requireDatabaseUrl && !admin.app().options.databaseURL) {
      throw new Error("Missing FIREBASE_DATABASE_URL environment variable.");
    }
    return;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
    : undefined;
  const databaseURL = process.env.FIREBASE_DATABASE_URL;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error("Missing Firebase Admin environment variables.");
  }

  if (requireDatabaseUrl && !databaseURL) {
    throw new Error("Missing FIREBASE_DATABASE_URL environment variable.");
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
    ...(databaseURL ? { databaseURL } : {}),
  });
};

const getDb = () => {
  initAdmin();
  if (!cachedDb) {
    cachedDb = admin.firestore();
  }
  return cachedDb;
};

const getDatabase = () => {
  initAdmin(true);
  if (!cachedRtdb) {
    cachedRtdb = admin.database();
  }
  return cachedRtdb;
};

export { admin, getDb, getDatabase };
