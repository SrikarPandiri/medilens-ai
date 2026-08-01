"use client";

import { useState } from "react";
import { FileUp, Loader2 } from "lucide-react";
import { uploadReport } from "@/services/api";
import type { ReportSummary } from "@/types/report";

type UploadPanelProps = {
  onAnalyzed: (report: ReportSummary) => void;
};

export function UploadPanel({ onAnalyzed }: UploadPanelProps) {
  const [file, setFile] = useState<File | null>(null);
  const [language, setLanguage] = useState("English");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) {
      setError("Choose a PDF or image report first.");
      return;
    }

    setError(null);
    setIsUploading(true);
    try {
      const report = await uploadReport(file, language);
      onAnalyzed(report);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to analyze report.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <form className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft" onSubmit={handleSubmit}>
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-md bg-teal-50 p-2 text-brand">
          <FileUp className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-ink">Upload report</h3>
          <p className="text-sm text-slate-500">PDF, PNG, or JPG lab reports are supported.</p>
        </div>
      </div>
      <label className="flex min-h-36 cursor-pointer items-center justify-center rounded-md border border-dashed border-slate-300 bg-slate-50 px-4 text-center hover:border-brand">
        <input
          accept=".pdf,image/png,image/jpeg"
          className="sr-only"
          suppressHydrationWarning
          type="file"
          onChange={(event) => setFile(event.target.files?.[0] ?? null)}
        />
        <span className="text-sm font-medium text-slate-600">{file ? file.name : "Choose a report file"}</span>
      </label>
      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
        <select
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
          suppressHydrationWarning
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
        >
          <option>English</option>
          <option>Hindi</option>
          <option>Telugu</option>
          <option>Tamil</option>
          <option>Kannada</option>
        </select>
        <button
          className="inline-flex items-center justify-center gap-2 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isUploading}
          suppressHydrationWarning
          type="submit"
        >
          {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileUp className="h-4 w-4" />}
          Analyze
        </button>
      </div>
      {error ? <p className="mt-3 text-sm font-medium text-red-600">{error}</p> : null}
    </form>
  );
}
