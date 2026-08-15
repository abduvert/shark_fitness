export type GymType =
  | "Strength"
  | "CrossFit"
  | "HIIT"
  | "Yoga"
  | "Boxing"
  | "Premium"
  | "24/7";

export type Badge = "Verified" | "Popular" | "New" | "Best value";

export interface Gym {
  id: string;
  name: string;
  area: string;
  city: string;
  rating: number;
  reviews: number;
  distanceKm: number;
  /** Starting membership price, PKR / month */
  price: number;
  /** 24-hour clock, e.g. 23 for 11 PM. null = open 24 hours */
  closesAt: number | null;
  opensAt: number;
  image: string;
  types: GymType[];
  facilities: string[];
  badges: Badge[];
  members: number;
  trainers: number;
  weeklyClasses: number;
  blurb: string;
  /** Percent coordinates on the stylised map canvas */
  map: { x: number; y: number };
}

export const gyms: Gym[] = [
  {
    id: "iron-district",
    name: "Iron District",
    area: "Gulberg",
    city: "Lahore",
    rating: 4.9,
    reviews: 842,
    distanceKm: 1.8,
    price: 3500,
    closesAt: null,
    opensAt: 0,
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80",
    types: ["Strength", "24/7", "Premium"],
    facilities: ["Strength", "Cardio", "Sauna", "24/7", "Parking", "Café"],
    badges: ["Verified", "Popular"],
    members: 1240,
    trainers: 14,
    weeklyClasses: 38,
    blurb:
      "A serious lifting floor with calibrated plates, four platforms and a recovery suite that stays open all night.",
    map: { x: 34, y: 42 },
  },
  {
    id: "core-fitness",
    name: "Core Fitness Club",
    area: "DHA Phase 5",
    city: "Lahore",
    rating: 4.7,
    reviews: 611,
    distanceKm: 2.4,
    price: 2800,
    closesAt: null,
    opensAt: 0,
    image:
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1600&q=80",
    types: ["Strength", "HIIT", "24/7"],
    facilities: ["Strength", "Cardio", "Group classes", "24/7", "Parking"],
    badges: ["Verified", "Best value"],
    members: 980,
    trainers: 11,
    weeklyClasses: 44,
    blurb:
      "Big, bright and busy. The class timetable runs from 6 AM to 10 PM with a floor that never feels crowded.",
    map: { x: 62, y: 58 },
  },
  {
    id: "elevate",
    name: "Elevate Performance",
    area: "F-7 Markaz",
    city: "Islamabad",
    rating: 4.8,
    reviews: 524,
    distanceKm: 3.1,
    price: 5000,
    closesAt: 23,
    opensAt: 6,
    image:
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1600&q=80",
    types: ["Premium", "Strength", "Yoga"],
    facilities: ["Strength", "Sauna", "Pool", "Yoga studio", "Café", "Parking"],
    badges: ["Verified", "Popular"],
    members: 720,
    trainers: 18,
    weeklyClasses: 52,
    blurb:
      "The closest thing to a members' club in Islamabad — spa, pool, and a coaching team that actually programmes for you.",
    map: { x: 48, y: 22 },
  },
  {
    id: "prime-strength",
    name: "Prime Strength",
    area: "Johar Town",
    city: "Lahore",
    rating: 4.6,
    reviews: 388,
    distanceKm: 4.2,
    price: 2200,
    closesAt: 23,
    opensAt: 6,
    image:
      "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=1600&q=80",
    types: ["Strength", "CrossFit"],
    facilities: ["Strength", "Functional rig", "Cardio", "Parking"],
    badges: ["Best value"],
    members: 640,
    trainers: 8,
    weeklyClasses: 26,
    blurb:
      "No frills, excellent equipment. Rogue rigs, a full dumbbell rack to 60 kg and coaches who know their stuff.",
    map: { x: 20, y: 66 },
  },
  {
    id: "the-yard",
    name: "The Yard CrossFit",
    area: "Bahria Town",
    city: "Rawalpindi",
    rating: 4.8,
    reviews: 297,
    distanceKm: 5.6,
    price: 4200,
    closesAt: 22,
    opensAt: 6,
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1600&q=80",
    types: ["CrossFit", "HIIT", "Strength"],
    facilities: ["CrossFit box", "Olympic lifting", "Open gym", "Showers"],
    badges: ["Verified"],
    members: 410,
    trainers: 9,
    weeklyClasses: 48,
    blurb:
      "A proper box. Coached WODs six times a day, an Olympic lifting club and the loudest 6 PM class in Pindi.",
    map: { x: 72, y: 30 },
  },
  {
    id: "knockout",
    name: "Knockout Boxing Club",
    area: "Clifton",
    city: "Karachi",
    rating: 4.9,
    reviews: 466,
    distanceKm: 6.3,
    price: 3800,
    closesAt: 23,
    opensAt: 7,
    image:
      "https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=1600&q=80",
    types: ["Boxing", "HIIT"],
    facilities: ["Ring", "Heavy bags", "Conditioning", "Showers"],
    badges: ["Popular", "Verified"],
    members: 520,
    trainers: 7,
    weeklyClasses: 34,
    blurb:
      "Two rings, sixteen bags and amateur coaches who have cornered national fights. Beginners genuinely welcome.",
    map: { x: 55, y: 78 },
  },
  {
    id: "stillpoint",
    name: "Stillpoint Yoga",
    area: "Gulberg III",
    city: "Lahore",
    rating: 4.9,
    reviews: 212,
    distanceKm: 1.6,
    price: 3200,
    closesAt: 21,
    opensAt: 7,
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1600&q=80",
    types: ["Yoga", "Premium"],
    facilities: ["Heated studio", "Pilates", "Meditation", "Tea bar"],
    badges: ["New", "Verified"],
    members: 280,
    trainers: 6,
    weeklyClasses: 40,
    blurb:
      "A quiet, warm, beautifully-lit studio. Vinyasa, yin and reformer Pilates with a maximum of fourteen mats.",
    map: { x: 40, y: 50 },
  },
  {
    id: "pulse-24",
    name: "Pulse 24",
    area: "Peoples Colony",
    city: "Faisalabad",
    rating: 4.5,
    reviews: 174,
    distanceKm: 8.4,
    price: 1900,
    closesAt: null,
    opensAt: 0,
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1600&q=80",
    types: ["24/7", "HIIT", "Strength"],
    facilities: ["24/7", "Cardio", "Strength", "Locker"],
    badges: ["Best value", "New"],
    members: 350,
    trainers: 5,
    weeklyClasses: 18,
    blurb:
      "Card access around the clock for under two thousand rupees. The cleanest cardio deck in the city.",
    map: { x: 14, y: 34 },
  },
  {
    id: "atlas-house",
    name: "Atlas House",
    area: "E-11",
    city: "Islamabad",
    rating: 4.7,
    reviews: 331,
    distanceKm: 4.8,
    price: 6500,
    closesAt: 23,
    opensAt: 5,
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1600&q=80",
    types: ["Premium", "Strength", "CrossFit"],
    facilities: ["Strength", "Sauna", "Ice bath", "Physio", "Café", "Parking"],
    badges: ["Verified", "Popular"],
    members: 460,
    trainers: 16,
    weeklyClasses: 46,
    blurb:
      "Recovery-first training. On-site physiotherapy, contrast bathing and a strength floor built around long-term progress.",
    map: { x: 84, y: 46 },
  },
  {
    id: "grid-hiit",
    name: "Grid HIIT Studio",
    area: "Model Town",
    city: "Lahore",
    rating: 4.6,
    reviews: 258,
    distanceKm: 3.7,
    price: 2600,
    closesAt: 22,
    opensAt: 6,
    image:
      "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=1600&q=80",
    types: ["HIIT", "CrossFit"],
    facilities: ["Group classes", "Rower deck", "Sled track", "Showers"],
    badges: ["Popular"],
    members: 390,
    trainers: 7,
    weeklyClasses: 56,
    blurb:
      "Forty-minute conditioning classes on a screen-timed circuit. Book a slot, show up, leave completely wrecked.",
    map: { x: 28, y: 24 },
  },
  {
    id: "harbour-athletic",
    name: "Harbour Athletic",
    area: "DHA Phase 6",
    city: "Karachi",
    rating: 4.8,
    reviews: 402,
    distanceKm: 7.2,
    price: 5500,
    closesAt: null,
    opensAt: 0,
    image:
      "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=1600&q=80",
    types: ["Premium", "24/7", "Strength"],
    facilities: ["24/7", "Pool", "Sauna", "Strength", "Café", "Parking"],
    badges: ["Verified"],
    members: 810,
    trainers: 13,
    weeklyClasses: 42,
    blurb:
      "Sea-facing cardio deck, twenty-five metre pool and a strength wing that opens onto the terrace.",
    map: { x: 66, y: 68 },
  },
  {
    id: "foundry",
    name: "The Foundry",
    area: "Saddar",
    city: "Rawalpindi",
    rating: 4.4,
    reviews: 146,
    distanceKm: 9.1,
    price: 1800,
    closesAt: 22,
    opensAt: 6,
    image:
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1600&q=80",
    types: ["Strength", "Boxing"],
    facilities: ["Strength", "Heavy bags", "Cardio", "Locker"],
    badges: ["Best value"],
    members: 300,
    trainers: 4,
    weeklyClasses: 14,
    blurb:
      "An old-school basement gym. Chalk allowed, music loud, and the cheapest squat rack time in the twin cities.",
    map: { x: 78, y: 14 },
  },
];

export const featuredGymId = "iron-district";

export const gymTypeFilters: ("All" | GymType)[] = [
  "All",
  "Strength",
  "CrossFit",
  "HIIT",
  "Yoga",
  "Boxing",
  "Premium",
  "24/7",
];

export const cities = [
  "All cities",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Karachi",
  "Faisalabad",
] as const;

export const allFacilities = [
  "24/7",
  "Sauna",
  "Pool",
  "Parking",
  "Café",
  "Showers",
  "Physio",
] as const;

export function getGym(id: string) {
  return gyms.find((g) => g.id === id);
}
