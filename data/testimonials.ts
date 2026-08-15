export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  image: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Finding a gym used to mean checking Instagram pages and calling every place to ask about the fee. Now I compare everything in one place and just go.",
    name: "Faryal Ahmed",
    role: "Product designer",
    location: "Gulberg, Lahore",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "t2",
    quote:
      "I moved to Islamabad for work and had a gym sorted in an evening. The distance and opening-hours filters did all of it.",
    name: "Omar Sheikh",
    role: "Software engineer",
    location: "F-7, Islamabad",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "t3",
    quote:
      "The trainer profiles are the useful part. Actual experience, actual specialisation, actual rates — not a phone number and a guess.",
    name: "Mahnoor Riaz",
    role: "Doctor",
    location: "Clifton, Karachi",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "t4",
    quote:
      "I compared four gyms on price, sauna and 24/7 access in about a minute. That comparison table saved me three site visits.",
    name: "Ali Hassan",
    role: "Marketing lead",
    location: "DHA, Lahore",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
  },
];
