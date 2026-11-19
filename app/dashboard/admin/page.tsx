import type { Metadata } from "next";
import { PageHeader } from "@/components/dashboard/PageHeader";
import AdminStats from "@/components/admin/AdminStats";

export const metadata: Metadata = { title: "Admin Overview" };

export default function AdminOverviewPage() {
  return (
    <>
      <PageHeader title="Overview" description="Platform activity at a glance." />
      <AdminStats />
    </>
  );
}
