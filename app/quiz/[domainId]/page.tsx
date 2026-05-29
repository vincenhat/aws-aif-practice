import Link from "next/link";
import { notFound } from "next/navigation";
import { CURRICULUM, getDomain } from "@/lib/curriculum";
import { questionsForDomain } from "@/lib/questions";
import { toClientQuestion } from "@/lib/client-question";
import { QuizRunner } from "@/components/QuizRunner";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return CURRICULUM.map((d) => ({ domainId: d.id }));
}

export default async function DomainQuizPage({
  params,
}: {
  params: Promise<{ domainId: string }>;
}) {
  const { domainId } = await params;
  const domain = getDomain(domainId);
  if (!domain) notFound();

  const questions = questionsForDomain(domain.id).map(toClientQuestion);

  if (questions.length === 0) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-white">{domain.title}</h1>
        <p className="text-slate-400">No questions available for this domain yet.</p>
        <Link href="/quiz" className="text-sky-400 hover:underline">
          ← Back to quizzes
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <nav className="text-sm text-slate-400">
        <Link href="/quiz" className="hover:text-white">
          Quizzes
        </Link>{" "}
        / <span className="text-slate-300">Domain {domain.number}</span>
      </nav>
      <QuizRunner
        questions={questions}
        mode="domain"
        scopeId={domain.id}
        title={`${domain.title} — Quiz`}
      />
    </div>
  );
}
