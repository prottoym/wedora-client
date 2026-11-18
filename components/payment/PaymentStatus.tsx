"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, TriangleAlert, XCircle } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

type State = "checking" | "paid" | "failed" | "timeout" | "missing" | "error";

type SessionStatus = {
  status: "paid" | "pending" | "failed";
  plan?: string;
  amount?: number;
  currency?: string;
};

const MAX_TRIES = 10;

export function PaymentStatus() {
  const router = useRouter();
  const sessionId = useSearchParams().get("session_id");
  const [state, setState] = useState<State>(sessionId ? "checking" : "missing");
  const [info, setInfo] = useState<SessionStatus | null>(null);

  useEffect(() => {
    if (!sessionId) return;

    let cancelled = false;
    let tries = 0;

    async function check() {
      try {
        const data = await apiFetch<SessionStatus>(
          `/payments/session/${encodeURIComponent(sessionId!)}`,
        );
        if (cancelled) return;

        if (data.status === "paid") {
          setInfo(data);
          setState("paid");
          // navbar/session e notun plan dekhate
          await authClient.getSession({ query: { disableCookieCache: true } });
          router.refresh();
          return;
        }
        if (data.status === "failed") return setState("failed");
      } catch {
        if (cancelled) return;
        return setState("error");
      }

      tries += 1;
      if (tries >= MAX_TRIES) return setState("timeout");
      setTimeout(check, 2000);
    }

    check();
    return () => {
      cancelled = true;
    };
  }, [sessionId, router]);

  const view = {
    checking: {
      icon: <Loader2 className="size-10 animate-spin text-primary" />,
      title: "Confirming your payment...",
      text: "Please wait while we verify your payment with Stripe. Do not close this page.",
    },
    paid: {
      icon: <CheckCircle2 className="size-10 text-primary" />,
      title: "Payment successful!",
      text: "Your Premium subscription is now active. You can publish unlimited services.",
    },
    failed: {
      icon: <XCircle className="size-10 text-destructive" />,
      title: "Payment was not completed",
      text: "We could not confirm your payment. You have not been charged for Premium.",
    },
    timeout: {
      icon: <TriangleAlert className="size-10 text-muted-foreground" />,
      title: "Still verifying",
      text: "Your payment is taking longer than usual to confirm. Premium will activate automatically once it is verified. Check your subscription page in a few minutes.",
    },
    error: {
      icon: <TriangleAlert className="size-10 text-destructive" />,
      title: "Could not check payment",
      text: "Something went wrong while checking your payment. Please check your subscription page.",
    },
    missing: {
      icon: <TriangleAlert className="size-10 text-muted-foreground" />,
      title: "No payment found",
      text: "This page needs a valid payment session.",
    },
  }[state];

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-card p-8 text-center">
      <div className="mb-4 flex justify-center">{view.icon}</div>
      <h1 className="text-xl font-semibold">{view.title}</h1>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{view.text}</p>

      {state === "paid" && info?.amount != null && (
        <p className="mt-4 text-xs text-muted-foreground">
          Paid:{" "}
          <span className="font-semibold text-foreground">
            {(info.amount / 100).toFixed(2)} {info.currency?.toUpperCase()}
          </span>
        </p>
      )}

      {state !== "checking" && (
        <Button
          nativeButton={false}
          render={<Link href="/dashboard/vendor/subscription" />}
          className="mt-6 h-9 px-5 text-xs"
        >
          Go to Subscription
        </Button>
      )}
    </div>
  );
}