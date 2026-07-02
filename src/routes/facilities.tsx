import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";

import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { pageHead } from "@/lib/seo";
import { getFacilities } from "@/sanity/fetch";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/facilities")({
  loader: async () => ({ facilities: await getFacilities() }),
  head: () =>
    pageHead({
      title: "Facilities",
      description:
        "Explore the library, science labs, computer lab, smart classes, sports and eco-club facilities at SAGES Sohga.",
      path: "/facilities",
    }),
  component: Facilities,
});

function Facilities() {
  const { facilities } = Route.useLoaderData();
  return (
    <>
      <PageHero
        title="Facilities"
        subtitle="Modern infrastructure that supports every dimension of learning."
        crumbs={[{ label: "Facilities" }]}
      />

      <section className="section">
        <div className="container-page space-y-16">
          {facilities.map((f, i) => (
            <Reveal key={f.id} as="article">
              <div
                id={f.id}
                className={cn(
                  "grid items-center gap-8 lg:grid-cols-2",
                  i % 2 === 1 && "lg:[direction:rtl]",
                )}
              >
                <div className="overflow-hidden rounded-3xl shadow-card lg:[direction:ltr]">
                  <img
                    src={f.imageUrl ?? undefined}
                    alt={f.title}
                    className="aspect-video w-full object-cover"
                    width={1080}
                    height={720}
                    loading="lazy"
                  />
                </div>
                <div className="lg:[direction:ltr]">
                  <h2 className="text-2xl font-bold text-foreground">{f.title}</h2>
                  <p className="mt-3 text-muted-foreground">{f.summary}</p>
                  <ul className="mt-5 space-y-2.5">
                    {f.points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-foreground/80">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
