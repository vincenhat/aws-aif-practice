-- Cloudflare D1 schema for aws-aif-practice.
-- Apply with:  npm run db:apply
-- or:          wrangler d1 execute aws-aif-prep --remote --file=./schema.sql
--
-- Curriculum, lessons, and the question bank live in code (lib/curriculum.ts,
-- lib/questions.ts) because they are static content shipped with the app.
-- D1 stores per-user dynamic state: lesson progress and quiz/exam attempts.

-- A lightweight "user" is just a profile id stored in a cookie. No passwords;
-- this is a personal study tool. One row per learner profile.
CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'Learner',
  created_at TEXT NOT NULL
);

-- Lesson read/complete progress, one row per (profile, lesson).
CREATE TABLE IF NOT EXISTS lesson_progress (
  profile_id TEXT NOT NULL,
  lesson_id TEXT NOT NULL,           -- matches Lesson.id in lib/curriculum.ts
  status TEXT NOT NULL DEFAULT 'unread',  -- unread | reading | completed
  updated_at TEXT NOT NULL,
  PRIMARY KEY (profile_id, lesson_id)
);

CREATE INDEX IF NOT EXISTS lesson_progress_profile_idx ON lesson_progress(profile_id);

-- One row per finished quiz or mock-exam attempt.
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id TEXT PRIMARY KEY,
  profile_id TEXT NOT NULL,
  mode TEXT NOT NULL,                -- 'domain' | 'lesson' | 'mock'
  scope_id TEXT,                     -- domain id or lesson id; NULL for full mock
  total INTEGER NOT NULL,            -- number of questions
  correct INTEGER NOT NULL,          -- number answered correctly
  score_pct REAL NOT NULL,           -- 0..100
  passed INTEGER NOT NULL DEFAULT 0, -- 1 if score_pct >= 70
  duration_sec INTEGER,              -- time taken, nullable
  detail TEXT,                       -- JSON: [{questionId, chosen, correct, isCorrect}]
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS quiz_attempts_profile_idx ON quiz_attempts(profile_id);
CREATE INDEX IF NOT EXISTS quiz_attempts_mode_idx ON quiz_attempts(mode);
CREATE INDEX IF NOT EXISTS quiz_attempts_created_idx ON quiz_attempts(created_at);

-- Per-question performance roll-up for spaced study / weak-area detection.
CREATE TABLE IF NOT EXISTS question_stats (
  profile_id TEXT NOT NULL,
  question_id TEXT NOT NULL,
  seen INTEGER NOT NULL DEFAULT 0,
  correct INTEGER NOT NULL DEFAULT 0,
  last_seen TEXT,
  PRIMARY KEY (profile_id, question_id)
);

CREATE INDEX IF NOT EXISTS question_stats_profile_idx ON question_stats(profile_id);
