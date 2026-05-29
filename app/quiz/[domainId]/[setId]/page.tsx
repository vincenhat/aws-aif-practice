import Link from "next/link";
import { notFound } from "next/navigation";
import { CURRICULUM, getDomain } from "@/lib/curriculum";
import { questionsForSet, setsForDomain } from "@/lib/questions";
import { toClientQuestion } from "@/lib/client-question";
import { QuizRunner } from "@/components/QuizRunner";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return CURRICULUM.flatMap((d) =>
    setsForDomain(d.id).map((set) => ({ domainId: d.id, setId: String(set) })),
  );
}

export default async function DomainSetQuizPage({
  params,
}: {
  params: Promise<{ domainId: string; setId: string }>;
}) {
  const { domainId, setId } = await params;
  const domain = getDomain(domainId);
  const set = Number(setId);
  if (!domain || !Number.isInteger(set)) notFound();

  const questions = questionsForSet(domain.id, set).map(toClientQuestion);
  if (questions.length === 0) notFound();

  return (
    <div className="space-y-6">
      <nav className="text-sm text-slate-400">
        <Link href="/quiz" className="hover:text-white">
          Quizzes
        </Link>{" "}
        /{" "}
        <Link href={`/quiz/${domain.id}`} className="hover:text-white">
          Domain {domain.number}
        </Link>{" "}
        / <span className="text-slate-300">Set {set}</span>
      </nav>
      <QuizRunner
        questions={questions}
        mode="domain"
        scopeId={domain.id}
        title={`${domain.title} — Set ${set}`}
      />
    </div>
  );
}
