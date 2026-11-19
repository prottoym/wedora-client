"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";

/** Role layout e wrap kora hoy. Server o alada kore role check kore. */
export default function RequireRole({ role, children }: { role: string; children: ReactNode }) {
  const { data, isPending } = useSession();
  if (isPending) return null;

  const current = (data?.user as { role?: string } | undefined)?.role;
  if (current !== role) {
    return (
      <div className="rounded-xl border p-10 text-center">
        <p className="font-medium">You don&apos;t have access to this page</p>
        <p className="text-muted-foreground mt-1 text-sm">This area is only for {role} accounts.</p>
        <Link href="/dashboard" className={buttonVariants({ className: "mt-4" })}>
          Go to my dashboard
        </Link>
      </div>
    );
  }
  return <>{children}</>;
}
