import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

async function RoleRedirect() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");
  redirect(`/dashboard/${session.user.role}`);
}

export default function DashboardIndex() {
  return (
    <Suspense fallback={null}>
      <RoleRedirect />
    </Suspense>
  );
}