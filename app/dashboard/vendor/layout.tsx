import type { ReactNode } from "react";
import RequireRole from "@/components/dashboard/RequireRole";

export default function VendorLayout({ children }: { children: ReactNode }) {
  return <RequireRole role="vendor">{children}</RequireRole>;
}
