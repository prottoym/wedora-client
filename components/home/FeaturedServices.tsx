import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Reveal } from "@/components/shared/Reveal";
import type { Service } from "@/types";

async function getFeaturedServices(): Promise<Service[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/services?limit=6&sort=latest`,
      { next: { revalidate: 60 } },
    );
    if (!res.ok) return [];
    const json = await res.json();
    return json.services ?? json.data ?? [];
  } catch {
    return [];
  }
}

export function FeaturedServicesSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-72 animate-pulse rounded-xl border border-white/10 bg-muted/50"
        />
      ))}
    </div>
  );
}

export async function FeaturedServices() {
  const services = await getFeaturedServices();

  if (services.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-white/15 py-16 text-center">
        <p className="text-sm font-medium">No services published yet</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Approved services will appear here. Please check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.slice(0, 6).map((service, i) => (
        <Reveal key={service._id} delay={(i % 3) * 0.08}>
          <ServiceCard service={service} />
        </Reveal>
      ))}
    </div>
  );
}

export function FeaturedSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-primary">
            Featured
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Featured Wedding Services
          </h2>
          <p className="mt-2 max-w-md text-xs text-muted-foreground">
            Hand-picked, approved services from our most trusted vendors.
          </p>
        </div>
        <Link
          href="/services"
          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80"
        >
          View all services <ArrowRight className="size-3.5" />
        </Link>
      </Reveal>
      {children}
    </section>
  );
}