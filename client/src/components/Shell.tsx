import { Activity, History, MessageCircle, Settings, UploadCloud } from "lucide-react";

export type AppView = "dashboard" | "upload" | "history" | "chat" | "settings";

type ShellProps = {
  activeView: AppView;
  children: React.ReactNode;
  onViewChange: (view: AppView) => void;
};

const navItems = [
  { label: "Dashboard", view: "dashboard", icon: Activity },
  { label: "Upload", view: "upload", icon: UploadCloud },
  { label: "History", view: "history", icon: History },
  { label: "AI Chat", view: "chat", icon: MessageCircle },
  { label: "Settings", view: "settings", icon: Settings }
] satisfies Array<{
  label: string;
  view: AppView;
  icon: typeof Activity;
}>;

const viewTitles: Record<AppView, string> = {
  dashboard: "Report Intelligence Dashboard",
  upload: "Upload Report",
  history: "Report History",
  chat: "AI Terminology Chat",
  settings: "Settings"
};

const languageOptions = [
  "English",
  "Hindi",
  "Telugu",
  "Tamil"
];

export function Shell({ activeView, children, onViewChange }: ShellProps) {
  return (
    <main className="min-h-screen bg-surface">
      <aside className="fixed left-0 top-0 hidden h-full w-64 border-r border-slate-200 bg-white px-5 py-6 lg:block">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">MediLens AI</p>
          <h1 className="mt-2 text-2xl font-bold text-ink">Health reports, made clear.</h1>
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.view === activeView;
            return (
              <button
                key={item.label}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium ${
                  isActive ? "bg-teal-50 text-brand" : "text-slate-600 hover:bg-slate-50"
                }`}
                onClick={() => onViewChange(item.view)}
                suppressHydrationWarning
                type="button"
              >
                <Icon aria-hidden="true" className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>
      <section className="lg:pl-64">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 px-5 py-4 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Healthcare AI</p>
              <h2 className="text-xl font-bold text-ink">{viewTitles[activeView]}</h2>
            </div>
            <select
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
              suppressHydrationWarning
            >
              {languageOptions.map((language) => (
                <option key={language}>{language}</option>
              ))}
            </select>
          </div>
          <nav className="mx-auto mt-4 flex max-w-6xl gap-2 overflow-x-auto lg:hidden">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.view === activeView;
              return (
                <button
                  key={item.label}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${
                    isActive ? "bg-teal-50 text-brand" : "bg-white text-slate-600"
                  }`}
                  onClick={() => onViewChange(item.view)}
                  suppressHydrationWarning
                  type="button"
                >
                  <Icon aria-hidden="true" className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </header>
        {children}
      </section>
    </main>
  );
}
