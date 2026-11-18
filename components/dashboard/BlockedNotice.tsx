"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export function BlockedNotice() {
  const router = useRouter();

  async function logout() {
    await authClient.signOut();
    toast.success("Logged out");
    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-semibold">Your account is blocked</h1>
      <p className="max-w-md text-sm text-muted-foreground">
        An administrator has blocked this account, so you cannot use the dashboard. Please contact
        support if you think this is a mistake.
      </p>
      <Button onClick={logout}>Log out</Button>
    </div>
  );
}