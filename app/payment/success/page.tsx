import { Suspense } from "react";
import type { Metadata } from "next";
import { PaymentStatus } from "@/components/payment/PaymentStatus";

export const metadata: Metadata = { title: "Payment Status | WedPlan" };

export default function PaymentSuccessPage() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-16">
      <Suspense>
        <PaymentStatus />
      </Suspense>
    </section>
  );
}