import { AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import type { ReportSummary, TestStatus } from "@/types/report";

type ReportDashboardProps = {
  report: ReportSummary | null;
};

const statusStyles: Record<TestStatus, string> = {
  low: "bg-amber-50 text-amber-700",
  normal: "bg-emerald-50 text-emerald-700",
  high: "bg-rose-50 text-rose-700",
  unknown: "bg-slate-100 text-slate-600"
};

const placeholder: ReportSummary = {
  id: "demo",
  patientName: "Demo Patient",
  reportDate: "Today",
  language: "English",
  summary: "Upload a report to generate a personalized summary. Demo values are shown for layout preview.",
  disclaimer: "This information is educational and is not a medical diagnosis.",
  lifestyleTips: ["Discuss abnormal values with a qualified clinician.", "Track repeat tests over time."],
  tests: [
    {
      name: "Hemoglobin",
      value: "13.4",
      unit: "g/dL",
      referenceRange: "12.0-16.0",
      status: "normal",
      explanation: "Hemoglobin carries oxygen in your blood."
    },
    {
      name: "Vitamin D",
      value: "18",
      unit: "ng/mL",
      referenceRange: "30-100",
      status: "low",
      explanation: "Vitamin D supports bones and immune function."
    },
    {
      name: "LDL Cholesterol",
      value: "142",
      unit: "mg/dL",
      referenceRange: "<100",
      status: "high",
      explanation: "LDL is commonly called bad cholesterol."
    }
  ]
};

export function ReportDashboard({ report }: ReportDashboardProps) {
  const activeReport = report ?? placeholder;
  const chartData = activeReport.tests.map((test) => ({
    name: test.name,
    value: Number.parseFloat(test.value) || 0
  }));

  return (
    <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-ink">Extracted parameters</h3>
            <p className="text-sm text-slate-500">{activeReport.patientName ?? "Patient"} · {activeReport.reportDate ?? "Report date pending"}</p>
          </div>
          <TrendingUp className="h-5 w-5 text-brand" />
        </div>
        <div className="h-64">
          <ResponsiveContainer height="100%" width="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" fontSize={11} tickLine={false} />
              <YAxis fontSize={11} tickLine={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#0f766e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {activeReport.tests.map((test) => (
            <article key={test.name} className="rounded-lg border border-slate-200 p-4">
              <div className="mb-2 flex items-start justify-between gap-3">
                <h4 className="font-semibold text-ink">{test.name}</h4>
                <span className={`rounded-md px-2 py-1 text-xs font-semibold ${statusStyles[test.status]}`}>
                  {test.status}
                </span>
              </div>
              <p className="text-sm text-slate-700">
                <strong>{test.value}</strong> {test.unit} <span className="text-slate-400">| Ref: {test.referenceRange ?? "N/A"}</span>
              </p>
              <p className="mt-2 text-sm text-slate-500">{test.explanation}</p>
            </article>
          ))}
        </div>
      </section>
      <aside className="space-y-5">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
          <div className="mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-brand" />
            <h3 className="text-lg font-semibold text-ink">AI summary</h3>
          </div>
          <p className="text-sm leading-6 text-slate-600">{activeReport.summary}</p>
        </section>
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
          <div className="mb-3 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-coral" />
            <h3 className="text-lg font-semibold text-ink">Notes</h3>
          </div>
          <ul className="space-y-2 text-sm text-slate-600">
            {activeReport.lifestyleTips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
          <p className="mt-4 rounded-md bg-amber-50 p-3 text-xs font-medium text-amber-800">{activeReport.disclaimer}</p>
        </section>
      </aside>
    </div>
  );
}

