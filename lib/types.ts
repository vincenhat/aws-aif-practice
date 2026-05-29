/** Shared domain types for the AWS AIF-C01 practice app. */

export type DomainId =
  | "d1-ai-ml-fundamentals"
  | "d2-generative-ai"
  | "d3-foundation-models"
  | "d4-responsible-ai"
  | "d5-security-governance";

export interface Domain {
  id: DomainId;
  /** Exam domain number, 1..5 */
  number: number;
  title: string;
  /** Official exam weighting, e.g. 28 (%) */
  weight: number;
  summary: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  /** ~1 line objective shown in lists */
  objective: string;
  /** Estimated read time in minutes */
  minutes: number;
  /** Markdown body */
  body: string;
  /** Key terms reinforced in this lesson */
  keyTerms: string[];
}

export interface Question {
  id: string;
  domainId: DomainId;
  /** Optional lesson this question maps to */
  lessonId?: string;
  /** Practice set number within the domain (1, 2, 3). Defaults to 1 if omitted. */
  set?: number;
  type: "single" | "multi";
  prompt: string;
  options: string[];
  /** Indices into options that are correct */
  answer: number[];
  explanation: string;
}

export type LessonStatus = "unread" | "reading" | "completed";

export interface LessonProgress {
  lesson_id: string;
  status: LessonStatus;
  updated_at: string;
}

export interface QuizAttempt {
  id: string;
  profile_id: string;
  mode: "domain" | "lesson" | "mock";
  scope_id: string | null;
  total: number;
  correct: number;
  score_pct: number;
  passed: number;
  duration_sec: number | null;
  detail: string | null;
  created_at: string;
}
