"use client";

import { Menu } from "lucide-react";
import { ROLE_LABEL, type Role } from "@/lib/dashboard-nav";
import { UserMenu } from "@/components/layout/UserMenu";

type Props = {
  role: Role;
  user: { name: string; email: string; image?: string | null; role: string };
  onMenuClick: () => void;
};

export function DashboardTopbar({ role, user, onMenuClick }: Props) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/70 px-4 backdrop-blur-md">
      <button
        type="button"
        aria-label="Open menu"
        onClick={onMenuClick}
        className="rounded-md p-2 text-muted-foreground hover:bg-accent md:hidden"
      >
        <Menu className="size-5" />
      </button>
      <p className="hidden text-sm text-muted-foreground md:block">{ROLE_LABEL[role]} dashboard</p>
      <UserMenu user={user} />
    </header>
  );
}