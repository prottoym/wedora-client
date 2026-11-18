import type { Metadata } from "next";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { ComingSoon } from "@/components/dashboard/ComingSoon";

export const metadata: Metadata = { title: "Add Service" };

export default function AddServicePage() {
  return (
    <>
      <PageHeader title="Add Service" description="Publish a new wedding service." />
      <ComingSoon message="The add service form comes in the services step." />
    </>
  );
}