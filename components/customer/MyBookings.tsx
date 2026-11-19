"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Calendar, MapPin } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import EmptyState from "@/components/shared/EmptyState";
import StatusBadge from "@/components/shared/StatusBadge";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { useFetch } from "@/hooks/useFetch";
import { apiFetch } from "@/lib/api";
import { dayFmt, money } from "@/lib/format";
import type { Booking } from "@/types/booking";

export default function MyBookings() {
  const { data, setData, error } = useFetch<{ bookings: Booking[] }>("/api/bookings/mine", true);
  const [toCancel, setToCancel] = useState<Booking | null>(null);
  const [busy, setBusy] = useState(false);

  async function cancel() {
    if (!toCancel) return;
    const b = toCancel;
    setBusy(true);
    try {
      await apiFetch(`/api/bookings/${b._id}/cancel`, { method: "PATCH", auth: true });
      setData((d) =>
        d ? { bookings: d.bookings.map((x) => (x._id === b._id ? { ...x, status: "cancelled" } : x)) } : d,
      );
      toast.success("Booking cancelled");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not cancel");
    } finally {
      setBusy(false);
      setToCancel(null);
    }
  }

  if (error) return <p className="text-destructive text-sm">{error}</p>;
  if (!data) return <TableSkeleton rows={3} />;

  if (!data.bookings.length) {
    return (
      <EmptyState
        title="No bookings yet"
        text="Find a service you like and send your first request."
        action={
          <Link href="/services" className={buttonVariants()}>
            Browse services
          </Link>
        }
      />
    );
  }

  return (
    <>
      <div className="space-y-4">
        {data.bookings.map((b) => (
          <div key={b._id} className="flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={b.service?.images?.[0]}
              alt=""
              className="aspect-4/3 w-full rounded-lg object-cover sm:w-36"
            />
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold">{b.service?.serviceName ?? "Service removed"}</p>
                <StatusBadge status={b.status} />
              </div>
              <p className="text-muted-foreground text-sm">
                by {b.vendor?.businessName || b.vendor?.name || "Vendor"}
                {b.service?.price != null && <> · {money(b.service.price)}</>}
              </p>
              <p className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="size-3.5" /> {dayFmt(b.eventDate)}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="size-3.5" /> {b.eventLocation}
                </span>
              </p>
              {b.message && <p className="text-muted-foreground line-clamp-2 text-sm italic">“{b.message}”</p>}
            </div>
            {b.status === "pending" && (
              <Button variant="outline" onClick={() => setToCancel(b)} disabled={busy}>
                Cancel
              </Button>
            )}
          </div>
        ))}
      </div>

      <ConfirmDialog
        open={!!toCancel}
        onOpenChange={(o) => !o && setToCancel(null)}
        title="Cancel this booking request?"
        description="Only pending requests can be cancelled. This cannot be undone."
        confirmLabel="Yes, cancel it"
        cancelLabel="Keep it"
        onConfirm={cancel}
      />
    </>
  );
}
