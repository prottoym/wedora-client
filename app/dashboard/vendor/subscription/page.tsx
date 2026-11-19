import type { Metadata } from "next";
import { PageHeader } from "@/components/dashboard/PageHeader";
import SubscriptionPanel from "@/components/vendor/SubscriptionPanel";

export const metadata: Metadata = { title: "Subscription" };

export default function VendorSubscriptionPage() {
  return (
    <>
      <PageHeader title="Subscription" description="Choose the plan that fits your business." />
      <SubscriptionPanel />
    </>
  );
}
