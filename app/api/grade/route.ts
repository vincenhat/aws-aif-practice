import { NextRequest, NextResponse } from "next/server";
import { getQuestion } from "@/lib/questions";
import { getOrCreateProfileId } from "@/lib/profile";
import { recordAttempt } from "@/lib/progress";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface GradeBody {
  mode: "domain" | "lesson" | "mock";
  scopeId: string | null;
  durationSec?: number;
  responses: Array<{ questionId: string; chosen: number[] }>;
}

function sameSet(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false;
  const sa = [...a].sort((x, y) => x - y);
  const sb = [...b].sort((x, y) => x - y);
  return sa.every((v, i) => v === sb[i]);
}

export async function POST(req: NextRequest) {
  let body: GradeBody;
  try {
    body = (await req.json()) as GradeBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!Array.isArray(body.responses) || body.responses.length === 0) {
    return NextResponse.json({ error: "No responses provided" }, { status: 400 });
  }
  if (!["domain", "lesson", "mock"].includes(body.mode)) {
    return NextResponse.json({ error: "Invalid mode" }, { status: 400 });
  }

  const items = [];
  const detail = [];
  let correctCount = 0;

  for (const r of body.responses) {
    const q = getQuestion(r.questionId);
    if (!q) continue; // ignore unknown ids
    const chosen = Array.isArray(r.chosen) ? r.chosen : [];
    const isCorrect = sameSet(chosen, q.answer);
    if (isCorrect) correctCount++;

    items.push({
      questionId: q.id,
      chosen,
      correct: q.answer,
      isCorrect,
      explanation: q.explanation,
    });
    detail.push({ questionId: q.id, chosen, correct: q.answer, isCorrect });
  }

  const total = items.length;
  if (total === 0) {
    return NextResponse.json({ error: "No valid questions" }, { status: 400 });
  }

  const scorePct = (correctCount / total) * 100;
  const passed = scorePct >= 70;

  // Persist the attempt (best effort — don't fail the response if D1 hiccups).
  try {
    const profileId = await getOrCreateProfileId();
    await recordAttempt({
      profileId,
      mode: body.mode,
      scopeId: body.scopeId ?? null,
      total,
      correct: correctCount,
      durationSec: body.durationSec ?? null,
      detail,
    });
  } catch (e) {
    console.error("Failed to record attempt:", e);
  }

  return NextResponse.json({ total, correct: correctCount, scorePct, passed, items });
}
