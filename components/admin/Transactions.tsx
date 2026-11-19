"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EmptyState from "@/components/shared/EmptyState";
import NativeSelect from "@/components/shared/NativeSelect";
import Pagination from "@/components/shared/Pagination";
import StatusBadge from "@/components/shared/StatusBadge";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { useFetch } from "@/hooks/useFetch";
import { dateFmt, moneyCents } from "@/lib/format";
import type { Transaction } from "@/types/admin";
import type { Paged } from "@/types/service";

export default function Transactions() {
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const qs = new URLSearchParams({ page: String(page), limit: "10" });
  if (status) qs.set("status", status);

  const { data, error, loading } = useFetch<Paged & { transactions: Transaction[] }>(
    `/api/admin/transactions?${qs}`,
    true,
  );

  return (
    <div className="space-y-5">
      <div className="max-w-52">
        <NativeSelect
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          aria-label="Status"
        >
          <option value="">All statuses</option>
          <option value="paid">Paid</option>
          <option value="failed">Failed</option>
        </NativeSelect>
      </div>

      {error ? (
        <p className="text-destructive text-sm">{error}</p>
      ) : loading && !data ? (
        <TableSkeleton />
      ) : !data?.transactions.length ? (
        <EmptyState title="No transactions yet" text="Premium payments will be listed here." />
      ) : (
        <>
          <div className="overflow-x-auto rounded-xl border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Stripe session</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.transactions.map((t) => (
                  <TableRow key={t._id}>
                    <TableCell>
                      <p className="text-sm font-medium">{t.vendor?.businessName || t.vendor?.name || "—"}</p>
                      <p className="text-muted-foreground text-xs">{t.vendor?.email}</p>
                    </TableCell>
                    <TableCell className="capitalize">{t.plan}</TableCell>
                    <TableCell>{moneyCents(t.amount ?? 0)}</TableCell>
                    <TableCell>
                      <StatusBadge status={t.status} />
                    </TableCell>
                    <TableCell className="text-sm">{dateFmt(t.createdAt)}</TableCell>
                    <TableCell className="text-muted-foreground font-mono text-xs">
                      {t.stripeSessionId.slice(0, 18)}…
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Pagination page={data.page} pages={data.pages} onChange={setPage} />
        </>
      )}
    </div>
  );
}
