export const site = {
  name: "Shark",
  wordmark: "SHARK",
  tagline: "Find Your Perfect Gym",
  description:
    "Discover gyms, trainers, classes and memberships around you. Compare facilities, pricing and coaching across Lahore, Islamabad, Karachi and beyond.",
  url: "https://shark.fitness",
  city: "Lahore, Pakistan",
  nav: [
    { label: "Discover", href: "#discover" },
    { label: "Gyms", href: "#gyms" },
    { label: "Trainers", href: "#trainers" },
    { label: "Classes", href: "#classes" },
    { label: "Memberships", href: "#memberships" },
  ],
} as const;

export const platformStats = [
  { value: 500, suffix: "+", label: "Gyms listed", sub: "across 14 cities" },
  { value: 1200, suffix: "+", label: "Trainers", sub: "verified profiles" },
  { value: 50, suffix: "K+", label: "Members", sub: "training this month" },
  { value: 10, suffix: "K+", label: "Classes", sub: "every week" },
] as const;
