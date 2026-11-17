"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  Camera,
  Flower2,
  Landmark,
  Shirt,
  Sparkles,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { CATEGORIES } from "@/lib/constants";

const ICONS: Record<string, LucideIcon> = {
  camera: Camera,
  venue: Landmark,
  flower: Flower2,
  food: UtensilsCrossed,
  makeup: Sparkles,
  fashion: Shirt,
};

export function CategoryGrid() {
  return (
    <section className="border-y border-white/10 bg-muted/20">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-primary">
            Explore by category
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Wedding Service Categories
          </h2>
          <p className="mx-auto mt-2 max-w-md text-xs text-muted-foreground">
            Pick a category and discover specialists for every part of your
            celebration.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, i) => {
            const Icon = ICONS[cat.icon];
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Link
                  href={`/services?category=${encodeURIComponent(cat.name)}`}
                  className="group flex h-full items-start gap-4 rounded-xl border border-white/10 bg-background p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">
                      {cat.name}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                      {cat.tagline}
                    </span>
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}