import Link from "next/link";
import { notFound } from "next/navigation";
import { CURRICULUM, getDomain } from "@/lib/curriculum";
import { questionsForDomain, setsForDomain } from "@/lib/questions";
import { peekProfileId } from "@/lib/profile";
import { getLessonProgress } from "@/lib/progress";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return CURRICULUM.map((d) => ({ domainId: d.id }));
}

export default async function DomainPage({
  params,
}: {
  params: Promise<{ domainId: string }>;
}) {
  const { domainId } = await params;
  const domain = getDomain(domainId);
  if (!domain) notFound();

  const profileId = await peekProfileId();
  const progress = profileId ? await getLessonProgress(profileId) : [];
  const statusByLesson = new Map(progress.map((p) => [p.lesson_id, p.status]));
  const qCount = questionsForDomain(domain.id).length;
  const setCount = setsForDomain(domain.id).length;

  return (
    <div className="space-y-8">
      <nav className="text-sm text-slate-400">
        <Link href="/curriculum" className="hover:text-white">
          Curriculum
        </Link>{" "}
        / <span className="text-slate-300">Domain {domain.number}</span>
      </nav>

      <header className="rounded-2xl border border-white/10 bg-gradient-to-br from-aws-squid to-slate-950 p-6">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Domain {domain.number}
          </span>
          <span className="rounded-full bg-aws-orange/15 px-2.5 py-0.5 text-xs font-semibold text-aws-orange">
            {domain.weight}% of exam
          </span>
        </div>
        <h1 className="mt-2 text-2xl font-bold text-white">{domain.title}</h1>
        <p className="mt-2 max-w-3xl text-slate-300">{domain.summary}</p>
        <div className="mt-4">
          <Link
            href={`/quiz/${domain.id}`}
            className="inline-block rounded-lg bg-aws-orange px-4 py-2 text-sm font-semibold text-aws-squid hover:brightness-110"
          >
            Take domain quizzes ({setCount} sets · {qCount} questions)
          </Link>
        </div>
      </header>

      <ul className="space-y-3">
        {domain.lessons.map((l, i) => {
          const status = statusByLesson.get(l.id) ?? "unread";
          return (
            <li key={l.id}>
              <Link
                href={`/curriculum/${domain.id}/${l.id}`}
                className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-aws-orange/40 hover:bg-white/[0.07]"
              >
                <div className="flex gap-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-black/30 text-sm font-semibold text-slate-300">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-white">{l.title}</h3>
                    <p className="mt-0.5 text-sm text-slate-400">{l.objective}</p>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span className="text-xs text-slate-500">{l.minutes} min</span>
                  <StatusBadge status={status} />
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === "completed")
    return <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs text-emerald-400">Completed</span>;
  if (status === "reading")
    return <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-xs text-amber-400">Reading</span>;
  return <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-slate-500">Unread</span>;
}
