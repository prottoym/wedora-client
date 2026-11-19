import type { Metadata } from "next";
import { PageHeader } from "@/components/dashboard/PageHeader";
import CustomerStats from "@/components/customer/CustomerStats";

export const metadata: Metadata = { title: "Customer Overview" };

export default function CustomerOverviewPage() {
  return (
    <>
      <PageHeader title="Overview" description="Track your booking requests." />
      <CustomerStats />
    </>
  );
}
