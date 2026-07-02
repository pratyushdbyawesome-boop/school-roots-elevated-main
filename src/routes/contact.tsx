import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock, Loader2 } from "lucide-react";

import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { pageHead } from "@/lib/seo";
import { getSiteSettings, getFaqs } from "@/sanity/fetch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/contact")({
  loader: async () => {
    const [school, faqs] = await Promise.all([getSiteSettings(), getFaqs()]);
    return { school, faqs };
  },
  head: () =>
    pageHead({
      title: "Contact Us",
      description:
        "Contact SAGES Sohga — address, phone, email, location map and enquiry, feedback and complaint form.",
      path: "/contact",
    }),
  component: Contact,
});

const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().regex(/^[0-9]{10}$/, "Enter a valid 10-digit phone").or(z.literal("")),
  type: z.enum(["Enquiry", "Feedback", "Complaint"]),
  message: z.string().trim().min(5, "Please write a short message").max(1000),
});

type ContactValues = z.infer<typeof contactSchema>;

function Contact() {
  const { school, faqs } = Route.useLoaderData();
  const details = [
    { icon: MapPin, label: "Address", value: school.address },
    { icon: Phone, label: "Phone", value: school.phone, href: school.phoneHref },
    { icon: Mail, label: "Email", value: school.email, href: `mailto:${school.email}` },
    { icon: Clock, label: "Office Hours", value: "Mon–Sat, 9:00 AM – 4:00 PM" },
  ];
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { type: "Enquiry" },
  });

  const onSubmit = async (_values: ContactValues) => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    toast.success("Thank you! Your message has been received.");
    reset({ type: "Enquiry" });
  };

  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="We're here to help. Reach out with any question, feedback or concern."
        crumbs={[{ label: "Contact" }]}
      />

      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-2xl font-bold text-foreground">Get in touch</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {details.map((d) => (
                <div key={d.label} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-accent text-primary">
                    <d.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {d.label}
                  </p>
                  {d.href ? (
                    <a href={d.href} className="mt-1 block break-words text-sm font-medium text-foreground hover:text-primary">
                      {d.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm font-medium text-foreground">{d.value}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 overflow-hidden rounded-3xl border border-border shadow-soft">
              <iframe
                title="School location map"
                src={school.mapEmbed}
                className="h-72 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-2xl font-bold text-foreground">Send a message</h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="mt-6 space-y-4 rounded-3xl bg-card p-6 shadow-soft"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" error={errors.name?.message}>
                  <Input {...register("name")} aria-invalid={!!errors.name} />
                </Field>
                <Field label="Phone (optional)" error={errors.phone?.message}>
                  <Input type="tel" inputMode="numeric" {...register("phone")} aria-invalid={!!errors.phone} />
                </Field>
              </div>
              <Field label="Email" error={errors.email?.message}>
                <Input type="email" {...register("email")} aria-invalid={!!errors.email} />
              </Field>
              <Field label="Type" error={errors.type?.message}>
                <select
                  {...register("type")}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option>Enquiry</option>
                  <option>Feedback</option>
                  <option>Complaint</option>
                </select>
              </Field>
              <Field label="Message" error={errors.message?.message}>
                <Textarea rows={4} {...register("message")} aria-invalid={!!errors.message} />
              </Field>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-dark disabled:opacity-70"
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                Send Message
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      <section className="section bg-muted/50 pt-0">
        <div className="container-page max-w-3xl">
          <SectionHeading eyebrow="Help" title="Frequently asked questions" />
          <Accordion type="single" collapsible className="mt-8">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="rounded-2xl border border-border bg-card px-5 mb-3">
                <AccordionTrigger className="text-left text-sm font-semibold text-foreground">
                  {f.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{f.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
