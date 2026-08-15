"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { RevealGroup, revealItem } from "@/components/ui/reveal";
import { useApp } from "@/components/app-provider";
import { memberships, billingNote } from "@/data/memberships";
import { cn, pkr } from "@/lib/utils";

export function Memberships() {
  const { openEarlyAccess } = useApp();

  return (
    <section id="memberships" className="section scroll-mt-24">
      <div className="container">
        <SectionHeading
          label="Memberships"
          title="Choose how you train."
          copy="Typical membership tiers across listed gyms. Pick the shape that fits, then find the spaces that offer it."
          align="center"
        />

        <RevealGroup
          stagger={0.08}
          className="mt-14 grid items-start gap-4 lg:grid-cols-3 lg:gap-5"
        >
          {memberships.map((m) => (
            <motion.article
              key={m.id}
              variants={revealItem}
              className={cn(
                "relative flex h-full flex-col rounded-[1.75rem] border p-7 transition-all duration-500 sm:p-8",
                m.popular
                  ? "border-gold/45 bg-card shadow-glow lg:-mt-5 lg:pb-11 lg:pt-11"
                  : "border-line bg-card hover:border-line-strong"
              )}
            >
              {m.popular && (
                <>
                  <div
                    className="pointer-events-none absolute inset-0 rounded-[1.75rem] opacity-70"
                    style={{
                      background:
                        "radial-gradient(28rem 16rem at 50% 0%, rgb(var(--gold)/0.10), transparent 70%)",
                    }}
                    aria-hidden
                  />
                  <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-gold px-3.5 py-1.5 font-display text-2xs font-bold uppercase tracking-techy text-ink">
                    <Sparkles className="h-3 w-3" strokeWidth={2.5} aria-hidden />
                    Most popular
                  </span>
                </>
              )}

              <div className="relative">
                <h3 className="font-display text-sm font-bold uppercase tracking-label text-gold">
                  {m.name}
                </h3>
                <p className="mt-3 text-sm text-muted">{m.tagline}</p>

                <p className="mt-7 flex items-baseline gap-1.5">
                  <span className="font-display text-[2.75rem] font-semibold leading-none tabular-nums tracking-[-0.04em] text-fg">
                    {pkr(m.price)}
                  </span>
                  <span className="text-sm text-muted">/month</span>
                </p>

                <Button
                  variant={m.popular ? "primary" : "outline"}
                  size="lg"
                  className="mt-7 w-full"
                  onClick={() => openEarlyAccess(`${m.name} membership`)}
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
                </Button>

                <div className="mt-8 border-t border-line pt-7">
                  {m.inheritsFrom && (
                    <p className="mb-4 font-display text-xs font-semibold text-fg">
                      Everything in {m.inheritsFrom}, plus:
                    </p>
                  )}
                  <ul className="space-y-3.5">
                    {m.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-fg">
                        <span
                          className={cn(
                            "mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full border",
                            m.popular
                              ? "border-gold/40 bg-gold/15"
                              : "border-line-strong/70 bg-elevated"
                          )}
                        >
                          <Check
                            className={cn("h-2.5 w-2.5", m.popular ? "text-gold" : "text-muted")}
                            strokeWidth={3.5}
                            aria-hidden
                          />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="mt-7 border-t border-line pt-5 text-xs text-faint">
                  {m.note}
                </p>
              </div>
            </motion.article>
          ))}
        </RevealGroup>

        <p className="mx-auto mt-8 max-w-lg text-center text-xs text-faint">
          {billingNote}
        </p>
      </div>
    </section>
  );
}
