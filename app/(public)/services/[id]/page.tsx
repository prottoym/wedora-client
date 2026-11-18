import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { ArrowLeft, BadgeCheck, MapPin, SearchX, TriangleAlert } from "lucide-react";
import { auth } from "@/lib/auth";
import { getService } from "@/lib/services-api";
import { formatPrice } from "@/lib/format";
import { ServiceGallery } from "@/components/services/ServiceGallery";
import { BookingForm } from "@/components/booking/BookingForm";

export const metadata: Metadata = { title: "Service Details | WedPlan" };

function ErrorState({ kind }: { kind: "invalid" | "notfound" | "failed" }) {
  const map = {
    invalid: {
      icon: SearchX,
      title: "Invalid service link",
      text: "This service ID is not valid. Please check the link and try again.",
    },
    notfound: {
      icon: SearchX,
      title: "Service not available",
      text: "This service does not exist or is no longer available for booking.",
    },
    failed: {
      icon: TriangleAlert,
      title: "Could not load this service",
      text: "Something went wrong. Please refresh the page and try again.",
    },
  }[kind];

  return (
    <section className="mx-auto max-w-md px-4 py-24 text-center">
      <map.icon className="mx-auto size-10 text-muted-foreground" />
      <h1 className="mt-4 text-xl font-semibold">{map.title}</h1>
      <p className="mt-2 text-xs text-muted-foreground">{map.text}</p>
      <Link
        href="/services"
        className="mt-6 inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80"
      >
        <ArrowLeft className="size-3.5" /> Back to all services
      </Link>
    </section>
  );
}

export default async function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { service, error } = await getService(id);

  if (error || !service) return <ErrorState kind={error ?? "failed"} />;

  let user: { id: string; role?: string; isBlocked?: boolean } | null = null;
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (session?.user) {
      user = {
        id: session.user.id,
        role: (session.user as { role?: string }).role,
        isBlocked: (session.user as { isBlocked?: boolean }).isBlocked,
      };
    }
  } catch {
    user = null;
  }

  let disabledReason: string | null = null;
  if (!user) disabledReason = "Please sign in to send a booking request.";
  else if (user.isBlocked) disabledReason = "Your account is blocked, so you cannot send booking requests.";
  else if (user.role === "admin") disabledReason = "Admin accounts cannot submit customer booking requests.";
  else if (user.id === service.vendorId) disabledReason = "You cannot book your own service.";

  const vendorName = service.vendor?.businessName || service.vendor?.name || "Wedding Vendor";
  const isPremium = service.vendor?.subscriptionPlan === "premium";

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <Link
        href="/services"
        className="mb-6 inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" /> Back to services
      </Link>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Left */}
        <div className="space-y-8 lg:col-span-3">
          <ServiceGallery images={service.images} name={service.serviceName} />

          <div>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-medium text-primary">
              {service.category}
            </span>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              {service.serviceName}
            </h1>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="size-3.5 text-primary" />
              {service.location}
            </div>

            <h2 className="mb-2 mt-8 text-sm font-semibold">About this service</h2>
            <p className="whitespace-pre-line text-xs leading-relaxed text-muted-foreground">
              {service.description}
            </p>
          </div>

          {/* Vendor */}
          <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-card p-4">
            {service.vendor?.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={service.vendor.image}
                alt={vendorName}
                className="size-12 rounded-full border border-white/10 object-cover"
              />
            ) : (
              <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {vendorName.charAt(0).toUpperCase()}
              </span>
            )}
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Offered by
              </p>
              <p className="flex items-center gap-1.5 text-sm font-semibold">
                {vendorName}
                {isPremium && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                    <BadgeCheck className="size-3" /> Premium Vendor
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Right: booking */}
        <aside className="lg:col-span-2">
          <div className="space-y-5 rounded-2xl border border-white/10 bg-card p-6 lg:sticky lg:top-20">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Starting price
              </p>
              <p className="text-3xl font-semibold">{formatPrice(service.price)}</p>
            </div>

            <div className="h-px bg-white/10" />

            <div>
              <h2 className="mb-4 text-sm font-semibold">Request a booking</h2>
              <BookingForm
                serviceId={service._id}
                role={user?.role ?? ""}
                disabledReason={disabledReason}
              />
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}