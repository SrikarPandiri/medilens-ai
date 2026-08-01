"use client";

import { useState } from "react";
import { Clock, Languages, ShieldCheck } from "lucide-react";
import { ChatPanel } from "@/components/ChatPanel";
import { ReportDashboard } from "@/components/ReportDashboard";
import { AppView, Shell } from "@/components/Shell";
import { UploadPanel } from "@/components/UploadPanel";
import type { ReportSummary } from "@/types/report";

export default function Home() {
  const [activeView, setActiveView] = useState<AppView>("dashboard");
  const [report, setReport] = useState<ReportSummary | null>(null);
  const reports = report ? [report] : [];

  function handleAnalyzed(nextReport: ReportSummary) {
    setReport(nextReport);
    setActiveView("dashboard");
  }

  function renderView() {
    if (activeView === "upload") {
      return (
        <section className="max-w-3xl">
          <UploadPanel onAnalyzed={handleAnalyzed} />
        </section>
      );
    }

    if (activeView === "history") {
      return (
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
          <div className="mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-brand" />
            <h3 className="text-lg font-semibold text-ink">Recent reports</h3>
          </div>
          {reports.length === 0 ? (
            <p className="text-sm text-slate-500">No reports uploaded in this session yet.</p>
          ) : (
            <div className="space-y-3">
              {reports.map((item) => (
                <button
                  key={item.id}
                  className="flex w-full items-center justify-between rounded-lg border border-slate-200 p-4 text-left hover:border-brand"
                  onClick={() => setActiveView("dashboard")}
                  type="button"
                >
                  <span>
                    <span className="block font-semibold text-ink">{item.patientName ?? "Uploaded report"}</span>
                    <span className="text-sm text-slate-500">{item.reportDate ?? "Date unavailable"} · {item.tests.length} parameters</span>
                  </span>
                  <span className="text-sm font-semibold text-brand">Open</span>
                </button>
              ))}
            </div>
          )}
        </section>
      );
    }

    if (activeView === "chat") {
      return <ChatPanel />;
    }

    if (activeView === "settings") {
      return (
        <section className="grid gap-5 md:grid-cols-2">
          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
            <div className="mb-3 flex items-center gap-2">
              <Languages className="h-5 w-5 text-brand" />
              <h3 className="text-lg font-semibold text-ink">Language</h3>
            </div>
            <select className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm">
              <option>English</option>
              <option>Hindi</option>
              <option>Telugu</option>
              <option>Tamil</option>
              <option>Kannada</option>
            </select>
          </article>
          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
            <div className="mb-3 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-brand" />
              <h3 className="text-lg font-semibold text-ink">Safety</h3>
            </div>
            <p className="text-sm leading-6 text-slate-600">
              MediLens AI explains reports for education only. It does not diagnose conditions or prescribe medicine.
            </p>
          </article>
        </section>
      );
    }

    return (
      <>
        <div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
          <UploadPanel onAnalyzed={handleAnalyzed} />
          <ChatPanel />
        </div>
        <ReportDashboard report={report} />
      </>
    );
  }

  return (
    <Shell activeView={activeView} onViewChange={setActiveView}>
      <div className="mx-auto grid max-w-6xl gap-5 px-5 py-6">
        {renderView()}
      </div>
    </Shell>
  );
}
