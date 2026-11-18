"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV, ROLE_LABEL, type Role } from "@/lib/dashboard-nav";
import { Logo } from "@/components/shared/Logo";

type Props = { role: Role; onNavigate?: () => void };

export function DashboardSidebar({ role, onNavigate }: Props) {
  const pathname = usePathname();
  const items = NAV[role];

  // the longest matching link wins, so "Add Service" does not also light up "My Services"
  const activeHref = [...items]
    .sort((a, b) => b.href.length - a.href.length)
    .find((i) => pathname === i.href || pathname.startsWith(`${i.href}/`))?.href;

  return (
    <div className="flex h-full flex-col gap-6 p-4">
      <div className="flex items-center justify-between px-2">
        <Logo />
        <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-primary">
          {ROLE_LABEL[role]}
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = item.href === activeHref;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-primary/15 font-medium text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Link
        href="/"
        onClick={onNavigate}
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to website
      </Link>
    </div>
  );
}