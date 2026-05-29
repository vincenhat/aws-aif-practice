"use client";

import { useEffect, useRef, useState } from "react";
import { QuizRunner, type ClientQuestion } from "@/components/QuizRunner";

/**
 * Mock-exam wrapper: shows a sticky countdown timer above the standard quiz.
 * When the timer hits zero it programmatically clicks the submit button so the
 * attempt is graded with whatever has been answered.
 */
export function ExamRunner({
  questions,
  minutes,
}: {
  questions: ClientQuestion[];
  minutes: number;
}) {
  const [remaining, setRemaining] = useState(minutes * 60);
  const [expired, setExpired] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (expired) return;
    if (remaining <= 0) {
      setExpired(true);
      // Find the grade button rendered by QuizRunner and click it.
      const btn = containerRef.current?.querySelector<HTMLButtonElement>("[data-grade-btn]");
      btn?.click();
      return;
    }
    const t = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [remaining, expired]);

  const mm = Math.floor(remaining / 60);
  const ss = remaining % 60;
  const low = remaining <= 60;

  return (
    <div ref={containerRef} className="space-y-4">
      <div
        className={`sticky top-16 z-20 flex items-center justify-between rounded-xl border px-4 py-3 backdrop-blur ${
          low
            ? "border-red-500/50 bg-red-500/10 text-red-200"
            : "border-white/10 bg-slate-950/80 text-slate-200"
        }`}
      >
        <span className="text-sm font-medium">Time remaining</span>
        <span className="font-mono text-lg font-bold tabular-nums">
          {String(mm).padStart(2, "0")}:{String(ss).padStart(2, "0")}
        </span>
      </div>

      <QuizRunner
        questions={questions}
        mode="mock"
        scopeId={null}
        title="AIF-C01 Mock Exam"
        timed
      />
    </div>
  );
}
