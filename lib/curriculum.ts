import type { Domain } from "@/lib/types";

/**
 * AWS Certified AI Practitioner (AIF-C01) curriculum.
 *
 * Five domains matching the official exam guide, with their published weights:
 *   1. Fundamentals of AI and ML ............ 20%
 *   2. Fundamentals of Generative AI ........ 24%
 *   3. Applications of Foundation Models .... 28%
 *   4. Guidelines for Responsible AI ........ 14%
 *   5. Security, Compliance & Governance .... 14%
 *
 * Lesson bodies are Markdown. They're written to be exam-relevant: concepts,
 * the AWS services that map to them, and "what the exam tests" call-outs.
 */
export const CURRICULUM: Domain[] = [
  {
    id: "d1-ai-ml-fundamentals",
    number: 1,
    title: "Fundamentals of AI and ML",
    weight: 20,
    summary:
      "Core vocabulary: AI vs ML vs deep learning vs generative AI, the ML lifecycle, learning types, evaluation metrics, and the AWS AI/ML service stack.",
    lessons: [
      {
        id: "l1-1-ai-ml-dl-genai",
        title: "AI vs ML vs Deep Learning vs Generative AI",
        objective: "Tell these four nested concepts apart and place AWS services in each.",
        minutes: 8,
        keyTerms: ["Artificial Intelligence", "Machine Learning", "Deep Learning", "Neural Network", "Generative AI"],
        body: `## The nested hierarchy

These terms are often confused. They nest like Russian dolls:

- **Artificial Intelligence (AI)** — the broadest field: any technique that lets machines mimic human intelligence (rules engines, search, planning, ML).
- **Machine Learning (ML)** — a subset of AI where systems *learn patterns from data* instead of being explicitly programmed with rules.
- **Deep Learning (DL)** — a subset of ML using multi-layer **neural networks**. Excels at unstructured data (images, audio, text).
- **Generative AI** — a subset of deep learning that *creates new content* (text, images, code, audio) using **foundation models**.

## Why it matters for the exam

The exam loves "which category does X belong to" questions. Anchor points:

- A spam filter using labeled emails → **ML** (specifically supervised learning).
- Image recognition with a CNN → **Deep Learning**.
- A chatbot writing original paragraphs → **Generative AI**.
- A hand-coded "if temperature > 100 then alert" rule → **AI but not ML** (no learning).

## AWS mapping

- Pre-trained AI services (no ML expertise needed): **Rekognition, Comprehend, Transcribe, Polly, Translate, Textract**.
- Build/train custom ML: **Amazon SageMaker**.
- Generative AI: **Amazon Bedrock**, **Amazon Q**.`,
      },
      {
        id: "l1-2-ml-types",
        title: "Types of Machine Learning",
        objective: "Distinguish supervised, unsupervised, and reinforcement learning with use cases.",
        minutes: 10,
        keyTerms: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Labeled Data", "Clustering"],
        body: `## Three learning paradigms

### Supervised learning
Trained on **labeled data** (input → known output). Two sub-types:
- **Classification** — predict a category (spam/not-spam, fraud/legit).
- **Regression** — predict a continuous number (house price, demand).

### Unsupervised learning
Trained on **unlabeled data**; finds structure on its own:
- **Clustering** — group similar items (customer segments). 
- **Dimensionality reduction** — compress features (PCA).
- **Anomaly detection** — flag outliers.

### Reinforcement learning (RL)
An **agent** learns by trial and error, maximizing a **reward** signal in an environment. Used in robotics, game playing, and recommendation tuning. AWS example: **AWS DeepRacer** teaches RL with a model car.

## Exam tips
- "We have historical data with the answer column" → **supervised**.
- "We don't know the categories ahead of time / find natural groups" → **unsupervised**.
- "Agent, reward, environment, actions" → **reinforcement**.
- **Semi-supervised** = small labeled set + large unlabeled set.`,
      },
      {
        id: "l1-3-ml-lifecycle",
        title: "The Machine Learning Lifecycle",
        objective: "Walk through the end-to-end ML workflow and the AWS tools at each stage.",
        minutes: 11,
        keyTerms: ["Data Collection", "Feature Engineering", "Training", "Evaluation", "Deployment", "Monitoring", "MLOps"],
        body: `## Stages

1. **Business problem framing** — define the goal and success metric.
2. **Data collection** — gather and store data (S3, Glue, Athena).
3. **Data preparation / feature engineering** — clean, transform, label. Tools: **SageMaker Data Wrangler**, **SageMaker Ground Truth** (labeling), **SageMaker Feature Store**.
4. **Model training** — fit the algorithm. **SageMaker Training**, built-in algorithms, or **JumpStart**.
5. **Evaluation** — measure performance on held-out data.
6. **Deployment** — serve predictions via real-time **endpoints**, **batch transform**, or **serverless inference**.
7. **Monitoring** — watch for **data/concept drift**. **SageMaker Model Monitor**.

This continuous loop is **MLOps**. **SageMaker Pipelines** orchestrates it.

## Exam tips
- **Ground Truth** = data labeling.
- **Model Monitor** = drift detection in production.
- **Feature Store** = central, reusable features.
- Overfitting shows as great training accuracy but poor validation accuracy — fix with more data, regularization, or simpler models.`,
      },
      {
        id: "l1-4-metrics",
        title: "Evaluation Metrics",
        objective: "Pick the right metric for classification vs regression problems.",
        minutes: 9,
        keyTerms: ["Accuracy", "Precision", "Recall", "F1 Score", "RMSE", "AUC", "Confusion Matrix"],
        body: `## Classification metrics
Built from the **confusion matrix** (TP, FP, TN, FN):
- **Accuracy** = correct / total. Misleading on imbalanced data.
- **Precision** = TP / (TP + FP). "When we predict positive, how often right?" Use when **false positives are costly** (e.g. flagging legit email as spam).
- **Recall (Sensitivity)** = TP / (TP + FN). "Of actual positives, how many did we catch?" Use when **false negatives are costly** (e.g. disease screening, fraud).
- **F1 score** = harmonic mean of precision & recall. Balances the two.
- **AUC-ROC** = ranking quality across thresholds; 1.0 perfect, 0.5 random.

## Regression metrics
- **MAE** — mean absolute error.
- **MSE / RMSE** — penalizes large errors more (squared).
- **R²** — proportion of variance explained.

## Exam tips
- Imbalanced dataset → don't trust accuracy; look at **precision/recall/F1**.
- "Catching every fraud case matters most" → optimize **recall**.
- "Avoid false alarms" → optimize **precision**.`,
      },
      {
        id: "l1-5-aws-ai-services",
        title: "The AWS AI/ML Service Stack",
        objective: "Match managed AWS AI services to their use cases.",
        minutes: 10,
        keyTerms: ["Rekognition", "Comprehend", "Textract", "Transcribe", "Polly", "Translate", "SageMaker", "Personalize", "Forecast"],
        body: `## Pre-trained AI services (API calls, no ML skills)
- **Rekognition** — image & video analysis (objects, faces, moderation).
- **Comprehend** — NLP: sentiment, entities, key phrases, PII detection.
- **Textract** — extract text/forms/tables from scanned documents.
- **Transcribe** — speech → text.
- **Polly** — text → lifelike speech.
- **Translate** — language translation.
- **Lex** — conversational chatbots (powers Alexa).
- **Kendra** — intelligent enterprise search.
- **Personalize** — real-time recommendations.
- **Forecast** — time-series forecasting.
- **Fraud Detector** — online fraud detection.

## Build-your-own
- **Amazon SageMaker** — full platform to build, train, tune, deploy custom models. **SageMaker Canvas** = no-code ML for analysts.

## Exam tips
Map the verb to the service: "extract text from a PDF invoice" → **Textract**; "is this review positive or negative" → **Comprehend**; "recommend products" → **Personalize**; "predict next quarter sales" → **Forecast**.`,
      },
    ],
  },
  {
    id: "d2-generative-ai",
    number: 2,
    title: "Fundamentals of Generative AI",
    weight: 24,
    summary:
      "Foundation models, tokens and embeddings, the transformer idea, prompt engineering basics, generative use cases, and the AWS generative AI stack (Bedrock, Amazon Q, JumpStart, PartyRock).",
    lessons: [
      {
        id: "l2-1-foundation-models",
        title: "Foundation Models & LLMs",
        objective: "Explain what foundation models are and why they're a paradigm shift.",
        minutes: 9,
        keyTerms: ["Foundation Model", "Large Language Model", "Pre-training", "Transformer", "Multimodal"],
        body: `## What is a foundation model (FM)?
A large model **pre-trained on massive, broad data** that can be adapted to many downstream tasks. Instead of training one model per task, you take one FM and prompt, fine-tune, or augment it.

- **LLMs** (large language models) are FMs specialized for text.
- **Multimodal** models handle multiple input/output types (text + image + audio).
- Most modern FMs use the **transformer** architecture, whose **self-attention** mechanism weighs how words relate to each other regardless of distance.

## Key properties
- **Adaptable** — one model, many tasks.
- **Emergent abilities** — capabilities appear at scale.
- **Expensive to pre-train**, cheap to consume via API.

## AWS mapping
**Amazon Bedrock** gives serverless API access to FMs from Anthropic (Claude), Meta (Llama), Mistral, Cohere, AI21, Stability AI, and Amazon (Titan, Nova) — without managing infrastructure.`,
      },
      {
        id: "l2-2-tokens-embeddings",
        title: "Tokens, Embeddings & Vectors",
        objective: "Understand how models represent text numerically.",
        minutes: 10,
        keyTerms: ["Token", "Embedding", "Vector", "Context Window", "Semantic Search"],
        body: `## Tokens
Models don't read words — they read **tokens** (word fragments). Roughly **1 token ≈ 4 characters ≈ 0.75 words** in English. Pricing and the **context window** (max input + output the model can handle) are measured in tokens.

## Embeddings
An **embedding** turns text (or images) into a **vector** — a list of numbers capturing meaning. Similar meanings land close together in vector space. This powers:
- **Semantic search** (find by meaning, not keyword)
- **RAG** (retrieval augmented generation)
- **Clustering / recommendation**

## Vector databases
Embeddings are stored in **vector databases** for fast similarity search. On AWS: **OpenSearch Serverless**, **Aurora pgvector**, **Amazon Kendra**, **Neptune**, **DocumentDB**, **MemoryDB**.

## AWS mapping
**Amazon Titan Embeddings** and **Cohere Embed** (on Bedrock) generate embeddings.

## Exam tips
- Large document won't fit? → it exceeds the **context window**.
- "Search by meaning" → **embeddings + vector DB**.`,
      },
      {
        id: "l2-3-prompt-engineering",
        title: "Prompt Engineering Basics",
        objective: "Apply zero-shot, few-shot, and chain-of-thought prompting.",
        minutes: 11,
        keyTerms: ["Zero-shot", "Few-shot", "Chain-of-Thought", "System Prompt", "Temperature", "Prompt Injection"],
        body: `## Prompting techniques
- **Zero-shot** — ask with no examples.
- **Few-shot** — include a few input/output examples to steer format/behavior.
- **Chain-of-thought (CoT)** — ask the model to "think step by step" for reasoning tasks.
- **System prompt** — sets persona, rules, and guardrails before the user turn.

## Inference parameters
- **Temperature** — randomness. Low (0–0.3) = focused/deterministic; high = creative/varied.
- **Top-p / Top-k** — nucleus/sampling controls on token choice.
- **Max tokens** — caps response length.

## Risks
- **Prompt injection** — malicious input overrides instructions.
- **Jailbreaking** — tricking the model past its guardrails.
Mitigate with **Bedrock Guardrails**, input validation, and least-privilege design.

## Exam tips
- Want consistent, factual output → **lower temperature**.
- Need a specific output format → **few-shot examples**.
- Complex reasoning → **chain-of-thought**.`,
      },
      {
        id: "l2-4-genai-use-cases",
        title: "Generative AI Use Cases & Limitations",
        objective: "Identify good fits for generative AI and its risks.",
        minutes: 8,
        keyTerms: ["Summarization", "Code Generation", "Hallucination", "Nondeterminism", "Image Generation"],
        body: `## Strong use cases
- Text **summarization** and drafting
- **Chatbots** & virtual assistants
- **Code generation** (Amazon Q Developer)
- **Image generation** (Stability AI, Titan Image, Nova Canvas)
- **Translation**, content personalization, semantic search

## Limitations & risks
- **Hallucination** — confidently wrong output.
- **Nondeterminism** — same prompt can give different answers.
- **Knowledge cutoff** — no awareness of events after training (fix with RAG).
- **Bias & toxicity** inherited from training data.
- **Cost & latency** scale with model size and tokens.

## When NOT to use generative AI
Deterministic math, exact lookups, or tasks needing guaranteed-correct single answers are better served by traditional code or classic ML.`,
      },
      {
        id: "l2-5-aws-genai-stack",
        title: "The AWS Generative AI Stack",
        objective: "Map Bedrock, Amazon Q, SageMaker JumpStart, and PartyRock to roles.",
        minutes: 10,
        keyTerms: ["Amazon Bedrock", "Amazon Q", "SageMaker JumpStart", "PartyRock", "Bedrock Agents"],
        body: `## The three layers (AWS's own framing)
1. **Infrastructure for training/inference** — Trainium, Inferentia, SageMaker.
2. **Tools to build with FMs** — **Amazon Bedrock** (serverless FM API, Knowledge Bases, Agents, Guardrails).
3. **Applications that use FMs** — **Amazon Q** (Business & Developer).

## Key services
- **Amazon Bedrock** — fully managed, serverless access to multiple FMs through one API. No infrastructure to manage. Supports fine-tuning, RAG (Knowledge Bases), Agents, Guardrails, and model evaluation.
- **Amazon Q Business** — generative AI assistant over your company data.
- **Amazon Q Developer** — AI coding assistant in the IDE/CLI.
- **SageMaker JumpStart** — hub of pre-trained models & solution templates you deploy into your own account.
- **PartyRock** — no-code playground to build/share generative AI apps (great for learning).

## Exam tips
- "Serverless access to many FMs via one API" → **Bedrock**.
- "Chat with my enterprise documents" → **Amazon Q Business**.
- "Code completion in IDE" → **Amazon Q Developer**.
- "Deploy an open model into my account" → **JumpStart**.`,
      },
    ],
  },
  {
    id: "d3-foundation-models",
    number: 3,
    title: "Applications of Foundation Models",
    weight: 28,
    summary:
      "The biggest domain: choosing models, RAG, the customization spectrum (prompt → RAG → fine-tune), Bedrock Agents and Knowledge Bases, and model evaluation.",
    lessons: [
      {
        id: "l3-1-selecting-models",
        title: "Selecting a Foundation Model",
        objective: "Weigh cost, latency, modality, and context window when choosing an FM.",
        minutes: 10,
        keyTerms: ["Modality", "Context Window", "Latency", "Cost", "Model Size", "Benchmarks"],
        body: `## Selection criteria
- **Modality** — text only? images? multimodal?
- **Context window size** — how much input fits at once.
- **Latency & throughput** — real-time chat vs batch.
- **Cost** — priced per input/output token; bigger isn't always better.
- **Accuracy / quality** — measured via benchmarks and your own evaluation.
- **Customizability** — can you fine-tune it?
- **Licensing** — usage terms and restrictions.

## Practical guidance
Start with the **smallest model that meets quality needs** to control cost and latency, then scale up only if needed. Use **Bedrock model evaluation** to compare candidates on your data.

## Exam tips
- "Reduce cost without losing much quality" → choose a **smaller / distilled** model.
- "Need to process very long documents" → larger **context window**.`,
      },
      {
        id: "l3-2-customization-spectrum",
        title: "Customization Spectrum: Prompt → RAG → Fine-tune",
        objective: "Choose the right customization approach by cost and need.",
        minutes: 12,
        keyTerms: ["Prompt Engineering", "RAG", "Fine-tuning", "Continued Pre-training", "Instruction Tuning"],
        body: `## From cheapest/fastest to most expensive
1. **Prompt engineering** — change the prompt only. Cheapest. Try first.
2. **Retrieval Augmented Generation (RAG)** — inject your *current* data at query time. No retraining. Best for **fresh, factual, proprietary knowledge**.
3. **Fine-tuning** — further train the model on **labeled** examples to change *style, tone, or task behavior*. Needs data + compute.
4. **Continued pre-training** — train on large **unlabeled** domain data to add domain knowledge. Most expensive.

## How to choose
- Need up-to-date facts / internal docs / cite sources → **RAG**.
- Need a consistent voice/format or a narrow task → **fine-tuning**.
- Model lacks whole-domain vocabulary (legal, medical) → **continued pre-training**.
- Just need better output now → **prompt engineering**.

## Exam tips
RAG does **not** change the model's weights — it augments the prompt with retrieved context. Fine-tuning **does** change weights and needs labeled data.`,
      },
      {
        id: "l3-3-rag",
        title: "Retrieval Augmented Generation (RAG)",
        objective: "Explain RAG end-to-end and the AWS services that implement it.",
        minutes: 11,
        keyTerms: ["RAG", "Knowledge Bases", "Vector Store", "Embeddings", "OpenSearch", "Grounding"],
        body: `## How RAG works
1. **Ingest** documents → split into chunks → create **embeddings** → store in a **vector database**.
2. **At query time**: embed the user's question, **retrieve** the most similar chunks.
3. **Augment** the prompt with those chunks and send to the FM.
4. Model answers **grounded** in your data, reducing hallucination and enabling citations.

## Why RAG
- Keeps answers **current** without retraining.
- Adds **proprietary/private** knowledge.
- Provides **source attribution**.

## AWS mapping
- **Bedrock Knowledge Bases** — managed RAG: connects an S3 data source to a vector store and wires retrieval automatically.
- **Vector stores**: **OpenSearch Serverless**, **Aurora PostgreSQL pgvector**, **Pinecone**, **Redis/MemoryDB**.
- **Amazon Kendra** — managed intelligent search that can feed RAG.

## Exam tips
"Chatbot must answer from our internal PDFs and stay up to date" → **RAG via Bedrock Knowledge Bases**, not fine-tuning.`,
      },
      {
        id: "l3-4-agents",
        title: "Bedrock Agents & Tool Use",
        objective: "Describe how agents let FMs take actions through APIs.",
        minutes: 9,
        keyTerms: ["Bedrock Agents", "Action Groups", "Orchestration", "Tool Use", "Lambda"],
        body: `## What agents do
A plain FM only generates text. **Agents** let an FM **plan and take actions** — call APIs, query databases, run multi-step tasks — to fulfill a request.

- **Action groups** define the available tools/APIs (often backed by **AWS Lambda**).
- The agent **orchestrates**: interprets the goal, decides which tools to call, chains steps, and returns a result.
- Can combine with **Knowledge Bases** so the agent both retrieves info and acts.

## Example
"Book me the cheapest flight under \$300" → agent searches (tool), compares, then books (tool), then confirms.

## Exam tips
- "Model needs to *do* something (call an API / complete a task), not just answer" → **Agents**.
- Action groups commonly invoke **Lambda** functions.`,
      },
      {
        id: "l3-5-evaluation-guardrails",
        title: "Model Evaluation & Guardrails",
        objective: "Evaluate FM output quality and enforce safety with guardrails.",
        minutes: 10,
        keyTerms: ["Model Evaluation", "Human Evaluation", "Automatic Metrics", "Bedrock Guardrails", "BLEU", "ROUGE"],
        body: `## Evaluating generative output
- **Automatic metrics**: **ROUGE** (summarization), **BLEU** (translation), perplexity, accuracy on benchmarks.
- **Human evaluation**: people rate relevance, helpfulness, tone — essential where metrics fall short.
- **Bedrock Model Evaluation** supports both automatic and human-in-the-loop comparisons across models.

## Guardrails
**Amazon Bedrock Guardrails** enforce safety policies independent of the model:
- Block **denied topics**.
- Filter **harmful content** (hate, violence, sexual, insults).
- Redact or block **PII**.
- **Contextual grounding** checks to reduce hallucination.
- Word/profanity filters.

## Exam tips
- "Summarization quality metric" → **ROUGE**. "Translation quality" → **BLEU**.
- "Block certain topics / filter harmful content / redact PII regardless of model" → **Bedrock Guardrails**.`,
      },
    ],
  },
  {
    id: "d4-responsible-ai",
    number: 4,
    title: "Guidelines for Responsible AI",
    weight: 14,
    summary:
      "Bias and fairness, explainability and transparency, the dimensions of responsible AI, and AWS tools: SageMaker Clarify, Model Monitor, Bedrock Guardrails, and AI Service Cards.",
    lessons: [
      {
        id: "l4-1-dimensions",
        title: "Dimensions of Responsible AI",
        objective: "Recall the core principles AWS uses to frame responsible AI.",
        minutes: 8,
        keyTerms: ["Fairness", "Explainability", "Robustness", "Privacy", "Transparency", "Governance"],
        body: `## AWS responsible AI dimensions
- **Fairness** — avoid unfair bias across groups.
- **Explainability** — understand *why* a model made a decision.
- **Robustness** — reliable under varied/adversarial conditions.
- **Privacy & security** — protect data and individuals.
- **Transparency** — be open about capabilities and limits (e.g. **AI Service Cards**).
- **Governance** — policies, oversight, accountability.
- **Veracity & safety** — accurate, non-harmful output.
- **Controllability** — humans can monitor and steer the system.

## Exam tips
Match the scenario to the principle: "users deserve to know how a loan decision was made" → **explainability/transparency**; "model treats demographic groups unequally" → **fairness/bias**.`,
      },
      {
        id: "l4-2-bias-fairness",
        title: "Bias, Fairness & SageMaker Clarify",
        objective: "Identify bias sources and how Clarify detects them.",
        minutes: 10,
        keyTerms: ["Bias", "Sampling Bias", "Fairness Metrics", "SageMaker Clarify", "Feature Attribution"],
        body: `## Where bias comes from
- **Data bias** — unrepresentative or skewed training data (**sampling bias**).
- **Labeling bias** — subjective or inconsistent human labels.
- **Algorithmic / feedback bias** — model amplifies existing patterns over time.

## SageMaker Clarify
- Detects **bias** before and after training using fairness metrics (e.g. class imbalance, difference in positive prediction rates).
- Provides **explainability** via **feature attribution** (SHAP) — which features drove a prediction.

## Exam tips
- "Detect bias in the dataset/model" and "explain feature importance" → **SageMaker Clarify**.
- Bias can enter at **any** lifecycle stage; mitigation includes diverse data, re-sampling, and ongoing monitoring.`,
      },
      {
        id: "l4-3-explainability-transparency",
        title: "Explainability & Transparency Tools",
        objective: "Differentiate interpretable models from explainability techniques and AWS transparency resources.",
        minutes: 9,
        keyTerms: ["Interpretability", "Explainability", "AI Service Cards", "Model Cards", "SHAP", "Black Box"],
        body: `## Interpretable vs explainable
- **Interpretable models** (linear/decision trees) are transparent by design but often less accurate.
- **Black-box models** (deep nets) are accurate but opaque; we add **explainability** techniques (e.g. **SHAP**) to approximate reasoning.
- There's often a **trade-off** between accuracy and interpretability.

## AWS transparency resources
- **AWS AI Service Cards** — documentation of intended use, limitations, and responsible-use guidance for AWS AI services.
- **SageMaker Model Cards** — record a model's purpose, training data, metrics, and approvals for governance.

## Exam tips
- "Document a model's intended use & limitations for governance" → **Model Cards**.
- "AWS's published responsible-use docs for a managed AI service" → **AI Service Cards**.`,
      },
      {
        id: "l4-4-monitoring-genai-risks",
        title: "Monitoring & Generative AI Risks",
        objective: "Manage drift, hallucination, and toxicity in production.",
        minutes: 9,
        keyTerms: ["Model Monitor", "Data Drift", "Concept Drift", "Hallucination", "Toxicity", "Guardrails"],
        body: `## Production monitoring
- **Data drift** — input distribution changes over time.
- **Concept drift** — the relationship between inputs and target changes.
- **SageMaker Model Monitor** detects drift and data-quality issues on live endpoints and can alert via CloudWatch.

## Generative-specific risks
- **Hallucination** — fabricated facts. Mitigate with **RAG / contextual grounding**.
- **Toxicity / harmful content** — mitigate with **Bedrock Guardrails**.
- **Intellectual property & plagiarism** concerns.
- **Prompt injection / data leakage**.

## Exam tips
- "Production model accuracy degrading over weeks" → **drift**, use **Model Monitor**.
- "Stop the chatbot producing toxic or off-topic answers" → **Guardrails**.`,
      },
    ],
  },
  {
    id: "d5-security-governance",
    number: 5,
    title: "Security, Compliance & Governance for AI Solutions",
    weight: 14,
    summary:
      "Securing AI workloads with IAM, KMS, and VPC; data governance and privacy; the shared responsibility model; and compliance/audit tooling (CloudTrail, Config, Macie, model invocation logging).",
    lessons: [
      {
        id: "l5-1-securing-ai",
        title: "Securing AI Workloads (IAM, KMS, VPC)",
        objective: "Apply core AWS security controls to AI services.",
        minutes: 10,
        keyTerms: ["IAM", "Least Privilege", "KMS", "Encryption", "VPC Endpoints", "PrivateLink"],
        body: `## Core controls
- **IAM** — identity & access. Apply **least privilege**; use **roles** not long-lived keys.
- **KMS** — manage encryption keys. Encrypt data **at rest**; TLS protects data **in transit**.
- **VPC endpoints (PrivateLink)** — keep traffic to **Bedrock/SageMaker** on the AWS private network, off the public internet.
- **S3 bucket policies / Block Public Access** — protect training data.
- **Secrets Manager** — store API keys/credentials, never hardcode.

## Bedrock/SageMaker specifics
- Bedrock data is **not** used to train base models and stays in your account/region.
- SageMaker supports **VPC isolation**, encrypted volumes, and network isolation for training jobs.

## Exam tips
- "Access Bedrock without traversing the public internet" → **VPC endpoint / PrivateLink**.
- "Grant only the permissions needed" → **least-privilege IAM**.`,
      },
      {
        id: "l5-2-data-governance-privacy",
        title: "Data Governance & Privacy",
        objective: "Handle PII, data lineage, and dataset governance responsibly.",
        minutes: 9,
        keyTerms: ["PII", "Amazon Macie", "Data Lineage", "Comprehend PII", "Data Residency", "Retention"],
        body: `## Protecting sensitive data
- **Amazon Macie** — discovers and classifies **PII** in S3.
- **Comprehend** — detects/redacts PII in text.
- **Bedrock Guardrails** — redacts PII in prompts/responses.
- Enforce **data residency** (region) and **retention** policies.

## Data governance concepts
- **Data lineage** — track where data came from and how it was transformed.
- **Data cataloging** — **AWS Glue Data Catalog**.
- **Quality & curation** — accurate, representative, consented data.

## Exam tips
- "Scan S3 for personal data" → **Macie**.
- "Redact PII from documents/text" → **Comprehend** (or Guardrails for FM I/O).`,
      },
      {
        id: "l5-3-shared-responsibility-compliance",
        title: "Shared Responsibility & Compliance",
        objective: "Apply the shared responsibility model and find compliance evidence.",
        minutes: 9,
        keyTerms: ["Shared Responsibility Model", "AWS Artifact", "Compliance Programs", "HIPAA", "GDPR", "SOC"],
        body: `## Shared responsibility model
- **AWS** is responsible for security **OF** the cloud (hardware, global infrastructure, managed-service availability).
- **You** are responsible for security **IN** the cloud (your data, IAM config, encryption choices, access policies).

For managed AI services AWS handles more of the stack, but **your data, access control, and usage** remain yours.

## Compliance
- **AWS Artifact** — self-service portal for compliance reports (SOC, ISO, PCI).
- AWS supports programs like **HIPAA, GDPR, SOC, ISO, FedRAMP** — but *using* a compliant service doesn't make *your app* compliant; configuration matters.

## Exam tips
- "Where do I download a SOC 2 report?" → **AWS Artifact**.
- "Who secures the physical data center?" → **AWS**. "Who secures my IAM policies and data?" → **you**.`,
      },
      {
        id: "l5-4-audit-governance",
        title: "Auditing, Logging & Governance",
        objective: "Use AWS tools to audit and govern AI activity.",
        minutes: 9,
        keyTerms: ["CloudTrail", "AWS Config", "Model Invocation Logging", "CloudWatch", "Governance"],
        body: `## Audit & monitoring tools
- **AWS CloudTrail** — records **API calls / who did what** across the account (audit trail).
- **AWS Config** — tracks **resource configuration** changes and compliance over time.
- **Amazon CloudWatch** — metrics, logs, alarms for operational monitoring.
- **Bedrock Model Invocation Logging** — capture model **prompts and responses** to S3/CloudWatch for audit and analysis.

## Governance practices
- Define usage policies, approval workflows, and **Model Cards** for accountability.
- Tag resources for cost and ownership tracking.

## Exam tips
- "Who called which API and when?" → **CloudTrail**.
- "Did a resource drift from its compliant config?" → **AWS Config**.
- "Log every Bedrock prompt/response for audit" → **Model Invocation Logging**.`,
      },
    ],
  },
];

/** Flat lookup helpers. */
export function getDomain(id: string): Domain | undefined {
  return CURRICULUM.find((d) => d.id === id);
}

export function getLesson(lessonId: string) {
  for (const d of CURRICULUM) {
    const l = d.lessons.find((x) => x.id === lessonId);
    if (l) return { domain: d, lesson: l };
  }
  return undefined;
}

export function allLessons() {
  return CURRICULUM.flatMap((d) => d.lessons.map((l) => ({ domain: d, lesson: l })));
}

export const TOTAL_LESSONS = CURRICULUM.reduce((n, d) => n + d.lessons.length, 0);
