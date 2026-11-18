
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, MapPin, ArrowRight } from "lucide-react";

type Service = {
  _id: string;
  serviceName: string;
  category: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  status: string;
  isActive?: boolean;
  vendor?: {
    name?: string;
    businessName?: string;
    image?: string;
  };
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchServices() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/services");

        if (!response.ok) {
          throw new Error("Failed to load services.");
        }

        const data = await response.json();

        const list = Array.isArray(data)
          ? data
          : data.services ?? data.data ?? [];

        setServices(
          list.filter(
            (service: Service) =>
              service.status?.toLowerCase() === "approved" &&
              service.isActive !== false
          )
        );
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  const categories = useMemo(
    () => [...new Set(services.map((s) => s.category).filter(Boolean))],
    [services]
  );

  const locations = useMemo(
    () => [...new Set(services.map((s) => s.location).filter(Boolean))],
    [services]
  );

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch = service.serviceName
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "all" || service.category === category;

      const matchesLocation =
        location === "all" || service.location === location;

      return matchesSearch && matchesCategory && matchesLocation;
    });
  }, [services, search, category, location]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-12">
      {/* Heading */}
      <div className="mb-10 text-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          Find Your Perfect Wedding Services
        </p>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Explore Wedding Services
        </h1>

        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          Discover trusted wedding vendors and find everything
          you need to make your special day unforgettable.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 grid gap-3 rounded-2xl border border-border bg-card p-4 md:grid-cols-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search services..."
            className="h-11 w-full rounded-lg border border-border bg-background pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Locations</option>
          {locations.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Results */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Available Services</h2>
        <p className="text-xs text-muted-foreground">
          {filteredServices.length} services found
        </p>
      </div>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-80 animate-pulse rounded-2xl bg-muted"
            />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-xl border border-destructive/30 p-10 text-center">
          <p className="text-sm text-destructive">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 text-sm font-medium text-primary"
          >
            Try Again
          </button>
        </div>
      ) : filteredServices.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border py-20 text-center">
          <Search className="mx-auto size-10 text-muted-foreground" />
          <h3 className="mt-4 font-semibold">No services found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Try changing your search or filters.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => (
            <article
              key={service._id}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden bg-muted">
                {service.images?.[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={service.images[0]}
                    alt={service.serviceName}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    No Image Available
                  </div>
                )}

                <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-medium">
                  {service.category}
                </span>
              </div>

              {/* Content */}
              <div className="space-y-3 p-5">
                <div>
                  <h3 className="line-clamp-1 text-lg font-semibold">
                    {service.serviceName}
                  </h3>

                  <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="size-3.5" />
                    {service.location}
                  </p>
                </div>

                <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                <div className="flex items-center justify-between border-t border-border pt-4">
                  <div>
                    <p className="text-[10px] text-muted-foreground">
                      Starting Price
                    </p>
                    <p className="font-semibold text-primary">
                      {formatPrice(service.price)}
                    </p>
                  </div>

                  <Link
                    href={`/services/${service._id}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    View Details
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>

                <p className="text-xs text-muted-foreground">
                  Offered by{" "}
                  {service.vendor?.businessName ||
                    service.vendor?.name ||
                    "Wedding Vendor"}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
