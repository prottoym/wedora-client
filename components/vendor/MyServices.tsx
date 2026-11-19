"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import EmptyState from "@/components/shared/EmptyState";
import StatusBadge from "@/components/shared/StatusBadge";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { useFetch } from "@/hooks/useFetch";
import { apiFetch } from "@/lib/api";
import { money } from "@/lib/format";
import type { Service } from "@/types/service";

export default function MyServices() {
  const { data, setData, error } = useFetch<{ services: Service[] }>("/api/vendor/services", true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<Service | null>(null);

  const services = data?.services ?? null;
  const patchLocal = (fn: (s: Service[]) => Service[]) =>
    setData((d) => (d ? { services: fn(d.services) } : d));

  async function toggleActive(s: Service, next: boolean) {
    setBusyId(s._id);
    try {
      const d = await apiFetch<{ service: Service }>(`/api/vendor/services/${s._id}`, {
        method: "PATCH",
        auth: true,
        body: { isActive: next },
      });
      patchLocal((list) => list.map((x) => (x._id === s._id ? d.service : x)));
      toast.success(next ? "Service is now active" : "Service is now inactive");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Update failed"); // free limit error ekhane ashbe
    } finally {
      setBusyId(null);
    }
  }

  async function confirmDelete() {
    if (!toDelete) return;
    const s = toDelete;
    setBusyId(s._id);
    try {
      await apiFetch(`/api/vendor/services/${s._id}`, { method: "DELETE", auth: true });
      patchLocal((list) => list.filter((x) => x._id !== s._id));
      toast.success("Service deleted");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setBusyId(null);
      setToDelete(null);
    }
  }

  if (error) return <p className="text-destructive text-sm">{error}</p>;
  if (!services) return <TableSkeleton rows={3} />;

  if (!services.length) {
    return (
      <EmptyState
        title="No services yet"
        text="Add your first service to start getting bookings."
        action={
          <Link href="/dashboard/vendor/services/new" className={buttonVariants()}>
            Add Service
          </Link>
        }
      />
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((s) => (
              <TableRow key={s._id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.images[0]} alt="" className="size-12 rounded-md object-cover" />
                    <div className="min-w-0">
                      <p className="max-w-52 truncate font-medium">{s.serviceName}</p>
                      <p className="text-muted-foreground text-xs">{s.location}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm">{s.category}</TableCell>
                <TableCell className="text-sm">{money(s.price)}</TableCell>
                <TableCell>
                  <StatusBadge status={s.status} />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={s.isActive}
                    disabled={busyId === s._id}
                    onCheckedChange={(v) => toggleActive(s, v)}
                    aria-label="Toggle availability"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/dashboard/vendor/services/${s._id}/edit`}
                      className={buttonVariants({ variant: "outline", size: "icon" })}
                      aria-label="Edit"
                    >
                      <Pencil className="size-4" />
                    </Link>
                    <Button
                      variant="outline"
                      size="icon"
                      disabled={busyId === s._id}
                      onClick={() => setToDelete(s)}
                      aria-label="Delete"
                    >
                      <Trash2 className="text-destructive size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ConfirmDialog
        open={!!toDelete}
        onOpenChange={(o) => !o && setToDelete(null)}
        title="Delete this service?"
        description={`"${toDelete?.serviceName ?? ""}" will be removed permanently and its pending bookings will be cancelled.`}
        confirmLabel="Delete"
        cancelLabel="Keep it"
        onConfirm={confirmDelete}
      />
    </>
  );
}
