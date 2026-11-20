"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EmptyState from "@/components/shared/EmptyState";
import NativeSelect from "@/components/shared/NativeSelect";
import Pagination from "@/components/shared/Pagination";
import { ServiceGrid, ServiceGridSkeleton } from "@/components/services/ServiceGrid";
import { useDebounce } from "@/hooks/useDebounce";
import { useFetch } from "@/hooks/useFetch";
import { CATEGORIES } from "@/lib/service-constants";
import type { Paged, Service } from "@/types/service";

const LIMIT = 9;
const SORTS = [
  { value: "latest", label: "Newest first" },
  { value: "price_asc", label: "Price: low to high" },
  { value: "price_desc", label: "Price: high to low" },
];

type ListResponse = Paged & { services: Service[] };


export default function BrowseServices() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const category = sp.get("category") ?? "";
  const sort = sp.get("sort") ?? "latest";
  const page = Math.max(parseInt(sp.get("page") ?? "1", 10) || 1, 1);
  const urlSearch = sp.get("search") ?? "";
  const urlLocation = sp.get("location") ?? "";

  const [search, setSearch] = useState(urlSearch);
  const [location, setLocation] = useState(urlLocation);
  const dSearch = useDebounce(search);
  const dLocation = useDebounce(location);

  function update(changes: Record<string, string>, resetPage = true) {
    const next = new URLSearchParams(sp.toString());
    for (const [k, v] of Object.entries(changes)) {
      if (v && !(k === "sort" && v === "latest") && !(k === "page" && v === "1")) next.set(k, v);
      else next.delete(k);
    }
    if (resetPage && !("page" in changes)) next.delete("page");
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

 
  useEffect(() => {
    if (dSearch !== urlSearch) update({ search: dSearch });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dSearch]);
  useEffect(() => {
    if (dLocation !== urlLocation) update({ location: dLocation });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dLocation]);

  const qs = new URLSearchParams({ sort, page: String(page), limit: String(LIMIT) });
  if (urlSearch) qs.set("search", urlSearch);
  if (urlLocation) qs.set("location", urlLocation);
  if (category) qs.set("category", category);

  const { data, error, loading } = useFetch<ListResponse>(`/api/services?${qs.toString()}`);
  const hasFilter = !!(urlSearch || urlLocation || category || sort !== "latest");

  function clearAll() {
    setSearch("");
    setLocation("");
    router.replace(pathname, { scroll: false });
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-3 rounded-xl border p-4 md:grid-cols-[2fr_1.3fr_1.3fr_1.3fr_auto]">
        <div className="relative">
          <Search className="text-muted-foreground absolute top-2.5 left-3 size-4" />
          <Input
            className="pl-9"
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search services"
          />
        </div>
        <NativeSelect
          value={category}
          onChange={(e) => update({ category: e.target.value })}
          aria-label="Category"
        >
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </NativeSelect>
        <Input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          aria-label="Location"
        />
        <NativeSelect value={sort} onChange={(e) => update({ sort: e.target.value })} aria-label="Sort by price">
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </NativeSelect>
        <Button variant="outline" onClick={clearAll} disabled={!hasFilter && !search && !location}>
          <X className="size-4" /> Clear
        </Button>
      </div>

      {error ? (
        <p className="text-destructive text-sm">{error}</p>
      ) : loading && !data ? (
        <ServiceGridSkeleton count={LIMIT} />
      ) : data && data.services.length === 0 ? (
        <EmptyState
          title="No services found"
          text="Try a different keyword, category or location."
          action={
            <Button variant="outline" onClick={clearAll}>
              Clear filters
            </Button>
          }
        />
      ) : data ? (
        <div className={loading ? "opacity-60 transition-opacity" : "transition-opacity"}>
          <p className="text-muted-foreground mb-4 text-sm">
            {data.total} service{data.total === 1 ? "" : "s"} found
          </p>
          <ServiceGrid services={data.services} />
          <Pagination page={data.page} pages={data.pages} onChange={(p) => update({ page: String(p) }, false)} />
        </div>
      ) : null}
    </div>
  );
}
