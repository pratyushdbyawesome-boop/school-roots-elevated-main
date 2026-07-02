import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Images } from "lucide-react";

import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { pageHead } from "@/lib/seo";
import { getGalleryAlbums } from "@/sanity/fetch";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export const Route = createFileRoute("/gallery")({
  loader: async () => ({ galleryAlbums: await getGalleryAlbums() }),
  head: () =>
    pageHead({
      title: "Gallery",
      description:
        "Photo gallery of SAGES Sohga — campus, events, sports, science exhibitions and classroom activities.",
      path: "/gallery",
    }),
  component: Gallery,
});

function Gallery() {
  const { galleryAlbums } = Route.useLoaderData();
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState<(typeof galleryAlbums)[number] | null>(null);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(galleryAlbums.map((g) => g.category)))],
    [galleryAlbums],
  );
  const albums = useMemo(
    () => (active === "All" ? galleryAlbums : galleryAlbums.filter((g) => g.category === active)),
    [active, galleryAlbums],
  );

  return (
    <>
      <PageHero
        title="Photo Gallery"
        subtitle="Moments of learning, joy and achievement across our campus."
        crumbs={[{ label: "Gallery" }]}
      />

      <section className="section">
        <div className="container-page">
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active === c
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground/70 hover:bg-accent",
                )}
                aria-pressed={active === c}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {albums.map((g, i) => (
              <Reveal key={g.id} delay={(i % 6) * 0.05}>
                <button
                  onClick={() => setSelected(g)}
                  className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-soft"
                >
                  <img
                    src={g.coverImageUrl ?? undefined}
                    alt={g.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    width={1080}
                    height={810}
                    loading="lazy"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-primary-dark/85 via-transparent" />
                  <span className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4 text-left text-primary-foreground">
                    <span>
                      <span className="block text-sm font-semibold">{g.title}</span>
                      <span className="block text-xs opacity-80">{g.count} photos</span>
                    </span>
                    <Images className="h-5 w-5" aria-hidden="true" />
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-3xl overflow-hidden p-0">
          {selected && (
            <>
              <DialogTitle className="sr-only">{selected.title}</DialogTitle>
              <img
                src={selected.coverImageUrl ?? undefined}
                alt={selected.title}
                className="w-full object-cover"
                width={1080}
                height={720}
              />
              <div className="p-5">
                <p className="text-lg font-bold text-foreground">{selected.title}</p>
                <p className="text-sm text-muted-foreground">
                  {selected.category} · {selected.count} photos
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
