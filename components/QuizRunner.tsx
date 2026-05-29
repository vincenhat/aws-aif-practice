"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/** Question shape sent to the client (no answer key leaked until graded). */
export interface ClientQuestion {
  id: string;
  type: "single" | "multi";
  prompt: string;
  options: string[];
  domainId: string;
}

interface GradedItem {
  questionId: string;
  chosen: number[];
  correct: number[];
  isCorrect: boolean;
  explanation: string;
}

interface GradeResponse {
  total: number;
  correct: number;
  scorePct: number;
  passed: boolean;
  items: GradedItem[];
}

export function QuizRunner({
  questions,
  mode,
  scopeId,
  title,
  timed = false,
}: {
  questions: ClientQuestion[];
  mode: "domain" | "lesson" | "mock";
  scopeId: string | null;
  title: string;
  timed?: boolean;
}) {
  const [answers, setAnswers] = useState<Record<string, number[]>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<GradeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [startedAt] = useState(() => Date.now());
  const submittedRef = useRef(false);
  const hiddenSubmitRef = useRef<HTMLButtonElement>(null);

  const answeredCount = Object.values(answers).filter((a) => a.length > 0).length;
  const allAnswered = answeredCount === questions.length;

  const explanationById = useMemo(() => {
    const m = new Map<string, GradedItem>();
    result?.items.forEach((it) => m.set(it.questionId, it));
    return m;
  }, [result]);

  function toggle(q: ClientQuestion, optIdx: number) {
    if (result) return; // locked after grading
    setAnswers((prev) => {
      const cur = prev[q.id] ?? [];
      if (q.type === "single") return { ...prev, [q.id]: [optIdx] };
      // multi: toggle membership
      return {
        ...prev,
        [q.id]: cur.includes(optIdx) ? cur.filter((i) => i !== optIdx) : [...cur, optIdx],
      };
    });
  }

  const submit = useCallback(async () => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setSubmitting(true);
    setError(null);
    try {
      const durationSec = Math.round((Date.now() - startedAt) / 1000);
      const res = await fetch("/api/grade", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          mode,
          scopeId,
          durationSec,
          responses: questions.map((q) => ({ questionId: q.id, chosen: answers[q.id] ?? [] })),
        }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({})))?.error ?? "Grading failed");
      setResult(await res.json());
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      submittedRef.current = false;
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }, [answers, mode, scopeId, questions, startedAt]);

  // Allow a timed parent (ExamRunner) to force submit by clicking the hidden
  // button, even if not all questions are answered.
  useEffect(() => {
    if (!timed) return;
    const handler = () => {
      void submit();
    };
    const el = hiddenSubmitRef.current;
    el?.addEventListener("click", handler);
    return () => el?.removeEventListener("click", handler);
  }, [timed, submit]);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <p className="mt-1 text-sm text-slate-400">
            {questions.length} questions · multi-answer questions are marked.
          </p>
        </div>
        {!result && (
          <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
            {answeredCount}/{questions.length} answered
          </div>
        )}
      </header>

      {result && <ResultBanner result={result} />}

      <ol className="space-y-5">
        {questions.map((q, qi) => {
          const graded = explanationById.get(q.id);
          const chosen = graded?.chosen ?? answers[q.id] ?? [];
          return (
            <li key={q.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-start gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-black/30 text-sm font-semibold text-slate-300">
                  {qi + 1}
                </span>
                <div className="flex-1">
                  <p className="font-medium text-white">{q.prompt}</p>
                  {q.type === "multi" && (
                    <p className="mt-1 text-xs font-medium uppercase tracking-wide text-amber-400">
                      Choose all that apply
                    </p>
                  )}

                  <div className="mt-3 space-y-2">
                    {q.options.map((opt, oi) => {
                      const isChosen = chosen.includes(oi);
                      const isCorrect = graded?.correct.includes(oi);
                      let cls =
                        "flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 text-sm transition ";
                      if (graded) {
                        if (isCorrect) cls += "border-emerald-500/50 bg-emerald-500/10 text-emerald-200";
                        else if (isChosen) cls += "border-red-500/50 bg-red-500/10 text-red-200";
                        else cls += "border-white/10 text-slate-300";
                      } else {
                        cls += isChosen
                          ? "border-aws-orange/60 bg-aws-orange/10 text-white"
                          : "border-white/10 text-slate-300 hover:border-white/25 hover:bg-white/5";
                      }
                      return (
                        <label key={oi} className={cls}>
                          <input
                            type={q.type === "single" ? "radio" : "checkbox"}
                            name={q.id}
                            checked={isChosen}
                            onChange={() => toggle(q, oi)}
                            disabled={!!result}
                            className="accent-aws-orange"
                          />
                          <span>{opt}</span>
                          {graded && isCorrect && <span className="ml-auto text-emerald-400">✓</span>}
                          {graded && isChosen && !isCorrect && (
                            <span className="ml-auto text-red-400">✗</span>
                          )}
                        </label>
                      );
                    })}
                  </div>

                  {graded && (
                    <div
                      className={`mt-3 rounded-lg border p-3 text-sm ${
                        graded.isCorrect
                          ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-100"
                          : "border-amber-500/30 bg-amber-500/5 text-amber-100"
                      }`}
                    >
                      <span className="font-semibold">
                        {graded.isCorrect ? "Correct. " : "Review. "}
                      </span>
                      {graded.explanation}
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {error && (
        <p className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">{error}</p>
      )}

      {!result ? (
        <div className="flex items-center justify-between gap-3">
          {/* Hidden button the timed ExamRunner clicks to force-submit. */}
          <button ref={hiddenSubmitRef} data-grade-btn className="hidden" aria-hidden tabIndex={-1} />
          <p className="text-sm text-slate-400">
            {timed
              ? `${answeredCount}/${questions.length} answered — submit any time or when the timer ends.`
              : allAnswered
                ? "All answered. Ready to grade."
                : "Answer all questions to enable grading."}
          </p>
          <button
            onClick={() => void submit()}
            disabled={(!timed && !allAnswered) || submitting}
            className="rounded-lg bg-aws-orange px-6 py-2.5 font-semibold text-aws-squid hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {submitting ? "Grading…" : "Submit & grade"}
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-aws-orange px-5 py-2.5 font-semibold text-aws-squid hover:brightness-110"
          >
            Retake
          </button>
          <Link
            href="/progress"
            className="rounded-lg border border-white/15 px-5 py-2.5 font-semibold text-white hover:bg-white/5"
          >
            View progress
          </Link>
          <Link
            href="/curriculum"
            className="rounded-lg border border-white/15 px-5 py-2.5 font-semibold text-white hover:bg-white/5"
          >
            Back to curriculum
          </Link>
        </div>
      )}
    </div>
  );
}

function ResultBanner({ result }: { result: GradeResponse }) {
  const pct = Math.round(result.scorePct);
  return (
    <div
      className={`rounded-2xl border p-6 ${
        result.passed
          ? "border-emerald-500/40 bg-emerald-500/10"
          : "border-amber-500/40 bg-amber-500/10"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-300">Your score</p>
          <p className={`text-4xl font-bold ${result.passed ? "text-emerald-300" : "text-amber-300"}`}>
            {pct}%
          </p>
          <p className="mt-1 text-sm text-slate-300">
            {result.correct} of {result.total} correct ·{" "}
            {result.passed ? "Pass (≥70%)" : "Below passing (70%)"}
          </p>
        </div>
        <div className="text-5xl">{result.passed ? "🎉" : "📚"}</div>
      </div>
    </div>
  );
}
