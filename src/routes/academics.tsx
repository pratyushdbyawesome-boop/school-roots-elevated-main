import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Languages, GraduationCap, FlaskConical } from "lucide-react";

import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { pageHead } from "@/lib/seo";
import { getAcademics } from "@/sanity/fetch";

export const Route = createFileRoute("/academics")({
  loader: async () => ({ academics: await getAcademics() }),
  head: () =>
    pageHead({
      title: "Academics",
      description:
        "Academic streams, curriculum and mediums of instruction at SAGES Sohga — English medium (1–12) and Hindi medium (9–10) under CGBSE.",
      path: "/academics",
    }),
  component: Academics,
});

function Academics() {
  const { academics } = Route.useLoaderData();
  return (
    <>
      <PageHero
        title="Academics"
        subtitle="A structured, CGBSE-aligned curriculum from foundation to senior secondary."
        crumbs={[{ label: "Academics" }]}
      />

      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="Curriculum"
            title="Academic stages"
            description="Age-appropriate learning designed to build strong foundations and prepare students for board examinations and beyond."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {academics.streams.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06} as="article">
                <div className="flex h-full gap-4 rounded-3xl border border-border bg-card p-6 shadow-soft">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary">
                    <BookOpen className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{s.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-muted/50">
        <div className="container-page grid gap-8 lg:grid-cols-2">
          <Reveal className="rounded-3xl bg-card p-8 shadow-soft">
            <Languages className="h-9 w-9 text-primary" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-bold text-foreground">Medium of Instruction</h2>
            <ul className="mt-4 space-y-3">
              {academics.mediums.map((m) => (
                <li key={m} className="flex items-center gap-2 rounded-xl bg-muted px-4 py-3 text-sm font-medium text-foreground">
                  <GraduationCap className="h-4 w-4 text-saffron" aria-hidden="true" /> {m}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="rounded-3xl bg-card p-8 shadow-soft">
            <FlaskConical className="h-9 w-9 text-primary" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-bold text-foreground">Streams at Senior Secondary</h2>
            <div className="mt-4 space-y-4 text-sm text-muted-foreground">
              <div>
                <p className="font-semibold text-foreground">Science</p>
                <p>Physics, Chemistry, Biology / Mathematics, English and elective subjects.</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">Commerce</p>
                <p>Accountancy, Business Studies, Economics, English and elective subjects.</p>
              </div>
              <p className="rounded-xl bg-accent px-4 py-3 text-accent-foreground">
                Career counselling and board-exam preparation are provided throughout Classes 11–12.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
