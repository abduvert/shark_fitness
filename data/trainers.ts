export interface Trainer {
  id: string;
  name: string;
  specialization: string;
  specialties: string[];
  years: number;
  rating: number;
  reviews: number;
  gymId: string;
  gym: string;
  city: string;
  pricePerSession: number;
  image: string;
  sessions: number;
  bio: string;
  achievements: string[];
  /** Booked-out percentage — used for the "limited slots" cue */
  spotsLeft: number;
}

export const trainers: Trainer[] = [
  {
    id: "hamza-khan",
    name: "Hamza Khan",
    specialization: "Strength & Conditioning",
    specialties: ["Powerlifting", "Hypertrophy", "Return to training"],
    years: 8,
    rating: 4.9,
    reviews: 214,
    gymId: "iron-district",
    gym: "Iron District",
    city: "Lahore",
    pricePerSession: 3000,
    image:
      "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=1200&q=80",
    sessions: 2100,
    bio: "Hamza coaches lifters who want a number on the bar and a body that holds up. Eight years on the floor at Iron District, a background in sports science, and a reputation for fixing squats nobody else could.",
    achievements: [
      "National powerlifting bronze, 83 kg",
      "Coached 40+ lifters to a first competition",
      "NSCA Certified Strength & Conditioning Specialist",
    ],
    spotsLeft: 3,
  },
  {
    id: "ayesha-siddiqui",
    name: "Ayesha Siddiqui",
    specialization: "Mobility & Pilates",
    specialties: ["Reformer Pilates", "Post-natal", "Desk-body repair"],
    years: 6,
    rating: 4.9,
    reviews: 168,
    gymId: "stillpoint",
    gym: "Stillpoint Yoga",
    city: "Lahore",
    pricePerSession: 2500,
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80",
    sessions: 1450,
    bio: "Ayesha works with people whose bodies have been shaped by desks and deadlines. Precise, patient, and unusually good at explaining why something hurts.",
    achievements: [
      "Comprehensive Pilates certification, BASI",
      "Pre & post-natal specialist",
      "300-hour yoga teacher training",
    ],
    spotsLeft: 5,
  },
  {
    id: "bilal-raza",
    name: "Bilal Raza",
    specialization: "Boxing & Conditioning",
    specialties: ["Boxing technique", "Fight prep", "Fat loss"],
    years: 11,
    rating: 4.8,
    reviews: 302,
    gymId: "knockout",
    gym: "Knockout Boxing Club",
    city: "Karachi",
    pricePerSession: 3500,
    image:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=1200&q=80",
    sessions: 3200,
    bio: "Eleven years in the corner. Bilal has taken beginners from never having thrown a punch to their first white-collar bout, and he coaches both with the same seriousness.",
    achievements: [
      "Cornered 60+ amateur bouts",
      "Ex-national amateur, welterweight",
      "AIBA Level 2 coach",
    ],
    spotsLeft: 2,
  },
  {
    id: "sana-tariq",
    name: "Sana Tariq",
    specialization: "HIIT & Fat Loss",
    specialties: ["Metabolic conditioning", "Habit coaching", "Nutrition"],
    years: 7,
    rating: 4.8,
    reviews: 189,
    gymId: "grid-hiit",
    gym: "Grid HIIT Studio",
    city: "Lahore",
    pricePerSession: 2800,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=1200&q=80",
    sessions: 1900,
    bio: "Sana's clients tend to stay for years, which tells you most of what you need to know. Programming is hard; the coaching around it is kind.",
    achievements: [
      "Precision Nutrition Level 2",
      "Built Grid's 40-minute conditioning format",
      "500+ clients through a 12-week programme",
    ],
    spotsLeft: 6,
  },
  {
    id: "usman-javed",
    name: "Usman Javed",
    specialization: "CrossFit & Olympic Lifting",
    specialties: ["Snatch & clean", "Gymnastics skills", "Competition prep"],
    years: 9,
    rating: 4.9,
    reviews: 156,
    gymId: "the-yard",
    gym: "The Yard CrossFit",
    city: "Rawalpindi",
    pricePerSession: 3200,
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1200&q=80",
    sessions: 1700,
    bio: "Usman teaches the snatch better than anyone in the twin cities. Technical, methodical, and genuinely unbothered by how long it takes you to get it.",
    achievements: [
      "CrossFit Level 3 Trainer",
      "Pakistan weightlifting nationals, 96 kg",
      "Coached 12 athletes to regional CrossFit events",
    ],
    spotsLeft: 4,
  },
  {
    id: "zainab-ali",
    name: "Zainab Ali",
    specialization: "Rehab & Longevity",
    specialties: ["Injury rehab", "Over-50 training", "Bone density"],
    years: 12,
    rating: 5.0,
    reviews: 121,
    gymId: "atlas-house",
    gym: "Atlas House",
    city: "Islamabad",
    pricePerSession: 4000,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80",
    sessions: 2600,
    bio: "A physiotherapist who moved onto the gym floor. Zainab builds training for people coming back from surgery, and for those who want to still be lifting at seventy.",
    achievements: [
      "Doctor of Physical Therapy",
      "Runs Atlas House's return-to-training clinic",
      "12 years in musculoskeletal rehab",
    ],
    spotsLeft: 1,
  },
];

export const featuredTrainerId = "hamza-khan";

export function getTrainer(id: string) {
  return trainers.find((t) => t.id === id);
}
