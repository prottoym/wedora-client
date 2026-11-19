import type { Metadata } from "next";
import Link from "next/link";
import { XCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = { title: "Payment cancelled" };

export default function PaymentCancelPage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-md rounded-xl border p-10 text-center">
        <XCircle className="mx-auto size-10 text-amber-500" />
        <h1 className="mt-4 text-xl font-semibold">Payment cancelled</h1>
        <p className="text-muted-foreground mt-2 text-sm">No charge was made. You can upgrade any time.</p>
        <Link href="/dashboard/vendor/subscription" className={buttonVariants({ className: "mt-6" })}>
          Back to subscription
        </Link>
      </div>
    </section>
  );
}
