"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Crown, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import BookingForm from "@/components/services/BookingForm";
import { useFetch } from "@/hooks/useFetch";
import { money } from "@/lib/format";
import type { Service } from "@/types/service";

type Res = { service: Service } | Service;

export default function ServiceDetails({ id }: { id: string }) {
  const { data, error, loading } = useFetch<Res>(`/api/services/${id}`, true);
  const [active, setActive] = useState(0);

  if (loading && !data) {
    return (
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <Skeleton className="aspect-4/3 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-xl border p-10 text-center">
        <p className="font-medium">{error || "Service not found"}</p>
        <Link href="/services" className={buttonVariants({ className: "mt-4" })}>
          Back to services
        </Link>
      </div>
    );
  }

  const service: Service = "service" in data ? data.service : data;
  const vendorName = service.vendor?.businessName || service.vendor?.name;
  const premium = service.vendor?.subscriptionPlan === "premium";

  return (
    <div className="space-y-6">
      <Link href="/services" className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm">
        <ArrowLeft className="size-4" /> All services
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4">
          <div className="aspect-4/3 overflow-hidden rounded-xl border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={service.images[active] ?? service.images[0]}
              alt={service.serviceName}
              className="h-full w-full object-cover"
            />
          </div>
          {service.images.length > 1 && (
            <div className="grid grid-cols-5 gap-2 sm:grid-cols-6">
              {service.images.map((url, i) => (
                <button
                  key={url}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 ${
                    i === active ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`Show image ${i + 1}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}

          <div className="space-y-3 pt-2">
            <h2 className="text-lg font-semibold">About this service</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{service.description}</p>
          </div>
        </div>

        <aside className="space-y-5">
          <div className="space-y-3 rounded-xl border p-5">
            <Badge variant="secondary">{service.category}</Badge>
            <h1 className="text-2xl font-semibold tracking-tight">{service.serviceName}</h1>
            <p className="text-muted-foreground inline-flex items-center gap-1 text-sm">
              <MapPin className="size-4" /> {service.location}
            </p>
            <p className="text-primary text-3xl font-semibold">{money(service.price)}</p>

            {vendorName && (
              <div className="flex items-center gap-3 border-t pt-4">
                {service.vendor?.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={service.vendor.image} alt="" className="size-10 rounded-full object-cover" />
                ) : (
                  <div className="bg-muted flex size-10 items-center justify-center rounded-full font-medium">
                    {vendorName[0]?.toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{vendorName}</p>
                  {premium ? (
                    <span className="inline-flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
                      <Crown className="size-3" /> Premium Vendor
                    </span>
                  ) : (
                    <span className="text-muted-foreground text-xs">Vendor</span>
                  )}
                </div>
              </div>
            )}
          </div>

          <BookingForm serviceId={service._id} />
        </aside>
      </div>
    </div>
  );
}
