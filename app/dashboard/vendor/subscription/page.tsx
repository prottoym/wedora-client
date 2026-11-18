import type { Metadata } from "next";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { ComingSoon } from "@/components/dashboard/ComingSoon";

export const metadata: Metadata = { title: "Subscription" };

export default function SubscriptionPage() {
  return (
    <>
      <PageHeader title="Subscription" description="Free and Premium plans." />
      <ComingSoon message="Plans and Stripe checkout come in the payment step." />
    </>
  );
}