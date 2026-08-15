"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Navigation, Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { useApp } from "@/components/app-provider";
import { gyms } from "@/data/gyms";
import { cn, pkr } from "@/lib/utils";

/** Smallest step is 2 km — the nearest listings sit at 1.6–1.8 km, so a 1 km
 *  option would land the demo on an empty state the moment anyone tried it.
 *  `ring` is the drawn size: distance compresses at the top of the range so
 *  all four steps stay visually distinct on a fixed canvas. */
const radii = [
  { km: 2, ring: 30 },
  { km: 5, ring: 54 },
  { km: 10, ring: 76 },
  { km: 25, ring: 97 },
] as const;

export function MapPreview() {
  const [radius, setRadius] = React.useState<number>(5);
  const [active, setActive] = React.useState<string | null>("iron-district");
  const { openGym } = useApp();
  const reduced = useReducedMotion();

  const within = gyms.filter((g) => g.distanceKm <= radius);
  const activeGym = gyms.find((g) => g.id === active) ?? null;
  const ring = radii.find((r) => r.km === radius)?.ring ?? 54;

  return (
    <section aria-labelledby="map-heading" className="section">
      <div className="container">
        <SectionHeading
          label="Nearby"
          title={<span id="map-heading">Fitness around you.</span>}
          copy="A live view of what's in range. Change the radius and watch the shortlist change with it."
        />

        <Reveal className="mt-12 grid gap-4 lg:grid-cols-[1.35fr_1fr] lg:gap-5">
          {/* ── Stylised map canvas ─────────────────── */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-line bg-surface sm:aspect-[16/10]">
            {/* Abstract street grid */}
            <MapCanvas />

            {/* Radius ring, centred on "you" */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/40 bg-gold/[0.06]"
              animate={{
                width: `${ring}%`,
                height: `${Math.min(ring * 1.3, 122)}%`,
              }}
              transition={{ duration: reduced ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden
            />

            {/* You-are-here */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden>
              <span className="relative flex h-3.5 w-3.5">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-gold" />
                <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-base bg-gold" />
              </span>
            </div>

            {/* Gym markers */}
            {gyms.map((g) => {
              const inRange = g.distanceKm <= radius;
              const isActive = active === g.id;
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setActive(g.id)}
                  aria-label={`${g.name}, ${g.distanceKm} km away${inRange ? "" : " — outside the current radius"}`}
                  aria-pressed={isActive}
                  className={cn(
                    "group absolute -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500",
                    inRange ? "opacity-100" : "opacity-30"
                  )}
                  style={{ left: `${g.map.x}%`, top: `${g.map.y}%` }}
                >
                  <span
                    className={cn(
                      "grid h-8 w-8 place-items-center rounded-full border transition-all duration-300",
                      isActive
                        ? "scale-125 border-gold bg-gold text-ink shadow-[0_0_20px_rgb(var(--gold)/0.7)]"
                        : "border-line-strong bg-card text-muted group-hover:border-gold/60 group-hover:text-gold"
                    )}
                  >
                    <MapPin className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden />
                  </span>

                  {/* Label appears for the active pin */}
                  <span
                    className={cn(
                      "pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-line-strong/70 px-2.5 py-1 font-display text-2xs font-semibold text-fg transition-all duration-300 glass",
                      isActive
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    )}
                  >
                    {g.name}
                  </span>
                </button>
              );
            })}

            {/* Radius control, floating on the map */}
            <div
              role="radiogroup"
              aria-label="Search radius"
              className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1 rounded-full border border-line-strong/70 p-1 glass"
            >
              {radii.map((r) => (
                <button
                  key={r.km}
                  type="button"
                  role="radio"
                  aria-checked={radius === r.km}
                  onClick={() => setRadius(r.km)}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 font-display text-2xs font-semibold tabular-nums transition-colors sm:px-4 sm:text-xs",
                    radius === r.km
                      ? "bg-gold text-ink"
                      : "text-muted hover:text-fg"
                  )}
                >
                  {r.km} km
                </button>
              ))}
            </div>

            <p className="absolute left-4 top-4 rounded-full border border-line-strong/60 px-3 py-1.5 text-2xs text-muted glass">
              Illustrative map — not to scale
            </p>
          </div>

          {/* ── Side panel ──────────────────────────── */}
          <div className="flex flex-col gap-4">
            <div className="rounded-[1.75rem] border border-line bg-card p-6">
              <p className="label text-muted">In range</p>
              <p className="mt-3 font-display text-[2.75rem] font-semibold leading-none tabular-nums tracking-[-0.04em] text-fg">
                {within.length}
                <span className="ml-2 text-base font-normal text-muted">
                  {within.length === 1 ? "gym" : "gyms"} within {radius} km
                </span>
              </p>

              {/* Density bar */}
              <div className="mt-5 flex h-1.5 overflow-hidden rounded-full bg-line" aria-hidden>
                <motion.div
                  className="bg-gold"
                  animate={{ width: `${(within.length / gyms.length) * 100}%` }}
                  transition={{ duration: reduced ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <p className="mt-2 text-xs text-faint">
                out of {gyms.length} listed in this preview
              </p>
            </div>

            {/* Active pin detail */}
            <div className="flex-1 rounded-[1.75rem] border border-line bg-card p-6">
              <p className="label text-muted">Selected</p>

              {activeGym ? (
                <motion.div
                  key={activeGym.id}
                  initial={{ opacity: 0, y: reduced ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3"
                >
                  <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-fg">
                    {activeGym.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    {activeGym.area}, {activeGym.city}
                  </p>

                  <dl className="mt-5 grid grid-cols-3 gap-3">
                    {[
                      {
                        icon: Star,
                        term: "Rating",
                        detail: activeGym.rating.toFixed(1),
                      },
                      {
                        icon: Navigation,
                        term: "Distance",
                        detail: `${activeGym.distanceKm} km`,
                      },
                      {
                        icon: MapPin,
                        term: "From",
                        detail: pkr(activeGym.price),
                      },
                    ].map(({ icon: Icon, term, detail }) => (
                      <div key={term} className="rounded-xl border border-line bg-elevated p-3">
                        <dt className="flex items-center gap-1 text-2xs uppercase tracking-techy text-faint">
                          <Icon className="h-3 w-3 text-gold" strokeWidth={2} aria-hidden />
                          {term}
                        </dt>
                        <dd className="mt-1 font-display text-sm font-semibold tabular-nums text-fg">
                          {detail}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <Button
                    variant="outline"
                    className="mt-5 w-full"
                    onClick={() => openGym(activeGym.id)}
                  >
                    View {activeGym.name}
                  </Button>
                </motion.div>
              ) : (
                <p className="mt-3 text-sm text-muted">
                  Pick a marker on the map to see the details.
                </p>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Decorative abstract street plan — pure SVG, no map API. */
function MapCanvas() {
  return (
    <div className="absolute inset-0" aria-hidden>
      <svg
        className="h-full w-full"
        viewBox="0 0 400 260"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Blocks */}
        <g stroke="rgb(var(--line))" strokeWidth="1">
          {Array.from({ length: 9 }, (_, i) => (
            <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="260" />
          ))}
          {Array.from({ length: 6 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 52} x2="400" y2={i * 52} />
          ))}
        </g>

        {/* Arterial roads */}
        <g
          stroke="rgb(var(--line-strong))"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.85"
        >
          <path d="M0 96 L140 96 L190 140 L400 140" />
          <path d="M96 0 L96 84 L150 130 L150 260" />
          <path d="M300 0 L300 110 L400 190" />
          <path d="M0 210 L120 210 L200 180 L400 210" />
        </g>

        {/* Water / green space */}
        <path
          d="M330 0 C310 40 350 70 340 110 C332 145 370 170 400 165 L400 0 Z"
          fill="rgb(var(--gold))"
          opacity="0.05"
        />
        <circle cx="60" cy="170" r="34" fill="rgb(var(--gold))" opacity="0.05" />
      </svg>

      {/* Fade the canvas edges into the panel */}
      <div className="absolute inset-0 bg-[radial-gradient(75%_75%_at_50%_50%,transparent,rgb(var(--surface))_100%)]" />
    </div>
  );
}
