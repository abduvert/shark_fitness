import { gyms } from "@/data/gyms";
import { trainers } from "@/data/trainers";
import { classes } from "@/data/classes";
import { categories } from "@/data/categories";

export type ResultKind = "Gym" | "Trainer" | "Class" | "Category";

export interface SearchResult {
  id: string;
  kind: ResultKind;
  title: string;
  subtitle: string;
  meta: string;
  image?: string;
  /** Section to scroll to when chosen */
  target: string;
  keywords: string;
}

export const searchIndex: SearchResult[] = [
  ...gyms.map((g) => ({
    id: `gym-${g.id}`,
    kind: "Gym" as const,
    title: g.name,
    subtitle: `${g.area}, ${g.city}`,
    meta: `${g.rating.toFixed(1)} ★ · Rs. ${g.price.toLocaleString("en-PK")}/mo`,
    image: g.image,
    target: "#gyms",
    keywords: [
      g.name,
      g.area,
      g.city,
      ...g.types,
      ...g.facilities,
      ...g.badges,
      "gym",
    ]
      .join(" ")
      .toLowerCase(),
  })),
  ...trainers.map((t) => ({
    id: `trainer-${t.id}`,
    kind: "Trainer" as const,
    title: t.name,
    subtitle: t.specialization,
    meta: `${t.years} yrs · ${t.gym}`,
    image: t.image,
    target: "#trainers",
    keywords: [
      t.name,
      t.specialization,
      ...t.specialties,
      t.gym,
      t.city,
      "trainer",
      "coach",
      "personal training",
    ]
      .join(" ")
      .toLowerCase(),
  })),
  ...classes.map((c) => ({
    id: `class-${c.id}`,
    kind: "Class" as const,
    title: c.name,
    subtitle: `${c.discipline} · ${c.gym}`,
    meta: `${c.day} ${c.time} · ${c.durationMin} min`,
    image: c.image,
    target: "#classes",
    keywords: [
      c.name,
      c.discipline,
      c.trainer,
      c.gym,
      c.city,
      c.difficulty,
      "class",
      "session",
    ]
      .join(" ")
      .toLowerCase(),
  })),
  ...categories.map((c) => ({
    id: `cat-${c.id}`,
    kind: "Category" as const,
    title: c.name,
    subtitle: c.blurb,
    meta: `${c.gymCount} gyms`,
    image: c.image,
    target: "#categories",
    keywords: [c.name, c.blurb, "category", "discipline"].join(" ").toLowerCase(),
  })),
];

export function searchAll(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);

  return searchIndex
    .map((item) => {
      const haystack = `${item.title} ${item.subtitle} ${item.keywords}`.toLowerCase();
      let score = 0;
      for (const term of terms) {
        if (!haystack.includes(term)) return { item, score: -1 };
        if (item.title.toLowerCase().startsWith(term)) score += 6;
        else if (item.title.toLowerCase().includes(term)) score += 4;
        else if (item.subtitle.toLowerCase().includes(term)) score += 2;
        else score += 1;
      }
      // Nudge gyms up — they're the primary object of the product.
      if (item.kind === "Gym") score += 0.5;
      return { item, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((r) => r.item);
}

/** Every entry here resolves to real results in the index above. */
export const popularSearches = [
  "Boxing",
  "24/7",
  "Lahore",
  "Yoga",
  "Strength",
  "Sauna",
];

export const quickCategories = [
  { label: "Gyms near me", query: "Lahore" },
  { label: "CrossFit boxes", query: "CrossFit" },
  { label: "Personal trainers", query: "trainer" },
  { label: "Evening classes", query: "class" },
];
