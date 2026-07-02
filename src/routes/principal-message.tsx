import { createFileRoute } from "@tanstack/react-router";
import { Quote } from "lucide-react";

import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { pageHead } from "@/lib/seo";
import { school } from "@/data/school";
import { getSiteSettings } from "@/sanity/fetch";
import principalImg from "@/assets/principal.jpg";

export const Route = createFileRoute("/principal-message")({
  loader: async () => ({ school: await getSiteSettings() }),
  head: () =>
    pageHead({
      title: "Principal's Message",
      description: `A message from ${school.principal}, Principal of ${school.shortName}, on our vision and values.`,
      path: "/principal-message",
    }),
  component: PrincipalMessage,
});

const paragraphs = [
  "Dear Parents, Students and Well-wishers,",
  "It is my privilege to welcome you to Swami Atmanand Govt English School, Sohga. Education is the most powerful tool we can offer our children, and it is our sacred responsibility to ensure that every child who walks through our gates receives it in full measure — free, fair and of the highest quality.",
  "Our school stands on the belief that talent is universal, but opportunity is not. Through the Swami Atmanand initiative of the Government of Chhattisgarh, we are proud to bridge that gap by bringing English-medium education, modern laboratories, smart classrooms and dedicated teachers to the heart of Surguja.",
  "We do not measure success by marks alone. We nurture curiosity, integrity, discipline and empathy. We encourage our students to ask questions, to dream boldly, and to serve their community with humility. A confident, compassionate and capable young citizen is our proudest result.",
  "I extend my heartfelt gratitude to our teachers for their tireless dedication and to our parents for their trust and partnership. Together, we will continue to build a school where every child feels safe, valued and inspired to reach their fullest potential.",
  "Warm regards,",
];

function PrincipalMessage() {
  const { school } = Route.useLoaderData();
  return (
    <>
      <PageHero
        title="Principal's Message"
        subtitle="Guidance and vision from our school leadership."
        crumbs={[{ label: "Principal's Message" }]}
      />

      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[300px_1fr]">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <img
                src={principalImg}
                alt={`${school.principal}, Principal`}
                className="aspect-[4/5] w-full rounded-3xl object-cover shadow-card"
                width={1024}
                height={1280}
                loading="lazy"
              />
              <div className="mt-4 rounded-2xl bg-gradient-royal p-5 text-primary-foreground">
                <p className="font-display text-lg font-bold">{school.principal}</p>
                <p className="text-sm text-primary-foreground/80">Principal</p>
                <p className="mt-1 text-xs text-primary-foreground/70">{school.shortName}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Quote className="h-12 w-12 text-saffron" aria-hidden="true" />
            <div className="mt-4 space-y-5 text-base leading-relaxed text-foreground/85">
              {paragraphs.map((p, i) => (
                <p key={i} className={i === 0 ? "font-semibold text-foreground" : undefined}>
                  {p}
                </p>
              ))}
              <p className="font-display text-lg font-bold text-primary">{school.principal}</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
