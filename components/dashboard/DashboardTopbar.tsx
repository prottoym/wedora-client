"use client";

import { Menu } from "lucide-react";
import { ROLE_LABEL, type Role } from "@/lib/dashboard-nav";

type Props = {
  role: Role;
  user?: unknown; // ager version er jonno, ekhon use hoy na
  onMenuClick: () => void;
};

export function DashboardTopbar({ role, onMenuClick }: Props) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center border-b border-border bg-background/70 px-4 backdrop-blur-md">
      <button
        type="button"
        aria-label="Open menu"
        onClick={onMenuClick}
        className="rounded-md p-2 text-muted-foreground hover:bg-accent md:hidden"
      >
        <Menu className="size-5" />
      </button>

      <p className="text-sm text-muted-foreground md:ml-0 ml-2">
        {ROLE_LABEL[role]} dashboard
      </p>
    </header>
  );
}
