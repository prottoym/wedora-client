import type { Metadata } from "next";
import ServiceDetails from "@/components/services/ServiceDetails";

export const metadata: Metadata = { title: "Service Details" };

// Private route: src/proxy.ts e /services/:id protected
export default async function ServiceDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <ServiceDetails id={id} />
    </section>
  );
}
