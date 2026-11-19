import type { Metadata } from "next";
import { Suspense } from "react";
import PaymentResult from "@/components/vendor/PaymentResult";

export const metadata: Metadata = { title: "Payment" };

export default function PaymentSuccessPage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6">
      <Suspense fallback={null}>
        <PaymentResult />
      </Suspense>
    </section>
  );
}
