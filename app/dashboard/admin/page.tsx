import type { Metadata } from "next";
import { Briefcase, Clock, Receipt, ShieldCheck, Store, Users } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";

export const metadata: Metadata = { title: "Admin Overview" };

export default function AdminOverviewPage() {
  return (
    <>
      <PageHeader title="Overview" description="Platform numbers at a glance." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Registered Users" icon={Users} />
        <StatCard label="Vendors" icon={Store} />
        <StatCard label="Customers" icon={ShieldCheck} />
        <StatCard label="Total Services" icon={Briefcase} />
        <StatCard label="Pending Services" icon={Clock} />
        <StatCard label="Transactions" icon={Receipt} />
      </div>
    </>
  );
}