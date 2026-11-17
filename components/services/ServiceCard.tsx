import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Service } from "@/types";

export function ServiceCard({ service }: { service: Service }) {
  const image = service.images?.[0];
  const vendorName =
    service.vendor?.businessName || service.vendor?.name || "Wedding Vendor";
  const isPremium = service.vendor?.subscriptionPlan === "premium";

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {image && (
          <Image
            src={image}
            alt={service.serviceName}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <span className="absolute left-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-[10px] font-medium backdrop-blur">
          {service.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="line-clamp-1 text-sm font-semibold">
          {service.serviceName}
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="size-3.5 shrink-0 text-primary" />
          <span className="line-clamp-1">{service.location}</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="line-clamp-1">by {vendorName}</span>
          {isPremium && (
            <BadgeCheck
              className="size-3.5 shrink-0 text-primary"
              aria-label="Premium vendor"
            />
          )}
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <p className="text-sm font-semibold">
            ${service.price.toLocaleString("en-US")}
          </p>
          <Button
            size="sm"
            nativeButton={false}
            render={<Link href={`/services/${service._id}`} />}
            className="h-8 rounded-md px-3 text-xs"
          >
            View Details
          </Button>
        </div>
      </div>
    </article>
  );
}