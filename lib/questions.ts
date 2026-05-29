import type { Question } from "@/lib/types";

/**
 * Practice question bank for AWS Certified AI Practitioner (AIF-C01).
 *
 * Mix of single-answer and multi-answer items, tagged by domain (and lesson
 * where relevant). `answer` holds the index/indices into `options`.
 *
 * These are original practice questions written to mirror the style and
 * difficulty of the exam; they are not actual exam questions.
 */
export const QUESTIONS: Question[] = [
  // ---------------- Domain 1: AI & ML Fundamentals ----------------
  {
    id: "q-d1-001",
    domainId: "d1-ai-ml-fundamentals",
    lessonId: "l1-1-ai-ml-dl-genai",
    type: "single",
    prompt:
      "A team builds a system that creates original marketing copy from a short brief. Which category best describes this capability?",
    options: ["Rule-based AI", "Generative AI", "Unsupervised learning", "Reinforcement learning"],
    answer: [1],
    explanation:
      "Creating new content (text) from a prompt is generative AI, a subset of deep learning that uses foundation models.",
  },
  {
    id: "q-d1-002",
    domainId: "d1-ai-ml-fundamentals",
    lessonId: "l1-2-ml-types",
    type: "single",
    prompt:
      "You have years of labeled transactions marked 'fraud' or 'legitimate' and want to predict fraud on new transactions. Which learning type fits?",
    options: ["Unsupervised learning", "Reinforcement learning", "Supervised learning", "Self-supervised pre-training"],
    answer: [2],
    explanation:
      "Labeled inputs with known outputs (fraud/legit) is supervised learning — specifically binary classification.",
  },
  {
    id: "q-d1-003",
    domainId: "d1-ai-ml-fundamentals",
    lessonId: "l1-2-ml-types",
    type: "single",
    prompt:
      "A retailer wants to discover natural customer segments without predefined categories. Which approach is most appropriate?",
    options: ["Regression", "Clustering (unsupervised)", "Classification", "Reinforcement learning"],
    answer: [1],
    explanation: "Finding unknown groupings in unlabeled data is clustering, an unsupervised learning task.",
  },
  {
    id: "q-d1-004",
    domainId: "d1-ai-ml-fundamentals",
    lessonId: "l1-4-metrics",
    type: "single",
    prompt:
      "A medical screening model must catch as many true disease cases as possible, even at the cost of some false alarms. Which metric should you prioritize?",
    options: ["Precision", "Recall", "Specificity", "Mean squared error"],
    answer: [1],
    explanation:
      "Minimizing missed positives (false negatives) means maximizing recall, which is critical in screening contexts.",
  },
  {
    id: "q-d1-005",
    domainId: "d1-ai-ml-fundamentals",
    lessonId: "l1-3-ml-lifecycle",
    type: "single",
    prompt: "Which AWS service is purpose-built for labeling training data?",
    options: [
      "Amazon SageMaker Ground Truth",
      "Amazon SageMaker Model Monitor",
      "Amazon Comprehend",
      "AWS Glue",
    ],
    answer: [0],
    explanation:
      "SageMaker Ground Truth provides managed and automated data labeling for building training datasets.",
  },
  {
    id: "q-d1-006",
    domainId: "d1-ai-ml-fundamentals",
    lessonId: "l1-5-aws-ai-services",
    type: "single",
    prompt:
      "A company needs to extract text, form fields, and tables from scanned invoices. Which AWS AI service fits best?",
    options: ["Amazon Comprehend", "Amazon Textract", "Amazon Translate", "Amazon Polly"],
    answer: [1],
    explanation: "Amazon Textract extracts text, forms, and tables from scanned documents and images.",
  },
  {
    id: "q-d1-007",
    domainId: "d1-ai-ml-fundamentals",
    lessonId: "l1-5-aws-ai-services",
    type: "multi",
    prompt:
      "Which TWO scenarios are best handled by Amazon Comprehend? (Choose two.)",
    options: [
      "Determine the sentiment of product reviews",
      "Convert speech recordings into text",
      "Detect PII entities in documents",
      "Generate lifelike speech from text",
      "Recommend products to users",
    ],
    answer: [0, 2],
    explanation:
      "Comprehend is an NLP service: sentiment analysis and entity/PII detection. Transcribe handles speech-to-text, Polly text-to-speech, and Personalize recommendations.",
  },
  {
    id: "q-d1-008",
    domainId: "d1-ai-ml-fundamentals",
    lessonId: "l1-3-ml-lifecycle",
    type: "single",
    prompt:
      "A model scores 99% on training data but 70% on validation data. What is the most likely problem?",
    options: ["Underfitting", "Overfitting", "Data drift", "Class imbalance"],
    answer: [1],
    explanation:
      "High training accuracy with much lower validation accuracy indicates overfitting — the model memorized training data.",
  },

  // ---------------- Domain 2: Generative AI Fundamentals ----------------
  {
    id: "q-d2-001",
    domainId: "d2-generative-ai",
    lessonId: "l2-1-foundation-models",
    type: "single",
    prompt: "What is a defining characteristic of a foundation model?",
    options: [
      "It is trained for a single narrow task",
      "It is pre-trained on broad data and adaptable to many tasks",
      "It cannot be customized after training",
      "It only works with numeric tabular data",
    ],
    answer: [1],
    explanation:
      "Foundation models are pre-trained on large, broad datasets and can be adapted (prompting, RAG, fine-tuning) to many downstream tasks.",
  },
  {
    id: "q-d2-002",
    domainId: "d2-generative-ai",
    lessonId: "l2-2-tokens-embeddings",
    type: "single",
    prompt:
      "A developer wants to build semantic search that matches by meaning rather than keywords. Which representation enables this?",
    options: ["One-hot encoding", "Embeddings (vectors)", "Tokens", "Hash indexes"],
    answer: [1],
    explanation:
      "Embeddings map text to vectors where semantic similarity equals vector closeness, enabling meaning-based search.",
  },
  {
    id: "q-d2-003",
    domainId: "d2-generative-ai",
    lessonId: "l2-2-tokens-embeddings",
    type: "single",
    prompt:
      "An application fails because a very large document exceeds what the model can process at once. Which model attribute is the limiting factor?",
    options: ["Temperature", "Context window", "Top-k", "Embedding dimension"],
    answer: [1],
    explanation:
      "The context window is the maximum number of tokens (input + output) a model can handle in a single request.",
  },
  {
    id: "q-d2-004",
    domainId: "d2-generative-ai",
    lessonId: "l2-3-prompt-engineering",
    type: "single",
    prompt:
      "You want more deterministic, focused output from an LLM for a factual task. How should you set the temperature?",
    options: ["Higher temperature", "Lower temperature", "Temperature has no effect on determinism", "Set max tokens to 0"],
    answer: [1],
    explanation: "Lower temperature reduces randomness, producing more focused and consistent responses.",
  },
  {
    id: "q-d2-005",
    domainId: "d2-generative-ai",
    lessonId: "l2-3-prompt-engineering",
    type: "single",
    prompt:
      "Providing a few example input/output pairs inside the prompt to steer the model's behavior is called:",
    options: ["Zero-shot prompting", "Few-shot prompting", "Fine-tuning", "Continued pre-training"],
    answer: [1],
    explanation: "Including examples in the prompt is few-shot prompting; it guides format/behavior without retraining.",
  },
  {
    id: "q-d2-006",
    domainId: "d2-generative-ai",
    lessonId: "l2-4-genai-use-cases",
    type: "single",
    prompt:
      "An LLM confidently produces a factually incorrect statement that was never in its data. This phenomenon is called:",
    options: ["Drift", "Hallucination", "Overfitting", "Bias"],
    answer: [1],
    explanation: "Hallucination is when a generative model produces plausible-sounding but false content.",
  },
  {
    id: "q-d2-007",
    domainId: "d2-generative-ai",
    lessonId: "l2-5-aws-genai-stack",
    type: "single",
    prompt:
      "Which AWS service provides serverless access to multiple foundation models from different providers through a single API?",
    options: ["Amazon SageMaker", "Amazon Bedrock", "Amazon Comprehend", "AWS Lambda"],
    answer: [1],
    explanation:
      "Amazon Bedrock offers serverless, single-API access to FMs from Anthropic, Meta, Mistral, Cohere, AI21, Stability AI, and Amazon.",
  },
  {
    id: "q-d2-008",
    domainId: "d2-generative-ai",
    lessonId: "l2-5-aws-genai-stack",
    type: "single",
    prompt:
      "A developer wants AI code suggestions directly in their IDE. Which AWS service is designed for this?",
    options: ["Amazon Q Developer", "Amazon Q Business", "PartyRock", "Amazon Kendra"],
    answer: [0],
    explanation: "Amazon Q Developer is the AI coding assistant for IDE/CLI. Q Business answers over enterprise data.",
  },

  // ---------------- Domain 3: Applications of Foundation Models ----------------
  {
    id: "q-d3-001",
    domainId: "d3-foundation-models",
    lessonId: "l3-3-rag",
    type: "single",
    prompt:
      "A chatbot must answer questions using a company's internal PDFs and always reflect the latest documents. Which approach is most appropriate and cost-effective?",
    options: [
      "Fine-tune the model nightly on the PDFs",
      "Continued pre-training on the PDFs",
      "Retrieval Augmented Generation (RAG) with a knowledge base",
      "Increase the temperature",
    ],
    answer: [2],
    explanation:
      "RAG injects current documents at query time without retraining, keeping answers fresh and grounded with citations.",
  },
  {
    id: "q-d3-002",
    domainId: "d3-foundation-models",
    lessonId: "l3-2-customization-spectrum",
    type: "single",
    prompt:
      "Which statement correctly distinguishes RAG from fine-tuning?",
    options: [
      "RAG changes the model's weights; fine-tuning does not",
      "RAG augments the prompt with retrieved data; fine-tuning updates the model's weights",
      "Both retrain the base model from scratch",
      "Fine-tuning requires no data while RAG requires labeled data",
    ],
    answer: [1],
    explanation:
      "RAG leaves weights unchanged and adds retrieved context to the prompt. Fine-tuning updates weights using labeled examples.",
  },
  {
    id: "q-d3-003",
    domainId: "d3-foundation-models",
    lessonId: "l3-2-customization-spectrum",
    type: "single",
    prompt:
      "A company needs the model to consistently adopt a specific brand voice and response format. Which customization approach fits best?",
    options: ["Prompt engineering only", "Fine-tuning", "RAG", "Increasing context window"],
    answer: [1],
    explanation:
      "Fine-tuning on labeled examples shapes style, tone, and task behavior consistently. RAG is for fresh factual knowledge.",
  },
  {
    id: "q-d3-004",
    domainId: "d3-foundation-models",
    lessonId: "l3-1-selecting-models",
    type: "multi",
    prompt:
      "Which TWO factors are most relevant when selecting a foundation model to control operating cost and speed? (Choose two.)",
    options: [
      "Model size / number of parameters",
      "The color theme of the console",
      "Token pricing and latency",
      "The number of AWS regions in the world",
      "The model vendor's logo",
    ],
    answer: [0, 2],
    explanation:
      "Model size affects cost and latency; token pricing and latency directly drive operating cost and responsiveness.",
  },
  {
    id: "q-d3-005",
    domainId: "d3-foundation-models",
    lessonId: "l3-3-rag",
    type: "multi",
    prompt:
      "Which TWO AWS options can serve as the vector store behind a RAG solution? (Choose two.)",
    options: [
      "Amazon OpenSearch Serverless",
      "Amazon Polly",
      "Aurora PostgreSQL with pgvector",
      "Amazon Translate",
      "AWS Artifact",
    ],
    answer: [0, 2],
    explanation:
      "OpenSearch Serverless and Aurora pgvector are supported vector stores for embeddings. The others are unrelated services.",
  },
  {
    id: "q-d3-006",
    domainId: "d3-foundation-models",
    lessonId: "l3-4-agents",
    type: "single",
    prompt:
      "A solution must let a foundation model not just answer but also call external APIs to complete multi-step tasks. Which Bedrock capability enables this?",
    options: ["Bedrock Guardrails", "Bedrock Agents", "Bedrock Knowledge Bases", "Bedrock Model Evaluation"],
    answer: [1],
    explanation:
      "Bedrock Agents orchestrate multi-step tasks and invoke tools/APIs (often via Lambda action groups) to take actions.",
  },
  {
    id: "q-d3-007",
    domainId: "d3-foundation-models",
    lessonId: "l3-5-evaluation-guardrails",
    type: "single",
    prompt:
      "Which metric is most commonly used to evaluate the quality of text summarization output?",
    options: ["BLEU", "ROUGE", "RMSE", "AUC"],
    answer: [1],
    explanation:
      "ROUGE is used for summarization; BLEU is typically used for machine translation. RMSE and AUC are not text-generation metrics.",
  },
  {
    id: "q-d3-008",
    domainId: "d3-foundation-models",
    lessonId: "l3-5-evaluation-guardrails",
    type: "single",
    prompt:
      "A team must block specific topics, filter harmful content, and redact PII from a Bedrock chatbot regardless of which model is used. What should they implement?",
    options: ["Bedrock Guardrails", "SageMaker Clarify", "Amazon Macie", "Bedrock Knowledge Bases"],
    answer: [0],
    explanation:
      "Bedrock Guardrails enforce content policies (denied topics, harmful-content filters, PII redaction, grounding checks) independent of the model.",
  },

  // ---------------- Domain 4: Responsible AI ----------------
  {
    id: "q-d4-001",
    domainId: "d4-responsible-ai",
    lessonId: "l4-2-bias-fairness",
    type: "single",
    prompt:
      "Which AWS capability detects bias in datasets and models and explains feature importance for predictions?",
    options: ["SageMaker Clarify", "SageMaker Model Monitor", "Amazon Macie", "AWS Config"],
    answer: [0],
    explanation:
      "SageMaker Clarify provides bias detection across the lifecycle and explainability via feature attribution (SHAP).",
  },
  {
    id: "q-d4-002",
    domainId: "d4-responsible-ai",
    lessonId: "l4-1-dimensions",
    type: "single",
    prompt:
      "Customers want to know why an automated loan decision was made. Which responsible-AI dimension does this address?",
    options: ["Robustness", "Explainability", "Throughput", "Scalability"],
    answer: [1],
    explanation: "Understanding why a model made a decision is explainability (closely tied to transparency).",
  },
  {
    id: "q-d4-003",
    domainId: "d4-responsible-ai",
    lessonId: "l4-3-explainability-transparency",
    type: "single",
    prompt:
      "An organization wants to formally document a model's intended use, training data, metrics, and approval status for governance. What should they use?",
    options: ["AWS Artifact", "SageMaker Model Cards", "CloudTrail", "Amazon Kendra"],
    answer: [1],
    explanation:
      "SageMaker Model Cards capture purpose, data, performance, and approvals to support governance and accountability.",
  },
  {
    id: "q-d4-004",
    domainId: "d4-responsible-ai",
    lessonId: "l4-3-explainability-transparency",
    type: "single",
    prompt:
      "Which AWS resource documents the intended use cases, limitations, and responsible-use guidance for AWS managed AI services?",
    options: ["AI Service Cards", "AWS Trusted Advisor", "AWS Budgets", "Amazon Inspector"],
    answer: [0],
    explanation:
      "AWS AI Service Cards provide transparency about intended use, limitations, and responsible-use guidance for AI services.",
  },
  {
    id: "q-d4-005",
    domainId: "d4-responsible-ai",
    lessonId: "l4-4-monitoring-genai-risks",
    type: "single",
    prompt:
      "A deployed model's predictive accuracy slowly degrades over months as input patterns change. What is occurring, and which tool helps detect it?",
    options: [
      "Hallucination; Bedrock Guardrails",
      "Data/concept drift; SageMaker Model Monitor",
      "Overfitting; SageMaker Ground Truth",
      "Prompt injection; AWS WAF",
    ],
    answer: [1],
    explanation:
      "Gradual degradation from changing input/relationships is drift; SageMaker Model Monitor detects drift and data-quality issues.",
  },
  {
    id: "q-d4-006",
    domainId: "d4-responsible-ai",
    lessonId: "l4-2-bias-fairness",
    type: "single",
    prompt:
      "Training data over-represents one demographic group, leading to skewed predictions. This is an example of:",
    options: ["Concept drift", "Sampling/data bias", "Latency", "Hallucination"],
    answer: [1],
    explanation: "Unrepresentative training data introduces sampling/data bias, harming fairness.",
  },

  // ---------------- Domain 5: Security, Compliance & Governance ----------------
  {
    id: "q-d5-001",
    domainId: "d5-security-governance",
    lessonId: "l5-1-securing-ai",
    type: "single",
    prompt:
      "A company must access Amazon Bedrock without sending traffic over the public internet. What should they configure?",
    options: [
      "A public NAT gateway",
      "A VPC endpoint (AWS PrivateLink)",
      "An internet gateway",
      "A public S3 bucket",
    ],
    answer: [1],
    explanation:
      "VPC endpoints (PrivateLink) keep traffic to AWS services like Bedrock on the private AWS network, off the public internet.",
  },
  {
    id: "q-d5-002",
    domainId: "d5-security-governance",
    lessonId: "l5-1-securing-ai",
    type: "single",
    prompt:
      "Which principle states that an IAM identity should be granted only the permissions it needs and nothing more?",
    options: ["Defense in depth", "Least privilege", "Separation of duties", "Shared responsibility"],
    answer: [1],
    explanation: "Least privilege grants the minimum permissions required to perform a task.",
  },
  {
    id: "q-d5-003",
    domainId: "d5-security-governance",
    lessonId: "l5-2-data-governance-privacy",
    type: "single",
    prompt:
      "Which service automatically discovers and classifies personally identifiable information (PII) stored in Amazon S3?",
    options: ["Amazon Macie", "Amazon Polly", "Amazon Lex", "AWS Glue"],
    answer: [0],
    explanation: "Amazon Macie uses ML to discover and classify sensitive data such as PII in S3.",
  },
  {
    id: "q-d5-004",
    domainId: "d5-security-governance",
    lessonId: "l5-3-shared-responsibility-compliance",
    type: "single",
    prompt:
      "Under the AWS shared responsibility model, which task is the customer's responsibility?",
    options: [
      "Securing the physical data centers",
      "Patching the hypervisor",
      "Configuring IAM policies and encrypting their data",
      "Maintaining the global network backbone",
    ],
    answer: [2],
    explanation:
      "Customers are responsible for security IN the cloud: their data, IAM configuration, and encryption choices. AWS secures the underlying infrastructure.",
  },
  {
    id: "q-d5-005",
    domainId: "d5-security-governance",
    lessonId: "l5-3-shared-responsibility-compliance",
    type: "single",
    prompt:
      "Where can a customer download AWS compliance reports such as SOC 2 and ISO certifications?",
    options: ["AWS Artifact", "AWS CloudTrail", "Amazon Inspector", "AWS Config"],
    answer: [0],
    explanation: "AWS Artifact is the self-service portal for AWS compliance reports and agreements.",
  },
  {
    id: "q-d5-006",
    domainId: "d5-security-governance",
    lessonId: "l5-4-audit-governance",
    type: "single",
    prompt:
      "Which service records API activity across your AWS account to answer 'who did what and when' for auditing?",
    options: ["AWS CloudTrail", "Amazon CloudWatch", "AWS Config", "Amazon Macie"],
    answer: [0],
    explanation:
      "CloudTrail records API calls and account activity for auditing. CloudWatch is metrics/logs; Config tracks resource configuration.",
  },
  {
    id: "q-d5-007",
    domainId: "d5-security-governance",
    lessonId: "l5-4-audit-governance",
    type: "single",
    prompt:
      "A compliance team must retain a record of every prompt and response sent to a Bedrock model. What should they enable?",
    options: [
      "Bedrock Model Invocation Logging",
      "SageMaker Ground Truth",
      "Amazon Translate logging",
      "VPC Flow Logs",
    ],
    answer: [0],
    explanation:
      "Bedrock Model Invocation Logging captures model inputs (prompts) and outputs (responses) to S3/CloudWatch for audit.",
  },
];

/** Helpers. */
export function questionsForDomain(domainId: string) {
  return QUESTIONS.filter((q) => q.domainId === domainId);
}

export function questionsForLesson(lessonId: string) {
  return QUESTIONS.filter((q) => q.lessonId === lessonId);
}

export function getQuestion(id: string) {
  return QUESTIONS.find((q) => q.id === id);
}

/** Deterministic-ish shuffle by Fisher-Yates using Math.random. */
export function sampleQuestions(pool: Question[], n: number): Question[] {
  const arr = [...pool];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, Math.min(n, arr.length));
}

export const TOTAL_QUESTIONS = QUESTIONS.length;
