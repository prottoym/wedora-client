import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import MyServices from "@/components/vendor/MyServices";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = { title: "My Services" };

export default function VendorServicesPage() {
  return (
    <>
      <PageHeader title="My Services" description="Manage your listings and availability." />
      <div className="mb-4 flex justify-end">
        <Link href="/dashboard/vendor/services/new" className={buttonVariants()}>
          <Plus className="mr-1 size-4" /> Add Service
        </Link>
      </div>
      <MyServices />
    </>
  );
}
