import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FileDown, Search, FileText } from "lucide-react";

import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { pageHead } from "@/lib/seo";
import { getDownloads } from "@/sanity/fetch";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/downloads")({
  loader: async () => ({ downloads: await getDownloads() }),
  head: () =>
    pageHead({
      title: "Downloads",
      description:
        "Download admission forms, fee structure, date sheets, booklists and other documents from SAGES Sohga.",
      path: "/downloads",
    }),
  component: Downloads,
});

function Downloads() {
  const { downloads } = Route.useLoaderData();
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(downloads.map((d) => d.category)))],
    [downloads],
  );
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return downloads.filter(
      (d) => (active === "All" || d.category === active) && (!q || d.title.toLowerCase().includes(q)),
    );
  }, [active, query, downloads]);

  return (
    <>
      <PageHero
        title="Downloads"
        subtitle="Important forms and documents, available anytime."
        crumbs={[{ label: "Downloads" }]}
      />

      <section className="section">
        <div className="container-page">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active === c
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground/70 hover:bg-accent",
                  )}
                  aria-pressed={active === c}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="relative sm:w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <Input
                placeholder="Search documents…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9"
                aria-label="Search downloads"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {list.map((d, i) => (
              <Reveal key={d.id} delay={(i % 6) * 0.05}>
                <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary">
                    <FileText className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate text-sm font-semibold text-foreground">{d.title}</h2>
                    <p className="text-xs text-muted-foreground">
                      {d.category}
                      {d.extension ? ` · ${d.extension.toUpperCase()}` : ""}
                    </p>
                  </div>
                  <a
                    href={d.fileUrl ?? undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-disabled={!d.fileUrl}
                    className={cn(
                      "inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-colors",
                      d.fileUrl
                        ? "bg-primary text-primary-foreground hover:bg-primary-dark"
                        : "pointer-events-none bg-muted text-muted-foreground",
                    )}
                    aria-label={`Download ${d.title}`}
                  >
                    <FileDown className="h-4 w-4" aria-hidden="true" /> Get
                  </a>
                </div>
              </Reveal>
            ))}
            {list.length === 0 && (
              <p className="text-muted-foreground">No documents match your search.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
