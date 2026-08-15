"use client";

import * as React from "react";
import { Search, Clock, TrendingUp, CornerDownLeft, X } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { SmartImage } from "@/components/ui/smart-image";
import { useApp, scrollToSection } from "@/components/app-provider";
import {
  searchAll,
  searchIndex,
  popularSearches,
  quickCategories,
  type SearchResult,
} from "@/lib/search";
import { cn } from "@/lib/utils";

const kindTone: Record<SearchResult["kind"], string> = {
  Gym: "text-gold border-gold/30 bg-gold/10",
  Trainer: "text-sky-500 dark:text-sky-400 border-sky-500/25 bg-sky-500/10",
  Class: "text-emerald-500 dark:text-emerald-400 border-emerald-500/25 bg-emerald-500/10",
  Category: "text-muted border-line-strong/70 bg-fg/[0.04]",
};

export function SearchPalette() {
  const {
    searchOpen,
    closeSearch,
    searchSeed,
    recent,
    pushRecent,
    clearRecent,
    openGym,
    openTrainer,
    openClass,
    setDiscoverQuery,
  } = useApp();

  const [query, setQuery] = React.useState("");
  const [cursor, setCursor] = React.useState(0);
  const listRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (searchOpen) {
      setQuery(searchSeed);
      setCursor(0);
    }
  }, [searchOpen, searchSeed]);

  const results = React.useMemo(() => searchAll(query), [query]);

  React.useEffect(() => setCursor(0), [query]);

  const commit = React.useCallback(
    (result: SearchResult) => {
      pushRecent(result.title);
      closeSearch();

      window.setTimeout(() => {
        if (result.kind === "Gym") {
          setDiscoverQuery("");
          openGym(result.id.replace("gym-", ""));
        } else if (result.kind === "Trainer") {
          openTrainer(result.id.replace("trainer-", ""));
        } else if (result.kind === "Class") {
          openClass(result.id.replace("class-", ""));
        } else {
          setDiscoverQuery(result.title);
          scrollToSection(result.target);
        }
      }, 180);
    },
    [pushRecent, closeSearch, openGym, openTrainer, openClass, setDiscoverQuery]
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => (c + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => (c - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      commit(results[cursor]);
    }
  };

  React.useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${cursor}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  const empty = query.trim().length > 0 && results.length === 0;

  return (
    <Dialog
      open={searchOpen}
      onClose={closeSearch}
      title="Search gyms, trainers and classes"
      align="top"
      className="max-w-2xl"
    >
      <div className="flex items-center gap-3 border-b border-line px-5 py-4 pr-16">
        <Search className="h-5 w-5 shrink-0 text-faint" strokeWidth={1.75} aria-hidden />
        <input
          data-autofocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Find a gym, trainer or class…"
          aria-label="Search gyms, trainers and classes"
          role="combobox"
          aria-expanded={results.length > 0}
          aria-controls="search-results"
          aria-autocomplete="list"
          className="w-full bg-transparent font-display text-lg font-medium tracking-[-0.01em] text-fg outline-none placeholder:font-sans placeholder:text-base placeholder:font-normal placeholder:text-faint"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="shrink-0 rounded-full p-1 text-faint transition-colors hover:text-fg"
          >
            <X className="h-4 w-4" strokeWidth={2} aria-hidden />
          </button>
        )}
      </div>

      <div
        ref={listRef}
        id="search-results"
        role="listbox"
        aria-label="Search results"
        className="max-h-[min(60vh,26rem)] overflow-y-auto overscroll-contain p-2"
      >
        {results.length > 0 &&
          results.map((r, i) => (
            <button
              key={r.id}
              type="button"
              role="option"
              aria-selected={i === cursor}
              data-index={i}
              onMouseEnter={() => setCursor(i)}
              onClick={() => commit(r)}
              className={cn(
                "flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors",
                i === cursor ? "bg-fg/[0.06]" : "hover:bg-fg/[0.04]"
              )}
            >
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-line">
                {r.image && (
                  <SmartImage
                    src={r.image}
                    alt=""
                    fill
                    sizes="44px"
                    className="object-cover"
                    seed={i}
                  />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-sm font-semibold text-fg">
                  {r.title}
                </p>
                <p className="truncate text-xs text-muted">{r.subtitle}</p>
              </div>
              <div className="hidden shrink-0 items-center gap-2.5 sm:flex">
                <span className="text-xs tabular-nums text-faint">{r.meta}</span>
                <span
                  className={cn(
                    "rounded-full border px-2 py-0.5 font-display text-2xs font-semibold uppercase tracking-techy",
                    kindTone[r.kind]
                  )}
                >
                  {r.kind}
                </span>
              </div>
              {i === cursor && (
                <CornerDownLeft
                  className="hidden h-3.5 w-3.5 shrink-0 text-faint sm:block"
                  strokeWidth={2}
                  aria-hidden
                />
              )}
            </button>
          ))}

        {empty && (
          <div className="px-4 py-10 text-center">
            <p className="font-display text-base font-semibold text-fg">
              Nothing matched “{query}”
            </p>
            <p className="mx-auto mt-1.5 max-w-sm text-sm text-muted">
              This preview searches {searchIndex.length} demo listings. Try
              “boxing”, “Lahore” or “24/7”.
            </p>
          </div>
        )}

        {!query.trim() && (
          <div className="space-y-5 p-2 pb-3 pt-3">
            {recent.length > 0 && (
              <section>
                <div className="mb-2 flex items-center justify-between px-2">
                  <p className="label flex items-center gap-1.5 text-muted">
                    <Clock className="h-3 w-3" strokeWidth={2} aria-hidden />
                    Recent
                  </p>
                  <button
                    type="button"
                    onClick={clearRecent}
                    className="text-xs text-faint transition-colors hover:text-fg"
                  >
                    Clear
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 px-2">
                  {recent.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setQuery(r)}
                      className="rounded-full border border-line bg-card px-3 py-1.5 text-xs text-muted transition-colors hover:border-gold/40 hover:text-fg"
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </section>
            )}

            <section>
              <p className="label mb-2 flex items-center gap-1.5 px-2 text-muted">
                <TrendingUp className="h-3 w-3" strokeWidth={2} aria-hidden />
                Popular right now
              </p>
              <div className="flex flex-wrap gap-2 px-2">
                {popularSearches.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setQuery(p)}
                    className="rounded-full border border-line bg-card px-3 py-1.5 text-xs text-muted transition-colors hover:border-gold/40 hover:text-fg"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <p className="label mb-2 px-2 text-muted">Browse</p>
              <div className="grid grid-cols-2 gap-2 px-2">
                {quickCategories.map((c) => (
                  <button
                    key={c.label}
                    type="button"
                    onClick={() => setQuery(c.query)}
                    className="rounded-2xl border border-line bg-card px-3.5 py-3 text-left font-display text-sm font-semibold text-fg transition-colors hover:border-gold/40 hover:bg-elevated"
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>

      <div className="hidden items-center gap-4 border-t border-line px-5 py-2.5 text-2xs text-faint sm:flex">
        <span className="flex items-center gap-1.5">
          <kbd className="rounded border border-line px-1.5 py-0.5">↑</kbd>
          <kbd className="rounded border border-line px-1.5 py-0.5">↓</kbd>
          to navigate
        </span>
        <span className="flex items-center gap-1.5">
          <kbd className="rounded border border-line px-1.5 py-0.5">↵</kbd>
          to open
        </span>
        <span className="flex items-center gap-1.5">
          <kbd className="rounded border border-line px-1.5 py-0.5">esc</kbd>
          to close
        </span>
        <span className="ml-auto">Demo data — nothing is sent anywhere</span>
      </div>
    </Dialog>
  );
}
