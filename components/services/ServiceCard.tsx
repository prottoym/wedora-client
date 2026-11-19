import Link from "next/link";
import { Crown, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { money } from "@/lib/format";
import type { Service } from "@/types/service";

export default function ServiceCard({ service }: { service: Service }) {
  const vendorName = service.vendor?.businessName || service.vendor?.name;
  const premium = service.vendor?.subscriptionPlan === "premium";

  return (
    <Link
      href={`/services/${service._id}`}
      className="group bg-card block overflow-hidden rounded-xl border transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative aspect-4/3 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={service.images[0]}
          alt={service.serviceName}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <Badge className="absolute top-3 left-3" variant="secondary">
          {service.category}
        </Badge>
        {premium && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-amber-500 px-2 py-0.5 text-[11px] font-medium text-white">
            <Crown className="size-3" /> Premium
          </span>
        )}
      </div>
      <div className="space-y-2 p-4">
        <h3 className="line-clamp-1 font-semibold">{service.serviceName}</h3>
        {vendorName && <p className="text-muted-foreground line-clamp-1 text-sm">by {vendorName}</p>}
        <div className="flex items-center justify-between pt-1">
          <span className="text-muted-foreground inline-flex items-center gap-1 text-sm">
            <MapPin className="size-3.5" />
            {service.location}
          </span>
          <span className="text-primary font-semibold">{money(service.price)}</span>
        </div>
      </div>
    </Link>
  );
}
