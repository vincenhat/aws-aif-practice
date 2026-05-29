// Apply schema.sql to Cloudflare D1 via REST API.
// Reads env from .env.local. Idempotent: schema uses CREATE TABLE IF NOT EXISTS.
// Usage: node scripts/apply-schema.mjs

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const root = resolve(dirname(__filename), "..");

// Tiny .env loader (only reads, doesn't expand). Skips lines without `=`.
function loadEnv(path) {
  const text = readFileSync(path, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq === -1) continue;
    const k = t.slice(0, eq).trim();
    const v = t.slice(eq + 1).trim();
    if (!(k in process.env)) process.env[k] = v;
  }
}

loadEnv(resolve(root, ".env.local"));

const { CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_D1_DATABASE_ID, CLOUDFLARE_API_TOKEN } = process.env;
if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_D1_DATABASE_ID || !CLOUDFLARE_API_TOKEN) {
  console.error("Missing CLOUDFLARE_ACCOUNT_ID / CLOUDFLARE_D1_DATABASE_ID / CLOUDFLARE_API_TOKEN");
  process.exit(1);
}

const sql = readFileSync(resolve(root, "schema.sql"), "utf8");
const url = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/d1/database/${CLOUDFLARE_D1_DATABASE_ID}/query`;

const res = await fetch(url, {
  method: "POST",
  headers: {
    authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
    "content-type": "application/json",
  },
  body: JSON.stringify({ sql }),
});

const json = await res.json();
if (!json.success) {
  console.error("D1 error:", JSON.stringify(json, null, 2));
  process.exit(1);
}
console.log("Schema applied. Statements run:", json.result.length);
for (const r of json.result) {
  console.log(`  ${r.success ? "OK" : "FAIL"} duration=${r.meta?.duration ?? "?"}ms`);
}
