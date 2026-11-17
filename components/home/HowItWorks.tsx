import { CalendarCheck, Search, Send } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";

const STEPS = [
  {
    icon: Search,
    title: "Discover",
    text: "Search approved services by category, location and price.",
  },
  {
    icon: Send,
    title: "Send a Request",
    text: "Choose your date and location, add a note and send it to the vendor.",
  },
  {
    icon: CalendarCheck,
    title: "Track & Celebrate",
    text: "Follow your request status from your dashboard until it is confirmed.",
  },
];

export function HowItWorks() {
  return (
    <section className="border-t border-white/10 bg-muted/20">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <Reveal className="mb-10 text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-primary">
            Simple process
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            How WedPlan Works
          </h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <div className="relative rounded-xl border border-white/10 bg-background p-6 text-center">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
                  0{i + 1}
                </span>
                <s.icon className="mx-auto size-7 text-primary" />
                <h3 className="mt-4 text-sm font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {s.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}