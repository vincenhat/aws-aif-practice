import Link from "next/link";
import { CURRICULUM, TOTAL_LESSONS, getDomain } from "@/lib/curriculum";
import { peekProfileId } from "@/lib/profile";
import { getAttempts, getLessonProgress } from "@/lib/progress";
import type { QuizAttempt } from "@/lib/types";

export const dynamic = "force-dynamic";

function modeLabel(a: QuizAttempt): string {
  if (a.mode === "mock") return "Mock exam";
  if (a.mode === "domain") {
    const d = a.scope_id ? getDomain(a.scope_id) : undefined;
    return d ? `Quiz · ${d.title}` : "Domain quiz";
  }
  return "Lesson quiz";
}

export default async function ProgressPage() {
  const profileId = await peekProfileId();
  const attempts = profileId ? await getAttempts(profileId) : [];
  const lessonProgress = profileId ? await getLessonProgress(profileId) : [];

  const completedLessons = lessonProgress.filter((l) => l.status === "completed").length;

  // Best mock score and average domain scores.
  const mocks = attempts.filter((a) => a.mode === "mock");
  const bestMock = mocks.reduce((best, a) => Math.max(best, a.score_pct), 0);

  // Average score per domain from domain quizzes.
  const domainScores = new Map<string, { sum: number; n: number }>();
  for (const a of attempts) {
    if (a.mode === "domain" && a.scope_id) {
      const cur = domainScores.get(a.scope_id) ?? { sum: 0, n: 0 };
      cur.sum += a.score_pct;
      cur.n += 1;
      domainScores.set(a.scope_id, cur);
    }
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-white">Your progress</h1>
        <p className="mt-1 text-slate-400">
          Progress is tied to this browser. Attempts and lesson status are stored in Cloudflare D1.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryCard
          label="Lessons completed"
          value={`${completedLessons}/${TOTAL_LESSONS}`}
          pct={(completedLessons / TOTAL_LESSONS) * 100}
        />
        <SummaryCard label="Quiz attempts" value={String(attempts.length)} />
        <SummaryCard
          label="Best mock score"
          value={mocks.length ? `${Math.round(bestMock)}%` : "—"}
          pct={mocks.length ? bestMock : 0}
          good={bestMock >= 70}
        />
      </div>

      {/* Per-domain readiness */}
      <section>
        <h2 className="text-lg font-semibold text-white">Domain readiness</h2>
        <div className="mt-3 space-y-3">
          {CURRICULUM.map((d) => {
            const s = domainScores.get(d.id);
            const avg = s ? s.sum / s.n : null;
            return (
              <div key={d.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                      Domain {d.number} · {d.weight}%
                    </p>
                    <p className="font-medium text-white">{d.title}</p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-lg font-bold ${
                        avg == null ? "text-slate-500" : avg >= 70 ? "text-emerald-400" : "text-amber-400"
                      }`}
                    >
                      {avg == null ? "—" : `${Math.round(avg)}%`}
                    </p>
                    <p className="text-xs text-slate-500">{s ? `${s.n} attempt(s)` : "not attempted"}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                    <div
                      className={avg != null && avg >= 70 ? "h-full bg-emerald-400" : "h-full bg-amber-400"}
                      style={{ width: `${avg ?? 0}%` }}
                    />
                  </div>
                  <Link href={`/quiz/${d.id}`} className="shrink-0 text-xs text-sky-400 hover:underline">
                    {s ? "Retry" : "Start"} →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recent attempts */}
      <section>
        <h2 className="text-lg font-semibold text-white">Recent attempts</h2>
        {attempts.length === 0 ? (
          <p className="mt-3 rounded-xl border border-white/10 bg-white/5 p-6 text-sm text-slate-400">
            No attempts yet.{" "}
            <Link href="/quiz" className="text-sky-400 hover:underline">
              Take a quiz
            </Link>{" "}
            or{" "}
            <Link href="/exam" className="text-sky-400 hover:underline">
              a mock exam
            </Link>{" "}
            to start tracking.
          </p>
        ) : (
          <div className="mt-3 overflow-hidden rounded-xl border border-white/10">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-left text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-4 py-3">When</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3 text-right">Score</th>
                  <th className="px-4 py-3 text-right">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {attempts.map((a) => (
                  <tr key={a.id} className="text-slate-300">
                    <td className="px-4 py-3 text-slate-400">
                      {new Date(a.created_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">{modeLabel(a)}</td>
                    <td className="px-4 py-3 text-right font-medium text-white">
                      {a.correct}/{a.total} ({Math.round(a.score_pct)}%)
                    </td>
                    <td className="px-4 py-3 text-right">
                      {a.passed ? (
                        <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs text-emerald-400">
                          Pass
                        </span>
                      ) : (
                        <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-xs text-amber-400">
                          Below 70%
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  pct,
  good,
}: {
  label: string;
  value: string;
  pct?: number;
  good?: boolean;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${good ? "text-emerald-400" : "text-white"}`}>{value}</p>
      {pct != null && (
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div className="h-full bg-aws-orange" style={{ width: `${Math.min(100, pct)}%` }} />
        </div>
      )}
    </div>
  );
}
