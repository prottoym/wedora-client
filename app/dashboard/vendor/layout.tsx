import { Suspense } from "react";
import { RoleGuard } from "@/components/dashboard/RoleGuard";

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <RoleGuard role="vendor">{children}</RoleGuard>
    </Suspense>
  );
}