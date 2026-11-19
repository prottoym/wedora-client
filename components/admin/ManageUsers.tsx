"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
import TableSkeleton from "@/components/shared/TableSkeleton";
import { useDebounce } from "@/hooks/useDebounce";
import { useFetch } from "@/hooks/useFetch";
import { apiFetch } from "@/lib/api";
import { dateFmt } from "@/lib/format";
import type { AdminUser } from "@/types/admin";
import type { Paged } from "@/types/service";

export default function ManageUsers() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [page, setPage] = useState(1);
  const dSearch = useDebounce(search);

  const qs = new URLSearchParams({ page: String(page), limit: "10" });
  if (dSearch) qs.set("search", dSearch);
  if (role) qs.set("role", role);

  const { data, setData, error, loading } = useFetch<Paged & { users: AdminUser[] }>(
    `/api/admin/users?${qs}`,
    true,
  );
  const [target, setTarget] = useState<AdminUser | null>(null);

  async function toggleBlock() {
    if (!target) return;
    const u = target;
    const next = !u.isBlocked;
    setTarget(null);
    try {
      await apiFetch(`/api/admin/users/${u._id}/block`, { method: "PATCH", auth: true, body: { isBlocked: next } });
      setData((d) =>
        d ? { ...d, users: d.users.map((x) => (x._id === u._id ? { ...x, isBlocked: next } : x)) } : d,
      );
      toast.success(next ? "User blocked" : "User unblocked");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Update failed");
    }
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-[1fr_200px]">
        <div className="relative">
          <Search className="text-muted-foreground absolute top-2.5 left-3 size-4" />
          <Input
            className="pl-9"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <NativeSelect
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
            setPage(1);
          }}
          aria-label="Role"
        >
          <option value="">All roles</option>
          <option value="customer">Customers</option>
          <option value="vendor">Vendors</option>
          <option value="admin">Admins</option>
        </NativeSelect>
      </div>

      {error ? (
        <p className="text-destructive text-sm">{error}</p>
      ) : loading && !data ? (
        <TableSkeleton />
      ) : !data?.users.length ? (
        <EmptyState title="No users found" />
      ) : (
        <>
          <div className="overflow-x-auto rounded-xl border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.users.map((u) => (
                  <TableRow key={u._id}>
                    <TableCell>
                      <p className="font-medium">{u.name}</p>
                      <p className="text-muted-foreground text-xs">{u.email}</p>
                    </TableCell>
                    <TableCell className="capitalize">{u.role}</TableCell>
                    <TableCell className="capitalize">
                      {u.role === "vendor" ? (u.subscriptionPlan ?? "free") : "—"}
                    </TableCell>
                    <TableCell className="text-sm">{dateFmt(u.createdAt)}</TableCell>
                    <TableCell>
                      {u.isBlocked ? (
                        <Badge variant="secondary" className="bg-red-500/15 text-red-600 dark:text-red-400">
                          Blocked
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                          Active
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {u.role === "admin" ? (
                        <span className="text-muted-foreground text-xs">Protected</span>
                      ) : (
                        <Button size="sm" variant="outline" onClick={() => setTarget(u)}>
                          {u.isBlocked ? "Unblock" : "Block"}
                        </Button>
                      )}
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
        open={!!target}
        onOpenChange={(o) => !o && setTarget(null)}
        title={target?.isBlocked ? "Unblock this user?" : "Block this user?"}
        description={
          target?.isBlocked
            ? `${target?.name} will be able to sign in again.`
            : `${target?.name} will be signed out and cannot use the platform until unblocked.`
        }
        confirmLabel={target?.isBlocked ? "Unblock" : "Block"}
        onConfirm={toggleBlock}
      />
    </div>
  );
}
