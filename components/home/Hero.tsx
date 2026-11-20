"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const STATS = [
  { value: "6", label: "Service categories" },
  { value: "100%", label: "Admin-reviewed" },
  { value: "24/7", label: "Booking tracking" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 py-20 text-center md:py-28">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center space-y-6"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-primary"
          >
            <Sparkles className="size-3" />
            Your wedding, beautifully organised
          </motion.span>

          <motion.h1
            variants={item}
            className="text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Find the people who will make your big day{" "}
            <span className="text-primary">unforgettable.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="max-w-xl text-sm leading-relaxed text-muted-foreground"
          >
            Browse reviewed photographers, venues, florists, caterers and
            stylists. Compare prices, pick your date and send a booking request
            in a few clicks.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap justify-center gap-3">
            <Button
              nativeButton={false}
              render={<Link href="/services" />}
              className="h-9 rounded-md px-5 text-xs shadow-[0_0_20px_-4px] shadow-primary/70"
            >
              Explore Wedding Services
              <ArrowRight className="size-3.5" />
            </Button>
            <Button
              variant="outline"
              nativeButton={false}
              render={<Link href="/sign-up" />}
              className="h-9 rounded-md px-5 text-xs"
            >
              Join as a Vendor
            </Button>
          </motion.div>

          <motion.dl
            variants={item}
            className="flex w-full max-w-md justify-center gap-10 border-t border-white/10 pt-6"
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="text-xl font-semibold">{s.value}</dt>
                <dd className="text-[11px] text-muted-foreground">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </section>
  );
}
