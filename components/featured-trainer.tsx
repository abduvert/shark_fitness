"use client";

import { motion } from "framer-motion";
import { ArrowRight, Award, Quote } from "lucide-react";
import { SmartImage } from "@/components/ui/smart-image";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Counter } from "@/components/ui/counter";
import { Rating } from "@/components/ui/rating";
import { useApp } from "@/components/app-provider";
import { getTrainer, featuredTrainerId } from "@/data/trainers";
import { pkr } from "@/lib/utils";

export function FeaturedTrainer() {
  const t = getTrainer(featuredTrainerId)!;
  const { openTrainer } = useApp();

  const figures = [
    { to: t.years, suffix: "+", label: "Years experience", decimals: 0 },
    { to: 2, suffix: "K+", label: "Sessions coached", decimals: 0 },
    { to: t.rating, suffix: "", label: "Average rating", decimals: 1 },
  ];

  return (
    <section
      aria-labelledby="featured-trainer-heading"
      className="relative overflow-hidden border-y border-line bg-surface/60 py-16 sm:py-20 lg:py-24"
    >
      <div
        className="absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(50rem 28rem at 18% 40%, rgb(var(--gold)/0.10), transparent 65%)",
        }}
        aria-hidden
      />

      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Portrait with an overlapping quote plate */}
          <Reveal y={30} className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-line-strong/70 shadow-lift">
              <SmartImage
                src={t.image}
                alt={`${t.name}, ${t.specialization} coach at ${t.gym}`}
                fill
                sizes="(max-width: 1024px) 88vw, 34vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20, y: 10 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-6 -right-4 max-w-[15rem] rounded-2xl border border-line-strong/70 p-4 shadow-lift glass sm:-right-8"
            >
              <Quote className="h-4 w-4 text-gold" strokeWidth={2} aria-hidden />
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-fg">
                “Everyone can add weight to a bar. My job is making sure you can
                still do it in ten years.”
              </p>
            </motion.div>
          </Reveal>

          {/* Detail column */}
          <Reveal delay={0.1} className="mt-6 lg:mt-0">
            <p className="label flex items-center gap-2.5">
              <span className="h-px w-6 bg-gold/50" aria-hidden />
              Personal trainer
            </p>

            <h2 id="featured-trainer-heading" className="heading-lg mt-4">
              {t.name}
            </h2>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
              <Rating value={t.rating} reviews={t.reviews} showStars size="md" />
              <span className="text-sm text-muted">
                {t.gym} · {t.city}
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {t.specialties.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-gold/25 bg-gold/[0.07] px-3 py-1.5 text-xs font-medium text-gold"
                >
                  {s}
                </span>
              ))}
            </div>

            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted">
              {t.bio}
            </p>

            {/* Animated figures */}
            <div className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line">
              {figures.map((f) => (
                <div key={f.label} className="bg-card px-3 py-5 sm:px-5">
                  <p className="font-display text-2xl font-semibold tabular-nums tracking-[-0.03em] text-fg sm:text-3xl">
                    <Counter to={f.to} decimals={f.decimals} />
                    <span className="text-gold">{f.suffix}</span>
                  </p>
                  <p className="mt-1 text-2xs uppercase tracking-techy text-faint">
                    {f.label}
                  </p>
                </div>
              ))}
            </div>

            <ul className="mt-7 space-y-2.5">
              {t.achievements.map((a) => (
                <li key={a} className="flex items-start gap-2.5 text-sm text-muted">
                  <Award
                    className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  {a}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-5 border-t border-line pt-7">
              <div>
                <p className="text-2xs uppercase tracking-techy text-faint">
                  Per session
                </p>
                <p className="font-display text-2xl font-semibold tabular-nums tracking-[-0.03em] text-fg">
                  {pkr(t.pricePerSession)}
                </p>
              </div>
              <Button size="lg" className="ml-auto" onClick={() => openTrainer(t.id)}>
                Explore Trainer
                <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
