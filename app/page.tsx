import Link from "next/link";
import { CURRICULUM, TOTAL_LESSONS } from "@/lib/curriculum";
import { TOTAL_QUESTIONS } from "@/lib/questions";

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-aws-squid to-slate-950 p-8 sm:p-12">
        <p className="text-sm font-medium uppercase tracking-widest text-aws-orange">
          AWS Certified AI Practitioner · AIF-C01
        </p>
        <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          Learn the concepts. Practice the questions. Pass the exam.
        </h1>
        <p className="mt-4 max-w-2xl text-slate-300">
          A focused study app covering all five exam domains with concise lessons,
          domain quizzes, and timed mock exams scored against the 70% passing bar.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/curriculum"
            className="rounded-lg bg-aws-orange px-5 py-2.5 font-semibold text-aws-squid hover:brightness-110"
          >
            Start learning
          </Link>
          <Link
            href="/exam"
            className="rounded-lg border border-white/20 px-5 py-2.5 font-semibold text-white hover:bg-white/5"
          >
            Take a mock exam
          </Link>
        </div>

        <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Stat label="Domains" value="5" />
          <Stat label="Lessons" value={String(TOTAL_LESSONS)} />
          <Stat label="Practice questions" value={String(TOTAL_QUESTIONS)} />
          <Stat label="Passing score" value="70%" />
        </dl>
      </section>

      {/* Exam facts */}
      <section>
        <h2 className="text-xl font-semibold text-white">Exam at a glance</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Fact title="Format" body="65 questions (50 scored), multiple choice & multiple response" />
          <Fact title="Time" body="90 minutes" />
          <Fact title="Cost" body="$100 USD" />
          <Fact title="Level" body="Foundational — no coding required" />
        </div>
      </section>

      {/* Domains */}
      <section>
        <div className="flex items-end justify-between">
          <h2 className="text-xl font-semibold text-white">The five domains</h2>
          <Link href="/curriculum" className="text-sm text-sky-400 hover:underline">
            View full curriculum →
          </Link>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {CURRICULUM.map((d) => (
            <Link
              key={d.id}
              href={`/curriculum/${d.id}`}
              className="group rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-aws-orange/50 hover:bg-white/[0.07]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Domain {d.number}
                </span>
                <span className="rounded-full bg-aws-orange/15 px-2.5 py-0.5 text-xs font-semibold text-aws-orange">
                  {d.weight}%
                </span>
              </div>
              <h3 className="mt-2 font-semibold text-white group-hover:text-aws-orange">
                {d.title}
              </h3>
              <p className="mt-1.5 text-sm text-slate-400 line-clamp-3">{d.summary}</p>
              <p className="mt-3 text-xs text-slate-500">{d.lessons.length} lessons</p>
            </Link>
          ))}
        </div>
      </section>

      {/* How to practice */}
      <section className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-white">How to practice</h2>
        <ol className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Step n={1} title="Read a domain" body="Work through the lessons in order, mark each complete." />
          <Step n={2} title="Quiz the domain" body="Take a domain quiz to check recall and see explanations." />
          <Step n={3} title="Find weak areas" body="The Progress page surfaces low-scoring domains and questions." />
          <Step n={4} title="Mock exam" body="Take a timed 65-question mock and aim for 80%+ before the real test." />
        </ol>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-black/20 p-4">
      <dd className="text-2xl font-bold text-aws-orange">{value}</dd>
      <dt className="text-xs text-slate-400">{label}</dt>
    </div>
  );
}

function Fact({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <h3 className="text-sm font-semibold text-aws-orange">{title}</h3>
      <p className="mt-1 text-sm text-slate-300">{body}</p>
    </div>
  );
}

function Step({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <li className="rounded-xl bg-black/20 p-4">
      <div className="grid h-7 w-7 place-items-center rounded-full bg-aws-orange text-sm font-bold text-aws-squid">
        {n}
      </div>
      <h3 className="mt-2 font-semibold text-white">{title}</h3>
      <p className="mt-1 text-sm text-slate-400">{body}</p>
    </li>
  );
}
