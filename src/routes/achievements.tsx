import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Award, Trophy } from "lucide-react";

import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { pageHead } from "@/lib/seo";
import { getAchievements } from "@/sanity/fetch";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/achievements")({
  loader: async () => ({ achievements: await getAchievements() }),
  head: () =>
    pageHead({
      title: "Achievements",
      description:
        "Academic, sports and environmental achievements of SAGES Sohga and its students over the years.",
      path: "/achievements",
    }),
  component: Achievements,
});

function Achievements() {
  const { achievements } = Route.useLoaderData();
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(achievements.map((a) => a.category)))],
    [achievements],
  );
  const [active, setActive] = useState("All");
  const list = useMemo(
    () => (active === "All" ? achievements : achievements.filter((a) => a.category === active)),
    [active, achievements],
  );

  return (
    <>
      <PageHero
        title="Achievements"
        subtitle="Celebrating excellence across academics, sports and community service."
        crumbs={[{ label: "Achievements" }]}
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

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((a, i) => (
              <Reveal key={a.id} delay={(i % 6) * 0.05} as="article">
                <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-soft">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-saffron text-saffron-foreground">
                      <Trophy className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">
                      {a.category}
                    </span>
                  </div>
                  <h2 className="mt-4 text-base font-bold text-foreground">{a.title}</h2>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{a.description}</p>
                  <p className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-success">
                    <Award className="h-4 w-4" aria-hidden="true" /> {a.year}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
