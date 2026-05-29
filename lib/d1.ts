/**
 * Cloudflare D1 client over the HTTP REST API.
 *
 * Why REST instead of bindings: this app deploys on Vercel, not Cloudflare
 * Workers, so we can't use the native D1 binding. The REST API works from any
 * Node or Edge runtime.
 *
 * Docs: https://developers.cloudflare.com/api/operations/cloudflare-d1-query-database
 */

type D1Result<T = Record<string, unknown>> = {
  results: T[];
  success: boolean;
  meta: {
    duration: number;
    rows_read: number;
    rows_written: number;
    last_row_id?: number;
    changes?: number;
  };
};

type D1Response<T = Record<string, unknown>> = {
  success: boolean;
  errors: Array<{ code: number; message: string }>;
  messages: Array<{ code: number; message: string }>;
  result: D1Result<T>[];
};

function getEnv(): { accountId: string; databaseId: string; token: string } {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const databaseId = process.env.CLOUDFLARE_D1_DATABASE_ID;
  const token = process.env.CLOUDFLARE_API_TOKEN;
  if (!accountId || !databaseId || !token) {
    throw new Error(
      "Cloudflare D1 env vars missing (CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_D1_DATABASE_ID, CLOUDFLARE_API_TOKEN).",
    );
  }
  return { accountId, databaseId, token };
}

/**
 * Execute a parameterized SQL statement. Use `?` placeholders.
 * Returns rows for SELECTs, or an empty array for write statements.
 */
export async function d1Query<T = Record<string, unknown>>(
  sql: string,
  params: unknown[] = [],
): Promise<D1Result<T>> {
  const { accountId, databaseId, token } = getEnv();
  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ sql, params }),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`D1 HTTP ${res.status}: ${text || res.statusText}`);
  }

  const json = (await res.json()) as D1Response<T>;
  if (!json.success || !json.result?.[0]) {
    const msg = json.errors?.map((e) => e.message).join("; ") || "Unknown D1 error";
    throw new Error(`D1: ${msg}`);
  }
  return json.result[0];
}

/** Convenience: select rows. */
export async function d1Select<T = Record<string, unknown>>(
  sql: string,
  params: unknown[] = [],
): Promise<T[]> {
  const r = await d1Query<T>(sql, params);
  return r.results ?? [];
}

/** Convenience: select one row or null. */
export async function d1First<T = Record<string, unknown>>(
  sql: string,
  params: unknown[] = [],
): Promise<T | null> {
  const rows = await d1Select<T>(sql, params);
  return rows[0] ?? null;
}

/** Convenience: write (INSERT/UPDATE/DELETE). */
export async function d1Run(sql: string, params: unknown[] = []): Promise<void> {
  await d1Query(sql, params);
}

/** Generate a stable id without external deps. */
export function newId(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  let n = 0n;
  for (const b of bytes) n = (n << 8n) | BigInt(b);
  return n.toString(36);
}
