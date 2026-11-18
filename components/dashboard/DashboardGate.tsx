import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { isRole } from "@/lib/dashboard-nav";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { BlockedNotice } from "@/components/dashboard/BlockedNotice";

export async function DashboardGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // Temporary debug line
  console.log(
    "[dashboard gate]",
    session
      ? {
          email: session.user.email,
          role: session.user.role,
          blocked: session.user.isBlocked,
        }
      : "NO SESSION",
  );

  // Session check
  if (!session) redirect("/sign-in?redirect=/dashboard");

  const { user } = session;

  // Blocked user check
  if (user.isBlocked) return <BlockedNotice />;

  // Invalid role check
  if (!isRole(user.role)) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4 text-center text-sm text-muted-foreground">
        This account has no role assigned (role: {String(user.role)}).
        Please sign out and register a new account, or contact support.
      </div>
    );
  }

  // Vendor information
  const isVendor = user.role === "vendor";
  const plan = user.subscriptionPlan ?? "free";

  return (
    <DashboardShell
      role={user.role}
      user={{
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
      }}
      badge={
        isVendor
          ? plan.charAt(0).toUpperCase() + plan.slice(1)
          : undefined
      }
      subtitle={
        isVendor
          ? user.businessName || user.name
          : user.email
      }
    >
      {children}
    </DashboardShell>
  );
}
