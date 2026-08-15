"use client";

import * as React from "react";
import { Heart, MapPin, Navigation, ArrowUpRight } from "lucide-react";
import { SmartImage } from "@/components/ui/smart-image";
import { Badge, Tag } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { useApp } from "@/components/app-provider";
import { useNow } from "@/lib/use-now";
import type { Gym } from "@/data/gyms";
import { cn, openState, pkr } from "@/lib/utils";

export function GymCard({
  gym,
  index = 0,
  className,
}: {
  gym: Gym;
  index?: number;
  className?: string;
}) {
  const { openGym, toggleFavourite, isFavourite } = useApp();
  const now = useNow();
  const status = openState(gym.opensAt, gym.closesAt, now);
  const fav = isFavourite(gym.id);
  const headingId = `gym-${gym.id}-name`;

  return (
    <article
      aria-labelledby={headingId}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-card transition-all duration-500 ease-out",
        "hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-lift dark:hover:shadow-lift",
        "focus-within:-translate-y-1.5 focus-within:border-gold/40",
        className
      )}
    >
      {/* ── Media ─────────────────────────────────── */}
      <div className="relative aspect-[16/11] overflow-hidden">
        <SmartImage
          src={gym.image}
          alt={`Inside ${gym.name}, ${gym.area}`}
          fill
          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 30vw"
          seed={index}
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-90" />

        <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {gym.badges.slice(0, 2).map((b) => (
              <Badge key={b} tone={b === "Best value" ? "gold" : "neutral"} className="glass">
                {b}
              </Badge>
            ))}
          </div>

          <button
            type="button"
            onClick={() => toggleFavourite(gym.id)}
            aria-pressed={fav}
            aria-label={`${fav ? "Remove" : "Save"} ${gym.name} ${fav ? "from" : "to"} your shortlist`}
            className={cn(
              "grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300 glass",
              // Always visible on touch; reveals on hover for pointer devices
              "border-line-strong/60 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100",
              fav && "border-gold/60 !opacity-100"
            )}
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors",
                fav ? "fill-gold text-gold" : "text-[#F6F1E7]"
              )}
              strokeWidth={1.75}
              aria-hidden
            />
          </button>
        </div>

        {/* Status + distance sit on the image so the body stays typographic */}
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-display text-2xs font-semibold glass",
              status.open
                ? "border-emerald-400/30 text-emerald-300"
                : "border-line-strong/60 text-[#F6F1E7]/70"
            )}
          >
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                status.open ? "bg-emerald-400" : "bg-faint"
              )}
              aria-hidden
            />
            {status.label}
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full border border-line-strong/60 px-2.5 py-1 text-2xs font-medium text-[#F6F1E7] glass">
            <Navigation className="h-3 w-3 text-gold" strokeWidth={2} aria-hidden />
            {gym.distanceKm.toFixed(1)} km
          </span>
        </div>
      </div>

      {/* ── Body ──────────────────────────────────── */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3
            id={headingId}
            className="font-display text-lg font-semibold tracking-[-0.015em] text-fg"
          >
            {gym.name}
          </h3>
          <Rating value={gym.rating} className="mt-0.5 shrink-0" />
        </div>

        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-faint" strokeWidth={1.75} aria-hidden />
          {gym.area}, {gym.city}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {gym.facilities.slice(0, 4).map((f) => (
            <Tag key={f}>{f}</Tag>
          ))}
          {gym.facilities.length > 4 && (
            <Tag className="text-faint">+{gym.facilities.length - 4}</Tag>
          )}
        </div>

        <div className="mt-5 flex items-end justify-between gap-3 border-t border-line pt-4">
          <div>
            <p className="text-2xs uppercase tracking-techy text-faint">From</p>
            <p className="font-display text-base font-semibold tabular-nums text-fg">
              {pkr(gym.price)}
              <span className="text-xs font-normal text-muted">/month</span>
            </p>
          </div>

          <button
            type="button"
            onClick={() => openGym(gym.id)}
            className="group/cta inline-flex items-center gap-1.5 rounded-full border border-line-strong/70 px-4 py-2.5 font-display text-[0.8125rem] font-semibold text-fg transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ink"
          >
            View Gym
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
              strokeWidth={2.25}
              aria-hidden
            />
            <span className="sr-only"> — {gym.name}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
