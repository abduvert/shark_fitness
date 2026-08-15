"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { SmartImage } from "@/components/ui/smart-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { Rating } from "@/components/ui/rating";
import { Badge } from "@/components/ui/badge";
import { RevealGroup, revealItem } from "@/components/ui/reveal";
import { useApp } from "@/components/app-provider";
import { trainers, type Trainer } from "@/data/trainers";
import { cn, pkr } from "@/lib/utils";

export function Trainers() {
  const railRef = React.useRef<HTMLDivElement>(null);

  const nudge = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 16 : 320;
    rail.scrollBy({
      left: step * dir,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  return (
    <section id="trainers" className="section scroll-mt-24">
      <div className="container">
        <SectionHeading
          label="Coaching"
          title="Train with people who know how to get you there."
          copy="Verified profiles with real experience, specialisations and session rates — so you know what you're booking before you call."
          aside={
            <div className="hidden items-center gap-2 lg:flex">
              <button
                type="button"
                onClick={() => nudge(-1)}
                aria-label="Scroll trainers left"
                className="grid h-11 w-11 place-items-center rounded-full border border-line-strong/70 text-muted transition-colors hover:border-gold/50 hover:text-gold"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={2} aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => nudge(1)}
                aria-label="Scroll trainers right"
                className="grid h-11 w-11 place-items-center rounded-full border border-line-strong/70 text-muted transition-colors hover:border-gold/50 hover:text-gold"
              >
                <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
              </button>
            </div>
          }
        />
      </div>

      {/* Rail bleeds to the viewport edge so cards feel like they continue */}
      <RevealGroup stagger={0.06}>
        <div
          ref={railRef}
          className="mask-x mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 no-scrollbar lg:px-[max(1.25rem,calc((100vw-1320px)/2+2rem))]"
        >
          {trainers.map((t, i) => (
            <motion.div
              key={t.id}
              data-card
              variants={revealItem}
              className="w-[78vw] shrink-0 snap-start sm:w-[20rem]"
            >
              <TrainerCard trainer={t} index={i} />
            </motion.div>
          ))}
        </div>
      </RevealGroup>

      <div className="container">
        <p className="mt-2 text-xs text-faint lg:hidden">Swipe for more coaches →</p>
      </div>
    </section>
  );
}

export function TrainerCard({
  trainer,
  index = 0,
}: {
  trainer: Trainer;
  index?: number;
}) {
  const { openTrainer } = useApp();
  const headingId = `trainer-${trainer.id}-name`;

  return (
    <article
      aria-labelledby={headingId}
      className="group relative h-full overflow-hidden rounded-3xl border border-line bg-card transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-lift focus-within:-translate-y-1.5 focus-within:border-gold/40"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <SmartImage
          src={trainer.image}
          alt={`${trainer.name}, ${trainer.specialization} coach`}
          fill
          sizes="(max-width: 640px) 78vw, 20rem"
          seed={index + 40}
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />

        {trainer.spotsLeft <= 3 && (
          <div className="absolute left-4 top-4">
            <Badge tone="gold" className="glass">
              Only {trainer.spotsLeft} slots left
            </Badge>
          </div>
        )}

        <div className="absolute right-4 top-4 rounded-full border border-line-strong/60 px-2.5 py-1 glass">
          <Rating value={trainer.rating} />
        </div>

        {/* Name block sits on the portrait — keeps the card tall and editorial */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3
            id={headingId}
            className="font-display text-xl font-semibold tracking-[-0.02em] text-[#F6F1E7]"
          >
            {trainer.name}
          </h3>
          <p className="mt-1 text-sm text-gold">{trainer.specialization}</p>
          <p className="mt-2 flex items-center gap-1.5 text-xs text-[#F6F1E7]/60">
            <MapPin className="h-3 w-3" strokeWidth={2} aria-hidden />
            {trainer.gym} · {trainer.city}
          </p>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-4 text-xs text-muted">
          <span>
            <span className="font-display font-semibold tabular-nums text-fg">
              {trainer.years}
            </span>{" "}
            yrs experience
          </span>
          <span className="h-3 w-px bg-line" aria-hidden />
          <span>
            <span className="font-display font-semibold tabular-nums text-fg">
              {trainer.reviews}
            </span>{" "}
            reviews
          </span>
        </div>

        <div className="mt-4 flex items-end justify-between gap-3 border-t border-line pt-4">
          <div>
            <p className="text-2xs uppercase tracking-techy text-faint">Session</p>
            <p className="font-display text-base font-semibold tabular-nums text-fg">
              {pkr(trainer.pricePerSession)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => openTrainer(trainer.id)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border border-line-strong/70 px-4 py-2.5",
              "font-display text-[0.8125rem] font-semibold text-fg transition-all duration-300",
              "hover:border-gold hover:bg-gold hover:text-ink"
            )}
          >
            View Trainer
            <span className="sr-only"> — {trainer.name}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
