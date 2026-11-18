import type { Metadata } from "next";
import Link from "next/link";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Payment Cancelled | WedPlan" };

export default function PaymentCancelPage() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-16">
      <div className="w-full rounded-2xl border border-white/10 bg-card p-8 text-center">
        <XCircle className="mx-auto size-10 text-muted-foreground" />
        <h1 className="mt-4 text-xl font-semibold">Payment cancelled</h1>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          You cancelled the checkout, so no payment was made. Your plan has not
          changed. You can upgrade any time.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button
            nativeButton={false}
            render={<Link href="/dashboard/vendor/subscription" />}
            className="h-9 px-5 text-xs"
          >
            Try again
          </Button>
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="/" />}
            className="h-9 px-5 text-xs"
          >
            Go home
          </Button>
        </div>
      </div>
    </section>
  );
}