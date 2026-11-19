"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Check, Crown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { useFetch } from "@/hooks/useFetch";
import { apiFetch } from "@/lib/api";
import { FREE_SERVICE_LIMIT, PREMIUM_PRICE_USD } from "@/lib/service-constants";
import { dateFmt } from "@/lib/format";
import type { VendorStats } from "@/types/service";

const FREE = [`Up to ${FREE_SERVICE_LIMIT} active services`, "Booking requests", "Standard listing"];
const PREMIUM = ["Unlimited active services", "Premium Vendor badge", "Priority in vendor listings"];

export default function SubscriptionPanel() {
  const { data: stats, error, reload } = useFetch<VendorStats>("/api/vendor/stats", true);
  const [busy, setBusy] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);

  // Premium kokhono client theke set hoy na. Stripe webhook server e activate kore.
  async function upgrade() {
    setBusy(true);
    try {
      const { url } = await apiFetch<{ url: string }>("/api/payments/checkout", { method: "POST", auth: true });
      window.location.href = url;
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not start checkout");
      setBusy(false);
    }
  }

  async function cancel() {
    setConfirmCancel(false);
    setBusy(true);
    try {
      const r = await apiFetch<{ message: string }>("/api/payments/cancel", { method: "POST", auth: true });
      toast.success(r.message);
      reload();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not cancel");
    } finally {
      setBusy(false);
    }
  }

  if (error) return <p className="text-destructive text-sm">{error}</p>;
  if (!stats) return <Skeleton className="h-72 max-w-3xl" />;

  const premium = stats.plan === "premium";

  return (
    <div className="max-w-3xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className={`rounded-xl border p-5 ${!premium ? "border-primary ring-primary/20 ring-2" : ""}`}>
          <p className="text-sm font-medium">Free</p>
          <p className="mt-1 text-3xl font-semibold">$0</p>
          <ul className="mt-4 space-y-2 text-sm">
            {FREE.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <Check className="text-muted-foreground size-4" /> {f}
              </li>
            ))}
          </ul>
          {!premium && <p className="text-primary mt-4 text-xs font-medium">Current plan</p>}
        </div>

        <div className={`rounded-xl border p-5 ${premium ? "border-primary ring-primary/20 ring-2" : ""}`}>
          <p className="flex items-center gap-1 text-sm font-medium">
            <Crown className="size-4 text-amber-500" /> Premium
          </p>
          <p className="mt-1 text-3xl font-semibold">
            ${PREMIUM_PRICE_USD}
            <span className="text-muted-foreground text-sm font-normal"> / month</span>
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {PREMIUM.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <Check className="size-4 text-emerald-500" /> {f}
              </li>
            ))}
          </ul>
          {premium && <p className="text-primary mt-4 text-xs font-medium">Current plan</p>}
        </div>
      </div>

      <div className="rounded-xl border p-5">
        {premium ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-medium">You&apos;re on Premium</p>
              <p className="text-muted-foreground text-sm">Current period ends {dateFmt(stats.subscriptionExpiresAt)}.</p>
            </div>
            <Button variant="outline" disabled={busy} onClick={() => setConfirmCancel(true)}>
              {busy && <Loader2 className="mr-2 size-4 animate-spin" />}
              Cancel at period end
            </Button>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-medium">Need more than {FREE_SERVICE_LIMIT} services?</p>
              <p className="text-muted-foreground text-sm">
                {stats.activeSlots} of {stats.serviceLimit} slots used. Secure payment by Stripe.
              </p>
            </div>
            <Button disabled={busy} onClick={upgrade}>
              {busy && <Loader2 className="mr-2 size-4 animate-spin" />}
              Upgrade to Premium
            </Button>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={confirmCancel}
        onOpenChange={setConfirmCancel}
        title="Cancel Premium?"
        description="You keep Premium until the end of the current billing period. After that, only your 3 oldest active services stay active."
        confirmLabel="Cancel subscription"
        cancelLabel="Keep Premium"
        onConfirm={cancel}
      />
    </div>
  );
}
