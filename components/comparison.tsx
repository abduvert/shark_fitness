"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check, Minus, Plus, X, Trophy } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { SmartImage } from "@/components/ui/smart-image";
import { useApp } from "@/components/app-provider";
import { gyms, type Gym } from "@/data/gyms";
import { cn, pkr } from "@/lib/utils";

type RowValue = { text: string; boolean?: boolean; best?: boolean };

const MAX = 3;

export function Comparison() {
  const [selected, setSelected] = React.useState<string[]>([
    "iron-district",
    "core-fitness",
    "elevate",
  ]);
  const [picking, setPicking] = React.useState(false);
  const { openGym } = useApp();

  const chosen = selected
    .map((id) => gyms.find((g) => g.id === id))
    .filter((g): g is Gym => Boolean(g));

  const remove = (id: string) =>
    setSelected((s) => (s.length > 1 ? s.filter((x) => x !== id) : s));

  const add = (id: string) => {
    setSelected((s) => (s.length >= MAX || s.includes(id) ? s : [...s, id]));
    setPicking(false);
  };

  // Winner per row, so the table actually helps you decide.
  const bestRating = Math.max(...chosen.map((g) => g.rating));
  const bestPrice = Math.min(...chosen.map((g) => g.price));
  const bestDistance = Math.min(...chosen.map((g) => g.distanceKm));

  const rows: { label: string; values: (g: Gym) => RowValue }[] = [
    {
      label: "Rating",
      values: (g) => ({
        text: g.rating.toFixed(1),
        best: g.rating === bestRating,
      }),
    },
    {
      label: "From",
      values: (g) => ({ text: pkr(g.price), best: g.price === bestPrice }),
    },
    {
      label: "Distance",
      values: (g) => ({
        text: `${g.distanceKm} km`,
        best: g.distanceKm === bestDistance,
      }),
    },
    {
      label: "24/7 access",
      values: (g) => ({ text: "", boolean: g.closesAt === null }),
    },
    {
      label: "Sauna",
      values: (g) => ({ text: "", boolean: g.facilities.includes("Sauna") }),
    },
    {
      label: "Pool",
      values: (g) => ({ text: "", boolean: g.facilities.includes("Pool") }),
    },
    {
      label: "Classes",
      values: (g) => ({ text: `${g.weeklyClasses}/wk` }),
    },
    {
      label: "Trainers",
      values: (g) => ({ text: `${g.trainers}` }),
    },
    {
      label: "Parking",
      values: (g) => ({ text: "", boolean: g.facilities.includes("Parking") }),
    },
  ];

  const available = gyms.filter((g) => !selected.includes(g.id));

  return (
    <section aria-labelledby="compare-heading" className="section">
      <div className="container">
        <SectionHeading
          label="Compare"
          title={<span id="compare-heading">Three tabs, one table.</span>}
          copy="Swap any gym in or out and the comparison updates instantly. This is the part that usually takes an afternoon of phone calls."
        />

        <Reveal className="mt-12 overflow-hidden rounded-[1.75rem] border border-line bg-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[42rem] border-collapse">
              <caption className="sr-only">
                Side-by-side comparison of {chosen.map((g) => g.name).join(", ")}
              </caption>

              <thead>
                <tr>
                  <th
                    scope="col"
                    className="sticky left-0 z-10 w-[9rem] border-b border-line bg-card p-4 text-left align-bottom sm:w-[12rem] sm:p-5"
                  >
                    <span className="label text-muted">Comparing</span>
                  </th>

                  {chosen.map((g) => (
                    <th
                      key={g.id}
                      scope="col"
                      className="relative border-b border-l border-line p-4 text-left align-bottom sm:p-5"
                    >
                      {chosen.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(g.id)}
                          aria-label={`Remove ${g.name} from comparison`}
                          className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full border border-line text-faint transition-colors hover:border-gold/50 hover:text-gold"
                        >
                          <X className="h-3 w-3" strokeWidth={2.5} aria-hidden />
                        </button>
                      )}

                      <div className="relative mb-3 h-14 w-14 overflow-hidden rounded-xl border border-line">
                        <SmartImage
                          src={g.image}
                          alt=""
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => openGym(g.id)}
                        className="text-left font-display text-sm font-semibold text-fg transition-colors hover:text-gold sm:text-base"
                      >
                        {g.name}
                      </button>
                      <p className="mt-0.5 text-xs font-normal text-faint">
                        {g.area}
                      </p>
                    </th>
                  ))}

                  {chosen.length < MAX && (
                    <th
                      scope="col"
                      className="w-[10rem] border-b border-l border-line p-4 align-bottom sm:p-5"
                    >
                      <AddColumn
                        open={picking}
                        setOpen={setPicking}
                        options={available}
                        onPick={add}
                      />
                    </th>
                  )}
                </tr>
              </thead>

              <tbody>
                {rows.map((row, ri) => (
                  <tr key={row.label} className={cn(ri % 2 === 1 && "bg-elevated/40")}>
                    <th
                      scope="row"
                      className={cn(
                        "sticky left-0 z-10 p-4 text-left text-sm font-medium text-muted sm:p-5",
                        ri % 2 === 1 ? "bg-elevated" : "bg-card",
                        ri > 0 && "border-t border-line"
                      )}
                    >
                      {row.label}
                    </th>

                    {chosen.map((g) => {
                      const v = row.values(g);
                      return (
                        <td
                          key={g.id}
                          className={cn(
                            "border-l border-line p-4 sm:p-5",
                            ri > 0 && "border-t"
                          )}
                        >
                          {v.boolean !== undefined ? (
                            v.boolean ? (
                              <span className="inline-flex items-center gap-1.5 text-sm text-fg">
                                <Check
                                  className="h-4 w-4 text-gold"
                                  strokeWidth={2.5}
                                  aria-hidden
                                />
                                <span className="sr-only">Yes</span>
                                <span aria-hidden className="text-xs text-muted">
                                  Included
                                </span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 text-sm text-faint">
                                <Minus className="h-4 w-4" strokeWidth={2} aria-hidden />
                                <span className="sr-only">No</span>
                                <span aria-hidden className="text-xs">
                                  Not offered
                                </span>
                              </span>
                            )
                          ) : (
                            <span
                              className={cn(
                                "inline-flex items-center gap-1.5 font-display text-sm font-semibold tabular-nums",
                                v.best ? "text-gold" : "text-fg"
                              )}
                            >
                              {v.text}
                              {v.best && chosen.length > 1 && (
                                <>
                                  <Trophy
                                    className="h-3 w-3"
                                    strokeWidth={2}
                                    aria-hidden
                                  />
                                  <span className="sr-only">— best of the three</span>
                                </>
                              )}
                            </span>
                          )}
                        </td>
                      );
                    })}

                    {chosen.length < MAX && (
                      <td
                        className={cn("border-l border-line", ri > 0 && "border-t")}
                        aria-hidden
                      />
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line px-5 py-4">
            <p className="flex items-center gap-2 text-xs text-faint">
              <Trophy className="h-3.5 w-3.5 text-gold" strokeWidth={2} aria-hidden />
              Gold marks the best value in each row
            </p>
            <p className="text-xs text-faint">
              {chosen.length} of {MAX} slots used
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AddColumn({
  open,
  setOpen,
  options,
  onPick,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  options: Gym[];
  onPick: (id: string) => void;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full flex-col items-center gap-2 rounded-2xl border border-dashed border-line-strong/70 px-3 py-5 text-center transition-colors hover:border-gold/50"
      >
        <span className="grid h-9 w-9 place-items-center rounded-full border border-line-strong/70 text-gold">
          <Plus className="h-4 w-4" strokeWidth={2} aria-hidden />
        </span>
        <span className="font-display text-xs font-semibold text-muted">
          Add a gym
        </span>
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 top-full z-30 mt-2 max-h-64 w-60 overflow-y-auto rounded-2xl border border-line-strong/70 bg-elevated p-1.5 shadow-lift"
        >
          {options.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => onPick(g.id)}
              className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left transition-colors hover:bg-fg/[0.06]"
            >
              <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg border border-line">
                <SmartImage src={g.image} alt="" fill sizes="32px" className="object-cover" />
              </div>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-display text-xs font-semibold text-fg">
                  {g.name}
                </span>
                <span className="block truncate text-2xs font-normal text-faint">
                  {g.area} · {pkr(g.price)}
                </span>
              </span>
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
