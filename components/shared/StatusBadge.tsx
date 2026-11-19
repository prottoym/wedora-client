import { Badge } from "@/components/ui/badge";

const STYLE: Record<string, string> = {
  pending: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  approved: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  accepted: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  paid: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  rejected: "bg-red-500/15 text-red-600 dark:text-red-400",
  failed: "bg-red-500/15 text-red-600 dark:text-red-400",
  cancelled: "bg-zinc-500/15 text-zinc-600 dark:text-zinc-400",
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <Badge variant="secondary" className={`capitalize ${STYLE[status] ?? ""}`}>
      {status}
    </Badge>
  );
}
