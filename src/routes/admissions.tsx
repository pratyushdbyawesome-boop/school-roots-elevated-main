import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ClipboardList, FileCheck2, UserPlus, CalendarCheck, Loader2 } from "lucide-react";

import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { pageHead } from "@/lib/seo";
import { academics } from "@/data/school";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/admissions")({
  head: () =>
    pageHead({
      title: "Admissions",
      description:
        "Admission process, eligibility, required documents and enquiry form for SAGES Sohga, Surguja. Admissions open for Class 1–12.",
      path: "/admissions",
    }),
  component: Admissions,
});

const enquirySchema = z.object({
  studentName: z.string().trim().min(2, "Enter the student's name").max(100),
  parentName: z.string().trim().min(2, "Enter parent/guardian name").max(100),
  phone: z.string().trim().regex(/^[0-9]{10}$/, "Enter a valid 10-digit phone number"),
  email: z.string().trim().email("Enter a valid email").max(255).or(z.literal("")),
  applyingClass: z.string().trim().min(1, "Select the class"),
  message: z.string().trim().max(1000).optional(),
});

type EnquiryValues = z.infer<typeof enquirySchema>;

const steps = [
  { icon: ClipboardList, title: "Collect the form", body: "Obtain the admission form from the school office or download it online." },
  { icon: FileCheck2, title: "Submit documents", body: "Attach the required documents and submit the completed form at the office." },
  { icon: UserPlus, title: "Verification", body: "Documents are verified and eligibility is confirmed by the admission committee." },
  { icon: CalendarCheck, title: "Confirmation", body: "Admission is confirmed and the class allotment is communicated to parents." },
];

function Admissions() {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryValues>({ resolver: zodResolver(enquirySchema) });

  const onSubmit = async (_values: EnquiryValues) => {
    setSubmitting(true);
    // Simulated submission — wire to a CMS/edge function when backend is enabled.
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    toast.success("Enquiry received! Our office will contact you shortly.");
    reset();
  };

  return (
    <>
      <PageHero
        title="Admissions"
        subtitle="Admissions are open for the new academic session. Join the SAGES Sohga family."
        crumbs={[{ label: "Admissions" }]}
      />

      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="How to Apply"
            title="A simple 4-step process"
            description="We keep admissions transparent and hassle-free for every family."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06} as="article">
                <div className="relative h-full rounded-3xl border border-border bg-card p-6 shadow-soft">
                  <span className="absolute right-5 top-5 font-display text-3xl font-bold text-accent">
                    {i + 1}
                  </span>
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-royal text-primary-foreground">
                    <s.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-muted/50">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-2xl font-bold text-foreground">Eligibility & Documents</h2>
            <div className="mt-5 rounded-3xl bg-card p-6 shadow-soft">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">Classes Offered</h3>
              <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                {academics.mediums.map((m) => (
                  <li key={m}>• {m}</li>
                ))}
              </ul>
              <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-primary">Required Documents</h3>
              <ul className="mt-3 grid gap-2 text-sm text-foreground/80 sm:grid-cols-2">
                {[
                  "Birth certificate",
                  "Previous marksheet / TC",
                  "Aadhaar card (student)",
                  "Aadhaar card (parent)",
                  "Caste certificate (if any)",
                  "2 passport photographs",
                ].map((d) => (
                  <li key={d}>• {d}</li>
                ))}
              </ul>
              <p className="mt-6 rounded-xl bg-success/10 px-4 py-3 text-sm text-success">
                As a Government school, education is free of cost. Nominal charges (if any) and
                available scholarships are explained at the office.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-2xl font-bold text-foreground">Admission Enquiry</h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="mt-5 space-y-4 rounded-3xl bg-card p-6 shadow-soft"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Student Name" error={errors.studentName?.message}>
                  <Input {...register("studentName")} aria-invalid={!!errors.studentName} />
                </Field>
                <Field label="Parent / Guardian" error={errors.parentName?.message}>
                  <Input {...register("parentName")} aria-invalid={!!errors.parentName} />
                </Field>
                <Field label="Phone" error={errors.phone?.message}>
                  <Input type="tel" inputMode="numeric" {...register("phone")} aria-invalid={!!errors.phone} />
                </Field>
                <Field label="Email (optional)" error={errors.email?.message}>
                  <Input type="email" {...register("email")} aria-invalid={!!errors.email} />
                </Field>
              </div>
              <Field label="Applying for Class" error={errors.applyingClass?.message}>
                <select
                  {...register("applyingClass")}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-invalid={!!errors.applyingClass}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a class
                  </option>
                  {Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`).map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Message (optional)" error={errors.message?.message}>
                <Textarea rows={3} {...register("message")} />
              </Field>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-dark disabled:opacity-70"
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                Submit Enquiry
              </button>
            </form>
          </Reveal>
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
