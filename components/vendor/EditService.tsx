"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useFetch } from "@/hooks/useFetch";
import ServiceForm from "@/components/vendor/ServiceForm";
import type { Service } from "@/types/service";

export default function EditService({ id }: { id: string }) {
  const { data, error } = useFetch<{ service: Service }>(`/api/vendor/services/${id}`, true);

  if (error) return <p className="text-destructive text-sm">{error}</p>;
  if (!data) return <Skeleton className="h-96 max-w-2xl" />;
  return <ServiceForm service={data.service} />;
}
