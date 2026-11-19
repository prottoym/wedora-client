import type { Metadata } from "next";
import { PageHeader } from "@/components/dashboard/PageHeader";
import Transactions from "@/components/admin/Transactions";

export const metadata: Metadata = { title: "Transactions" };

export default function AdminTransactionsPage() {
  return (
    <>
      <PageHeader title="Transactions" description="Premium subscription payments (read-only)." />
      <Transactions />
    </>
  );
}
