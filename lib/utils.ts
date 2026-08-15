import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Rs. 3,500 */
export function pkr(amount: number) {
  return `Rs. ${amount.toLocaleString("en-PK")}`;
}

/** 23 -> "11 PM", 6 -> "6 AM" */
export function hour12(h: number) {
  const suffix = h >= 12 ? "PM" : "AM";
  const base = h % 12 === 0 ? 12 : h % 12;
  return `${base} ${suffix}`;
}

export interface OpenState {
  open: boolean;
  label: string;
  /** Short form for tight spaces */
  short: string;
}

/**
 * Opening status for a venue. `now` is passed in explicitly so the caller
 * controls whether this runs on the server (stable) or client (live).
 */
export function openState(
  opensAt: number,
  closesAt: number | null,
  now: Date | null
): OpenState {
  if (closesAt === null) {
    return { open: true, label: "Open 24 hours", short: "24/7" };
  }
  if (!now) {
    // Server render / pre-hydration: state the hours instead of guessing.
    return {
      open: true,
      label: `${hour12(opensAt)} – ${hour12(closesAt)}`,
      short: `Until ${hour12(closesAt)}`,
    };
  }
  const h = now.getHours() + now.getMinutes() / 60;
  const open = h >= opensAt && h < closesAt;
  return {
    open,
    label: open ? `Open until ${hour12(closesAt)}` : `Opens ${hour12(opensAt)}`,
    short: open ? `Until ${hour12(closesAt)}` : `Opens ${hour12(opensAt)}`,
  };
}
