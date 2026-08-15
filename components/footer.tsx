"use client";

import { Instagram, Linkedin, Youtube, Twitter } from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { useApp, scrollToSection } from "@/components/app-provider";
import { site } from "@/lib/site";

type Item = { label: string; action: "scroll" | "search" | "demo"; value?: string };

const columns: { heading: string; items: Item[] }[] = [
  {
    heading: "Product",
    items: [
      { label: "Discover Gyms", action: "scroll", value: "#gyms" },
      { label: "Trainers", action: "scroll", value: "#trainers" },
      { label: "Classes", action: "scroll", value: "#classes" },
      { label: "Memberships", action: "scroll", value: "#memberships" },
    ],
  },
  {
    heading: "Company",
    items: [
      { label: "About", action: "demo" },
      { label: "Contact", action: "demo" },
      { label: "Careers", action: "demo" },
    ],
  },
  {
    heading: "Resources",
    items: [
      { label: "FAQ", action: "demo" },
      { label: "Help centre", action: "demo" },
      { label: "Blog", action: "demo" },
    ],
  },
  {
    heading: "Legal",
    items: [
      { label: "Privacy", action: "demo" },
      { label: "Terms", action: "demo" },
    ],
  },
];

const socials = [
  { icon: Instagram, label: "Instagram" },
  { icon: Twitter, label: "X" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Youtube, label: "YouTube" },
];

export function Footer() {
  const { openEarlyAccess, openSearch } = useApp();

  const handle = (item: Item) => {
    if (item.action === "scroll" && item.value) scrollToSection(item.value);
    else if (item.action === "search") openSearch(item.value ?? "");
    else openEarlyAccess(item.label);
  };

  return (
    <footer className="border-t border-line bg-surface/60">
      <div className="container">
        <div className="grid gap-12 py-16 lg:grid-cols-[1.3fr_2fr] lg:py-20">
          {/* Brand block */}
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-pretty text-sm leading-relaxed text-muted">
              Everything you need to find your perfect fitness space — across
              Lahore, Islamabad, Karachi and eleven more cities.
            </p>

            <div className="mt-7 flex items-center gap-2">
              {socials.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => openEarlyAccess(label)}
                  aria-label={`${label} — opens a preview note, social accounts aren't live yet`}
                  className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-gold/50 hover:text-gold"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.heading}>
                <h2 className="label text-muted">{col.heading}</h2>
                <ul className="mt-4 space-y-2.5">
                  {col.items.map((item) => (
                    <li key={item.label}>
                      <button
                        type="button"
                        onClick={() => handle(item)}
                        className="text-left text-sm text-muted transition-colors hover:text-gold"
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4 border-t border-line py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-faint">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <p className="text-xs text-faint">
              A design concept — no accounts, payments or bookings are real.
            </p>
            <ThemeToggle className="h-9 w-9" />
          </div>
        </div>
      </div>
    </footer>
  );
}
