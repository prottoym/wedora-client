"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { Role } from "@/lib/dashboard-nav";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";

type Props = {
  role: Role;
  user: {
    name: string;
    email: string;
    image?: string | null;
    role: string;
  };
  badge?: string;
  subtitle: string;
  children: React.ReactNode;
};

export function DashboardShell({
  role,
  user,
  badge,
  subtitle,
  children,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen md:grid md:grid-cols-[17rem_1fr]">
      {/* Desktop Sidebar */}
      <aside className="sticky top-0 hidden h-screen border-r border-border bg-card/40 md:block">
        <DashboardSidebar
          role={role}
          badge={badge}
          subtitle={subtitle}
        />
      </aside>

      {/* Mobile Sidebar */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />

          <aside className="absolute inset-y-0 left-0 w-[17rem] border-r border-border bg-background">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-4 rounded-md p-1 text-muted-foreground hover:bg-accent"
            >
              <X className="size-4" />
            </button>

            <DashboardSidebar
              role={role}
              badge={badge}
              subtitle={subtitle}
              onNavigate={() => setOpen(false)}
            />
          </aside>
        </div>
      )}

      {/* Main Dashboard */}
      <div className="flex min-w-0 flex-col">
        <DashboardTopbar
          role={role}
          user={user}
          onMenuClick={() => setOpen(true)}
        />

        <main className="min-w-0 flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
