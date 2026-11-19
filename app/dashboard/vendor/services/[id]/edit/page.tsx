import type { Metadata } from "next";
import { PageHeader } from "@/components/dashboard/PageHeader";
import EditService from "@/components/vendor/EditService";

export const metadata: Metadata = { title: "Edit Service" };

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <>
      <PageHeader title="Edit Service" description="Rejected services are re-reviewed after you edit them." />
      <EditService id={id} />
    </>
  );
}
