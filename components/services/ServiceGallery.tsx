"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

export function ServiceGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);

  if (!images?.length) {
    return (
      <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-white/10 bg-muted/40 text-muted-foreground">
        <ImageOff className="size-8" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-muted">
        <Image
          key={images[active]}
          src={images[active]}
          alt={`${name} - image ${active + 1}`}
          fill
          priority
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === active}
              className={cn(
                "relative aspect-square overflow-hidden rounded-lg border transition-all",
                i === active
                  ? "border-primary ring-2 ring-primary/30"
                  : "border-white/10 opacity-70 hover:opacity-100",
              )}
            >
              <Image src={src} alt="" fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}