import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bell,
  Newspaper,
  Award,
  CalendarDays,
  ArrowRight,
  Quote,
  Clock,
  Download,
  ExternalLink,
  Landmark,
  Images,
  CheckCircle2,
} from "lucide-react";

import { Hero } from "@/components/home/Hero";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { formatDate } from "@/lib/format";
import { getImage } from "@/lib/images";
import {
  getSiteSettings,
  getNotices,
  getNews,
  getFacilities,
  getAchievements,
  getEvents,
  getSchemes,
  getDownloads,
  getTestimonials,
  getGalleryAlbums,
} from "@/sanity/fetch";
import principalImg from "@/assets/principal.jpg";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [
      school,
      notices,
      news,
      facilities,
      achievements,
      events,
      schemes,
      downloads,
      testimonials,
      galleryAlbums,
    ] = await Promise.all([
      getSiteSettings(),
      getNotices(),
      getNews(),
      getFacilities(),
      getAchievements(),
      getEvents(),
      getSchemes(),
      getDownloads(),
      getTestimonials(),
      getGalleryAlbums(),
    ]);
    return {
      school,
      notices,
      news,
      facilities,
      achievements,
      events,
      schemes,
      downloads,
      importantLinks: school.importantLinks,
      testimonials,
      galleryAlbums,
    };
  },
  head: () => ({
    links: [{ rel: "canonical", href: "/" }],
    meta: [{ property: "og:url", content: "/" }],
  }),
  component: Home,
});

