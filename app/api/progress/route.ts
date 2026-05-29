import { NextRequest, NextResponse } from "next/server";
import { getLesson } from "@/lib/curriculum";
import { getOrCreateProfileId } from "@/lib/profile";
import { setLessonStatus } from "@/lib/progress";
import type { LessonStatus } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VALID: LessonStatus[] = ["unread", "reading", "completed"];

export async function POST(req: NextRequest) {
  let body: { lessonId?: string; status?: LessonStatus };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { lessonId, status } = body;
  if (!lessonId || !getLesson(lessonId)) {
    return NextResponse.json({ error: "Unknown lessonId" }, { status: 400 });
  }
  if (!status || !VALID.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  try {
    const profileId = await getOrCreateProfileId();
    await setLessonStatus(profileId, lessonId, status);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("progress save failed:", e);
    return NextResponse.json({ error: "Save failed" }, { status: 500 });
  }
}
