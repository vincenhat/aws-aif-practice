import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "AWS AI Practitioner Prep",
  description:
    "Study and practice for the AWS Certified AI Practitioner (AIF-C01) exam: curriculum, lessons, quizzes, and full mock exams.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/80 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-aws-squid text-aws-orange">
                  AI
                </span>
                <span className="text-white">
                  AIF-C01 <span className="text-aws-orange">Prep</span>
                </span>
              </Link>
              <nav className="flex items-center gap-1 text-sm">
                <Link href="/curriculum" className="rounded-md px-3 py-1.5 text-slate-300 hover:bg-white/5 hover:text-white">
                  Curriculum
                </Link>
                <Link href="/quiz" className="rounded-md px-3 py-1.5 text-slate-300 hover:bg-white/5 hover:text-white">
                  Quiz
                </Link>
                <Link href="/exam" className="rounded-md px-3 py-1.5 text-slate-300 hover:bg-white/5 hover:text-white">
                  Mock Exam
                </Link>
                <Link href="/progress" className="rounded-md px-3 py-1.5 text-slate-300 hover:bg-white/5 hover:text-white">
                  Progress
                </Link>
              </nav>
            </div>
          </header>

          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</main>

          <footer className="border-t border-white/10 px-4 py-6 text-center text-xs text-slate-500">
            Independent study tool for AWS Certified AI Practitioner (AIF-C01). Not affiliated with Amazon Web Services.
          </footer>
        </div>
      </body>
    </html>
  );
}
