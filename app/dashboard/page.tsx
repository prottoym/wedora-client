import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

const ROLES = ["admin", "vendor", "customer"];

async function RoleRedirect(): Promise<null> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in?redirect=/dashboard");

  const role = String(session.user.role ?? "");
 
  redirect(ROLES.includes(role) ? `/dashboard/${role}` : "/sign-in");

  return null;
}

export default function DashboardIndex() {
  return (
    <Suspense fallback={null}>
      <RoleRedirect />
    </Suspense>
  );
}