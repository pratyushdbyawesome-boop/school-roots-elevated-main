import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Bell, AlertCircle } from "lucide-react";

import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { pageHead } from "@/lib/seo";
import { formatDate } from "@/lib/format";
import { getNotices } from "@/sanity/fetch";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/notices")({
  loader: async () => ({ notices: await getNotices() }),
  head: () =>
    pageHead({
      title: "Notice Board",
      description:
        "Latest notices, circulars and announcements from SAGES Sohga — admissions, examinations, events and schemes.",
      path: "/notices",
    }),
  component: Notices,
});

function Notices() {
  const { notices } = Route.useLoaderData();
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(notices.map((n) => n.category)))],
    [notices],
  );
  const [active, setActive] = useState("All");
  const list = useMemo(
    () => (active === "All" ? notices : notices.filter((n) => n.category === active)),
    [active, notices],
  );

  return (
    <>
      <PageHero
        title="Notice Board"
        subtitle="Stay updated with the latest announcements and circulars."
        crumbs={[{ label: "Notice Board" }]}
      />

      <section className="section">
        <div className="container-page">
          <div className="mb-10 flex flex-wrap justify-center gap-2">
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

          <ul className="mx-auto max-w-3xl space-y-4">
            {list.map((n, i) => (
              <Reveal key={n.id} delay={(i % 6) * 0.05} as="li">
                <article
                  className={cn(
                    "rounded-3xl border bg-card p-6 shadow-soft",
                    n.urgent ? "border-saffron/50" : "border-border",
                  )}
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-accent text-primary">
                      {n.urgent ? (
                        <AlertCircle className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <Bell className="h-5 w-5" aria-hidden="true" />
                      )}
                    </span>
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-foreground/70">
                      {n.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{formatDate(n.date)}</span>
                    {n.urgent && (
                      <span className="ml-auto rounded-full bg-destructive/10 px-2.5 py-0.5 text-[10px] font-bold uppercase text-destructive">
                        Important
                      </span>
                    )}
                  </div>
                  <h2 className="mt-4 text-lg font-bold text-foreground">{n.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{n.body}</p>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
