import type { Metadata } from "next";
import { Briefcase, CalendarCheck, Clock, Eye } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { PlanStat } from "@/components/vendor/PlanStat";

export const metadata: Metadata = { title: "Vendor Overview" };

export default function VendorOverviewPage() {
  return (
    <>
      <PageHeader title="Overview" description="A quick look at your services and bookings." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Total Services" icon={Briefcase} />
        <StatCard label="Active Services" icon={Eye} />
        <StatCard label="Pending Requests" icon={Clock} />
        <StatCard label="Accepted Bookings" icon={CalendarCheck} />
        <PlanStat />
      </div>
    </>
  );
}