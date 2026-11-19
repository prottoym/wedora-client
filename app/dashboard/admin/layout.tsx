import type { ReactNode } from "react";
import RequireRole from "@/components/dashboard/RequireRole";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <RequireRole role="admin">{children}</RequireRole>;
}
