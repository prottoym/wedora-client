import type { Metadata } from "next";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { ComingSoon } from "@/components/dashboard/ComingSoon";

export const metadata: Metadata = { title: "My Services" };

export default function VendorServicesPage() {
  return (
    <>
      <PageHeader title="My Services" description="Services you have published and their approval status." />
      <ComingSoon message="Your services will appear here once the server is connected." />
    </>
  );
}