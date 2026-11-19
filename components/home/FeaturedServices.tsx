"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import EmptyState from "@/components/shared/EmptyState";
import { ServiceGrid, ServiceGridSkeleton } from "@/components/services/ServiceGrid";
import { useFetch } from "@/hooks/useFetch";
import type { Paged, Service } from "@/types/service";

export default function FeaturedServices() {
  const { data, error, loading } = useFetch<Paged & { services: Service[] }>(
    "/api/services?limit=6&sort=latest",
  );

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Featured services</h2>
          <p className="text-muted-foreground mt-2">Freshly approved services from our vendors.</p>
        </div>
        <Link href="/services" className={buttonVariants({ variant: "outline" })}>
          View all <ArrowRight className="ml-1 size-4" />
        </Link>
      </div>

      {loading && !data ? (
        <ServiceGridSkeleton />
      ) : error ? (
        <p className="text-muted-foreground text-sm">Services could not be loaded right now.</p>
      ) : data && data.services.length ? (
        <ServiceGrid services={data.services} />
      ) : (
        <EmptyState title="No services yet" text="Approved services will appear here." />
      )}
    </section>
  );
}
