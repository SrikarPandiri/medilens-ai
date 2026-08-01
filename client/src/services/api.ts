import type { ChatMessage, ReportSummary } from "@/types/report";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || `Request failed with ${response.status}`);
  }

  return response.json() as Promise<T>;
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, init);
    return parseResponse<T>(response);
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(`Could not reach the MediLens API at ${API_BASE_URL}. Check the backend deployment URL and CORS settings.`);
    }

    throw error;
  }
}

export async function uploadReport(file: File, language: string): Promise<ReportSummary> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("language", language);

  return request<ReportSummary>(`${API_BASE_URL}/api/report/upload`, {
    method: "POST",
    body: formData
  });
}

export async function fetchReportHistory(): Promise<ReportSummary[]> {
  return request<ReportSummary[]>(`${API_BASE_URL}/api/report/history`);
}

export async function sendChatMessage(messages: ChatMessage[]): Promise<ChatMessage> {
  return request<ChatMessage>(`${API_BASE_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ messages })
  });
}
