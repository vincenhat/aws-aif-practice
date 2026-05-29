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

  // ================================================================
  // SET 2 — fresh questions for every domain
  // ================================================================

  // ---------------- Domain 1: AI & ML Fundamentals (Set 2) ----------------
  {
    id: "q-d1-s2-001",
    domainId: "d1-ai-ml-fundamentals",
    lessonId: "l1-1-ai-ml-dl-genai",
    set: 2,
    type: "single",
    prompt:
      "A hand-coded system uses fixed 'if-then' rules to route support tickets, with no learning from data. How is this best classified?",
    options: [
      "Machine learning",
      "Deep learning",
      "AI but not machine learning",
      "Generative AI",
    ],
    answer: [2],
    explanation:
      "Rule-based expert systems are AI, but because they do not learn patterns from data they are not machine learning.",
  },
  {
    id: "q-d1-s2-002",
    domainId: "d1-ai-ml-fundamentals",
    lessonId: "l1-2-ml-types",
    set: 2,
    type: "single",
    prompt:
      "An autonomous warehouse robot learns to navigate by receiving positive reward for reaching the dock and penalties for collisions. Which learning type is this?",
    options: ["Supervised learning", "Reinforcement learning", "Unsupervised learning", "Semi-supervised learning"],
    answer: [1],
    explanation:
      "An agent learning from rewards and penalties through interaction with an environment is reinforcement learning.",
  },
  {
    id: "q-d1-s2-003",
    domainId: "d1-ai-ml-fundamentals",
    lessonId: "l1-4-metrics",
    set: 2,
    type: "single",
    prompt:
      "You are predicting next month's electricity demand (a continuous value). Which metric is appropriate to evaluate the model?",
    options: ["Precision", "RMSE", "F1 score", "AUC-ROC"],
    answer: [1],
    explanation:
      "RMSE is a regression metric for continuous targets. Precision, F1, and AUC-ROC are classification metrics.",
  },
  {
    id: "q-d1-s2-004",
    domainId: "d1-ai-ml-fundamentals",
    lessonId: "l1-3-ml-lifecycle",
    set: 2,
    type: "single",
    prompt:
      "A team wants a central, reusable repository of curated features shared across multiple models. Which AWS capability fits?",
    options: [
      "Amazon SageMaker Feature Store",
      "Amazon SageMaker Model Monitor",
      "Amazon Rekognition",
      "AWS Glue DataBrew",
    ],
    answer: [0],
    explanation:
      "SageMaker Feature Store stores, shares, and reuses curated ML features across teams and models.",
  },
  {
    id: "q-d1-s2-005",
    domainId: "d1-ai-ml-fundamentals",
    lessonId: "l1-5-aws-ai-services",
    set: 2,
    type: "single",
    prompt:
      "A call center wants to convert recorded customer phone calls into written transcripts. Which AWS service is the best fit?",
    options: ["Amazon Polly", "Amazon Transcribe", "Amazon Comprehend", "Amazon Translate"],
    answer: [1],
    explanation:
      "Amazon Transcribe performs speech-to-text. Polly is text-to-speech, Comprehend is NLP analysis, Translate is language translation.",
  },
  {
    id: "q-d1-s2-006",
    domainId: "d1-ai-ml-fundamentals",
    lessonId: "l1-3-ml-lifecycle",
    set: 2,
    type: "single",
    prompt:
      "A model performs poorly on both training and validation data. What does this most likely indicate?",
    options: ["Overfitting", "Underfitting", "Data leakage", "Perfect generalization"],
    answer: [1],
    explanation:
      "Poor performance on both training and validation sets indicates underfitting — the model is too simple to capture the patterns.",
  },
  {
    id: "q-d1-s2-007",
    domainId: "d1-ai-ml-fundamentals",
    lessonId: "l1-5-aws-ai-services",
    set: 2,
    type: "multi",
    prompt:
      "Which TWO tasks can Amazon Rekognition perform out of the box? (Choose two.)",
    options: [
      "Detect objects and scenes in images",
      "Forecast future sales from time-series data",
      "Moderate inappropriate image/video content",
      "Translate documents between languages",
      "Generate speech audio from text",
    ],
    answer: [0, 2],
    explanation:
      "Rekognition analyzes images and video (object/scene detection, content moderation, faces). Forecasting, translation, and TTS are other services.",
  },

  // ---------------- Domain 2: Generative AI (Set 2) ----------------
  {
    id: "q-d2-s2-001",
    domainId: "d2-generative-ai",
    lessonId: "l2-1-foundation-models",
    set: 2,
    type: "single",
    prompt:
      "Which architecture, based on a self-attention mechanism, underlies most modern large language models?",
    options: ["Convolutional neural network", "Transformer", "Decision tree", "Recurrent rule engine"],
    answer: [1],
    explanation:
      "Transformers use self-attention to weigh relationships between tokens and are the foundation of modern LLMs.",
  },
  {
    id: "q-d2-s2-002",
    domainId: "d2-generative-ai",
    lessonId: "l2-2-tokens-embeddings",
    set: 2,
    type: "single",
    prompt:
      "Approximately how many English words correspond to 1,000 tokens?",
    options: ["About 250 words", "About 750 words", "About 2,000 words", "Exactly 1,000 words"],
    answer: [1],
    explanation:
      "A common rule of thumb is 1 token ≈ 0.75 words, so 1,000 tokens ≈ 750 words.",
  },
  {
    id: "q-d2-s2-003",
    domainId: "d2-generative-ai",
    lessonId: "l2-3-prompt-engineering",
    set: 2,
    type: "single",
    prompt:
      "A malicious user types instructions into a chat input to override the system prompt and reveal hidden rules. What is this attack called?",
    options: ["Prompt injection", "Model drift", "Overfitting", "Tokenization"],
    answer: [0],
    explanation:
      "Prompt injection manipulates model behavior by inserting adversarial instructions into the input.",
  },
  {
    id: "q-d2-s2-004",
    domainId: "d2-generative-ai",
    lessonId: "l2-3-prompt-engineering",
    set: 2,
    type: "single",
    prompt:
      "For a complex multi-step reasoning task, which prompting technique typically improves answer quality?",
    options: [
      "Asking the model to think step by step (chain-of-thought)",
      "Setting temperature to its maximum",
      "Removing all context from the prompt",
      "Requesting the shortest possible answer",
    ],
    answer: [0],
    explanation:
      "Chain-of-thought prompting encourages intermediate reasoning steps, improving performance on complex tasks.",
  },
  {
    id: "q-d2-s2-005",
    domainId: "d2-generative-ai",
    lessonId: "l2-5-aws-genai-stack",
    set: 2,
    type: "single",
    prompt:
      "A non-technical employee wants to experiment with building a small generative AI app with no code, to learn the concepts. Which AWS offering fits best?",
    options: ["PartyRock", "Amazon EC2", "AWS Lambda", "Amazon Redshift"],
    answer: [0],
    explanation:
      "PartyRock is a no-code playground (built on Bedrock) for building and sharing generative AI apps and learning.",
  },
  {
    id: "q-d2-s2-006",
    domainId: "d2-generative-ai",
    lessonId: "l2-4-genai-use-cases",
    set: 2,
    type: "single",
    prompt:
      "Which task is a POOR fit for a generative large language model on its own?",
    options: [
      "Drafting a product description",
      "Summarizing a long article",
      "Performing guaranteed-exact arithmetic on large numbers",
      "Brainstorming marketing slogans",
    ],
    answer: [2],
    explanation:
      "LLMs are probabilistic and can make arithmetic errors; exact calculation is better handled by deterministic code or tools.",
  },
  {
    id: "q-d2-s2-007",
    domainId: "d2-generative-ai",
    lessonId: "l2-2-tokens-embeddings",
    set: 2,
    type: "single",
    prompt:
      "Which Amazon Bedrock model family is designed to generate text embeddings for semantic search?",
    options: ["Amazon Titan Embeddings", "Amazon Polly", "Stable Diffusion", "Amazon Textract"],
    answer: [0],
    explanation:
      "Amazon Titan Embeddings (on Bedrock) converts text into vectors for semantic search and RAG. Polly/Textract are not embedding models.",
  },

  // ---------------- Domain 3: Applications of Foundation Models (Set 2) ----------------
  {
    id: "q-d3-s2-001",
    domainId: "d3-foundation-models",
    lessonId: "l3-2-customization-spectrum",
    set: 2,
    type: "single",
    prompt:
      "A model lacks deep vocabulary for a highly specialized legal domain and must absorb large volumes of unlabeled legal text. Which approach adds this domain knowledge?",
    options: ["Prompt engineering", "Continued pre-training", "Reducing temperature", "Increasing max tokens"],
    answer: [1],
    explanation:
      "Continued pre-training on large unlabeled domain corpora adds domain knowledge; it is the most resource-intensive option.",
  },
  {
    id: "q-d3-s2-002",
    domainId: "d3-foundation-models",
    lessonId: "l3-1-selecting-models",
    set: 2,
    type: "single",
    prompt:
      "To objectively compare several foundation models on your own dataset before choosing one, which Bedrock feature should you use?",
    options: [
      "Bedrock Model Evaluation",
      "Bedrock Guardrails",
      "Bedrock Agents",
      "Bedrock Provisioned Throughput",
    ],
    answer: [0],
    explanation:
      "Bedrock Model Evaluation supports automatic and human evaluation to compare models on your data and tasks.",
  },
  {
    id: "q-d3-s2-003",
    domainId: "d3-foundation-models",
    lessonId: "l3-3-rag",
    set: 2,
    type: "single",
    prompt:
      "In a RAG pipeline, what is stored in the vector database during the ingestion phase?",
    options: [
      "The raw model weights",
      "Embeddings (vector representations) of document chunks",
      "The user's final answers",
      "Billing records",
    ],
    answer: [1],
    explanation:
      "Ingestion splits documents into chunks, generates embeddings, and stores those vectors for similarity retrieval at query time.",
  },
  {
    id: "q-d3-s2-004",
    domainId: "d3-foundation-models",
    lessonId: "l3-4-agents",
    set: 2,
    type: "single",
    prompt:
      "Bedrock Agents commonly invoke which AWS service to execute the business logic behind an action group?",
    options: ["AWS Lambda", "Amazon Polly", "Amazon Macie", "AWS Artifact"],
    answer: [0],
    explanation:
      "Action groups are typically backed by AWS Lambda functions that perform the actual API calls or logic.",
  },
  {
    id: "q-d3-s2-005",
    domainId: "d3-foundation-models",
    lessonId: "l3-5-evaluation-guardrails",
    set: 2,
    type: "single",
    prompt:
      "Which metric is most appropriate for evaluating machine translation quality?",
    options: ["BLEU", "ROUGE", "RMSE", "Silhouette score"],
    answer: [0],
    explanation:
      "BLEU is the standard metric for translation quality; ROUGE targets summarization.",
  },
  {
    id: "q-d3-s2-006",
    domainId: "d3-foundation-models",
    lessonId: "l3-2-customization-spectrum",
    set: 2,
    type: "single",
    prompt:
      "Which customization approach should you try FIRST because it is the cheapest and fastest to iterate on?",
    options: ["Continued pre-training", "Fine-tuning", "Prompt engineering", "Training a model from scratch"],
    answer: [2],
    explanation:
      "Prompt engineering changes only the prompt, requires no training, and should be attempted before costlier options.",
  },
  {
    id: "q-d3-s2-007",
    domainId: "d3-foundation-models",
    lessonId: "l3-3-rag",
    set: 2,
    type: "multi",
    prompt:
      "Which TWO benefits does RAG provide compared with relying on a base model alone? (Choose two.)",
    options: [
      "Answers can reflect current, proprietary data without retraining",
      "It permanently changes the model's weights",
      "It can provide source citations for grounding",
      "It eliminates all inference cost",
      "It guarantees the model never makes mistakes",
    ],
    answer: [0, 2],
    explanation:
      "RAG injects fresh/proprietary context at query time and enables citations. It does not change weights, remove cost, or guarantee correctness.",
  },

  // ---------------- Domain 4: Responsible AI (Set 2) ----------------
  {
    id: "q-d4-s2-001",
    domainId: "d4-responsible-ai",
    lessonId: "l4-3-explainability-transparency",
    set: 2,
    type: "single",
    prompt:
      "Which explainability technique attributes a model's prediction to the contribution of each input feature?",
    options: ["SHAP feature attribution", "Data sharding", "Token batching", "Gradient clipping"],
    answer: [0],
    explanation:
      "SHAP values quantify each feature's contribution to a prediction and are available via SageMaker Clarify.",
  },
  {
    id: "q-d4-s2-002",
    domainId: "d4-responsible-ai",
    lessonId: "l4-1-dimensions",
    set: 2,
    type: "single",
    prompt:
      "A hiring model consistently scores one gender lower despite equal qualifications. Which responsible-AI dimension is violated?",
    options: ["Fairness", "Latency", "Scalability", "Throughput"],
    answer: [0],
    explanation:
      "Unequal treatment of demographic groups is a fairness/bias problem.",
  },
  {
    id: "q-d4-s2-003",
    domainId: "d4-responsible-ai",
    lessonId: "l4-4-monitoring-genai-risks",
    set: 2,
    type: "single",
    prompt:
      "To reduce hallucinations in a generative chatbot, which approach is most effective?",
    options: [
      "Grounding answers in retrieved source data (RAG) with contextual grounding checks",
      "Increasing the temperature parameter",
      "Removing the system prompt",
      "Disabling logging",
    ],
    answer: [0],
    explanation:
      "Grounding responses in retrieved, authoritative data (and grounding checks via Guardrails) reduces fabricated content.",
  },
  {
    id: "q-d4-s2-004",
    domainId: "d4-responsible-ai",
    lessonId: "l4-2-bias-fairness",
    set: 2,
    type: "single",
    prompt:
      "At which stage of the ML lifecycle can bias be introduced?",
    options: [
      "Only during training",
      "Only during deployment",
      "Any stage — data collection, labeling, training, or feedback",
      "Bias cannot be introduced once data is collected",
    ],
    answer: [2],
    explanation:
      "Bias can enter at any stage: unrepresentative data, subjective labels, modeling choices, or feedback loops in production.",
  },
  {
    id: "q-d4-s2-005",
    domainId: "d4-responsible-ai",
    lessonId: "l4-1-dimensions",
    set: 2,
    type: "single",
    prompt:
      "Ensuring humans can monitor, intervene in, and steer an AI system reflects which responsible-AI principle?",
    options: ["Controllability", "Tokenization", "Quantization", "Sharding"],
    answer: [0],
    explanation:
      "Controllability is the ability for humans to oversee and direct an AI system's behavior.",
  },
  {
    id: "q-d4-s2-006",
    domainId: "d4-responsible-ai",
    lessonId: "l4-3-explainability-transparency",
    set: 2,
    type: "single",
    prompt:
      "There is often a trade-off between a model's predictive accuracy and which other property?",
    options: ["Interpretability", "Storage cost", "Region availability", "Token price"],
    answer: [0],
    explanation:
      "Highly accurate models (deep nets) are often less interpretable than simpler models — a common accuracy/interpretability trade-off.",
  },

  // ---------------- Domain 5: Security, Compliance & Governance (Set 2) ----------------
  {
    id: "q-d5-s2-001",
    domainId: "d5-security-governance",
    lessonId: "l5-1-securing-ai",
    set: 2,
    type: "single",
    prompt:
      "Where should an application store the API keys and credentials it uses to call external services, instead of hardcoding them?",
    options: ["AWS Secrets Manager", "A public S3 bucket", "The source code repository", "An environment variable in a public Docker image"],
    answer: [0],
    explanation:
      "AWS Secrets Manager securely stores and rotates credentials; hardcoding or exposing secrets is a security risk.",
  },
  {
    id: "q-d5-s2-002",
    domainId: "d5-security-governance",
    lessonId: "l5-2-data-governance-privacy",
    set: 2,
    type: "single",
    prompt:
      "A team must detect and redact personally identifiable information from free-text documents before processing. Which service is well suited?",
    options: ["Amazon Comprehend (PII detection)", "Amazon Polly", "Amazon Lex", "AWS Budgets"],
    answer: [0],
    explanation:
      "Amazon Comprehend can detect and redact PII entities in text. (Bedrock Guardrails can also redact PII in FM inputs/outputs.)",
  },
  {
    id: "q-d5-s2-003",
    domainId: "d5-security-governance",
    lessonId: "l5-4-audit-governance",
    set: 2,
    type: "single",
    prompt:
      "An auditor needs to confirm whether resource configurations have drifted from a compliant baseline over time. Which service provides this?",
    options: ["AWS Config", "Amazon CloudFront", "Amazon SQS", "AWS Amplify"],
    answer: [0],
    explanation:
      "AWS Config tracks resource configuration history and evaluates compliance against rules over time.",
  },
  {
    id: "q-d5-s2-004",
    domainId: "d5-security-governance",
    lessonId: "l5-3-shared-responsibility-compliance",
    set: 2,
    type: "single",
    prompt:
      "Under the shared responsibility model, who is responsible for the security and patching of the physical infrastructure running Amazon Bedrock?",
    options: ["AWS", "The customer", "A third-party auditor", "The end user"],
    answer: [0],
    explanation:
      "AWS is responsible for security OF the cloud, including physical infrastructure and managed-service patching.",
  },
  {
    id: "q-d5-s2-005",
    domainId: "d5-security-governance",
    lessonId: "l5-1-securing-ai",
    set: 2,
    type: "single",
    prompt:
      "Which practice best protects training data stored in Amazon S3 from accidental public exposure?",
    options: [
      "Enable S3 Block Public Access and restrictive bucket policies",
      "Make the bucket public for convenience",
      "Disable encryption to simplify access",
      "Share the bucket URL widely",
    ],
    answer: [0],
    explanation:
      "S3 Block Public Access plus least-privilege bucket policies prevent unintended public exposure of sensitive data.",
  },
  {
    id: "q-d5-s2-006",
    domainId: "d5-security-governance",
    lessonId: "l5-2-data-governance-privacy",
    set: 2,
    type: "single",
    prompt:
      "What does 'data residency' refer to in an AI governance context?",
    options: [
      "The geographic region where data is stored and processed",
      "The number of copies of the data",
      "The file format of the dataset",
      "The model's parameter count",
    ],
    answer: [0],
    explanation:
      "Data residency concerns the geographic/jurisdictional location where data is stored and processed, important for compliance.",
  },

  // ================================================================
  // SET 3 — fresh questions for every domain
  // ================================================================

  // ---------------- Domain 1: AI & ML Fundamentals (Set 3) ----------------
  {
    id: "q-d1-s3-001",
    domainId: "d1-ai-ml-fundamentals",
    lessonId: "l1-1-ai-ml-dl-genai",
    set: 3,
    type: "single",
    prompt:
      "Which statement correctly orders the concepts from broadest to narrowest?",
    options: [
      "Generative AI > Deep Learning > Machine Learning > AI",
      "AI > Machine Learning > Deep Learning > Generative AI",
      "Machine Learning > AI > Deep Learning > Generative AI",
      "Deep Learning > AI > Generative AI > Machine Learning",
    ],
    answer: [1],
    explanation:
      "AI is the broadest field, ML is a subset of AI, deep learning a subset of ML, and generative AI a subset of deep learning.",
  },
  {
    id: "q-d1-s3-002",
    domainId: "d1-ai-ml-fundamentals",
    lessonId: "l1-2-ml-types",
    set: 3,
    type: "single",
    prompt:
      "A dataset has a small amount of labeled data and a large amount of unlabeled data used together to train a model. This is known as:",
    options: ["Supervised learning", "Semi-supervised learning", "Reinforcement learning", "Transfer learning"],
    answer: [1],
    explanation:
      "Semi-supervised learning combines a small labeled set with a larger unlabeled set.",
  },
  {
    id: "q-d1-s3-003",
    domainId: "d1-ai-ml-fundamentals",
    lessonId: "l1-4-metrics",
    set: 3,
    type: "single",
    prompt:
      "On a highly imbalanced fraud dataset (0.1% fraud), why can accuracy be misleading?",
    options: [
      "A model predicting 'never fraud' scores ~99.9% accuracy while catching no fraud",
      "Accuracy cannot be computed on imbalanced data",
      "Accuracy always equals recall",
      "Accuracy is only valid for regression",
    ],
    answer: [0],
    explanation:
      "With extreme imbalance, always predicting the majority class yields high accuracy but zero useful detection; use precision/recall/F1.",
  },
  {
    id: "q-d1-s3-004",
    domainId: "d1-ai-ml-fundamentals",
    lessonId: "l1-5-aws-ai-services",
    set: 3,
    type: "single",
    prompt:
      "An analyst with no coding experience wants to build and evaluate ML models through a visual, no-code interface. Which tool fits?",
    options: ["Amazon SageMaker Canvas", "Amazon EC2", "AWS CloudFormation", "Amazon Athena"],
    answer: [0],
    explanation:
      "SageMaker Canvas provides a no-code, visual interface for building ML models without writing code.",
  },
  {
    id: "q-d1-s3-005",
    domainId: "d1-ai-ml-fundamentals",
    lessonId: "l1-5-aws-ai-services",
    set: 3,
    type: "single",
    prompt:
      "An e-commerce site wants real-time, personalized product recommendations for each shopper. Which AWS service is purpose-built for this?",
    options: ["Amazon Personalize", "Amazon Forecast", "Amazon Textract", "Amazon Translate"],
    answer: [0],
    explanation:
      "Amazon Personalize delivers real-time personalized recommendations using the same technology as Amazon.com.",
  },
  {
    id: "q-d1-s3-006",
    domainId: "d1-ai-ml-fundamentals",
    lessonId: "l1-3-ml-lifecycle",
    set: 3,
    type: "single",
    prompt:
      "Which technique helps reduce overfitting during model training?",
    options: [
      "Adding regularization or more training data",
      "Memorizing the training set",
      "Removing the validation set",
      "Increasing model complexity indefinitely",
    ],
    answer: [0],
    explanation:
      "Regularization, more/diverse data, and simpler models reduce overfitting and improve generalization.",
  },
  {
    id: "q-d1-s3-007",
    domainId: "d1-ai-ml-fundamentals",
    lessonId: "l1-5-aws-ai-services",
    set: 3,
    type: "multi",
    prompt:
      "Which TWO are pre-trained AWS AI services that require no model building? (Choose two.)",
    options: [
      "Amazon Comprehend",
      "Amazon SageMaker training jobs",
      "Amazon Textract",
      "Writing a custom PyTorch model",
      "Provisioning an EC2 GPU cluster",
    ],
    answer: [0, 2],
    explanation:
      "Comprehend and Textract are managed, pre-trained AI services consumed via API. The others involve building/training your own models.",
  },

  // ---------------- Domain 2: Generative AI (Set 3) ----------------
  {
    id: "q-d2-s3-001",
    domainId: "d2-generative-ai",
    lessonId: "l2-1-foundation-models",
    set: 3,
    type: "single",
    prompt:
      "A model that can accept both text and images as input and reason over them is described as:",
    options: ["Unimodal", "Multimodal", "Deterministic", "Stateless"],
    answer: [1],
    explanation:
      "Multimodal models handle multiple input/output types such as text and images together.",
  },
  {
    id: "q-d2-s3-002",
    domainId: "d2-generative-ai",
    lessonId: "l2-3-prompt-engineering",
    set: 3,
    type: "single",
    prompt:
      "Which inference parameter most directly controls the maximum length of a model's response?",
    options: ["Temperature", "Top-p", "Max tokens", "Top-k"],
    answer: [2],
    explanation:
      "Max tokens caps the number of tokens generated, limiting response length. Temperature/top-p/top-k affect randomness/sampling.",
  },
  {
    id: "q-d2-s3-003",
    domainId: "d2-generative-ai",
    lessonId: "l2-1-foundation-models",
    set: 3,
    type: "single",
    prompt:
      "Which of the following is a foundation model family developed by AWS and available on Amazon Bedrock?",
    options: ["Amazon Titan / Nova", "Google Gemini", "OpenAI GPT-4", "Microsoft Phi"],
    answer: [0],
    explanation:
      "Amazon Titan and the Amazon Nova family are AWS-built foundation models offered on Bedrock.",
  },
  {
    id: "q-d2-s3-004",
    domainId: "d2-generative-ai",
    lessonId: "l2-5-aws-genai-stack",
    set: 3,
    type: "single",
    prompt:
      "An enterprise wants an AI assistant that can answer employee questions grounded in internal wikis, documents, and tickets. Which service is purpose-built?",
    options: ["Amazon Q Business", "Amazon Q Developer", "Amazon Rekognition", "Amazon Polly"],
    answer: [0],
    explanation:
      "Amazon Q Business is a generative AI assistant that connects to and answers over enterprise data sources.",
  },
  {
    id: "q-d2-s3-005",
    domainId: "d2-generative-ai",
    lessonId: "l2-4-genai-use-cases",
    set: 3,
    type: "single",
    prompt:
      "Why might the same prompt produce different responses on different runs of an LLM?",
    options: [
      "Generative models are non-deterministic due to probabilistic sampling",
      "The model is broken",
      "The internet connection changes the answer",
      "Embeddings are disabled",
    ],
    answer: [0],
    explanation:
      "LLMs sample from probability distributions, so outputs can vary (especially at higher temperature) — they are non-deterministic.",
  },
  {
    id: "q-d2-s3-006",
    domainId: "d2-generative-ai",
    lessonId: "l2-5-aws-genai-stack",
    set: 3,
    type: "single",
    prompt:
      "Which deployment characteristic best describes Amazon Bedrock?",
    options: [
      "Serverless — no infrastructure to provision to call foundation models",
      "Requires managing your own GPU clusters",
      "Only available on-premises",
      "Requires training a model before any inference",
    ],
    answer: [0],
    explanation:
      "Bedrock is fully managed and serverless; you call FMs via API without provisioning infrastructure.",
  },
  {
    id: "q-d2-s3-007",
    domainId: "d2-generative-ai",
    lessonId: "l2-4-genai-use-cases",
    set: 3,
    type: "multi",
    prompt:
      "Which TWO are strong, well-suited use cases for generative AI? (Choose two.)",
    options: [
      "Summarizing long support transcripts",
      "Generating draft code from a description",
      "Computing a bank's exact end-of-day ledger totals",
      "Storing relational transactions with ACID guarantees",
      "Serving as the system of record for payroll",
    ],
    answer: [0, 1],
    explanation:
      "Summarization and code drafting are strong generative use cases. Exact accounting and systems of record need deterministic systems.",
  },

  // ---------------- Domain 3: Applications of Foundation Models (Set 3) ----------------
  {
    id: "q-d3-s3-001",
    domainId: "d3-foundation-models",
    lessonId: "l3-1-selecting-models",
    set: 3,
    type: "single",
    prompt:
      "A workload must process very long documents in a single request. Which model attribute matters most when selecting an FM?",
    options: ["A large context window", "A small parameter count", "The vendor's logo", "The console theme"],
    answer: [0],
    explanation:
      "A larger context window allows more input tokens to be processed in one request, important for long documents.",
  },
  {
    id: "q-d3-s3-002",
    domainId: "d3-foundation-models",
    lessonId: "l3-3-rag",
    set: 3,
    type: "single",
    prompt:
      "Which AWS service offers a managed RAG experience by connecting a data source (e.g., S3) to a vector store and wiring up retrieval automatically?",
    options: [
      "Amazon Bedrock Knowledge Bases",
      "Amazon Polly",
      "AWS CloudTrail",
      "Amazon SNS",
    ],
    answer: [0],
    explanation:
      "Bedrock Knowledge Bases provide managed RAG: ingestion, embedding, vector storage, and retrieval orchestration.",
  },
  {
    id: "q-d3-s3-003",
    domainId: "d3-foundation-models",
    lessonId: "l3-2-customization-spectrum",
    set: 3,
    type: "single",
    prompt:
      "Fine-tuning a foundation model requires which kind of data?",
    options: [
      "Labeled examples of the desired inputs and outputs",
      "Only unlabeled raw text",
      "No data at all",
      "A larger context window",
    ],
    answer: [0],
    explanation:
      "Fine-tuning uses labeled input/output examples to adjust the model's behavior; continued pre-training uses unlabeled data.",
  },
  {
    id: "q-d3-s3-004",
    domainId: "d3-foundation-models",
    lessonId: "l3-4-agents",
    set: 3,
    type: "single",
    prompt:
      "A solution must interpret a goal, decide which tools to call, and chain multiple steps to complete a task. Which capability is this?",
    options: ["Agent orchestration", "Embedding generation", "Tokenization", "Quantization"],
    answer: [0],
    explanation:
      "Orchestration — planning and chaining tool calls to fulfill a goal — is the core function of an agent.",
  },
  {
    id: "q-d3-s3-005",
    domainId: "d3-foundation-models",
    lessonId: "l3-5-evaluation-guardrails",
    set: 3,
    type: "single",
    prompt:
      "When automated metrics are insufficient to judge helpfulness and tone of generated text, what should be added to the evaluation?",
    options: ["Human evaluation", "More tokens", "A larger batch size", "Lower temperature only"],
    answer: [0],
    explanation:
      "Human evaluation captures qualities like helpfulness, relevance, and tone that automatic metrics miss.",
  },
  {
    id: "q-d3-s3-006",
    domainId: "d3-foundation-models",
    lessonId: "l3-1-selecting-models",
    set: 3,
    type: "single",
    prompt:
      "To reduce cost and latency while still meeting quality needs, a good general strategy is to:",
    options: [
      "Start with the smallest model that meets quality needs and scale up only if necessary",
      "Always choose the largest available model",
      "Disable all guardrails",
      "Maximize the temperature",
    ],
    answer: [0],
    explanation:
      "Right-sizing — starting small and scaling only when needed — controls cost and latency without over-provisioning.",
  },
  {
    id: "q-d3-s3-007",
    domainId: "d3-foundation-models",
    lessonId: "l3-2-customization-spectrum",
    set: 3,
    type: "multi",
    prompt:
      "Which TWO situations point toward RAG rather than fine-tuning? (Choose two.)",
    options: [
      "Answers must reflect documents that change frequently",
      "You need responses grounded with citations to source material",
      "You want to permanently bake a fixed writing style into the model",
      "You must teach the model an entirely new language's grammar",
      "You want to change the model's core token vocabulary",
    ],
    answer: [0, 1],
    explanation:
      "RAG suits frequently-changing data and citation/grounding needs. Style baking and deep language/vocabulary changes lean toward fine-tuning or pre-training.",
  },

  // ---------------- Domain 4: Responsible AI (Set 3) ----------------
  {
    id: "q-d4-s3-001",
    domainId: "d4-responsible-ai",
    lessonId: "l4-2-bias-fairness",
    set: 3,
    type: "single",
    prompt:
      "Training data collected only from one region's users causes a model to underperform for other regions. This is an example of:",
    options: ["Sampling bias", "Concept drift", "Overprovisioning", "Latency"],
    answer: [0],
    explanation:
      "Non-representative data collection introduces sampling bias, hurting fairness and generalization.",
  },
  {
    id: "q-d4-s3-002",
    domainId: "d4-responsible-ai",
    lessonId: "l4-3-explainability-transparency",
    set: 3,
    type: "single",
    prompt:
      "Which AWS resource publishes intended use cases, limitations, and responsible-use guidance for an AWS-managed AI service?",
    options: ["AWS AI Service Cards", "AWS Cost Explorer", "Amazon CloudWatch", "AWS Step Functions"],
    answer: [0],
    explanation:
      "AI Service Cards document intended use, limitations, and responsible-use considerations for AWS AI services.",
  },
  {
    id: "q-d4-s3-003",
    domainId: "d4-responsible-ai",
    lessonId: "l4-1-dimensions",
    set: 3,
    type: "single",
    prompt:
      "Being open about an AI system's capabilities, limitations, and how it was built reflects which principle?",
    options: ["Transparency", "Throughput", "Elasticity", "Sharding"],
    answer: [0],
    explanation:
      "Transparency is openness about capabilities, limits, and design — supported by tools like Service Cards and Model Cards.",
  },
  {
    id: "q-d4-s3-004",
    domainId: "d4-responsible-ai",
    lessonId: "l4-4-monitoring-genai-risks",
    set: 3,
    type: "single",
    prompt:
      "Which tool helps detect data and concept drift on a deployed model so teams can retrain when accuracy degrades?",
    options: ["Amazon SageMaker Model Monitor", "Amazon Polly", "AWS Artifact", "Amazon Lex"],
    answer: [0],
    explanation:
      "SageMaker Model Monitor detects drift and data-quality issues on live endpoints and can alert via CloudWatch.",
  },
  {
    id: "q-d4-s3-005",
    domainId: "d4-responsible-ai",
    lessonId: "l4-2-bias-fairness",
    set: 3,
    type: "single",
    prompt:
      "Which AWS capability provides both pre-training bias detection and post-training explainability for ML models?",
    options: ["Amazon SageMaker Clarify", "Amazon CloudFront", "AWS WAF", "Amazon Kinesis"],
    answer: [0],
    explanation:
      "SageMaker Clarify detects bias across the lifecycle and explains predictions via feature attribution.",
  },
  {
    id: "q-d4-s3-006",
    domainId: "d4-responsible-ai",
    lessonId: "l4-4-monitoring-genai-risks",
    set: 3,
    type: "single",
    prompt:
      "Which is a generative-AI-specific risk teams must manage?",
    options: [
      "Hallucinated, fabricated content presented as fact",
      "Disk fragmentation",
      "DNS caching",
      "CSS specificity conflicts",
    ],
    answer: [0],
    explanation:
      "Hallucination — confident but false output — is a key generative AI risk, mitigated with grounding and guardrails.",
  },

  // ---------------- Domain 5: Security, Compliance & Governance (Set 3) ----------------
  {
    id: "q-d5-s3-001",
    domainId: "d5-security-governance",
    lessonId: "l5-4-audit-governance",
    set: 3,
    type: "single",
    prompt:
      "A security team needs a record of exactly which API calls were made, by whom, and when across the account. Which service provides this?",
    options: ["AWS CloudTrail", "Amazon CloudWatch dashboards", "Amazon QuickSight", "AWS Glue"],
    answer: [0],
    explanation:
      "CloudTrail records account API activity (who/what/when) for auditing and forensic analysis.",
  },
  {
    id: "q-d5-s3-002",
    domainId: "d5-security-governance",
    lessonId: "l5-1-securing-ai",
    set: 3,
    type: "single",
    prompt:
      "Which approach keeps data encrypted in transit between a client and Amazon Bedrock?",
    options: ["TLS (HTTPS)", "Plaintext HTTP", "Disabling certificates", "FTP"],
    answer: [0],
    explanation:
      "TLS (HTTPS) encrypts data in transit; KMS handles encryption at rest.",
  },
  {
    id: "q-d5-s3-003",
    domainId: "d5-security-governance",
    lessonId: "l5-3-shared-responsibility-compliance",
    set: 3,
    type: "single",
    prompt:
      "Using a HIPAA-eligible AWS service automatically makes your application HIPAA compliant. Is this true?",
    options: [
      "No — your configuration, controls, and processes also determine compliance",
      "Yes — the service guarantees full compliance",
      "Yes — compliance is entirely AWS's responsibility",
      "No — HIPAA does not apply to cloud services",
    ],
    answer: [0],
    explanation:
      "Service eligibility is necessary but not sufficient; the customer must configure and operate it compliantly (shared responsibility).",
  },
  {
    id: "q-d5-s3-004",
    domainId: "d5-security-governance",
    lessonId: "l5-1-securing-ai",
    set: 3,
    type: "single",
    prompt:
      "Which service manages encryption keys used to protect data at rest for SageMaker and Bedrock workloads?",
    options: ["AWS KMS", "Amazon Route 53", "Amazon SQS", "AWS Step Functions"],
    answer: [0],
    explanation:
      "AWS Key Management Service (KMS) creates and manages encryption keys for data-at-rest protection.",
  },
  {
    id: "q-d5-s3-005",
    domainId: "d5-security-governance",
    lessonId: "l5-2-data-governance-privacy",
    set: 3,
    type: "single",
    prompt:
      "Tracking where data originated and how it has been transformed across a pipeline is known as:",
    options: ["Data lineage", "Data masking", "Data sharding", "Data deduplication"],
    answer: [0],
    explanation:
      "Data lineage records the origin and transformations of data, supporting governance and auditability.",
  },
  {
    id: "q-d5-s3-006",
    domainId: "d5-security-governance",
    lessonId: "l5-4-audit-governance",
    set: 3,
    type: "single",
    prompt:
      "A governance policy requires retaining every prompt and completion sent to Bedrock for later review. What should be enabled?",
    options: [
      "Bedrock model invocation logging to S3/CloudWatch",
      "Amazon Polly logging",
      "VPC Flow Logs only",
      "Disabling CloudTrail",
    ],
    answer: [0],
    explanation:
      "Bedrock model invocation logging captures prompts and responses to S3/CloudWatch for audit and review.",
  },
];

/** Helpers. */
export function questionsForDomain(domainId: string) {
  return QUESTIONS.filter((q) => q.domainId === domainId);
}

/** A question's set number, defaulting to 1 when unspecified. */
export function questionSet(q: Question): number {
  return q.set ?? 1;
}

/** Questions for a specific practice set within a domain. */
export function questionsForSet(domainId: string, set: number) {
  return QUESTIONS.filter((q) => q.domainId === domainId && questionSet(q) === set);
}

/** Distinct set numbers available for a domain, sorted ascending. */
export function setsForDomain(domainId: string): number[] {
  const sets = new Set<number>();
  for (const q of QUESTIONS) {
    if (q.domainId === domainId) sets.add(questionSet(q));
  }
  return [...sets].sort((a, b) => a - b);
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
