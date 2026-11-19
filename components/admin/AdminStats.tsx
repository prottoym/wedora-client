"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { StatTiles, StatTilesSkeleton } from "@/components/shared/StatTile";
import { useFetch } from "@/hooks/useFetch";
import { moneyCents } from "@/lib/format";
import type { AdminStats as Stats } from "@/types/admin";

export default function AdminStats() {
  const { data, error } = useFetch<Stats>("/api/admin/stats", true);

  if (error) return <p className="text-destructive text-sm">{error}</p>;
  if (!data) return <StatTilesSkeleton />;

  return (
    <div className="space-y-6">
      <StatTiles
        items={[
          { label: "Total users", value: data.totalUsers, hint: `${data.totalVendors} vendors · ${data.totalCustomers} customers` },
          { label: "Total services", value: data.totalServices },
          { label: "Pending approval", value: data.pendingServices, hint: "Needs your review" },
          { label: "Revenue", value: moneyCents(data.totalRevenue), hint: `${data.totalTransactions} transactions` },
        ]}
      />
      {data.pendingServices > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4">
          <p className="text-sm">
            <span className="font-medium">{data.pendingServices}</span> service
            {data.pendingServices === 1 ? " is" : "s are"} waiting for approval.
          </p>
          <Link href="/dashboard/admin/services?status=pending" className={buttonVariants({ size: "sm" })}>
            Review now
          </Link>
        </div>
      )}
    </div>
  );
}
