import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FileText, Download, Search } from "lucide-react";

import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { pageHead } from "@/lib/seo";
import { getResults } from "@/sanity/fetch";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/results")({
  loader: async () => ({ results: await getResults() }),
  head: () =>
    pageHead({
      title: "Results",
      description:
        "Board examination results of SAGES Sohga by year and class, including pass percentage and distinctions.",
      path: "/results",
    }),
  component: Results,
});

function Results() {
  const { results } = Route.useLoaderData();
  const years = useMemo(() => ["All", ...Array.from(new Set(results.map((r) => r.year)))], [results]);
  const [year, setYear] = useState("All");
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return results.filter(
      (r) =>
        (year === "All" || r.year === year) &&
        (!q || r.class.toLowerCase().includes(q) || r.stream.toLowerCase().includes(q)),
    );
  }, [year, query, results]);

  return (
    <>
      <PageHero
        title="Examination Results"
        subtitle="A consistent record of strong board results across streams."
        crumbs={[{ label: "Results" }]}
      />

      <section className="section">
        <div className="container-page">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {years.map((y) => (
                <button
                  key={y}
                  onClick={() => setYear(y)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    year === y
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground/70 hover:bg-accent",
                  )}
                  aria-pressed={year === y}
                >
                  {y}
                </button>
              ))}
            </div>
            <div className="relative sm:w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <Input
                placeholder="Search class or stream…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9"
                aria-label="Search results"
              />
            </div>
          </div>

          <Reveal className="overflow-x-auto rounded-3xl border border-border bg-card shadow-soft">
            <table className="w-full min-w-[560px] text-left text-sm">
              <caption className="sr-only">Board examination results by year and class</caption>
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th scope="col" className="px-5 py-4 font-semibold">Year</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Class</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Stream</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Pass %</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Distinctions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {rows.map((r) => (
                  <tr key={r.id} className="transition-colors hover:bg-muted/60">
                    <td className="px-5 py-4 font-medium text-foreground">{r.year}</td>
                    <td className="px-5 py-4 text-foreground/80">{r.class}</td>
                    <td className="px-5 py-4 text-foreground/80">{r.stream}</td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-success/10 px-2.5 py-0.5 font-semibold text-success">
                        {r.pass}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-foreground/80">{r.distinction}</td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-8 text-center text-muted-foreground">
                      No results match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Reveal>

          <Reveal delay={0.1} className="mt-8 flex items-center justify-between rounded-2xl bg-muted p-5">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-primary" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-foreground">Detailed Result Sheets (PDF)</p>
                <p className="text-xs text-muted-foreground">Class-wise consolidated results</p>
              </div>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-dark">
              <Download className="h-4 w-4" aria-hidden="true" /> Download
            </button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
