import { Activity, History, MessageCircle, Settings, UploadCloud } from "lucide-react";

type ShellProps = {
  children: React.ReactNode;
};

const navItems = [
  { label: "Dashboard", icon: Activity },
  { label: "Upload", icon: UploadCloud },
  { label: "History", icon: History },
  { label: "AI Chat", icon: MessageCircle },
  { label: "Settings", icon: Settings }
];

export function Shell({ children }: ShellProps) {
  return (
    <main className="min-h-screen bg-surface">
      <aside className="fixed left-0 top-0 hidden h-full w-64 border-r border-slate-200 bg-white px-5 py-6 lg:block">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">MediLens AI</p>
          <h1 className="mt-2 text-2xl font-bold text-ink">Health reports, made clear.</h1>
        </div>
        <nav className="space-y-1">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium ${
                  index === 0 ? "bg-teal-50 text-brand" : "text-slate-600 hover:bg-slate-50"
                }`}
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
              <h2 className="text-xl font-bold text-ink">Report Intelligence Dashboard</h2>
            </div>
            <select
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
              suppressHydrationWarning
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Telugu</option>
              <option>Tamil</option>
            </select>
          </div>
        </header>
        {children}
      </section>
    </main>
  );
}
