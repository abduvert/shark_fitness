"use client";

import * as React from "react";
import {
  MapPin,
  Users,
  Dumbbell,
  CalendarDays,
  Check,
  Heart,
  Clock,
  Timer,
  Award,
  Sparkles,
  Info,
} from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { SmartImage } from "@/components/ui/smart-image";
import { Rating } from "@/components/ui/rating";
import { Badge, Tag } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useApp } from "@/components/app-provider";
import { useNow, useSticky } from "@/lib/use-now";
import { getGym } from "@/data/gyms";
import { getTrainer } from "@/data/trainers";
import { classes } from "@/data/classes";
import { cn, openState, pkr } from "@/lib/utils";

export function DetailDialogs() {
  return (
    <>
      <GymDialog />
      <TrainerDialog />
      <ClassDialog />
      <EarlyAccessDialog />
    </>
  );
}

/* ── Gym ─────────────────────────────────────────── */

function GymDialog() {
  const { gymDetail, closeAll, toggleFavourite, isFavourite, openEarlyAccess } = useApp();
  const gym = useSticky(gymDetail ? getGym(gymDetail) : null);
  const now = useNow();

  if (!gym) return null;

  const status = openState(gym.opensAt, gym.closesAt, now);
  const fav = isFavourite(gym.id);
  const gymClasses = classes.filter((c) => c.gym === gym.name);

  return (
    <Dialog open={Boolean(gymDetail)} onClose={closeAll} title={gym.name} className="max-w-3xl">
      <div className="relative h-52 sm:h-64">
        <SmartImage
          src={gym.image}
          alt={`Inside ${gym.name}`}
          fill
          sizes="(max-width: 768px) 100vw, 48rem"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

        <div className="absolute inset-x-5 bottom-4 flex flex-wrap items-end gap-3">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {gym.badges.map((b) => (
                <Badge key={b} tone={b === "Best value" ? "gold" : "neutral"} className="glass">
                  {b}
                </Badge>
              ))}
            </div>
            <p className="font-display text-2xl font-semibold tracking-[-0.025em] text-fg sm:text-3xl">
              {gym.name}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
              <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
              {gym.area}, {gym.city} · {gym.distanceKm} km away
            </p>
          </div>
        </div>
      </div>

      <div className="max-h-[52vh] overflow-y-auto p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <Rating value={gym.rating} reviews={gym.reviews} showStars size="md" />
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
              status.open
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-500 dark:text-emerald-400"
                : "border-line text-muted"
            )}
          >
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                status.open ? "bg-emerald-500" : "bg-faint"
              )}
              aria-hidden
            />
            {status.label}
          </span>
        </div>

        <p className="mt-4 text-pretty text-sm leading-relaxed text-muted">{gym.blurb}</p>

        <dl className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line">
          {[
            { icon: Users, term: "Members", detail: gym.members.toLocaleString("en-US") },
            { icon: Dumbbell, term: "Trainers", detail: `${gym.trainers}` },
            { icon: CalendarDays, term: "Classes / wk", detail: `${gym.weeklyClasses}` },
          ].map(({ icon: Icon, term, detail }) => (
            <div key={term} className="bg-card px-4 py-4">
              <dt className="flex items-center gap-1.5 text-2xs uppercase tracking-techy text-faint">
                <Icon className="h-3 w-3 text-gold" strokeWidth={2} aria-hidden />
                {term}
              </dt>
              <dd className="mt-1.5 font-display text-lg font-semibold tabular-nums text-fg">
                {detail}
              </dd>
            </div>
          ))}
        </dl>

        <section className="mt-6">
          <h3 className="label text-muted">Facilities</h3>
          <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {gym.facilities.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-fg">
                <Check className="h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={3} aria-hidden />
                {f}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-6">
          <h3 className="label text-muted">Disciplines</h3>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {gym.types.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </section>

        {gymClasses.length > 0 && (
          <section className="mt-6">
            <h3 className="label text-muted">Classes here</h3>
            <ul className="mt-3 space-y-2">
              {gymClasses.map((c) => (
                <li
                  key={c.id}
                  className="flex items-center gap-3 rounded-xl border border-line bg-elevated px-3.5 py-2.5"
                >
                  <span className="font-display text-xs font-semibold tabular-nums text-gold">
                    {c.time}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm text-fg">{c.name}</span>
                  <span className="shrink-0 text-2xs text-faint">{c.durationMin} min</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-line bg-elevated/40 p-5">
        <div>
          <p className="text-2xs uppercase tracking-techy text-faint">Membership from</p>
          <p className="font-display text-xl font-semibold tabular-nums text-fg">
            {pkr(gym.price)}
            <span className="text-sm font-normal text-muted">/month</span>
          </p>
        </div>

        <div className="ml-auto flex gap-2">
          <Button
            variant="outline"
            onClick={() => toggleFavourite(gym.id)}
            aria-pressed={fav}
          >
            <Heart
              className={cn("h-4 w-4", fav && "fill-gold text-gold")}
              strokeWidth={1.75}
              aria-hidden
            />
            {fav ? "Shortlisted" : "Shortlist"}
          </Button>
          <Button onClick={() => openEarlyAccess(gym.name)}>Enquire</Button>
        </div>
      </div>
    </Dialog>
  );
}

/* ── Trainer ─────────────────────────────────────── */

function TrainerDialog() {
  const { trainerDetail, closeAll, openEarlyAccess } = useApp();
  const t = useSticky(trainerDetail ? getTrainer(trainerDetail) : null);

  if (!t) return null;

  return (
    <Dialog open={Boolean(trainerDetail)} onClose={closeAll} title={t.name} className="max-w-2xl">
      <div className="max-h-[74vh] overflow-y-auto">
        <div className="flex flex-col gap-5 p-5 sm:flex-row sm:p-6">
          <div className="relative h-44 w-full shrink-0 overflow-hidden rounded-2xl border border-line sm:h-52 sm:w-40">
            <SmartImage
              src={t.image}
              alt={`${t.name}, ${t.specialization} coach`}
              fill
              sizes="(max-width: 640px) 100vw, 10rem"
              className="object-cover"
            />
          </div>

          <div className="min-w-0 flex-1 pr-10">
            <p className="label">Personal trainer</p>
            <p className="mt-2 font-display text-2xl font-semibold tracking-[-0.025em] text-fg">
              {t.name}
            </p>
            <p className="mt-1 text-sm text-gold">{t.specialization}</p>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
              <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
              {t.gym} · {t.city}
            </p>
            <div className="mt-3">
              <Rating value={t.rating} reviews={t.reviews} showStars />
            </div>

            {t.spotsLeft <= 3 && (
              <p className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-gold/35 bg-gold/10 px-2.5 py-1 text-xs text-gold">
                <Sparkles className="h-3 w-3" strokeWidth={2} aria-hidden />
                Only {t.spotsLeft} slots left this month
              </p>
            )}
          </div>
        </div>

        <div className="px-5 pb-5 sm:px-6">
          <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {[
              { term: "Experience", detail: `${t.years} yrs` },
              { term: "Sessions", detail: `${(t.sessions / 1000).toFixed(1)}k` },
              { term: "Rating", detail: t.rating.toFixed(1) },
            ].map((s) => (
              <div key={s.term} className="bg-card px-4 py-4">
                <dt className="text-2xs uppercase tracking-techy text-faint">{s.term}</dt>
                <dd className="mt-1.5 font-display text-lg font-semibold tabular-nums text-fg">
                  {s.detail}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-5 text-pretty text-sm leading-relaxed text-muted">{t.bio}</p>

          <section className="mt-5">
            <h3 className="label text-muted">Specialties</h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {t.specialties.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
          </section>

          <section className="mt-5">
            <h3 className="label text-muted">Achievements</h3>
            <ul className="mt-3 space-y-2.5">
              {t.achievements.map((a) => (
                <li key={a} className="flex items-start gap-2.5 text-sm text-muted">
                  <Award className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
                  {a}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-line bg-elevated/40 p-5">
        <div>
          <p className="text-2xs uppercase tracking-techy text-faint">Per session</p>
          <p className="font-display text-xl font-semibold tabular-nums text-fg">
            {pkr(t.pricePerSession)}
          </p>
        </div>
        <Button className="ml-auto" onClick={() => openEarlyAccess(`Session with ${t.name}`)}>
          Enquire about sessions
        </Button>
      </div>
    </Dialog>
  );
}

/* ── Class ───────────────────────────────────────── */

function ClassDialog() {
  const { classDetail, closeAll, openEarlyAccess } = useApp();
  const c = useSticky(classDetail ? classes.find((x) => x.id === classDetail) : null);

  if (!c) return null;

  const filled = c.capacity - c.spotsLeft;

  return (
    <Dialog open={Boolean(classDetail)} onClose={closeAll} title={c.name} className="max-w-lg">
      <div className="relative h-40">
        <SmartImage
          src={c.image}
          alt=""
          fill
          sizes="32rem"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
        <div className="absolute inset-x-5 bottom-4">
          <p className="label">{c.discipline}</p>
          <p className="mt-1 font-display text-2xl font-semibold tracking-[-0.025em] text-fg">
            {c.name}
          </p>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Clock, term: "Starts", detail: `${c.day}, ${c.time}` },
            { icon: Timer, term: "Duration", detail: `${c.durationMin} minutes` },
            { icon: Users, term: "Level", detail: c.difficulty },
            { icon: MapPin, term: "Where", detail: c.gym },
          ].map(({ icon: Icon, term, detail }) => (
            <div key={term} className="rounded-2xl border border-line bg-elevated p-3.5">
              <p className="flex items-center gap-1.5 text-2xs uppercase tracking-techy text-faint">
                <Icon className="h-3 w-3 text-gold" strokeWidth={2} aria-hidden />
                {term}
              </p>
              <p className="mt-1.5 font-display text-sm font-semibold text-fg">{detail}</p>
            </div>
          ))}
        </div>

        <p className="mt-5 text-sm text-muted">
          Coached by{" "}
          <span className="font-display font-semibold text-fg">{c.trainer}</span> ·{" "}
          {c.accent}
        </p>

        {/* Capacity */}
        <div className="mt-5">
          <div className="flex items-baseline justify-between">
            <p className="label text-muted">Capacity</p>
            <p className="text-xs tabular-nums text-muted">
              {filled} of {c.capacity} booked
            </p>
          </div>
          <div
            className="mt-2 flex h-2 overflow-hidden rounded-full bg-line"
            role="img"
            aria-label={`${filled} of ${c.capacity} spots booked`}
          >
            <div
              className="bg-gold transition-all duration-700"
              style={{ width: `${(filled / c.capacity) * 100}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-gold">Only {c.spotsLeft} spots left</p>
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-line bg-elevated/40 p-5">
        <p className="text-xs text-faint">Included with a Pro membership</p>
        <Button className="ml-auto" onClick={() => openEarlyAccess(`${c.name} class`)}>
          Enquire
        </Button>
      </div>
    </Dialog>
  );
}

/* ── Early access / enquiry ──────────────────────── */

function EarlyAccessDialog() {
  const { earlyAccess, closeAll } = useApp();
  const [email, setEmail] = React.useState("");
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    if (earlyAccess.open) {
      setDone(false);
      setEmail("");
    }
  }, [earlyAccess.open]);

  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

  return (
    <Dialog
      open={earlyAccess.open}
      onClose={closeAll}
      title="Get early access"
      className="max-w-md"
    >
      <div className="p-6 sm:p-7">
        {done ? (
          <div className="py-4 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-gold/35 bg-gold/12">
              <Check className="h-6 w-6 text-gold" strokeWidth={2.5} aria-hidden />
            </span>
            <p className="mt-5 font-display text-xl font-semibold tracking-[-0.02em] text-fg">
              You're on the list
            </p>
            <p className="mx-auto mt-2 max-w-xs text-sm text-muted">
              In the real product we'd email {email} when early access opens.
            </p>
            <p className="mx-auto mt-4 inline-flex items-start gap-2 rounded-xl border border-line bg-elevated px-3.5 py-2.5 text-left text-xs text-faint">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
              This is a design demo. Nothing was submitted, stored or sent.
            </p>
            <Button variant="outline" className="mt-6 w-full" onClick={closeAll}>
              Close
            </Button>
          </div>
        ) : (
          <>
            <p className="label">
              {earlyAccess.context ? `About ${earlyAccess.context}` : "Early access"}
            </p>
            <p className="mt-3 font-display text-2xl font-semibold tracking-[-0.025em] text-fg">
              Be first through the door.
            </p>
            <p className="mt-2.5 text-sm leading-relaxed text-muted">
              Memberships, bookings and progress tracking are still in build.
              Leave an address and we'll show you what that flow looks like.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (valid) setDone(true);
              }}
              className="mt-6"
            >
              <label htmlFor="ea-email" className="label text-muted">
                Email address
              </label>
              <input
                id="ea-email"
                data-autofocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className="mt-2.5 w-full rounded-2xl border border-line bg-elevated px-4 py-3.5 text-sm text-fg outline-none transition-colors placeholder:text-faint focus:border-gold/50"
              />
              <Button type="submit" size="lg" className="mt-4 w-full" disabled={!valid}>
                Request early access
              </Button>
            </form>

            <p className="mt-4 flex items-start gap-2 text-xs text-faint">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
              This is a front-end demo — the form validates locally and sends
              nothing to a server.
            </p>
          </>
        )}
      </div>
    </Dialog>
  );
}
