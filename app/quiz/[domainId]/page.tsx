import Link from "next/link";
import { notFound } from "next/navigation";
import { CURRICULUM, getDomain } from "@/lib/curriculum";
import { questionsForSet, setsForDomain } from "@/lib/questions";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return CURRICULUM.map((d) => ({ domainId: d.id }));
}

export default async function DomainQuizSetsPage({
  params,
}: {
  params: Promise<{ domainId: string }>;
}) {
  const { domainId } = await params;
  const domain = getDomain(domainId);
  if (!domain) notFound();

  const sets = setsForDomain(domain.id);

  return (
    <div className="space-y-6">
      <nav className="text-sm text-slate-400">
        <Link href="/quiz" className="hover:text-white">
          Quizzes
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
        <h1 className="mt-2 text-2xl font-bold text-white">{domain.title} — Quizzes</h1>
        <p className="mt-2 max-w-2xl text-slate-300">
          {sets.length} practice {sets.length === 1 ? "set" : "sets"}. Each set has fresh questions
          with explanations after grading. Scores from every set count toward this domain on your
          Progress page.
        </p>
      </header>

      {sets.length === 0 ? (
        <p className="rounded-xl border border-white/10 bg-white/5 p-6 text-sm text-slate-400">
          No questions available for this domain yet.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sets.map((set) => {
            const count = questionsForSet(domain.id, set).length;
            return (
              <Link
                key={set}
                href={`/quiz/${domain.id}/${set}`}
                className="group rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-aws-orange/50 hover:bg-white/[0.07]"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-aws-orange/15 font-bold text-aws-orange">
                    {set}
                  </span>
                  <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-slate-300">
                    {count} questions
                  </span>
                </div>
                <h2 className="mt-3 font-semibold text-white group-hover:text-aws-orange">
                  Practice Set {set}
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  {set === 1 ? "Core concepts" : set === 2 ? "More coverage" : "Extra practice"}
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
