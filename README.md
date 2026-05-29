# AWS AI Practitioner Prep (AIF-C01)

A study and practice web app for the **AWS Certified AI Practitioner (AIF-C01)** exam.
Read concise lessons across all five exam domains, drill with domain quizzes, and
take timed mock exams scored against the real 70% passing bar. Progress is saved
to **Cloudflare D1**.

## Stack

- **Next.js 15** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** for styling
- **Cloudflare D1** (serverless SQLite) over the HTTP REST API for storage
- Deployed on **Vercel**

Content (curriculum, lessons, question bank) is authored in code under `lib/`.
D1 stores dynamic per-learner state: lesson progress and quiz/exam attempts.

## Project layout

```
app/
  page.tsx                      # landing / overview
  curriculum/                   # domain + lesson browsing
  quiz/                         # domain quizzes
  exam/                         # timed mock exam
  progress/                     # attempt history + readiness
  api/grade/route.ts            # server-side grading (answer key stays server-side)
  api/progress/route.ts         # lesson status updates
components/                     # QuizRunner, ExamRunner, Markdown, LessonActions
lib/
  curriculum.ts                 # 5 domains, lessons (Markdown bodies)
  questions.ts                  # practice question bank
  d1.ts                         # Cloudflare D1 REST client
  progress.ts / profile.ts      # data access + cookie-based profile
schema.sql                      # D1 schema
scripts/
  apply-schema.mjs              # apply schema.sql to D1
  push-vercel-env.mjs           # push env vars to Vercel
```

## Local setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env.local` and fill in your Cloudflare values:
   ```
   CLOUDFLARE_ACCOUNT_ID=...
   CLOUDFLARE_D1_DATABASE_ID=...
   CLOUDFLARE_API_TOKEN=...      # token with Account > D1 > Edit
   ```
3. Create the D1 database (once) and apply the schema:
   ```bash
   npx wrangler d1 create aws-aif-prep
   npm run db:apply
   ```
4. Run the dev server:
   ```bash
   npm run dev
   ```

## Deploy (Vercel)

```bash
npm run env:push      # push CLOUDFLARE_* vars to Vercel (prod/preview/dev)
vercel --prod         # or push to the connected GitHub repo
```

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run db:apply` | Apply `schema.sql` to Cloudflare D1 |
| `npm run env:push` | Push env vars to Vercel |

## Disclaimer

Independent study tool. Practice questions are original and written to mirror exam
style; they are not real exam questions. Not affiliated with or endorsed by Amazon
Web Services.
