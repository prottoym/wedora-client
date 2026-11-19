"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Calendar, Check, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import EmptyState from "@/components/shared/EmptyState";
import StatusBadge from "@/components/shared/StatusBadge";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { useFetch } from "@/hooks/useFetch";
import { apiFetch } from "@/lib/api";
import { dayFmt, money } from "@/lib/format";
import type { Booking, BookingStatus } from "@/types/booking";

const TABS: { value: "" | BookingStatus; label: string }[] = [
  { value: "", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "accepted", label: "Accepted" },
  { value: "rejected", label: "Rejected" },
  { value: "cancelled", label: "Cancelled" },
];

export default function BookingRequests() {
  const [tab, setTab] = useState<"" | BookingStatus>("");
  const { data, setData, error, loading } = useFetch<{ bookings: Booking[] }>(
    `/api/vendor/bookings${tab ? `?status=${tab}` : ""}`,
    true,
  );
  const [pending, setPending] = useState<{ b: Booking; status: "accepted" | "rejected" } | null>(null);
  const [busy, setBusy] = useState(false);

  async function apply() {
    if (!pending) return;
    const { b, status } = pending;
    setBusy(true);
    try {
      await apiFetch(`/api/vendor/bookings/${b._id}/status`, { method: "PATCH", auth: true, body: { status } });
      setData((d) =>
        d
          ? {
              bookings: tab
                ? d.bookings.filter((x) => x._id !== b._id) // filter tab e thakle list theke soriye dao
                : d.bookings.map((x) => (x._id === b._id ? { ...x, status } : x)),
            }
          : d,
      );
      toast.success(`Request ${status}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Update failed"); // 409 already processed
    } finally {
      setBusy(false);
      setPending(null);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <Button
            key={t.value || "all"}
            size="sm"
            variant={tab === t.value ? "default" : "outline"}
            onClick={() => setTab(t.value)}
          >
            {t.label}
          </Button>
        ))}
      </div>

      {error ? (
        <p className="text-destructive text-sm">{error}</p>
      ) : loading && !data ? (
        <TableSkeleton rows={3} />
      ) : !data?.bookings.length ? (
        <EmptyState title="No booking requests" text="Requests from customers will show up here." />
      ) : (
        <div className="space-y-4">
          {data.bookings.map((b) => (
            <div key={b._id} className="flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold">{b.service?.serviceName ?? "Service removed"}</p>
                  <StatusBadge status={b.status} />
                </div>
                <p className="text-muted-foreground text-sm">
                  {b.customer?.name ?? "Customer"} · {b.customer?.email}
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
                {b.message && <p className="text-muted-foreground text-sm italic">“{b.message}”</p>}
              </div>

              {b.status === "pending" && (
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => setPending({ b, status: "accepted" })} disabled={busy}>
                    <Check className="mr-1 size-4" /> Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setPending({ b, status: "rejected" })}
                    disabled={busy}
                  >
                    <X className="mr-1 size-4" /> Reject
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!pending}
        onOpenChange={(o) => !o && setPending(null)}
        title={pending?.status === "accepted" ? "Accept this request?" : "Reject this request?"}
        description="The customer will see the new status. A processed request cannot be changed again."
        confirmLabel={pending?.status === "accepted" ? "Accept" : "Reject"}
        onConfirm={apply}
      />
    </div>
  );
}
