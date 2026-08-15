import * as React from "react";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label: string;
  title: React.ReactNode;
  copy?: string;
  /** Right-hand slot — counts, CTAs, controls */
  aside?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  label,
  title,
  copy,
  aside,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-6",
        align === "left"
          ? "md:flex-row md:items-end md:justify-between"
          : "items-center text-center",
        className
      )}
    >
      <div className={cn(align === "left" ? "max-w-2xl" : "max-w-2xl")}>
        <p className="label flex items-center gap-2.5">
          <span className="h-px w-6 bg-gold/50" aria-hidden />
          {label}
        </p>
        <h2 className="heading-lg mt-4 text-balance">{title}</h2>
        {copy && (
          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted">
            {copy}
          </p>
        )}
      </div>
      {aside && <div className="shrink-0">{aside}</div>}
    </Reveal>
  );
}
