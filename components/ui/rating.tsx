import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  reviews?: number;
  /** Show five glyphs rather than a single star + number */
  showStars?: boolean;
  className?: string;
  size?: "sm" | "md";
}

export function Rating({
  value,
  reviews,
  showStars = false,
  className,
  size = "sm",
}: RatingProps) {
  const px = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <span
      className={cn("inline-flex items-center gap-1.5", className)}
      aria-label={`Rated ${value.toFixed(1)} out of 5${
        reviews ? ` from ${reviews} reviews` : ""
      }`}
    >
      <span className="inline-flex items-center gap-0.5" aria-hidden>
        {showStars ? (
          Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={cn(
                px,
                i < Math.round(value)
                  ? "fill-gold text-gold"
                  : "fill-none text-line-strong"
              )}
              strokeWidth={1.5}
            />
          ))
        ) : (
          <Star className={cn(px, "fill-gold text-gold")} strokeWidth={1.5} />
        )}
      </span>
      <span
        className={cn(
          "font-display font-semibold tabular-nums text-fg",
          size === "sm" ? "text-xs" : "text-sm"
        )}
        aria-hidden
      >
        {value.toFixed(1)}
      </span>
      {reviews !== undefined && (
        <span className="text-xs text-faint" aria-hidden>
          ({reviews})
        </span>
      )}
    </span>
  );
}
