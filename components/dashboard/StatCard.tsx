import type { LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value = "—",
  icon: Icon,
}: {
  label: string;
  value?: React.ReactNode;
  icon: LucideIcon;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <Icon className="size-4 text-primary" />
      </div>
      <p className="mt-3 text-2xl font-semibold">{value}</p>
    </div>
  );
}