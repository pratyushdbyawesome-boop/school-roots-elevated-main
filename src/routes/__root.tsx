import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "../components/layout/Navbar";
import { NewsTicker } from "../components/layout/NewsTicker";
import { Footer } from "../components/layout/Footer";
import { Toaster } from "../components/ui/sonner";
import { school } from "../data/school";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="font-display text-7xl font-bold text-gradient">404</p>
        <h1 className="mt-4 text-xl font-semibold text-foreground">Page not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-dark"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-dark"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-input bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#1e3a8a" },
      { title: "SAGES Sohga | Swami Atmanand Govt English School, Surguja" },
      {
        name: "description",
        content:
          "Swami Atmanand Govt English School, Sohga (SAGES) — a Government English & Hindi medium school in Surguja, Chhattisgarh offering quality CGBSE education for Class 1–12.",
      },
      { name: "author", content: school.name },
      { property: "og:title", content: "SAGES Sohga | Swami Atmanand Govt English School, Surguja" },
      {
        property: "og:description",
        content:
          "Quality government education for Class 1–12 in Surguja, Chhattisgarh. Admissions open, modern facilities, dedicated faculty.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: school.shortName },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "SAGES Sohga | Swami Atmanand Govt English School, Surguja" },
      { name: "description", content: "SAGES Sohga Hub is a professional, modern government school website for Swami Atmanand Govt English School." },
      { property: "og:description", content: "SAGES Sohga Hub is a professional, modern government school website for Swami Atmanand Govt English School." },
      { name: "twitter:description", content: "SAGES Sohga Hub is a professional, modern government school website for Swami Atmanand Govt English School." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d0f1b73a-6b75-4da9-afa4-a983b93707ad/id-preview-b5e092ac--68294bb2-79e3-47ca-9f71-27c72ca9386d.lovable.app-1783009150805.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d0f1b73a-6b75-4da9-afa4-a983b93707ad/id-preview-b5e092ac--68294bb2-79e3-47ca-9f71-27c72ca9386d.lovable.app-1783009150805.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Sora:wght@500;600;700;800&display=swap",
      },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "School",
          name: school.name,
          alternateName: school.shortName,
          url: `https://${school.domain}`,
          email: school.email,
          telephone: school.phone,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Near Karji Chowk, Village Sohga",
            addressLocality: "Ambikapur",
            addressRegion: "Chhattisgarh",
            postalCode: "497001",
            addressCountry: "IN",
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <NewsTicker />
      <Navbar />
      <main id="main-content">
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
      <Footer />
      <Toaster richColors position="top-center" />

    </QueryClientProvider>
  );
}
