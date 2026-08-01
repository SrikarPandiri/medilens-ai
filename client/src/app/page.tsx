"use client";

import { useState } from "react";
import { ChatPanel } from "@/components/ChatPanel";
import { ReportDashboard } from "@/components/ReportDashboard";
import { Shell } from "@/components/Shell";
import { UploadPanel } from "@/components/UploadPanel";
import type { ReportSummary } from "@/types/report";

export default function Home() {
  const [report, setReport] = useState<ReportSummary | null>(null);

  return (
    <Shell>
      <div className="mx-auto grid max-w-6xl gap-5 px-5 py-6">
        <div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
          <UploadPanel onAnalyzed={setReport} />
          <ChatPanel />
        </div>
        <ReportDashboard report={report} />
      </div>
    </Shell>
  );
}

