"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SlidersHorizontal, X, Check, RotateCcw, SearchX } from "lucide-react";
import { GymCard } from "@/components/gym-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { useApp } from "@/components/app-provider";
import {
  gyms,
  gymTypeFilters,
  cities,
  allFacilities,
  type GymType,
} from "@/data/gyms";
import { cn, pkr } from "@/lib/utils";

type Sort = "recommended" | "price" | "rating" | "distance";

const sorts: { id: Sort; label: string }[] = [
  { id: "recommended", label: "Recommended" },
  { id: "rating", label: "Top rated" },
  { id: "price", label: "Lowest price" },
  { id: "distance", label: "Nearest" },
];

const PRICE_MAX = 8000;
const DIST_MAX = 10;

export function GymDiscovery() {
  const { discoverQuery, setDiscoverQuery } = useApp();
  const reduced = useReducedMotion();

  const [type, setType] = React.useState<"All" | GymType>("All");
  const [city, setCity] = React.useState<string>("All cities");
  const [maxPrice, setMaxPrice] = React.useState(PRICE_MAX);
  const [minRating, setMinRating] = React.useState(0);
  const [maxDist, setMaxDist] = React.useState(DIST_MAX);
  const [facilities, setFacilities] = React.useState<string[]>([]);
  const [sort, setSort] = React.useState<Sort>("recommended");
  const [panelOpen, setPanelOpen] = React.useState(false);

  // A search selection can push a category in from the palette.
  React.useEffect(() => {
    if (!discoverQuery) return;
    const match = gymTypeFilters.find(
      (t) => t.toLowerCase() === discoverQuery.toLowerCase().replace(" training", "")
    );
    if (match) setType(match);
  }, [discoverQuery]);

  const activeCount =
    (type !== "All" ? 1 : 0) +
    (city !== "All cities" ? 1 : 0) +
    (maxPrice < PRICE_MAX ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (maxDist < DIST_MAX ? 1 : 0) +
    facilities.length;

  const reset = () => {
    setType("All");
    setCity("All cities");
    setMaxPrice(PRICE_MAX);
    setMinRating(0);
    setMaxDist(DIST_MAX);
    setFacilities([]);
    setSort("recommended");
    setDiscoverQuery("");
  };

  const results = React.useMemo(() => {
    const filtered = gyms.filter((g) => {
      if (type !== "All" && !g.types.includes(type)) return false;
      if (city !== "All cities" && g.city !== city) return false;
      if (g.price > maxPrice) return false;
      if (g.rating < minRating) return false;
      if (g.distanceKm > maxDist) return false;
      if (facilities.length && !facilities.every((f) => g.facilities.includes(f)))
        return false;
      return true;
    });

    const sorted = [...filtered];
    if (sort === "price") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    else if (sort === "distance")
      sorted.sort((a, b) => a.distanceKm - b.distanceKm);
    else
      sorted.sort(
        (a, b) =>
          b.rating * 100 + b.reviews / 100 - (a.rating * 100 + a.reviews / 100)
      );

    return sorted;
  }, [type, city, maxPrice, minRating, maxDist, facilities, sort]);

  const toggleFacility = (f: string) =>
    setFacilities((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );

  return (
    <section id="gyms" className="section scroll-mt-24">
      <div className="container">
        <SectionHeading
          label="Gym discovery"
          title="Your gym is closer than you think."
          copy="Explore fitness spaces that match your location, goals and lifestyle. Every filter here works on real demo listings."
          aside={
            <div className="flex items-center gap-3">
              <label className="sr-only" htmlFor="gym-sort">
                Sort gyms
              </label>
              <select
                id="gym-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="h-11 cursor-pointer rounded-full border border-line-strong/70 bg-card px-4 pr-9 text-sm text-fg outline-none transition-colors hover:border-gold/50"
                style={{
                  appearance: "none",
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23988' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.9rem center",
                }}
              >
                {sorts.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>

              <Button
                variant={panelOpen || activeCount ? "primary" : "outline"}
                onClick={() => setPanelOpen((o) => !o)}
                aria-expanded={panelOpen}
                aria-controls="gym-filters"
              >
                <SlidersHorizontal className="h-4 w-4" strokeWidth={2} aria-hidden />
                Filters
                {activeCount > 0 && (
                  <span className="ml-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-ink/20 px-1.5 text-2xs font-bold tabular-nums">
                    {activeCount}
                  </span>
                )}
              </Button>
            </div>
          }
        />

        {/* ── Category rail ─────────────────────────── */}
        <div className="mask-x mt-10 -mx-5 overflow-x-auto px-5 no-scrollbar sm:mx-0 sm:px-0">
          <div
            role="tablist"
            aria-label="Filter gyms by discipline"
            className="flex w-max gap-2 pb-1"
          >
            {gymTypeFilters.map((t) => {
              const selected = type === t;
              return (
                <button
                  key={t}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  onClick={() => setType(t)}
                  className={cn(
                    "relative rounded-full border px-4 py-2.5 font-display text-[0.8125rem] font-semibold transition-colors duration-300",
                    selected
                      ? "border-gold/50 text-ink"
                      : "border-line text-muted hover:border-line-strong hover:text-fg"
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="gym-type-pill"
                      className="absolute inset-0 rounded-full bg-gold"
                      transition={
                        reduced
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 400, damping: 34 }
                      }
                      aria-hidden
                    />
                  )}
                  <span className="relative">{t}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Advanced filter panel ─────────────────── */}
        <AnimatePresence initial={false}>
          {panelOpen && (
            <motion.div
              id="gym-filters"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-5 rounded-3xl border border-line bg-card p-5 sm:p-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  <Field label="City">
                    <div className="flex flex-wrap gap-1.5">
                      {cities.map((c) => (
                        <Chip
                          key={c}
                          selected={city === c}
                          onClick={() => setCity(c)}
                        >
                          {c}
                        </Chip>
                      ))}
                    </div>
                  </Field>

                  <Field
                    label="Max price"
                    value={
                      maxPrice >= PRICE_MAX ? "Any" : `${pkr(maxPrice)}/mo`
                    }
                  >
                    <RangeInput
                      min={1500}
                      max={PRICE_MAX}
                      step={100}
                      value={maxPrice}
                      onChange={setMaxPrice}
                      label="Maximum monthly price in rupees"
                      format={(v) => (v >= PRICE_MAX ? "Any price" : pkr(v))}
                    />
                  </Field>

                  <Field
                    label="Max distance"
                    value={maxDist >= DIST_MAX ? "Any" : `${maxDist} km`}
                  >
                    <RangeInput
                      min={1}
                      max={DIST_MAX}
                      step={0.5}
                      value={maxDist}
                      onChange={setMaxDist}
                      label="Maximum distance in kilometres"
                      format={(v) => (v >= DIST_MAX ? "Any distance" : `${v} km`)}
                    />
                  </Field>

                  <Field label="Minimum rating">
                    <div className="flex flex-wrap gap-1.5">
                      {[0, 4.5, 4.7, 4.8].map((r) => (
                        <Chip
                          key={r}
                          selected={minRating === r}
                          onClick={() => setMinRating(r)}
                        >
                          {r === 0 ? "Any" : `${r}+ ★`}
                        </Chip>
                      ))}
                    </div>
                  </Field>
                </div>

                <div className="mt-6 border-t border-line pt-5">
                  <Field label="Facilities">
                    <div className="flex flex-wrap gap-1.5">
                      {allFacilities.map((f) => (
                        <Chip
                          key={f}
                          selected={facilities.includes(f)}
                          onClick={() => toggleFacility(f)}
                        >
                          {facilities.includes(f) && (
                            <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                          )}
                          {f}
                        </Chip>
                      ))}
                    </div>
                  </Field>
                </div>

                <div className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-5">
                  <p className="text-sm text-muted">
                    <span className="font-display font-semibold tabular-nums text-fg">
                      {results.length}
                    </span>{" "}
                    of {gyms.length} gyms match
                  </p>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={reset}>
                      <RotateCcw className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                      Reset
                    </Button>
                    <Button size="sm" onClick={() => setPanelOpen(false)}>
                      Show {results.length}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Active filter summary ─────────────────── */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <p aria-live="polite" className="text-sm text-muted">
            Showing{" "}
            <span className="font-display font-semibold tabular-nums text-fg">
              {results.length}
            </span>{" "}
            {results.length === 1 ? "gym" : "gyms"}
            {city !== "All cities" && ` in ${city}`}
          </p>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1 rounded-full border border-line px-2.5 py-1 text-xs text-muted transition-colors hover:border-gold/40 hover:text-fg"
            >
              <X className="h-3 w-3" strokeWidth={2.5} aria-hidden />
              Clear {activeCount} {activeCount === 1 ? "filter" : "filters"}
            </button>
          )}
        </div>

        {/* ── Results ───────────────────────────────── */}
        {results.length > 0 ? (
          <motion.div
            layout={!reduced}
            className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {results.map((g, i) => (
                <motion.div
                  key={g.id}
                  layout={!reduced}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: reduced ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}
                >
                  <GymCard gym={g} index={i} className="h-full" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="mt-6 grid place-items-center rounded-3xl border border-dashed border-line-strong/70 bg-card/50 px-6 py-20 text-center">
            <SearchX className="h-8 w-8 text-faint" strokeWidth={1.5} aria-hidden />
            <p className="mt-4 font-display text-lg font-semibold text-fg">
              No gyms match those filters
            </p>
            <p className="mt-1.5 max-w-sm text-sm text-muted">
              Try widening the distance or price range — this preview carries{" "}
              {gyms.length} listings.
            </p>
            <Button variant="outline" className="mt-6" onClick={reset}>
              <RotateCcw className="h-4 w-4" strokeWidth={2} aria-hidden />
              Reset filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Small building blocks ───────────────────────── */

function Field({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <p className="label text-muted">{label}</p>
        {value && (
          <p className="font-display text-xs font-semibold tabular-nums text-gold">
            {value}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

function Chip({
  selected,
  children,
  onClick,
}: {
  selected: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-200",
        selected
          ? "border-gold/60 bg-gold/12 text-gold"
          : "border-line text-muted hover:border-line-strong hover:text-fg"
      )}
    >
      {children}
    </button>
  );
}

function RangeInput({
  min,
  max,
  step,
  value,
  onChange,
  label,
  format,
}: {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  label: string;
  format: (v: number) => string;
}) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div className="pt-1.5">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        aria-valuetext={format(value)}
        className="slider"
        style={{ ["--fill" as string]: `${fill}%` }}
      />
      <div className="mt-2 flex justify-between text-2xs tabular-nums text-faint">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}
