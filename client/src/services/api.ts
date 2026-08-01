import type { ChatMessage, ReportSummary } from "@/types/report";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || `Request failed with ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function uploadReport(file: File, language: string): Promise<ReportSummary> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("language", language);

  const response = await fetch(`${API_BASE_URL}/api/report/upload`, {
    method: "POST",
    body: formData
  });

  return parseResponse<ReportSummary>(response);
}

export async function fetchReportHistory(): Promise<ReportSummary[]> {
  const response = await fetch(`${API_BASE_URL}/api/report/history`);
  return parseResponse<ReportSummary[]>(response);
}

export async function sendChatMessage(messages: ChatMessage[]): Promise<ChatMessage> {
  const response = await fetch(`${API_BASE_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ messages })
  });

  return parseResponse<ChatMessage>(response);
}

