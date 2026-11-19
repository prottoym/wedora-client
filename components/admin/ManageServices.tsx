"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Check, Search, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import NativeSelect from "@/components/shared/NativeSelect";
import Pagination from "@/components/shared/Pagination";
import StatusBadge from "@/components/shared/StatusBadge";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { useDebounce } from "@/hooks/useDebounce";
import { useFetch } from "@/hooks/useFetch";
import { apiFetch } from "@/lib/api";
import { CATEGORIES } from "@/lib/service-constants";
import { money } from "@/lib/format";
import type { Paged, Service, ServiceStatus } from "@/types/service";

const TABS: { value: "" | ServiceStatus; label: string }[] = [
  { value: "", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

export default function ManageServices() {
  const initial = useSearchParams().get("status") as ServiceStatus | null; // overview theke ?status=pending
  const [status, setStatus] = useState<"" | ServiceStatus>(
    initial && ["pending", "approved", "rejected"].includes(initial) ? initial : "",
  );
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const dSearch = useDebounce(search);

  const qs = new URLSearchParams({ page: String(page), limit: "10" });
  if (status) qs.set("status", status);
  if (category) qs.set("category", category);
  if (dSearch) qs.set("search", dSearch);

  const { data, setData, error, loading, reload } = useFetch<Paged & { services: Service[] }>(
    `/api/admin/services?${qs}`,
    true,
  );
  const [busyId, setBusyId] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<Service | null>(null);

  async function setServiceStatus(s: Service, next: ServiceStatus) {
    setBusyId(s._id);
    try {
      await apiFetch(`/api/admin/services/${s._id}/status`, { method: "PATCH", auth: true, body: { status: next } });
      toast.success(`Service ${next}`);
      if (status) reload(); // filter tab e thakle list update
      else setData((d) => (d ? { ...d, services: d.services.map((x) => (x._id === s._id ? { ...x, status: next } : x)) } : d));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Update failed");
    } finally {
      setBusyId(null);
    }
  }

  async function confirmDelete() {
    if (!toDelete) return;
    const s = toDelete;
    setToDelete(null);
    setBusyId(s._id);
    try {
      await apiFetch(`/api/admin/services/${s._id}`, { method: "DELETE", auth: true });
      toast.success("Service deleted");
      reload();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <Button
            key={t.value || "all"}
            size="sm"
            variant={status === t.value ? "default" : "outline"}
            onClick={() => {
              setStatus(t.value);
              setPage(1);
            }}
          >
            {t.label}
          </Button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-[1fr_240px]">
        <div className="relative">
          <Search className="text-muted-foreground absolute top-2.5 left-3 size-4" />
          <Input
            className="pl-9"
            placeholder="Search by service name"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <NativeSelect
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          aria-label="Category"
        >
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </NativeSelect>
      </div>

      {error ? (
        <p className="text-destructive text-sm">{error}</p>
      ) : loading && !data ? (
        <TableSkeleton />
      ) : !data?.services.length ? (
        <EmptyState title="No services found" />
      ) : (
        <>
          <div className="overflow-x-auto rounded-xl border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.services.map((s) => (
                  <TableRow key={s._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={s.images[0]} alt="" className="size-12 rounded-md object-cover" />
                        <div className="min-w-0">
                          <p className="max-w-52 truncate font-medium">{s.serviceName}</p>
                          <p className="text-muted-foreground text-xs">{s.category}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{s.vendor?.businessName || s.vendor?.name}</p>
                      <p className="text-muted-foreground text-xs">{s.vendor?.email}</p>
                    </TableCell>
                    <TableCell className="text-sm">{money(s.price)}</TableCell>
                    <TableCell>
                      <StatusBadge status={s.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        {s.status !== "approved" && (
                          <Button
                            size="sm"
                            disabled={busyId === s._id}
                            onClick={() => setServiceStatus(s, "approved")}
                          >
                            <Check className="mr-1 size-4" /> Approve
                          </Button>
                        )}
                        {s.status !== "rejected" && (
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={busyId === s._id}
                            onClick={() => setServiceStatus(s, "rejected")}
                          >
                            <X className="mr-1 size-4" /> Reject
                          </Button>
                        )}
                        <Button
                          size="icon"
                          variant="outline"
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
          <Pagination page={data.page} pages={data.pages} onChange={setPage} />
        </>
      )}

      <ConfirmDialog
        open={!!toDelete}
        onOpenChange={(o) => !o && setToDelete(null)}
        title="Delete this service?"
        description={`"${toDelete?.serviceName ?? ""}" will be removed permanently and its pending bookings will be cancelled.`}
        confirmLabel="Delete"
        onConfirm={confirmDelete}
      />
    </div>
  );
}
