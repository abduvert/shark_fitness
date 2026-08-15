"use client";

import * as React from "react";

interface AppState {
  searchOpen: boolean;
  openSearch: (seed?: string) => void;
  closeSearch: () => void;
  searchSeed: string;

  gymDetail: string | null;
  openGym: (id: string) => void;

  trainerDetail: string | null;
  openTrainer: (id: string) => void;

  classDetail: string | null;
  openClass: (id: string) => void;

  earlyAccess: { open: boolean; context: string };
  openEarlyAccess: (context?: string) => void;

  closeAll: () => void;

  favourites: string[];
  toggleFavourite: (id: string) => void;
  isFavourite: (id: string) => boolean;

  /** Pushed from search into the gym discovery filters */
  discoverQuery: string;
  setDiscoverQuery: (q: string) => void;

  recent: string[];
  pushRecent: (q: string) => void;
  clearRecent: () => void;
}

const Ctx = React.createContext<AppState | null>(null);

const FAV_KEY = "shark:favourites";
const RECENT_KEY = "shark:recent";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchSeed, setSearchSeed] = React.useState("");
  const [gymDetail, setGymDetail] = React.useState<string | null>(null);
  const [trainerDetail, setTrainerDetail] = React.useState<string | null>(null);
  const [classDetail, setClassDetail] = React.useState<string | null>(null);
  const [earlyAccess, setEarlyAccess] = React.useState({
    open: false,
    context: "",
  });
  const [favourites, setFavourites] = React.useState<string[]>([]);
  const [recent, setRecent] = React.useState<string[]>([]);
  const [discoverQuery, setDiscoverQuery] = React.useState("");

  // Hydrate persisted bits after mount so SSR output stays stable.
  React.useEffect(() => {
    try {
      const f = localStorage.getItem(FAV_KEY);
      if (f) setFavourites(JSON.parse(f));
      const r = localStorage.getItem(RECENT_KEY);
      if (r) setRecent(JSON.parse(r));
    } catch {
      /* storage unavailable — non-critical */
    }
  }, []);

  const persist = (key: string, value: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore */
    }
  };

  const value = React.useMemo<AppState>(
    () => ({
      searchOpen,
      searchSeed,
      openSearch: (seed = "") => {
        setSearchSeed(seed);
        setSearchOpen(true);
      },
      closeSearch: () => setSearchOpen(false),

      gymDetail,
      openGym: (id) => setGymDetail(id),
      trainerDetail,
      openTrainer: (id) => setTrainerDetail(id),
      classDetail,
      openClass: (id) => setClassDetail(id),

      earlyAccess,
      openEarlyAccess: (context = "") => setEarlyAccess({ open: true, context }),

      closeAll: () => {
        setGymDetail(null);
        setTrainerDetail(null);
        setClassDetail(null);
        setEarlyAccess({ open: false, context: "" });
      },

      favourites,
      isFavourite: (id) => favourites.includes(id),
      toggleFavourite: (id) =>
        setFavourites((prev) => {
          const next = prev.includes(id)
            ? prev.filter((x) => x !== id)
            : [...prev, id];
          persist(FAV_KEY, next);
          return next;
        }),

      discoverQuery,
      setDiscoverQuery,

      recent,
      pushRecent: (q) =>
        setRecent((prev) => {
          const trimmed = q.trim();
          if (!trimmed) return prev;
          const next = [trimmed, ...prev.filter((x) => x !== trimmed)].slice(0, 5);
          persist(RECENT_KEY, next);
          return next;
        }),
      clearRecent: () => {
        setRecent([]);
        persist(RECENT_KEY, []);
      },
    }),
    [
      searchOpen,
      searchSeed,
      gymDetail,
      trainerDetail,
      classDetail,
      earlyAccess,
      favourites,
      recent,
      discoverQuery,
    ]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const ctx = React.useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}

/** Smooth-scrolls to a section id, respecting reduced motion. */
export function scrollToSection(hash: string) {
  const el = document.querySelector(hash);
  if (!el) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
}
