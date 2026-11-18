import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { DashboardGate } from "@/components/dashboard/DashboardGate";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <DashboardGate>{children}</DashboardGate>
    </Suspense>
  );
}