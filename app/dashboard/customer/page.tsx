import type { Metadata } from "next";
import { CalendarCheck, CircleCheck, CircleX, Clock } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";

export const metadata: Metadata = { title: "Customer Overview" };

export default function CustomerOverviewPage() {
  return (
    <>
      <PageHeader title="Overview" description="Your booking requests at a glance." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Booking Requests" icon={CalendarCheck} />
        <StatCard label="Pending" icon={Clock} />
        <StatCard label="Accepted" icon={CircleCheck} />
        <StatCard label="Rejected" icon={CircleX} />
      </div>
    </>
  );
}