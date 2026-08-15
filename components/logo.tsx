import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-[11px] border border-gold/30 bg-gradient-to-br from-gold/25 via-gold/10 to-transparent">
        <svg
          viewBox="0 0 24 24"
          className="h-[18px] w-[18px]"
          fill="none"
          aria-hidden
        >
          {/* Dorsal fin cutting a waterline */}
          <path
            d="M5.5 16.5C9.5 15.6 13 12.4 15.2 6.6c.22-.58 1.05-.5 1.16.11L18.6 16.5"
            stroke="rgb(var(--gold))"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 19.4h18"
            stroke="rgb(var(--gold))"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.45"
          />
        </svg>
      </span>
      {!compact && (
        <span className="font-display text-[0.95rem] font-bold tracking-[0.22em] text-fg">
          {site.wordmark}
        </span>
      )}
    </span>
  );
}
