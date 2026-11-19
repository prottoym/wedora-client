"use client";

import Link from "next/link";
import { Crown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { StatTiles, StatTilesSkeleton } from "@/components/shared/StatTile";
import { useFetch } from "@/hooks/useFetch";
import { dateFmt } from "@/lib/format";
import type { VendorStats as Stats } from "@/types/service";

export default function VendorStats() {
  const { data: stats, error } = useFetch<Stats>("/api/vendor/stats", true);

  if (error) return <p className="text-destructive text-sm">{error}</p>;
  if (!stats) return <StatTilesSkeleton />;

  const premium = stats.plan === "premium";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 text-primary rounded-lg p-2">
            <Crown className="size-5" />
          </div>
          <div>
            <p className="font-medium">{premium ? "Premium plan" : "Free plan"}</p>
            <p className="text-muted-foreground text-sm">
              {premium
                ? `Unlimited services · renews/ends ${dateFmt(stats.subscriptionExpiresAt)}`
                : `${stats.activeSlots} of ${stats.serviceLimit} active service slots used`}
            </p>
          </div>
        </div>
        <Link
          href="/dashboard/vendor/subscription"
          className={buttonVariants({ variant: premium ? "outline" : "default", size: "sm" })}
        >
          {premium ? "Manage plan" : "Upgrade to Premium"}
        </Link>
      </div>

      <StatTiles
        items={[
          {
            label: "Total services",
            value: stats.totalServices,
            hint: stats.serviceLimit ? `${stats.activeSlots}/${stats.serviceLimit} slots used` : "Unlimited",
          },
          { label: "Live services", value: stats.activeServices, hint: "Approved & active" },
          { label: "Pending requests", value: stats.pendingBookings, hint: "Waiting for you" },
          { label: "Accepted bookings", value: stats.acceptedBookings, hint: "Confirmed" },
        ]}
      />
    </div>
  );
}
