export interface Question {
  id: string;
  question: string;
  options: { label: string; value: string; score: number }[];
}

export const questions: Question[] = [
  {
    id: "glp1_status",
    question: "Are you currently taking or planning to take a GLP-1 medication?",
    options: [
      { label: "Yes, currently taking (Ozempic, Wegovy, Mounjaro, Zepbound, or similar)", value: "current", score: 3 },
      { label: "Planning to start soon", value: "planning", score: 2 },
      { label: "Recently stopped taking one", value: "stopped", score: 2 },
      { label: "No, not on a GLP-1", value: "no", score: 0 },
    ],
  },
  {
    id: "duration",
    question: "How long have you been on GLP-1 therapy?",
    options: [
      { label: "Less than 3 months", value: "lt3", score: 1 },
      { label: "3-6 months", value: "3to6", score: 2 },
      { label: "6-12 months", value: "6to12", score: 3 },
      { label: "Over 12 months", value: "gt12", score: 3 },
      { label: "Not applicable", value: "na", score: 0 },
    ],
  },
  {
    id: "weight_loss",
    question: "How much weight have you lost since starting GLP-1 therapy?",
    options: [
      { label: "Less than 10 lbs", value: "lt10", score: 1 },
      { label: "10-25 lbs", value: "10to25", score: 2 },
      { label: "25-50 lbs", value: "25to50", score: 3 },
      { label: "More than 50 lbs", value: "gt50", score: 4 },
      { label: "Haven't started yet", value: "na", score: 0 },
    ],
  },
  {
    id: "exercise",
    question: "How often do you do resistance/strength training?",
    options: [
      { label: "3+ times per week", value: "frequent", score: 0 },
      { label: "1-2 times per week", value: "moderate", score: 1 },
      { label: "Rarely or never", value: "rare", score: 3 },
      { label: "I do cardio but no resistance training", value: "cardio_only", score: 2 },
    ],
  },
  {
    id: "protein",
    question: "How would you describe your protein intake?",
    options: [
      { label: "I track it and hit 0.7-1g per pound of body weight daily", value: "optimal", score: 0 },
      { label: "I try to eat protein but don't track it", value: "moderate", score: 2 },
      { label: "I eat less since starting GLP-1s (reduced appetite)", value: "reduced", score: 3 },
      { label: "I'm not sure", value: "unsure", score: 2 },
    ],
  },
  {
    id: "symptoms",
    question: "Have you experienced any of these since starting GLP-1 therapy?",
    options: [
      { label: "Muscle weakness or fatigue", value: "weakness", score: 3 },
      { label: "Joint pain or stiffness", value: "joint_pain", score: 2 },
      { label: "A gout attack or toe/foot pain", value: "gout", score: 3 },
      { label: "None of the above", value: "none", score: 0 },
    ],
  },
  {
    id: "dexa",
    question: "Have you had a DEXA scan or bone density test since starting GLP-1 therapy?",
    options: [
      { label: "Yes, within the past 6 months", value: "recent", score: 0 },
      { label: "Yes, but over 6 months ago", value: "old", score: 1 },
      { label: "No, never", value: "never", score: 3 },
      { label: "What's a DEXA scan?", value: "unknown", score: 3 },
    ],
  },
  {
    id: "age",
    question: "What is your age range?",
    options: [
      { label: "Under 40", value: "under40", score: 1 },
      { label: "40-55", value: "40to55", score: 2 },
      { label: "55-65", value: "55to65", score: 3 },
      { label: "Over 65", value: "over65", score: 4 },
    ],
  },
];

export type RiskLevel = "high" | "moderate" | "lower";

export interface AssessmentResult {
  level: RiskLevel;
  score: number;
  title: string;
  description: string;
  recommendation: string;
}

export function calculateResult(answers: Record<string, number>): AssessmentResult {
  const total = Object.values(answers).reduce((sum, s) => sum + s, 0);

  if (total >= 16) {
    return {
      level: "high",
      score: total,
      title: "High Risk — You Should Be Monitored",
      description:
        "Based on your responses, you have significant risk factors for musculoskeletal complications from GLP-1 therapy. You're likely losing muscle and bone along with fat, and without monitoring and intervention, this could lead to sarcopenia, osteoporosis, fractures, or gout.",
      recommendation:
        "We strongly recommend a comprehensive MSK assessment with MetaOrtho. A board-certified orthopedic surgeon will evaluate your musculoskeletal health, order baseline labs and imaging, and create a personalized protection plan.",
    };
  } else if (total >= 9) {
    return {
      level: "moderate",
      score: total,
      title: "Moderate Risk — Monitoring Recommended",
      description:
        "Your responses indicate moderate risk for musculoskeletal side effects from GLP-1 therapy. While you may have some protective factors, there are gaps in your current care that could lead to bone or muscle loss over time.",
      recommendation:
        "A baseline MSK assessment would give you data-driven clarity on your bone density, muscle composition, and nutritional status. This is especially valuable if you plan to continue GLP-1 therapy long-term.",
    };
  } else {
    return {
      level: "lower",
      score: total,
      title: "Lower Risk — Stay Proactive",
      description:
        "Based on your current profile, your immediate risk appears lower. However, musculoskeletal risks from GLP-1 therapy accumulate over time, and even patients with good exercise and nutrition habits can develop bone and muscle loss without monitoring.",
      recommendation:
        "Consider a baseline DEXA scan and lab panel to establish your starting point. If you continue GLP-1 therapy for 6+ months, periodic monitoring becomes increasingly important.",
    };
  }
}
