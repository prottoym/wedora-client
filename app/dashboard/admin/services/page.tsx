import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import ManageServices from "@/components/admin/ManageServices";
import TableSkeleton from "@/components/shared/TableSkeleton";

export const metadata: Metadata = { title: "Manage Services" };

export default function AdminServicesPage() {
  return (
    <>
      <PageHeader title="Services" description="Approve, reject or remove vendor services." />
      <Suspense fallback={<TableSkeleton />}>
        <ManageServices />
      </Suspense>
    </>
  );
}
