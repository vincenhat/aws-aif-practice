import { CURRICULUM } from "@/lib/curriculum";
import { QUESTIONS, questionsForDomain, sampleQuestions, TOTAL_QUESTIONS } from "@/lib/questions";
import { toClientQuestion } from "@/lib/client-question";
import { ExamRunner } from "@/components/ExamRunner";
import type { Question } from "@/lib/types";

export const dynamic = "force-dynamic";

/**
 * Build a mock exam that mirrors the official domain weighting as closely as
 * the question bank allows. We target ~ the exam weights; if a domain lacks
 * enough questions we take all it has. Questions are shuffled.
 */
function buildExam(): Question[] {
  // Target up to 65 like the real exam, capped by what we have.
  const target = Math.min(65, TOTAL_QUESTIONS);
  const picked: Question[] = [];

  for (const d of CURRICULUM) {
    const pool = questionsForDomain(d.id);
    const want = Math.round((d.weight / 100) * target);
    picked.push(...sampleQuestions(pool, want));
  }

  // Top up (or trim) to hit the target using any leftover questions.
  if (picked.length < target) {
    const ids = new Set(picked.map((q) => q.id));
    const leftovers = QUESTIONS.filter((q) => !ids.has(q.id));
    picked.push(...sampleQuestions(leftovers, target - picked.length));
  }

  return sampleQuestions(picked, picked.length); // final shuffle
}

export default function ExamPage() {
  const questions = buildExam().map(toClientQuestion);
  // 90 minutes for 65 Qs ≈ 83 sec/question; scale to our count.
  const minutes = Math.max(10, Math.round((questions.length / 65) * 90));

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-white/10 bg-gradient-to-br from-aws-squid to-slate-950 p-6">
        <h1 className="text-2xl font-bold text-white">Mock Exam</h1>
        <p className="mt-2 max-w-2xl text-slate-300">
          {questions.length} questions, weighted across the five domains, with a{" "}
          {minutes}-minute timer. Grading uses the real 70% passing bar. Explanations appear after you submit.
        </p>
      </header>

      <ExamRunner questions={questions} minutes={minutes} />
    </div>
  );
}
