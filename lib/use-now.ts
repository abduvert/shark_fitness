"use client";

import * as React from "react";

/**
 * Keeps the last non-null value around. Dialogs read their entity through this
 * so the panel still has content to render while it animates closed.
 */
export function useSticky<T>(value: T | null | undefined): T | null {
  const ref = React.useRef<T | null>(null);
  if (value != null) ref.current = value;
  return ref.current;
}

/**
 * Returns the current time, but only after mount. Server and first client
 * render both see `null`, so anything time-dependent stays hydration-safe;
 * callers render the static hours until the real clock arrives.
 */
export function useNow(refreshMs = 60_000) {
  const [now, setNow] = React.useState<Date | null>(null);

  React.useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), refreshMs);
    return () => window.clearInterval(id);
  }, [refreshMs]);

  return now;
}
