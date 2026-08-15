"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const button = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-display font-semibold tracking-techy transition-[transform,background-color,border-color,color,box-shadow] duration-200 ease-out disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-gold text-ink shadow-[0_8px_28px_-10px_rgb(var(--gold)/0.75)] hover:shadow-[0_12px_36px_-8px_rgb(var(--gold)/0.9)] hover:brightness-[1.06]",
        outline:
          "border border-line-strong/80 text-fg hover:border-gold/60 hover:bg-gold/[0.06]",
        ghost: "text-muted hover:text-fg hover:bg-fg/[0.05]",
        glass:
          "glass border border-line-strong/60 text-fg hover:border-gold/50 hover:text-fg",
        subtle: "bg-elevated text-fg border border-line hover:border-line-strong",
      },
      size: {
        sm: "h-9 px-4 text-[0.8125rem]",
        md: "h-11 px-5 text-sm",
        lg: "h-[3.25rem] px-7 text-[0.9375rem]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(button({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = "Button";

