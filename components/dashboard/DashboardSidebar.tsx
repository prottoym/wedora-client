"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NAV,
  ROLE_LABEL,
  PORTAL_TITLE,
  type Role,
} from "@/lib/dashboard-nav";
import { Logo } from "@/components/shared/Logo";

type Props = {
  role: Role;
  badge?: string;
  subtitle?: string;
  onNavigate?: () => void;
};

export function DashboardSidebar({
  role,
  badge,
  subtitle,
  onNavigate,
}: Props) {
  const pathname = usePathname();
  const items = NAV[role];

  // Find the longest matching link for accurate active navigation
  const activeHref = [...items]
    .sort((a, b) => b.href.length - a.href.length)
    .find(
      (item) =>
        pathname === item.href ||
        pathname.startsWith(`${item.href}/`),
    )?.href;

  return (
    <div className="flex h-full flex-col gap-5 p-4">
      {/* Logo and Role Label */}
      <div className="flex items-center justify-between gap-2 px-2">
        <Logo />

        <span className="shrink-0 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-primary">
          {ROLE_LABEL[role]}
        </span>
      </div>

      {/* Workspace Information */}
      <div className="rounded-xl border border-border bg-card p-3">
        <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
          Workspace
        </p>

        <div className="mt-1 flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">
            {PORTAL_TITLE[role]}
          </h2>

          {badge && (
            <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {badge}
            </span>
          )}
        </div>

        {subtitle && (
          <p className="truncate text-xs text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-row gap-1 overflow-x-auto pb-1 md:flex-col md:overflow-x-visible md:overflow-y-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const active = item.href === activeHref;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex shrink-0 items-center gap-3 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-primary font-medium text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Back to Website */}
      <Link
        href="/"
        onClick={onNavigate}
        className="flex shrink-0 items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to website
      </Link>
    </div>
  );
}
