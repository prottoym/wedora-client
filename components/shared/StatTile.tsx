import { Skeleton } from "@/components/ui/skeleton";

export type Tile = { label: string; value: string | number; hint?: string };

export function StatTiles({ items }: { items: Tile[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((it) => (
        <div key={it.label} className="rounded-xl border p-4">
          <p className="text-muted-foreground text-sm">{it.label}</p>
          <p className="mt-1 text-3xl font-semibold">{it.value}</p>
          {it.hint && <p className="text-muted-foreground mt-1 text-xs">{it.hint}</p>}
        </div>
      ))}
    </div>
  );
}

export function StatTilesSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-24" />
      ))}
    </div>
  );
}
