"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, Search, X, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useApp, scrollToSection } from "@/components/app-provider";
import { useScrollLock } from "@/components/ui/dialog";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [active, setActive] = React.useState<string>("");
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { openSearch, openEarlyAccess } = useApp();
  const reduced = useReducedMotion();

  useScrollLock(menuOpen);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently occupying the upper third of the viewport.
  React.useEffect(() => {
    const ids = site.nav.map((n) => n.href);
    const sections = ids
      .map((id) => document.querySelector(id))
      .filter((el): el is Element => Boolean(el));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0.05, 0.4, 0.8] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Cmd/Ctrl-K opens search from anywhere.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openSearch();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openSearch]);

  const go = (href: string) => {
    setMenuOpen(false);
    // Let the drawer close before scrolling so the motion reads cleanly.
    window.setTimeout(() => scrollToSection(href), menuOpen ? 180 : 0);
  };

  return (
    <>
      <a
        href="#discover"
        className="sr-only left-4 top-4 z-[200] rounded-full bg-gold px-5 py-2.5 font-display text-sm font-semibold text-ink focus:not-sr-only focus:fixed"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[padding] duration-500",
          scrolled ? "pt-2 sm:pt-3" : "pt-3 sm:pt-6"
        )}
      >
        <div className="container">
          <nav
            aria-label="Primary"
            className={cn(
              "flex items-center gap-3 rounded-full border px-3 transition-all duration-500 sm:px-4",
              scrolled
                ? "glass-strong h-14 border-line-strong/70 shadow-lift"
                : "h-16 border-transparent bg-transparent"
            )}
          >
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })}
              className="rounded-full pl-1 pr-2"
              aria-label={`${site.name} — back to top`}
            >
              <Logo />
            </button>

            <ul className="ml-4 hidden items-center gap-1 lg:flex">
              {site.nav.map((item) => {
                const isActive = active === item.href;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        go(item.href);
                      }}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative rounded-full px-3.5 py-2 text-[0.8125rem] font-medium transition-colors",
                        isActive ? "text-fg" : "text-muted hover:text-fg"
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full bg-fg/[0.07]"
                          transition={{ type: "spring", stiffness: 420, damping: 34 }}
                          aria-hidden
                        />
                      )}
                      <span className="relative">{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => openSearch()}
                aria-label="Search gyms, trainers and classes"
                className="group hidden h-10 items-center gap-2 rounded-full border border-line-strong/60 pl-3.5 pr-2 text-muted transition-colors hover:border-gold/50 hover:text-fg md:flex"
              >
                <Search className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                <span className="text-[0.8125rem]">Search</span>
                <kbd className="ml-1 hidden rounded border border-line px-1.5 py-0.5 font-sans text-2xs text-faint lg:block">
                  ⌘K
                </kbd>
              </button>

              <button
                type="button"
                onClick={() => openSearch()}
                aria-label="Search"
                className="grid h-10 w-10 place-items-center rounded-full border border-line-strong/60 text-muted transition-colors hover:border-gold/50 hover:text-gold md:hidden"
              >
                <Search className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
              </button>

              <ThemeToggle className="hidden sm:grid" />

              <Button
                size="sm"
                className="hidden sm:inline-flex"
                onClick={() => openEarlyAccess("Get started")}
              >
                Get Started
              </Button>

              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                className="grid h-10 w-10 place-items-center rounded-full border border-line-strong/60 text-fg transition-colors hover:border-gold/50 lg:hidden"
              >
                <Menu className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
              </button>
            </div>
          </nav>
        </div>
      </header>

      <MobileDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={go}
      />
    </>
  );
}

function MobileDrawer({
  open,
  onClose,
  onNavigate,
}: {
  open: boolean;
  onClose: () => void;
  onNavigate: (href: string) => void;
}) {
  const { openEarlyAccess, openSearch } = useApp();
  const panelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const t = window.setTimeout(
      () => panelRef.current?.querySelector<HTMLElement>("a,button")?.focus(),
      120
    );
    return () => {
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[90] lg:hidden">
          <motion.div
            className="absolute inset-0 bg-ink/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-y-0 right-0 flex w-[min(23rem,88vw)] flex-col border-l border-line-strong/70 bg-surface"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <Logo />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="grid h-10 w-10 place-items-center rounded-full border border-line-strong/60 text-fg transition-colors hover:border-gold/50"
              >
                <X className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-6">
              <p className="label mb-4">Explore</p>
              <ul className="space-y-1">
                {site.nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.4 }}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(item.href);
                      }}
                      className="group flex items-center justify-between rounded-2xl border border-transparent px-3 py-3.5 font-display text-xl font-semibold tracking-[-0.02em] text-fg transition-colors hover:border-line hover:bg-card"
                    >
                      {item.label}
                      <ArrowUpRight
                        className="h-4 w-4 text-faint transition-all group-hover:text-gold"
                        strokeWidth={1.75}
                        aria-hidden
                      />
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="rule my-6" />

              <button
                type="button"
                onClick={() => {
                  onClose();
                  window.setTimeout(() => openSearch(), 200);
                }}
                className="flex w-full items-center gap-3 rounded-2xl border border-line bg-card px-4 py-3.5 text-left text-sm text-muted transition-colors hover:border-gold/40"
              >
                <Search className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                Find a gym, trainer or class…
              </button>
            </nav>

            <div className="space-y-3 border-t border-line px-5 py-5">
              <div className="flex items-center justify-between rounded-2xl border border-line bg-card px-4 py-3">
                <span className="text-sm text-muted">Appearance</span>
                <ThemeToggle />
              </div>
              <Button
                size="lg"
                className="w-full"
                onClick={() => {
                  onClose();
                  window.setTimeout(() => openEarlyAccess("Get started"), 200);
                }}
              >
                Get Started
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
