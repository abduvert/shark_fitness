"use client";

import * as React from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

/**
 * next/image with a designed fallback. Remote photography can fail (offline
 * build, blocked host); rather than an alt-text box we fall back to a warm
 * gradient wash so the composition never looks broken.
 */
export function SmartImage({
  className,
  alt,
  seed = 0,
  ...props
}: ImageProps & { seed?: number }) {
  const [failed, setFailed] = React.useState(false);

  if (failed) {
    const rotation = 120 + ((seed * 37) % 140);
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn("bg-elevated", className)}
        style={{
          backgroundImage: `linear-gradient(${rotation}deg, rgb(var(--elevated)), rgb(var(--gold)/0.22) 55%, rgb(var(--surface)))`,
        }}
      />
    );
  }

  return (
    <Image
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
      {...props}
    />
  );
}
