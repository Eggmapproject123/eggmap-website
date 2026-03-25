import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getDatabase } from "../lib/firebaseAdmin.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");
const ENV_PATH = path.join(PROJECT_ROOT, ".env.local");

const parseEnvFile = (contents) => {
  const env = {};
  const lines = contents.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    let value = trimmed.slice(eqIndex + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (key && !(key in process.env)) {
      process.env[key] = value;
    }
    env[key] = value;
  }
  return env;
};

const loadEnv = () => {
  if (!fs.existsSync(ENV_PATH)) {
    throw new Error(`Missing .env.local at ${ENV_PATH}`);
  }
  const contents = fs.readFileSync(ENV_PATH, "utf8");
  parseEnvFile(contents);
};

const resetStandOwnership = async () => {
  loadEnv();
  const db = getDatabase();
  const standsRef = db.ref("stands");
  const snap = await standsRef.get();

  if (!snap.exists()) {
    console.log("No stands found. Nothing to update.");
    return { updated: 0 };
  }

  const stands = snap.val() || {};
  const updates = {};
  let updated = 0;

  for (const standId of Object.keys(stands)) {
    updates[`${standId}/ownerUid`] = null;
    updates[`${standId}/stripeAccountId`] = null;
    updates[`${standId}/stripeOnboardingComplete`] = false;
    updates[`${standId}/charges_enabled`] = false;
    updates[`${standId}/details_submitted`] = false;
    updates[`${standId}/ownershipStatus`] = "unowned";
    updated += 1;
  }

  if (updated === 0) {
    console.log("No stands to update.");
    return { updated: 0 };
  }

  await standsRef.update(updates);
  console.log(`Reset ownership + Stripe fields for ${updated} stand(s).`);
  return { updated };
};

try {
  await resetStandOwnership();
  process.exit(0);
} catch (err) {
  console.error("Reset failed:", err?.message || err);
  process.exit(1);
}
