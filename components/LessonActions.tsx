"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { LessonStatus } from "@/lib/types";

export function LessonActions({
  lessonId,
  initialStatus,
  nextHref,
}: {
  lessonId: string;
  initialStatus: LessonStatus;
  nextHref: string | null;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<LessonStatus>(initialStatus);
  const [saving, setSaving] = useState(false);

  async function update(next: LessonStatus) {
    setSaving(true);
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ lessonId, status: next }),
      });
      if (!res.ok) throw new Error("Failed to save");
      setStatus(next);
      router.refresh();
    } catch {
      // Keep UI usable even if the save fails.
      setStatus(next);
    } finally {
      setSaving(false);
    }
  }

  const completed = status === "completed";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        onClick={() => update(completed ? "reading" : "completed")}
        disabled={saving}
        className={
          completed
            ? "rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300 hover:bg-emerald-500/20 disabled:opacity-50"
            : "rounded-lg bg-aws-orange px-4 py-2 text-sm font-semibold text-aws-squid hover:brightness-110 disabled:opacity-50"
        }
      >
        {saving ? "Saving…" : completed ? "✓ Completed" : "Mark as complete"}
      </button>
      {nextHref && (
        <a
          href={nextHref}
          className="rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-white hover:bg-white/5"
        >
          Next lesson →
        </a>
      )}
    </div>
  );
}
