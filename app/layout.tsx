import type { Metadata, Viewport } from "next";
import { Sora, Manrope } from "next/font/google";
import { ThemeProvider } from "@/components/theme-toggle";
import { AppProvider } from "@/components/app-provider";
import { site } from "@/lib/site";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "gym finder Pakistan",
    "gyms in Lahore",
    "personal trainers Lahore",
    "fitness classes Karachi",
    "gym membership prices Pakistan",
    "CrossFit Islamabad",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/icon.svg",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0907" },
    { media: "(prefers-color-scheme: light)", color: "#faf6ee" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sora.variable} ${manrope.variable}`}>
      <body>
        {/* Scroll-reveal ships with inline opacity:0 from the animation layer.
            Without JS those elements would never be revealed, so undo them. */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <ThemeProvider>
          <AppProvider>{children}</AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
