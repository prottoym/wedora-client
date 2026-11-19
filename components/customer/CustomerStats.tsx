"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { StatTiles, StatTilesSkeleton } from "@/components/shared/StatTile";
import { useFetch } from "@/hooks/useFetch";
import type { CustomerStats as Stats } from "@/types/booking";

export default function CustomerStats() {
  const { data, error } = useFetch<Stats>("/api/bookings/stats", true);

  if (error) return <p className="text-destructive text-sm">{error}</p>;
  if (!data) return <StatTilesSkeleton />;

  return (
    <div className="space-y-6">
      <StatTiles
        items={[
          { label: "Total requests", value: data.total },
          { label: "Pending", value: data.pending, hint: "Waiting for vendor" },
          { label: "Accepted", value: data.accepted, hint: "Confirmed" },
          { label: "Rejected / Cancelled", value: data.rejected + data.cancelled },
        ]}
      />
      <div className="flex flex-wrap gap-3">
        <Link href="/services" className={buttonVariants()}>
          Browse services
        </Link>
        <Link href="/dashboard/customer/bookings" className={buttonVariants({ variant: "outline" })}>
          My bookings
        </Link>
      </div>
    </div>
  );
}
