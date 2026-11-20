"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";
import { moneyCents } from "@/lib/format";

type SessionRes = { status: "pending" | "paid" | "failed"; amount?: number };

/**
 * Premium activate .
 */
export default function PaymentResult() {
  const sessionId = useSearchParams().get("session_id");
  const [res, setRes] = useState<SessionRes>({ status: "pending" });
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    if (!sessionId) return;
    let alive = true;
    let tries = 0;

    async function poll() {
      try {
        const r = await apiFetch<SessionRes>(`/api/payments/session/${sessionId}`, { auth: true });
        if (!alive) return;
        setRes(r);
        if (r.status !== "pending") return;
      } catch {
        /*  try again */
      }
      if (++tries >= 15) return alive && setTimedOut(true);
      setTimeout(poll, 2000);
    }
    poll();
    return () => {
      alive = false;
    };
  }, [sessionId]);

  if (!sessionId) {
    return <Box icon={<XCircle className="size-10 text-red-500" />} title="Missing payment session" />;
  }

  if (res.status === "paid") {
    return (
      <Box
        icon={<CheckCircle2 className="size-10 text-emerald-500" />}
        title="Payment successful"
        text={`Welcome to Premium${res.amount ? ` · ${moneyCents(res.amount)} paid` : ""}. Your plan is now active.`}
      />
    );
  }
  if (res.status === "failed") {
    return <Box icon={<XCircle className="size-10 text-red-500" />} title="Payment failed" text="You were not charged. Please try again." />;
  }
  if (timedOut) {
    return (
      <Box
        icon={<Loader2 className="text-muted-foreground size-10" />}
        title="Still confirming your payment"
        text="This can take a minute. Your plan will update automatically once Stripe confirms."
      />
    );
  }
  return (
    <Box
      icon={<Loader2 className="text-primary size-10 animate-spin" />}
      title="Confirming your payment..."
      text="Please don't close this page."
    />
  );
}

function Box({ icon, title, text }: { icon: React.ReactNode; title: string; text?: string }) {
  return (
    <div className="mx-auto max-w-md rounded-xl border p-10 text-center">
      <div className="flex justify-center">{icon}</div>
      <h1 className="mt-4 text-xl font-semibold">{title}</h1>
      {text && <p className="text-muted-foreground mt-2 text-sm">{text}</p>}
      <Link href="/dashboard/vendor/subscription" className={buttonVariants({ className: "mt-6" })}>
        Go to subscription
      </Link>
    </div>
  );
}
