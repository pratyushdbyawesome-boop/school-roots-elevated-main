import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, MapPin, Clock, PartyPopper } from "lucide-react";

import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { pageHead } from "@/lib/seo";
import { formatDate } from "@/lib/format";
import { getEvents, getHolidays } from "@/sanity/fetch";

export const Route = createFileRoute("/events")({
  loader: async () => {
    const [events, holidays] = await Promise.all([getEvents(), getHolidays()]);
    return { events, holidays };
  },
  head: () =>
    pageHead({
      title: "Events & Calendar",
      description:
        "Upcoming events, celebrations and the holiday calendar of SAGES Sohga for the academic year.",
      path: "/events",
    }),
  component: Events,
});

function Events() {
  const { events, holidays } = Route.useLoaderData();
  return (
    <>
      <PageHero
        title="Events & Calendar"
        subtitle="Celebrations, competitions and important dates through the year."
        crumbs={[{ label: "Events" }]}
      />

      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_340px]">
          <div>
            <SectionHeading align="left" eyebrow="Coming Up" title="Upcoming events" />
            <ul className="mt-8 space-y-4">
              {events.map((e, i) => (
                <Reveal key={e.id} delay={(i % 6) * 0.05} as="li">
                  <article className="flex gap-4 rounded-3xl border border-border bg-card p-5 shadow-soft">
                    <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-gradient-royal text-primary-foreground">
                      <span className="text-xl font-bold leading-none">
                        {new Date(e.date).getDate()}
                      </span>
                      <span className="text-[10px] uppercase">
                        {new Date(e.date).toLocaleString("en-IN", { month: "short" })}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <PartyPopper className="h-4 w-4 text-saffron" aria-hidden="true" />
                        <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">
                          {e.category}
                        </span>
                      </div>
                      <h3 className="mt-2 text-base font-bold text-foreground">{e.title}</h3>
                      <p className="mt-1 flex flex-wrap gap-4 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {e.time}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> {e.venue}
                        </span>
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-3xl bg-card p-6 shadow-soft lg:sticky lg:top-28">
              <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
                <CalendarDays className="h-5 w-5 text-primary" aria-hidden="true" /> Holiday Calendar
              </h2>
              <ul className="mt-4 divide-y divide-border">
                {holidays.map((h) => (
                  <li key={h.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                    <span className="font-medium text-foreground">{h.name}</span>
                    <span className="text-right text-xs text-muted-foreground">
                      {h.date.includes("to") ? h.date : formatDate(h.date)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
