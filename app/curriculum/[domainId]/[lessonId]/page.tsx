import Link from "next/link";
import { notFound } from "next/navigation";
import { CURRICULUM, getDomain } from "@/lib/curriculum";
import { questionsForLesson } from "@/lib/questions";
import { Markdown } from "@/components/Markdown";
import { LessonActions } from "@/components/LessonActions";
import { peekProfileId } from "@/lib/profile";
import { getLessonProgress } from "@/lib/progress";
import type { LessonStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return CURRICULUM.flatMap((d) => d.lessons.map((l) => ({ domainId: d.id, lessonId: l.id })));
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ domainId: string; lessonId: string }>;
}) {
  const { domainId, lessonId } = await params;
  const domain = getDomain(domainId);
  const idx = domain?.lessons.findIndex((l) => l.id === lessonId) ?? -1;
  if (!domain || idx === -1) notFound();

  const lesson = domain.lessons[idx];

  // Read-only on the server: never mutate cookies during render (Next.js 15
  // throws if you do). The profile cookie is created lazily by the API routes
  // (/api/progress, /api/grade) on the first write. We mark the lesson as
  // "reading" from the client after mount via LessonActions.
  const profileId = await peekProfileId();
  const existing = profileId
    ? (await getLessonProgress(profileId)).find((p) => p.lesson_id === lessonId)
    : undefined;
  const status: LessonStatus = existing?.status ?? "unread";

  const next = domain.lessons[idx + 1];
  const nextHref = next ? `/curriculum/${domain.id}/${next.id}` : null;
  const relatedQuestions = questionsForLesson(lessonId).length;

  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <nav className="text-sm text-slate-400">
        <Link href="/curriculum" className="hover:text-white">
          Curriculum
        </Link>{" "}
        /{" "}
        <Link href={`/curriculum/${domain.id}`} className="hover:text-white">
          Domain {domain.number}
        </Link>{" "}
        / <span className="text-slate-300">Lesson {idx + 1}</span>
      </nav>

      <header>
        <p className="text-xs font-semibold uppercase tracking-wide text-aws-orange">
          {domain.title}
        </p>
        <h1 className="mt-1 text-2xl font-bold text-white">{lesson.title}</h1>
        <p className="mt-2 text-slate-400">{lesson.objective}</p>
        <p className="mt-1 text-xs text-slate-500">{lesson.minutes} min read</p>
      </header>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <Markdown source={lesson.body} />
      </div>

      {lesson.keyTerms.length > 0 && (
        <div className="rounded-xl border border-white/10 bg-black/20 p-5">
          <h2 className="text-sm font-semibold text-white">Key terms</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {lesson.keyTerms.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
        <LessonActions lessonId={lessonId} initialStatus={status} nextHref={nextHref} />
        {relatedQuestions > 0 && (
          <Link href={`/quiz/${domain.id}`} className="text-sm text-sky-400 hover:underline">
            Practice {domain.title} questions →
          </Link>
        )}
      </div>
    </article>
  );
}
