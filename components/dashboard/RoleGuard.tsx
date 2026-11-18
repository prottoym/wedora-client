import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { isRole, type Role } from "@/lib/dashboard-nav";

export async function RoleGuard({ role, children }: { role: Role; children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/sign-in");

  const current = session.user.role;
  if (current !== role) redirect(isRole(current) ? `/dashboard/${current}` : "/sign-in");

  return <>{children}</>;
}
