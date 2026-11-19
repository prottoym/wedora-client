import type { Metadata } from "next";
import { Suspense } from "react";
import BrowseServices from "@/components/services/BrowseServices";
import { ServiceGridSkeleton } from "@/components/services/ServiceGrid";

export const metadata: Metadata = { title: "Browse Services" };

export default function ServicesPage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Browse wedding services</h1>
        <p className="text-muted-foreground mt-2">
          Find photographers, venues, caterers and more from trusted vendors.
        </p>
      </div>
      <Suspense fallback={<ServiceGridSkeleton />}>
        <BrowseServices />
      </Suspense>
    </section>
  );
}
