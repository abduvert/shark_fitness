export interface Membership {
  id: string;
  name: string;
  price: number;
  tagline: string;
  features: string[];
  inheritsFrom?: string;
  popular?: boolean;
  note: string;
}

export const memberships: Membership[] = [
  {
    id: "basic",
    name: "Basic",
    price: 2000,
    tagline: "The floor, the kit, and the door key.",
    features: ["Full gym floor access", "Personal locker", "Cardio deck", "Free induction session"],
    note: "Typical entry price across 180+ listed gyms.",
  },
  {
    id: "pro",
    name: "Pro",
    price: 4500,
    tagline: "Everything you need to train properly.",
    inheritsFrom: "Basic",
    features: [
      "Unlimited group classes",
      "Specialist training zones",
      "Priority class booking",
      "Guest passes, 2 per month",
    ],
    popular: true,
    note: "Chosen by 61% of members on the platform.",
  },
  {
    id: "elite",
    name: "Elite",
    price: 8000,
    tagline: "Coached, recovered, looked after.",
    inheritsFrom: "Pro",
    features: [
      "4 personal training sessions",
      "Sauna, ice bath & recovery suite",
      "Priority booking across all gyms",
      "Quarterly body composition scan",
    ],
    note: "Includes multi-gym access in your city.",
  },
];

export const billingNote =
  "Prices are indicative monthly averages in PKR, set by each gym. Nothing is charged here.";
