import type { Metadata } from "next";
import { PageHeader } from "@/components/dashboard/PageHeader";
import ServiceForm from "@/components/vendor/ServiceForm";

export const metadata: Metadata = { title: "Add Service" };

export default function NewServicePage() {
  return (
    <>
      <PageHeader title="Add Service" description="New services go live after admin approval." />
      <ServiceForm />
    </>
  );
}
