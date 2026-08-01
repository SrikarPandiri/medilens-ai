export type TestStatus = "low" | "normal" | "high" | "unknown";

export type ExtractedTest = {
  name: string;
  value: string;
  unit?: string;
  referenceRange?: string;
  status: TestStatus;
  explanation: string;
};

export type ReportSummary = {
  id: string;
  patientName?: string;
  reportDate?: string;
  language: string;
  tests: ExtractedTest[];
  summary: string;
  lifestyleTips: string[];
  disclaimer: string;
};

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

