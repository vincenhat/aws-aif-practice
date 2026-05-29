import { d1Run, d1Select, newId } from "@/lib/d1";
import type { LessonProgress, LessonStatus, QuizAttempt } from "@/lib/types";

/** Upsert a lesson's progress status for a profile. */
export async function setLessonStatus(
  profileId: string,
  lessonId: string,
  status: LessonStatus,
): Promise<void> {
  const now = new Date().toISOString();
  await d1Run(
    `INSERT INTO lesson_progress (profile_id, lesson_id, status, updated_at)
     VALUES (?, ?, ?, ?)
     ON CONFLICT(profile_id, lesson_id)
     DO UPDATE SET status = excluded.status, updated_at = excluded.updated_at`,
    [profileId, lessonId, status, now],
  );
}

export async function getLessonProgress(profileId: string): Promise<LessonProgress[]> {
  return d1Select<LessonProgress>(
    "SELECT lesson_id, status, updated_at FROM lesson_progress WHERE profile_id = ?",
    [profileId],
  );
}

export interface RecordAttemptInput {
  profileId: string;
  mode: "domain" | "lesson" | "mock";
  scopeId: string | null;
  total: number;
  correct: number;
  durationSec?: number | null;
  detail: Array<{ questionId: string; chosen: number[]; correct: number[]; isCorrect: boolean }>;
}

const PASS_THRESHOLD = 70;

export async function recordAttempt(input: RecordAttemptInput): Promise<QuizAttempt> {
  const id = newId();
  const scorePct = input.total > 0 ? (input.correct / input.total) * 100 : 0;
  const passed = scorePct >= PASS_THRESHOLD ? 1 : 0;
  const now = new Date().toISOString();
  const detailJson = JSON.stringify(input.detail);

  await d1Run(
    `INSERT INTO quiz_attempts
       (id, profile_id, mode, scope_id, total, correct, score_pct, passed, duration_sec, detail, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      input.profileId,
      input.mode,
      input.scopeId,
      input.total,
      input.correct,
      scorePct,
      passed,
      input.durationSec ?? null,
      detailJson,
      now,
    ],
  );

  // Update per-question rollups.
  for (const d of input.detail) {
    await d1Run(
      `INSERT INTO question_stats (profile_id, question_id, seen, correct, last_seen)
       VALUES (?, ?, 1, ?, ?)
       ON CONFLICT(profile_id, question_id)
       DO UPDATE SET seen = seen + 1,
                     correct = correct + ?,
                     last_seen = excluded.last_seen`,
      [input.profileId, d.questionId, d.isCorrect ? 1 : 0, now, d.isCorrect ? 1 : 0],
    );
  }

  return {
    id,
    profile_id: input.profileId,
    mode: input.mode,
    scope_id: input.scopeId,
    total: input.total,
    correct: input.correct,
    score_pct: scorePct,
    passed,
    duration_sec: input.durationSec ?? null,
    detail: detailJson,
    created_at: now,
  };
}

export async function getAttempts(profileId: string, limit = 50): Promise<QuizAttempt[]> {
  return d1Select<QuizAttempt>(
    `SELECT * FROM quiz_attempts WHERE profile_id = ? ORDER BY created_at DESC LIMIT ?`,
    [profileId, limit],
  );
}

export interface QuestionStat {
  question_id: string;
  seen: number;
  correct: number;
  last_seen: string | null;
}

export async function getQuestionStats(profileId: string): Promise<QuestionStat[]> {
  return d1Select<QuestionStat>(
    "SELECT question_id, seen, correct, last_seen FROM question_stats WHERE profile_id = ?",
    [profileId],
  );
}

export { PASS_THRESHOLD };
