import { createFileRoute } from "@tanstack/react-router";
import { Landmark, ExternalLink } from "lucide-react";

import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { pageHead } from "@/lib/seo";
import { getSchemes } from "@/sanity/fetch";

export const Route = createFileRoute("/schemes")({
  loader: async () => ({ schemes: await getSchemes() }),
  head: () =>
    pageHead({
      title: "Government Schemes",
      description:
        "Government education schemes and scholarships available to students of SAGES Sohga — RTE, Mid-Day Meal, textbooks and more.",
      path: "/schemes",
    }),
  component: Schemes,
});

function Schemes() {
  const { schemes } = Route.useLoaderData();
  return (
    <>
      <PageHero
        title="Government Schemes"
        subtitle="Benefits and welfare schemes that make education accessible for all."
        crumbs={[{ label: "Government Schemes" }]}
      />

      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="Welfare & Support"
            title="Schemes for our students"
            description="We help eligible students access central and state government schemes. Contact the office for assistance with applications."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {schemes.map((s, i) => (
              <Reveal key={s.id} delay={(i % 6) * 0.05} as="article">
                <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-soft">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-royal text-primary-foreground">
                    <Landmark className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h2 className="mt-4 text-lg font-bold text-foreground">{s.title}</h2>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.summary}</p>
                  <a
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    Learn more <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
