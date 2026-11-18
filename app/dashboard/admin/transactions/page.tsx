import type { Metadata } from "next";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { ComingSoon } from "@/components/dashboard/ComingSoon";

export const metadata: Metadata = { title: "Transactions" };

export default function TransactionsPage() {
  return (
    <>
      <PageHeader title="Transactions" description="Subscription payments on the platform." />
      <ComingSoon message="Transactions will appear here after Stripe is connected." />
    </>
  );
}