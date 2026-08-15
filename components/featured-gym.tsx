"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MapPin, Check } from "lucide-react";
import { SmartImage } from "@/components/ui/smart-image";
import { Rating } from "@/components/ui/rating";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Counter } from "@/components/ui/counter";
import { useApp } from "@/components/app-provider";
import { getGym, featuredGymId } from "@/data/gyms";
import { pkr } from "@/lib/utils";

export function FeaturedGym() {
  const gym = getGym(featuredGymId)!;
  const { openGym } = useApp();
  const reduced = useReducedMotion();

  const figures = [
    { value: gym.members, suffix: "", label: "Members" },
    { value: gym.trainers, suffix: "", label: "Trainers" },
    { value: gym.weeklyClasses, suffix: "", label: "Classes / week" },
  ];

  return (
    <section aria-labelledby="featured-gym-heading" className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      {/* Full-bleed tinted band so this reads differently from the card grid */}
      <div className="absolute inset-0 -z-10 bg-surface/70" aria-hidden />
      <div
        className="absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(60rem 30rem at 85% 50%, rgb(var(--gold)/0.10), transparent 65%)",
        }}
        aria-hidden
      />

      <div className="container">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Image side — deliberately oversized and offset */}
          <Reveal y={30} className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-line-strong/70 shadow-lift sm:aspect-[16/11]">
              <SmartImage
                src={gym.image}
                alt={`The main training floor at ${gym.name}`}
                fill
                sizes="(max-width: 1024px) 92vw, 55vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-ink/70 via-transparent to-transparent" />

              <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-line-strong/60 px-3 py-1.5 glass">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
                <span className="font-display text-2xs font-semibold uppercase tracking-techy text-fg">
                  Open 24 hours
                </span>
              </div>
            </div>

            {/* Overlapping figures card */}
            <motion.div
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 mx-4 -mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line-strong/70 bg-line shadow-lift sm:mx-8 lg:-mt-14 lg:mr-0"
            >
              {figures.map((f) => (
                <div key={f.label} className="bg-card px-3 py-4 text-center sm:px-5 sm:py-5">
                  <p className="font-display text-xl font-semibold tabular-nums tracking-[-0.03em] text-fg sm:text-2xl">
                    <Counter to={f.value} />
                    {f.suffix}
                  </p>
                  <p className="mt-1 text-2xs uppercase tracking-techy text-faint">
                    {f.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </Reveal>

          {/* Copy side */}
          <Reveal delay={0.1} className="lg:pl-4">
            <p className="label flex items-center gap-2.5">
              <span className="h-px w-6 bg-gold/50" aria-hidden />
              Featured gym
            </p>

            <h2
              id="featured-gym-heading"
              className="heading-lg mt-4"
            >
              {gym.name}
            </h2>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
              <Rating value={gym.rating} reviews={gym.reviews} showStars size="md" />
              <span className="flex items-center gap-1.5 text-sm text-muted">
                <MapPin className="h-4 w-4 text-faint" strokeWidth={1.75} aria-hidden />
                {gym.area}, {gym.city}
              </span>
              <span className="text-sm text-muted">{gym.distanceKm} km away</span>
            </div>

            <p className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-muted">
              {gym.blurb} The upstairs conditioning deck runs classes from 6 AM,
              and members get access to the recovery suite at any hour.
            </p>

            <ul className="mt-7 grid grid-cols-2 gap-x-6 gap-y-3">
              {gym.facilities.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-fg">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-gold/30 bg-gold/10">
                    <Check className="h-3 w-3 text-gold" strokeWidth={3} aria-hidden />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-5 border-t border-line pt-7">
              <div>
                <p className="text-2xs uppercase tracking-techy text-faint">
                  Membership from
                </p>
                <p className="font-display text-2xl font-semibold tabular-nums tracking-[-0.03em] text-fg">
                  {pkr(gym.price)}
                  <span className="text-sm font-normal text-muted">/month</span>
                </p>
              </div>

              <Button size="lg" className="ml-auto" onClick={() => openGym(gym.id)}>
                Explore Gym
                <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
