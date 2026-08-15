"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SmartImage } from "@/components/ui/smart-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, revealItem } from "@/components/ui/reveal";
import { useApp } from "@/components/app-provider";
import { categories, type Category } from "@/data/categories";
import { cn } from "@/lib/utils";

/** Editorial bento — deliberately uneven so it doesn't read as a stock grid. */
const spanClass: Record<Category["span"], string> = {
  hero: "sm:col-span-2 sm:row-span-2 aspect-[4/5] sm:aspect-auto",
  wide: "sm:col-span-2 aspect-[16/10] sm:aspect-[2/1]",
  tall: "sm:row-span-2 aspect-[3/4]",
  normal: "aspect-[4/5] sm:aspect-square",
};

export function Categories() {
  const { openSearch } = useApp();

  return (
    <section id="categories" className="section scroll-mt-24">
      <div className="container">
        <SectionHeading
          label="Disciplines"
          title="Pick a way to train."
          copy="Eight disciplines, hundreds of spaces. Start from how you want to move rather than what happens to be nearby."
          aside={
            <p className="hidden text-sm text-muted md:block">
              <span className="font-display font-semibold text-fg">799</span>{" "}
              spaces indexed
            </p>
          }
        />

        <RevealGroup
          stagger={0.05}
          className="mt-12 grid auto-rows-[minmax(11rem,auto)] grid-cols-1 gap-3 sm:grid-cols-4 sm:gap-4"
        >
          {categories.map((c, i) => (
            <motion.button
              key={c.id}
              type="button"
              variants={revealItem}
              onClick={() => openSearch(c.name.split(" ")[0])}
              aria-label={`Search ${c.name} — ${c.gymCount} gyms`}
              className={cn(
                "group relative overflow-hidden rounded-3xl border border-line text-left transition-colors duration-500 hover:border-gold/40",
                spanClass[c.span]
              )}
            >
              <SmartImage
                src={c.image}
                alt=""
                fill
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                seed={i}
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.08]"
              />

              {/* Base scrim + hover deepening */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/10" />
              <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/35" />

              <div className="relative flex h-full flex-col justify-end p-5 sm:p-6">
                <div className="flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <h3
                      className={cn(
                        "font-display font-semibold tracking-[-0.02em] text-[#F6F1E7]",
                        c.span === "hero" ? "text-2xl sm:text-3xl" : "text-lg"
                      )}
                    >
                      {c.name}
                    </h3>

                    {/* Blurb slides in on hover; count is always present */}
                    <p className="mt-1 text-sm text-[#F6F1E7]/55">
                      {c.gymCount} gyms
                    </p>
                    <p
                      className={cn(
                        "max-h-0 overflow-hidden text-sm text-[#F6F1E7]/70 opacity-0 transition-all duration-500",
                        "group-hover:mt-1.5 group-hover:max-h-12 group-hover:opacity-100",
                        "group-focus-visible:mt-1.5 group-focus-visible:max-h-12 group-focus-visible:opacity-100"
                      )}
                    >
                      {c.blurb}
                    </p>
                  </div>

                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/10 backdrop-blur-md transition-all duration-500 group-hover:border-gold/60 group-hover:bg-gold group-focus-visible:bg-gold"
                    aria-hidden
                  >
                    <ArrowUpRight
                      className="h-4 w-4 text-[#F6F1E7] transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
                      strokeWidth={2}
                    />
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
