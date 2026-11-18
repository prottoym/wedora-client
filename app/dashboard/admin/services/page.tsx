import type { Metadata } from "next";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { ComingSoon } from "@/components/dashboard/ComingSoon";

export const metadata: Metadata = { title: "Manage Services" };

export default function ManageServicesPage() {
  return (
    <>
      <PageHeader title="Manage Services" description="Approve, reject or remove submitted services." />
      <ComingSoon message="Service review comes in the admin step." />
    </>
  );
}