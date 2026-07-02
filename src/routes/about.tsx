import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, History, Building2, CheckCircle2 } from "lucide-react";

import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { pageHead } from "@/lib/seo";
import { getImage } from "@/lib/images";
import { getSiteSettings, getFacilities } from "@/sanity/fetch";

export const Route = createFileRoute("/about")({
  loader: async () => {
    const [school, facilities] = await Promise.all([getSiteSettings(), getFacilities()]);
    return { school, facilities };
  },
  head: () =>
    pageHead({
      title: "About the School",
      description:
        "Learn about the history, vision, mission and infrastructure of Swami Atmanand Govt English School, Sohga, Surguja.",
      path: "/about",
    }),
  component: About,
});

function About() {
  const { school, facilities } = Route.useLoaderData();
  const stats = school.stats;
  return (
    <>
      <PageHero
        title="About Our School"
        subtitle="A legacy of accessible, quality government education in Surguja."
        crumbs={[{ label: "About" }]}
      />

      <section className="section">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <img
              src={getImage("hero")}
              alt="Campus of SAGES Sohga"
              className="w-full rounded-3xl object-cover shadow-card"
              width={1920}
              height={1080}
              loading="lazy"
            />
          </Reveal>
          <div>
            <SectionHeading
              align="left"
              eyebrow="Who We Are"
              title={school.name}
              description="Established under the Swami Atmanand Utkrisht Vidyalaya initiative of the Government of Chhattisgarh, our school delivers English and Hindi medium education completely free of cost to children of the region."
            />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Located near Karji Chowk in Village Sohga, Ambikapur, the school serves students
              from Class 1 to 12 and is affiliated to the Chhattisgarh Board of Secondary
              Education (CGBSE). With modern infrastructure and committed teachers, we strive to
              give every child an equal opportunity to excel.
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl bg-muted p-4">
                  <dt className="text-xs text-muted-foreground">{s.label}</dt>
                  <dd className="font-display text-2xl font-bold text-primary">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="section bg-muted/50">
        <div className="container-page grid gap-6 md:grid-cols-3">
          {[
            {
              icon: History,
              title: "Our History",
              body: "From humble beginnings, the school has grown into one of the most trusted government institutions in Surguja, upgraded to a Swami Atmanand English-medium school to widen access to modern education.",
            },
            {
              icon: Eye,
              title: "Our Vision",
              body: "To be a centre of excellence that empowers every student — regardless of background — with knowledge, values and skills to lead a meaningful and successful life.",
            },
            {
              icon: Target,
              title: "Our Mission",
              body: "To deliver holistic, inclusive and free quality education, nurturing critical thinking, character and citizenship through dedicated teaching and modern facilities.",
            },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08} as="article">
              <div className="h-full rounded-3xl bg-card p-7 shadow-soft">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-royal text-primary-foreground">
                  <c.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-foreground">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="Campus"
            title="Infrastructure & Facilities"
            description="Purpose-built spaces that support academics, sports and holistic development."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((f, i) => (
              <Reveal key={f.id} delay={i * 0.05}>
                <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{f.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{f.summary}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <ul className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
            {[
              "Safe, boundary-walled green campus",
              "Clean drinking water & sanitation",
              "Separate washrooms for girls and boys",
              "First-aid and health check-ups",
              "CCTV-monitored premises",
              "Barrier-free access ramps",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-foreground/80">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
