import * as React from "react";
import { cn } from "@/lib/utils";

const tones = {
  gold: "border-gold/35 bg-gold/10 text-gold",
  neutral: "border-line-strong/70 bg-fg/[0.04] text-muted",
  solid: "border-transparent bg-gold text-ink",
  open: "border-emerald-500/30 bg-emerald-500/10 text-emerald-500 dark:text-emerald-400",
  closed: "border-line-strong/70 bg-fg/[0.04] text-faint",
} as const;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: keyof typeof tones;
}

export function Badge({ tone = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-display text-2xs font-semibold uppercase tracking-techy",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}

/** Small pill for facility tags — lower-contrast than Badge. */
export function Tag({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-line bg-fg/[0.03] px-2 py-1 text-[0.6875rem] font-medium text-muted",
        className
      )}
      {...props}
    />
  );
}
