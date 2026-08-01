"use client";

import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { sendChatMessage } from "@/services/api";
import type { ChatMessage } from "@/types/report";

export function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Ask me what a medical term means. I can explain it in simple language."
    }
  ]);
  const [input, setInput] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) {
      return;
    }

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");

    try {
      const reply = await sendChatMessage(nextMessages);
      setMessages([...nextMessages, reply]);
    } catch {
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: "I could not reach the AI service. Please try again after the backend is running."
        }
      ]);
    }
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <div className="mb-4 flex items-center gap-2">
        <MessageCircle className="h-5 w-5 text-brand" />
        <h3 className="text-lg font-semibold text-ink">AI terminology chat</h3>
      </div>
      <div className="mb-4 max-h-72 space-y-3 overflow-y-auto rounded-md bg-slate-50 p-3">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`rounded-md px-3 py-2 text-sm ${
              message.role === "user" ? "ml-auto bg-brand text-white" : "mr-auto bg-white text-slate-700"
            } max-w-[85%]`}
          >
            {message.content}
          </div>
        ))}
      </div>
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <input
          className="min-w-0 flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm"
          placeholder="What does MCV mean?"
          suppressHydrationWarning
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-brand text-white"
          suppressHydrationWarning
          type="submit"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </section>
  );
}
