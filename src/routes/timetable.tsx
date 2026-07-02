import { createFileRoute } from "@tanstack/react-router";
import { Clock } from "lucide-react";

import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { pageHead } from "@/lib/seo";
import { school } from "@/data/school";
import { getTimetable, getSiteSettings } from "@/sanity/fetch";

export const Route = createFileRoute("/timetable")({
  loader: async () => {
    const [timetable, siteSettings] = await Promise.all([getTimetable(), getSiteSettings()]);
    return { timetable, siteSettings };
  },
  head: () =>
    pageHead({
      title: "Timetable",
      description:
        "Sample class timetable and school timings for SAGES Sohga across summer and winter schedules.",
      path: "/timetable",
    }),
  component: Timetable,
});

function Timetable() {
  const { timetable, siteSettings } = Route.useLoaderData();
  const timings = siteSettings.timings ?? school.timings;
  return (
    <>
      <PageHero
        title="Timetable & Timings"
        subtitle="A well-structured daily schedule that balances academics, activity and rest."
        crumbs={[{ label: "Timetable" }]}
      />

      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="Weekly Schedule"
            title="Sample class timetable"
            description="An indicative timetable. Class-specific schedules are shared by respective class teachers."
          />
          <Reveal className="mt-10 overflow-x-auto rounded-3xl border border-border bg-card shadow-soft">
            <table className="w-full min-w-[720px] text-left text-sm">
              <caption className="sr-only">Weekly class timetable</caption>
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th scope="col" className="px-4 py-3 font-semibold">Day</th>
                  {timetable.periods.map((p) => (
                    <th key={p} scope="col" className="px-4 py-3 text-center font-semibold">
                      {p}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {timetable.days.map((row) => (
                  <tr key={row.day} className="hover:bg-muted/60">
                    <th scope="row" className="px-4 py-3 font-semibold text-foreground">
                      {row.day}
                    </th>
                    {row.slots.map((slot, i) => (
                      <td
                        key={i}
                        className={
                          slot === "Recess" || slot === "—"
                            ? "px-4 py-3 text-center text-muted-foreground"
                            : "px-4 py-3 text-center text-foreground/80"
                        }
                      >
                        {slot}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <section className="section bg-muted/50 pt-0">
        <div className="container-page">
          <Reveal className="rounded-3xl bg-gradient-royal p-8 text-primary-foreground shadow-card">
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <Clock className="h-5 w-5 text-saffron" aria-hidden="true" /> School Timings
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {timings.map((t) => (
                <div key={t.label} className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs text-primary-foreground/75">{t.label}</p>
                  <p className="mt-1 font-semibold">{t.value}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
