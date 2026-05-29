import type { Question } from "@/lib/types";
import type { ClientQuestion } from "@/components/QuizRunner";

/** Strip the answer key so it never reaches the browser. */
export function toClientQuestion(q: Question): ClientQuestion {
  return {
    id: q.id,
    type: q.type,
    prompt: q.prompt,
    options: q.options,
    domainId: q.domainId,
  };
}
