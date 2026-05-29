import { cookies } from "next/headers";
import { d1First, d1Run, newId } from "@/lib/d1";

const COOKIE = "aif_profile";

/**
 * Lightweight profile model: a random id stored in an httpOnly cookie. No
 * passwords — this is a personal study tool. Ensures a `profiles` row exists.
 */
export async function getOrCreateProfileId(): Promise<string> {
  const jar = await cookies();
  let id = jar.get(COOKIE)?.value;

  if (id) {
    // Make sure the row still exists (DB could have been reset).
    const row = await d1First<{ id: string }>("SELECT id FROM profiles WHERE id = ?", [id]);
    if (row) return id;
  }

  id = newId();
  await d1Run("INSERT INTO profiles (id, name, created_at) VALUES (?, ?, ?)", [
    id,
    "Learner",
    new Date().toISOString(),
  ]);

  jar.set(COOKIE, id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  return id;
}

/** Read-only: returns the current profile id or null without creating one. */
export async function peekProfileId(): Promise<string | null> {
  const jar = await cookies();
  return jar.get(COOKIE)?.value ?? null;
}
