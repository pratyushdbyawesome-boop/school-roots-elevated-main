import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, Mail, GraduationCap, BriefcaseBusiness } from "lucide-react";

import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { pageHead } from "@/lib/seo";
import { school } from "@/data/school";
import { getStaff } from "@/sanity/fetch";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/staff")({
  loader: async () => ({ staff: await getStaff() }),
  head: () =>
    pageHead({
      title: "Staff Directory",
      description:
        "Meet the qualified and dedicated teaching faculty of SAGES Sohga — names, subjects, qualifications and experience.",
      path: "/staff",
    }),
  component: Staff,
});

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Staff() {
  const { staff } = Route.useLoaderData();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return staff;
    return staff.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.subject.toLowerCase().includes(q) ||
        s.role.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <>
      <PageHero
        title="Staff Directory"
        subtitle="Our greatest strength — experienced, caring and qualified teachers."
        crumbs={[{ label: "Staff" }]}
      />

      <section className="section">
        <div className="container-page">
          <div className="mx-auto mb-10 max-w-md">
            <label htmlFor="staff-search" className="sr-only">
              Search staff
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <Input
                id="staff-search"
                placeholder="Search by name, subject or role…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground">No staff match your search.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((s, i) => (
                <Reveal key={s.id} delay={(i % 6) * 0.05} as="article">
                  <div className="flex h-full flex-col items-center rounded-3xl border border-border bg-card p-6 text-center shadow-soft">
                    {s.photoUrl ? (
                      <img
                        src={s.photoUrl}
                        alt={s.name}
                        className="h-20 w-20 rounded-full object-cover"
                        width={80}
                        height={80}
                        loading="lazy"
                      />
                    ) : (
                      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-royal font-display text-xl font-bold text-primary-foreground">
                        {initials(s.name)}
                      </span>
                    )}
                    <h2 className="mt-4 text-lg font-bold text-foreground">{s.name}</h2>
                    <p className="text-sm font-medium text-primary">{s.role}</p>
                    <dl className="mt-4 w-full space-y-2 text-left text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <BriefcaseBusiness className="h-4 w-4 text-saffron" aria-hidden="true" />
                        <dt className="sr-only">Subject</dt>
                        <dd>{s.subject}</dd>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <GraduationCap className="h-4 w-4 text-saffron" aria-hidden="true" />
                        <dt className="sr-only">Qualification</dt>
                        <dd>{s.qualification}</dd>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4 text-saffron" aria-hidden="true" />
                        <dt className="sr-only">Experience</dt>
                        <dd>{s.experience} experience</dd>
                      </div>
                    </dl>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
          <p className="mt-8 text-center text-xs text-muted-foreground">
            For staff contact, please reach the school office at {school.email}.
          </p>
        </div>
      </section>
    </>
  );
}
