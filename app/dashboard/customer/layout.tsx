import type { ReactNode } from "react";
import RequireRole from "@/components/dashboard/RequireRole";

export default function CustomerLayout({ children }: { children: ReactNode }) {
  return <RequireRole role="customer">{children}</RequireRole>;
}
