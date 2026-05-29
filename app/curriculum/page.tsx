import Link from "next/link";
import { CURRICULUM } from "@/lib/curriculum";
import { peekProfileId } from "@/lib/profile";
import { getLessonProgress } from "@/lib/progress";

export const dynamic = "force-dynamic";

export default async function CurriculumPage() {
  const profileId = await peekProfileId();
  const progress = profileId ? await getLessonProgress(profileId) : [];
  const statusByLesson = new Map(progress.map((p) => [p.lesson_id, p.status]));

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-white">Curriculum</h1>
        <p className="mt-1 text-slate-400">
          Five domains, {CURRICULUM.reduce((n, d) => n + d.lessons.length, 0)} lessons. Work top to bottom for full coverage.
        </p>
      </header>

      <div className="space-y-6">
        {CURRICULUM.map((d) => {
          const done = d.lessons.filter((l) => statusByLesson.get(l.id) === "completed").length;
          return (
            <section key={d.id} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Domain {d.number} · {d.weight}% of exam
                  </span>
                  <h2 className="text-lg font-semibold text-white">
                    <Link href={`/curriculum/${d.id}`} className="hover:text-aws-orange">
                      {d.title}
                    </Link>
                  </h2>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-300">
                    {done}/{d.lessons.length} done
                  </div>
                  <div className="mt-1 h-1.5 w-32 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full bg-aws-orange"
                      style={{ width: `${(done / d.lessons.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <p className="mt-3 text-sm text-slate-400">{d.summary}</p>

              <ul className="mt-4 divide-y divide-white/5">
                {d.lessons.map((l) => {
                  const status = statusByLesson.get(l.id) ?? "unread";
                  return (
                    <li key={l.id}>
                      <Link
                        href={`/curriculum/${d.id}/${l.id}`}
                        className="flex items-center justify-between gap-3 py-3 hover:text-aws-orange"
                      >
                        <span className="flex items-center gap-3">
                          <StatusDot status={status} />
                          <span className="text-sm text-slate-200">{l.title}</span>
                        </span>
                        <span className="shrink-0 text-xs text-slate-500">{l.minutes} min</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-4 flex gap-3">
                <Link
                  href={`/quiz/${d.id}`}
                  className="rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-white hover:bg-white/5"
                >
                  Quiz this domain
                </Link>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function StatusDot({ status }: { status: string }) {
  const cls =
    status === "completed"
      ? "bg-emerald-400"
      : status === "reading"
        ? "bg-amber-400"
        : "bg-slate-600";
  return <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${cls}`} aria-hidden />;
}
