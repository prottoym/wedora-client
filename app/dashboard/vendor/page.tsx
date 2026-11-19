import type { Metadata } from "next";
import { PageHeader } from "@/components/dashboard/PageHeader";
import VendorStats from "@/components/vendor/VendorStats";

export const metadata: Metadata = { title: "Vendor Overview" };

export default function VendorOverviewPage() {
  return (
    <>
      <PageHeader title="Overview" description="Your services, requests and plan at a glance." />
      <VendorStats />
    </>
  );
}
