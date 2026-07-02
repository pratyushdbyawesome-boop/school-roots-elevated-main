import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { pageHead } from "@/lib/seo";
import { school } from "@/data/school";

export const Route = createFileRoute("/terms")({
  head: () =>
    pageHead({
      title: "Terms of Use",
      description: `Terms of use governing the official website of ${school.shortName}.`,
      path: "/terms",
    }),
  component: Terms,
});

const sections = [
  {
    h: "Acceptance of Terms",
    p: `By accessing and using the official website of ${school.name}, you agree to comply with and be bound by these Terms of Use. If you do not agree, please refrain from using this website.`,
  },
  {
    h: "Use of Content",
    p: "All content on this website — including text, images, logos and documents — is provided for informational purposes. Content may not be reproduced or redistributed for commercial use without prior written permission from the school.",
  },
  {
    h: "Accuracy of Information",
    p: "We strive to keep information accurate and up to date. However, schedules, notices and results are subject to change. Official communications from the school office take precedence over website content.",
  },
  {
    h: "External Links",
    p: "This website may contain links to government portals and third-party websites. We are not responsible for the content or privacy practices of external sites.",
  },
  {
    h: "User Conduct",
    p: "Users must not misuse the website, attempt unauthorised access, or submit unlawful, abusive or misleading information through any form.",
  },
  {
    h: "Limitation of Liability",
    p: "The school shall not be liable for any direct or indirect damages arising from the use of, or inability to use, this website.",
  },
  {
    h: "Contact",
    p: `For questions about these Terms, please contact the school office at ${school.email}.`,
  },
];

function Terms() {
  return (
    <>
      <PageHero title="Terms of Use" crumbs={[{ label: "Terms of Use" }]} />
      <section className="section">
        <div className="container-page max-w-3xl">
          <Reveal>
            <p className="text-sm text-muted-foreground">Last updated: January 2025</p>
            <div className="mt-8 space-y-8">
              {sections.map((s) => (
                <div key={s.h}>
                  <h2 className="text-xl font-bold text-foreground">{s.h}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.p}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
