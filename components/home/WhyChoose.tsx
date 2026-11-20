import { BadgeCheck, LayoutDashboard, ShieldCheck, Wallet } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: "Reviewed Vendors",
    text: "Every service is checked by our admin team before it appears publicly.",
  },
  {
    icon: Wallet,
    title: "Clear Pricing",
    text: "Compare prices upfront and filter by location and budget.",
  },
  {
    icon: LayoutDashboard,
    title: "Simple Dashboards",
    text: "Couples track requests and vendors manage bookings in one place.",
  },
  {
    icon: BadgeCheck,
    title: "Premium Badge",
    text: "Spot top vendors with a verified Premium badge backed by Stripe.",
  },
];

export function WhyChoose() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <Reveal className="mb-10 max-w-xl">
        <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-primary">
          Why us
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Why Choose Wedora?
        </h2>
        <p className="mt-2 text-xs text-muted-foreground">
          We replace endless messages and spreadsheets with one organised place
          for couples and vendors.
        </p>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map((b, i) => (
          <Reveal key={b.title} delay={i * 0.08}>
            <div className="h-full rounded-xl border border-white/10 bg-card p-5">
              <b.icon className="size-6 text-primary" />
              <h3 className="mt-4 text-sm font-semibold">{b.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                {b.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