function Home() {
  const {
    school,
    notices,
    news,
    facilities,
    achievements,
    events,
    schemes,
    downloads,
    importantLinks,
    testimonials,
    galleryAlbums,
  } = Route.useLoaderData();
  return (
    <>
      <Hero />

      {/* Introduction */}
      <section className="section pt-28">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative">
            <img
              src={getImage("smartclass")}
              alt="Students in a smart classroom at SAGES Sohga"
              className="w-full rounded-3xl object-cover shadow-card"
              width={1080}
              height={720}
              loading="lazy"
            />
            <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-gradient-royal px-6 py-5 text-primary-foreground shadow-elevated sm:block">
              <p className="font-display text-3xl font-bold">Est. 2000</p>
              <p className="text-xs opacity-85">Serving Surguja with pride</p>
            </div>
          </Reveal>
          <div>
            <SectionHeading
              align="left"
              eyebrow="Welcome to SAGES Sohga"
              title="A trusted government school for every family"
              description="We provide free, high-quality English and Hindi medium education under the Swami Atmanand School initiative of the Government of Chhattisgarh. Our mission is to make world-class learning accessible to every child in the region."
            />
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "English Medium · Class 1–12",
                "Hindi Medium · Class 9–10",
                "Affiliated to CGBSE",
                "Modern labs & smart classes",
                "Dedicated, qualified faculty",
                "Government schemes & scholarships",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to="/about"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-dark"
            >
              About the School <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Notices + News */}
      <section className="section bg-muted/50">
        <div className="container-page grid gap-8 lg:grid-cols-2">
          <Reveal className="flex flex-col rounded-3xl bg-card p-6 shadow-soft sm:p-8">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
                <Bell className="h-5 w-5 text-primary" aria-hidden="true" /> Notice Board
              </h2>
              <Link to="/notices" className="text-sm font-medium text-primary hover:underline">
                View all
              </Link>
            </div>
            <ul className="divide-y divide-border">
              {notices.slice(0, 4).map((n) => (
                <li key={n.id} className="flex items-start gap-3 py-3.5">
                  <span className="mt-1 rounded-md bg-accent px-2 py-0.5 text-[11px] font-semibold text-accent-foreground">
                    {n.category}
                  </span>
                  <div>
                    <Link to="/notices" className="text-sm font-medium text-foreground hover:text-primary">
                      {n.title}
                    </Link>
                    <p className="mt-0.5 text-xs text-muted-foreground">{formatDate(n.date)}</p>
                  </div>
                  {n.urgent && (
                    <span className="ml-auto rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-bold uppercase text-destructive">
                      New
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col rounded-3xl bg-card p-6 shadow-soft sm:p-8">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
                <Newspaper className="h-5 w-5 text-primary" aria-hidden="true" /> Latest News
              </h2>
              <Link to="/achievements" className="text-sm font-medium text-primary hover:underline">
                More
              </Link>
            </div>
            <ul className="space-y-4">
              {news.map((n) => (
                <li key={n.id} className="rounded-2xl border border-border p-4 transition-colors hover:border-primary/40">
                  <p className="text-xs font-medium text-saffron">{formatDate(n.date)}</p>
                  <h3 className="mt-1 text-sm font-semibold text-foreground">{n.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{n.excerpt}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Facilities */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="Infrastructure"
            title="World-class facilities"
            description="Everything a modern learner needs — from science labs to smart classrooms and a green campus."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((f, i) => (
              <Reveal key={f.id} delay={i * 0.06} as="article">
                <div className="group h-full overflow-hidden rounded-3xl bg-card shadow-soft transition-shadow hover:shadow-card">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={f.imageUrl ?? undefined}
                      alt={f.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      width={1080}
                      height={720}
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-foreground">{f.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{f.summary}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/facilities"
              className="inline-flex items-center gap-2 rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Explore all facilities <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Principal message */}
      <section className="section bg-gradient-royal text-primary-foreground">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[320px_1fr]">
          <Reveal className="mx-auto max-w-xs">
            <img
              src={principalImg}
              alt={`${school.principal}, Principal`}
              className="aspect-[4/5] w-full rounded-3xl object-cover shadow-elevated"
              width={1024}
              height={1280}
              loading="lazy"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Quote className="h-10 w-10 text-saffron" aria-hidden="true" />
            <blockquote className="mt-4 text-lg leading-relaxed sm:text-xl">
              “At SAGES Sohga, we believe every child carries limitless potential. Our commitment
              is to create a safe, inspiring environment where students grow into confident,
              responsible and compassionate citizens of tomorrow.”
            </blockquote>
            <p className="mt-6 font-display text-lg font-bold">{school.principal}</p>
            <p className="text-sm text-primary-foreground/75">Principal, {school.shortName}</p>
            <Link
              to="/principal-message"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-white/20"
            >
              Read full message <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Achievements */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="Proud Moments"
            title="Our achievements"
            description="A track record of excellence across academics, sports and community initiatives."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {achievements.slice(0, 3).map((a, i) => (
              <Reveal key={a.id} delay={i * 0.06} as="article">
                <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-soft">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-primary">
                      <Award className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-semibold text-success">
                      {a.year}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-bold text-foreground">{a.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{a.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Events + Timing */}
      <section className="section bg-muted/50">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_360px]">
          <Reveal>
            <h2 className="flex items-center gap-2 text-2xl font-bold text-foreground">
              <CalendarDays className="h-6 w-6 text-primary" aria-hidden="true" /> Upcoming Events
            </h2>
            <ul className="mt-6 space-y-3">
              {events.slice(0, 4).map((e) => (
                <li
                  key={e.id}
                  className="flex items-center gap-4 rounded-2xl bg-card p-4 shadow-soft"
                >
                  <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-gradient-royal text-primary-foreground">
                    <span className="text-lg font-bold leading-none">
                      {new Date(e.date).getDate()}
                    </span>
                    <span className="text-[10px] uppercase">
                      {new Date(e.date).toLocaleString("en-IN", { month: "short" })}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{e.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {e.time} · {e.venue}
                    </p>
                  </div>
                  <span className="ml-auto hidden rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground sm:inline">
                    {e.category}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="rounded-3xl bg-gradient-royal p-6 text-primary-foreground shadow-card">
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <Clock className="h-5 w-5 text-saffron" aria-hidden="true" /> School Timings
            </h2>
            <ul className="mt-5 space-y-4">
              {school.timings.map((t) => (
                <li key={t.label} className="flex items-center justify-between border-b border-white/15 pb-3 text-sm">
                  <span className="text-primary-foreground/80">{t.label}</span>
                  <span className="font-semibold">{t.value}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/timetable"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-white/20"
            >
              View timetable <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Gallery preview */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="Campus Life"
            title="Gallery"
            description="Glimpses of learning, celebration and achievement at SAGES Sohga."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryAlbums.map((g, i) => (
              <Reveal key={g.id} delay={i * 0.05}>
                <Link
                  to="/gallery"
                  className="group relative block aspect-[4/3] overflow-hidden rounded-2xl shadow-soft"
                >
                  <img
                    src={g.coverImageUrl ?? undefined}
                    alt={g.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    width={1080}
                    height={810}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/85 via-primary-dark/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4 text-primary-foreground">
                    <div>
                      <p className="text-sm font-semibold">{g.title}</p>
                      <p className="text-xs opacity-80">{g.count} photos</p>
                    </div>
                    <Images className="h-5 w-5" aria-hidden="true" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Schemes + Downloads + links */}
      <section className="section bg-muted/50">
        <div className="container-page grid gap-8 lg:grid-cols-3">
          <Reveal className="rounded-3xl bg-card p-6 shadow-soft">
            <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
              <Landmark className="h-5 w-5 text-primary" aria-hidden="true" /> Government Schemes
            </h2>
            <ul className="mt-4 space-y-3">
              {schemes.slice(0, 4).map((s) => (
                <li key={s.id} className="text-sm">
                  <p className="font-medium text-foreground">{s.title}</p>
                  <p className="text-xs text-muted-foreground">{s.summary}</p>
                </li>
              ))}
            </ul>
            <Link to="/schemes" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
              All schemes →
            </Link>
          </Reveal>

          <Reveal delay={0.08} className="rounded-3xl bg-card p-6 shadow-soft">
            <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
              <Download className="h-5 w-5 text-primary" aria-hidden="true" /> Downloads
            </h2>
            <ul className="mt-4 space-y-2.5">
              {downloads.slice(0, 5).map((d) => (
                <li key={d.id}>
                  <Link
                    to="/downloads"
                    className="flex items-center justify-between rounded-xl border border-border px-3 py-2.5 text-sm transition-colors hover:border-primary/40"
                  >
                    <span className="text-foreground">{d.title}</span>
                    <span className="text-xs text-muted-foreground">{d.extension?.toUpperCase() ?? "PDF"}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.16} className="rounded-3xl bg-card p-6 shadow-soft">
            <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
              <ExternalLink className="h-5 w-5 text-primary" aria-hidden="true" /> Important Links
            </h2>
            <ul className="mt-4 grid gap-2.5">
              {importantLinks.slice(0, 6).map((l) => (
                <li key={l.url}>
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl bg-muted px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-accent"
                  >
                    {l.label}
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="Voices"
            title="What our community says"
            description="Trusted by parents, students and alumni across Surguja."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.08} as="article">
                <figure className="flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-soft">
                  <Quote className="h-8 w-8 text-saffron" aria-hidden="true" />
                  <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-foreground/85">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-5">
                    <p className="text-sm font-bold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section pb-0">
        <div className="container-page">
          <Reveal className="overflow-hidden rounded-[2rem] bg-gradient-royal px-6 py-14 text-center text-primary-foreground shadow-elevated sm:px-12">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold sm:text-4xl">
              Ready to give your child a brighter future?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-primary-foreground/85">
              Admissions for the new academic session are open. Visit us or reach out — our team is
              happy to help.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/admissions"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-saffron px-6 py-3 text-sm font-semibold text-saffron-foreground shadow-soft transition-transform hover:scale-[1.03]"
              >
                Apply Now
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold transition-colors hover:bg-white/20"
              >
                Contact Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
