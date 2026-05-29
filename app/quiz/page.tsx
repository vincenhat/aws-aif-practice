import Link from "next/link";
import { CURRICULUM } from "@/lib/curriculum";
import { questionsForDomain } from "@/lib/questions";

export default function QuizIndexPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-white">Practice quizzes</h1>
        <p className="mt-1 text-slate-400">
          Pick a domain to drill, with instant explanations after grading. For a full timed run, take a{" "}
          <Link href="/exam" className="text-sky-400 hover:underline">
            mock exam
          </Link>
          .
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {CURRICULUM.map((d) => {
          const count = questionsForDomain(d.id).length;
          return (
            <Link
              key={d.id}
              href={`/quiz/${d.id}`}
              className="group rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-aws-orange/50 hover:bg-white/[0.07]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Domain {d.number} · {d.weight}%
                </span>
                <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-slate-300">
                  {count} questions
                </span>
              </div>
              <h2 className="mt-2 font-semibold text-white group-hover:text-aws-orange">{d.title}</h2>
              <p className="mt-1.5 text-sm text-slate-400 line-clamp-2">{d.summary}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
