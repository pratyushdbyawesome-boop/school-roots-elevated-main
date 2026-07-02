import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { pageHead } from "@/lib/seo";
import { school } from "@/data/school";

export const Route = createFileRoute("/privacy")({
  head: () =>
    pageHead({
      title: "Privacy Policy",
      description: `Privacy policy for the official website of ${school.shortName}.`,
      path: "/privacy",
    }),
  component: Privacy,
});

const sections = [
  {
    h: "Introduction",
    p: `This Privacy Policy explains how ${school.name} ("we", "our", "the school") collects, uses and protects information when you use our official website. We are committed to safeguarding the privacy of students, parents and visitors.`,
  },
  {
    h: "Information We Collect",
    p: "We may collect information you voluntarily provide through enquiry, feedback or admission forms — such as name, contact number, email address and message. We do not collect sensitive personal data through this website beyond what is necessary to respond to your request.",
  },
  {
    h: "How We Use Information",
    p: "Information submitted is used solely to respond to enquiries, process admission interest, address feedback or complaints, and improve our services. We do not sell or rent your personal information to third parties.",
  },
  {
    h: "Cookies & Analytics",
    p: "The website may use minimal cookies or analytics to understand usage and improve performance. No personally identifiable information is used for advertising.",
  },
  {
    h: "Data Security",
    p: "We adopt reasonable technical and organisational measures to protect information against unauthorised access, alteration or disclosure.",
  },
  {
    h: "Children's Privacy",
    p: "As an educational institution, we handle student information with utmost care and in accordance with applicable government guidelines. Parents or guardians may contact the office regarding any student data.",
  },
  {
    h: "Contact",
    p: `For any privacy-related queries, please contact the school office at ${school.email}.`,
  },
];

function Privacy() {
  return (
    <>
      <PageHero title="Privacy Policy" crumbs={[{ label: "Privacy Policy" }]} />
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
