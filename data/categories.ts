export interface Category {
  id: string;
  name: string;
  gymCount: number;
  image: string;
  /** Editorial grid span — drives the bento layout */
  span: "tall" | "wide" | "normal" | "hero";
  blurb: string;
}

export const categories: Category[] = [
  {
    id: "strength",
    name: "Strength Training",
    gymCount: 214,
    span: "hero",
    blurb: "Platforms, racks and calibrated plates.",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "crossfit",
    name: "CrossFit",
    gymCount: 63,
    span: "normal",
    blurb: "Coached WODs, six times a day.",
    image:
      "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "boxing",
    name: "Boxing",
    gymCount: 41,
    span: "normal",
    blurb: "Rings, bags and real corners.",
    image:
      "https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "yoga",
    name: "Yoga",
    gymCount: 88,
    span: "wide",
    blurb: "Heated studios and small mats counts.",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "hiit",
    name: "HIIT",
    gymCount: 97,
    span: "normal",
    blurb: "Forty minutes, timed to the second.",
    image:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "functional",
    name: "Functional Training",
    gymCount: 76,
    span: "normal",
    blurb: "Rigs, sleds and open floor.",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "cardio",
    name: "Cardio",
    gymCount: 186,
    span: "normal",
    blurb: "Rowers, bikes and treadmill decks.",
    image:
      "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "pilates",
    name: "Pilates",
    gymCount: 34,
    span: "wide",
    blurb: "Reformer work in groups of ten.",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1400&q=80",
  },
];
