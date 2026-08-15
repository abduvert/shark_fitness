"use client";

import * as React from "react";
import { ThemeProvider as NextThemes, useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemes
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      storageKey="shark:theme"
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemes>
  );
}

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  const toggle = () => {
    // Enable the cross-fade only for the duration of the switch, so we're not
    // paying for a transition on every paint.
    const root = document.documentElement;
    root.classList.add("theme-shifting");
    setTheme(isDark ? "light" : "dark");
    window.setTimeout(() => root.classList.remove("theme-shifting"), 480);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        mounted
          ? `Switch to ${isDark ? "light" : "dark"} mode`
          : "Switch colour theme"
      }
      title={mounted ? `Switch to ${isDark ? "light" : "dark"} mode` : undefined}
      className={cn(
        "group relative grid h-10 w-10 place-items-center rounded-full border border-line-strong/60 text-muted transition-colors hover:border-gold/50 hover:text-gold",
        className
      )}
    >
      <span className="relative block h-[18px] w-[18px]">
        <Sun
          className={cn(
            "absolute inset-0 h-[18px] w-[18px] transition-all duration-300",
            mounted && isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-50 opacity-0"
          )}
          strokeWidth={1.75}
          aria-hidden
        />
        <Moon
          className={cn(
            "absolute inset-0 h-[18px] w-[18px] transition-all duration-300",
            mounted && !isDark
              ? "rotate-0 scale-100 opacity-100"
              : "rotate-90 scale-50 opacity-0"
          )}
          strokeWidth={1.75}
          aria-hidden
        />
      </span>
    </button>
  );
}
