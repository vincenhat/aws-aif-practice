// Push env vars from .env.local to Vercel (production, preview, development).
// Re-runnable: removes any existing var of the same name in each env first.
//
// We use a temp file as stdin, since on Windows the Vercel CLI doesn't reliably
// read stdin from a piped string.

import { readFileSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const root = resolve(dirname(__filename), "..");

const KEYS = [
  "CLOUDFLARE_ACCOUNT_ID",
  "CLOUDFLARE_D1_DATABASE_ID",
  "CLOUDFLARE_API_TOKEN",
];
const TARGETS = ["production", "preview", "development"];

const envText = readFileSync(resolve(root, ".env.local"), "utf8");
const values = {};
for (const line of envText.split(/\r?\n/)) {
  const t = line.trim();
  if (!t || t.startsWith("#")) continue;
  const eq = t.indexOf("=");
  if (eq < 1) continue;
  values[t.slice(0, eq).trim()] = t.slice(eq + 1).trim();
}

const tmp = mkdtempSync(join(tmpdir(), "venv-"));
try {
  for (const key of KEYS) {
    const value = values[key];
    if (!value) {
      console.warn(`! skip ${key} (not set in .env.local)`);
      continue;
    }
    const file = join(tmp, key);
    writeFileSync(file, value, "utf8");

    for (const target of TARGETS) {
      // Remove existing first; ignore failures.
      spawnSync("vercel", ["env", "rm", key, target, "--yes"], {
        cwd: root,
        shell: true,
        stdio: "ignore",
      });

      const add = spawnSync(
        "vercel",
        ["env", "add", key, target, `< "${file}"`],
        {
          cwd: root,
          shell: true,
          stdio: ["ignore", "inherit", "inherit"],
        },
      );
      if (add.status !== 0) {
        console.error(`x ${key} -> ${target} failed`);
      } else {
        console.log(`ok ${key} -> ${target}`);
      }
    }
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
