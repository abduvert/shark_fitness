"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SmartImage } from "@/components/ui/smart-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { Rating } from "@/components/ui/rating";
import { RevealGroup, revealItem } from "@/components/ui/reveal";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [lead, ...rest] = testimonials;

  return (
    <section aria-labelledby="testimonials-heading" className="section">
      <div className="container">
        <SectionHeading
          label="Members"
          title={
            <span id="testimonials-heading">
              Built for people who take fitness seriously.
            </span>
          }
          aside={
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5" aria-hidden>
                {testimonials.map((t, i) => (
                  <span
                    key={t.id}
                    className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-base"
                  >
                    <SmartImage
                      src={t.image}
                      alt=""
                      fill
                      sizes="36px"
                      seed={i + 90}
                      className="object-cover"
                    />
                  </span>
                ))}
              </div>
              <p className="text-sm text-muted">
                <span className="font-display font-semibold text-fg">4.8</span> average
                from 2,400 reviews
              </p>
            </div>
          }
        />

        {/* Asymmetric: one tall lead quote, three stacked beside it */}
        <RevealGroup className="mt-12 grid gap-4 lg:grid-cols-[1.05fr_1fr]">
          <motion.figure
            variants={revealItem}
            className="relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] border border-line bg-card p-7 sm:p-9"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                background:
                  "radial-gradient(28rem 18rem at 85% 0%, rgb(var(--gold)/0.09), transparent 70%)",
              }}
              aria-hidden
            />
            <div className="relative">
              <Quote className="h-7 w-7 text-gold" strokeWidth={1.5} aria-hidden />
              <blockquote className="mt-6 text-pretty font-display text-xl font-medium leading-[1.45] tracking-[-0.015em] text-fg sm:text-2xl">
                “{lead.quote}”
              </blockquote>
            </div>

            <figcaption className="relative mt-8 flex items-center gap-3.5 border-t border-line pt-6">
              <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-line">
                <SmartImage
                  src={lead.image}
                  alt=""
                  fill
                  sizes="48px"
                  seed={90}
                  className="object-cover"
                />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-sm font-semibold text-fg">
                  {lead.name}
                </span>
                <span className="block truncate text-xs text-muted">
                  {lead.role} · {lead.location}
                </span>
              </span>
              <Rating value={lead.rating} showStars />
            </figcaption>
          </motion.figure>

          <div className="grid gap-4">
            {rest.map((t, i) => (
              <motion.figure
                key={t.id}
                variants={revealItem}
                className={cn(
                  "flex flex-col justify-between rounded-[1.5rem] border border-line bg-card p-6 transition-colors duration-500 hover:border-line-strong"
                )}
              >
                <blockquote className="text-pretty text-[0.9375rem] leading-relaxed text-fg">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-line">
                    <SmartImage
                      src={t.image}
                      alt=""
                      fill
                      sizes="36px"
                      seed={i + 91}
                      className="object-cover"
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-xs font-semibold text-fg">
                      {t.name}
                    </span>
                    <span className="block truncate text-2xs text-faint">
                      {t.location}
                    </span>
                  </span>
                  <Rating value={t.rating} showStars />
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </RevealGroup>
      </div>
    </section>
  );
}
