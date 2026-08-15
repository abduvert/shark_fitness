"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])';

export function useScrollLock(active: boolean) {
  React.useEffect(() => {
    if (!active) return;
    const { overflow, paddingRight } = document.body.style;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [active]);
}

interface DialogProps {
  open: boolean;
  onClose: () => void;
  /** Accessible name — rendered off-screen; panels draw their own visible title */
  title: string;
  children: React.ReactNode;
  className?: string;
  /** Anchor the panel to the top — used by the search palette */
  align?: "center" | "top";
}

export function Dialog({
  open,
  onClose,
  title,
  children,
  className,
  align = "center",
}: DialogProps) {
  const panelRef = React.useRef<HTMLDivElement>(null);
  const restoreRef = React.useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = React.useState(false);
  const reduced = useReducedMotion();
  const titleId = React.useId();

  React.useEffect(() => setMounted(true), []);
  useScrollLock(open);

  // Held in a ref so the focus effect below depends only on `open`. Context
  // callbacks change identity on every state change, and re-running the effect
  // would fire the cleanup — yanking focus back out of the open dialog.
  const onCloseRef = React.useRef(onClose);
  React.useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  React.useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const items = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && (active === first || active === panelRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    // The panel mounts inside AnimatePresence, so it isn't in the DOM on the
    // first tick. A timer rather than rAF, so focus still lands if the tab is
    // backgrounded (rAF is paused there, focus would never move).
    const focusTimer = window.setTimeout(() => {
      const target =
        panelRef.current?.querySelector<HTMLElement>("[data-autofocus]") ??
        panelRef.current;
      target?.focus();
    }, 50);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
      // Only pull focus back if it's still inside the dialog we're closing —
      // otherwise we'd steal it from wherever the user has moved on to.
      const active = document.activeElement;
      if (!active || active === document.body || panelRef.current?.contains(active)) {
        restoreRef.current?.focus?.();
      }
    };
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div
          className={cn(
            "fixed inset-0 z-[100] flex justify-center overflow-y-auto overscroll-contain p-0 sm:p-6",
            align === "center" ? "items-end sm:items-center" : "items-start pt-0 sm:pt-24"
          )}
        >
          <motion.div
            className="fixed inset-0 bg-ink/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            initial={
              reduced
                ? { opacity: 0 }
                : { opacity: 0, y: 28, scale: 0.985 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.99 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "relative z-10 w-full max-w-2xl overflow-hidden rounded-t-4xl border border-line-strong/70 bg-card shadow-lift outline-none sm:rounded-4xl",
              className
            )}
          >
            {/* Accessible name for the dialog. Every panel draws its own
                visible title, so this stays off-screen in all cases. */}
            <h2 id={titleId} className="sr-only">
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full border border-line-strong/60 bg-ink/50 text-fg backdrop-blur transition hover:border-gold/50 hover:text-gold"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
