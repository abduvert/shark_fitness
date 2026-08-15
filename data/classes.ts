export type Difficulty = "Beginner" | "All levels" | "Intermediate" | "Advanced";

export interface FitnessClass {
  id: string;
  name: string;
  discipline: string;
  trainer: string;
  gym: string;
  city: string;
  /** Display time, e.g. "7:00 PM" */
  time: string;
  /** Minutes past midnight — used for sorting */
  startsAt: number;
  day: "Today" | "Tomorrow";
  durationMin: number;
  difficulty: Difficulty;
  spotsLeft: number;
  capacity: number;
  image: string;
  accent: string;
}

export const classes: FitnessClass[] = [
  {
    id: "boxing-fundamentals",
    name: "Boxing Fundamentals",
    discipline: "Boxing",
    trainer: "Bilal Raza",
    gym: "Knockout Boxing Club",
    city: "Karachi",
    time: "7:00 PM",
    startsAt: 19 * 60,
    day: "Today",
    durationMin: 45,
    difficulty: "Beginner",
    spotsLeft: 4,
    capacity: 16,
    image:
      "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?auto=format&fit=crop&w=1200&q=80",
    accent: "Pad work + footwork",
  },
  {
    id: "grid-40",
    name: "Grid 40",
    discipline: "HIIT",
    trainer: "Sana Tariq",
    gym: "Grid HIIT Studio",
    city: "Lahore",
    time: "8:00 PM",
    startsAt: 20 * 60,
    day: "Today",
    durationMin: 40,
    difficulty: "All levels",
    spotsLeft: 2,
    capacity: 20,
    image:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80",
    accent: "Screen-timed circuit",
  },
  {
    id: "slow-flow",
    name: "Slow Flow Vinyasa",
    discipline: "Yoga",
    trainer: "Ayesha Siddiqui",
    gym: "Stillpoint Yoga",
    city: "Lahore",
    time: "6:30 PM",
    startsAt: 18 * 60 + 30,
    day: "Today",
    durationMin: 60,
    difficulty: "All levels",
    spotsLeft: 6,
    capacity: 14,
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    accent: "Heated studio, 28°C",
  },
  {
    id: "morning-wod",
    name: "Morning WOD",
    discipline: "CrossFit",
    trainer: "Usman Javed",
    gym: "The Yard CrossFit",
    city: "Rawalpindi",
    time: "9:00 AM",
    startsAt: 9 * 60,
    day: "Tomorrow",
    durationMin: 50,
    difficulty: "Intermediate",
    spotsLeft: 8,
    capacity: 18,
    image:
      "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=1200&q=80",
    accent: "Barbell + gymnastics",
  },
  {
    id: "strength-101",
    name: "Strength 101",
    discipline: "Strength",
    trainer: "Hamza Khan",
    gym: "Iron District",
    city: "Lahore",
    time: "6:00 PM",
    startsAt: 18 * 60,
    day: "Today",
    durationMin: 60,
    difficulty: "Beginner",
    spotsLeft: 5,
    capacity: 12,
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80",
    accent: "Squat, bench, deadlift",
  },
  {
    id: "reformer-pilates",
    name: "Reformer Pilates",
    discipline: "Pilates",
    trainer: "Ayesha Siddiqui",
    gym: "Stillpoint Yoga",
    city: "Lahore",
    time: "7:30 AM",
    startsAt: 7 * 60 + 30,
    day: "Tomorrow",
    durationMin: 50,
    difficulty: "All levels",
    spotsLeft: 3,
    capacity: 10,
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80",
    accent: "Ten reformers, small group",
  },
];
