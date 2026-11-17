import Link from "next/link";
import { ArrowUpRight, Heart, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa6";
import { Logo } from "@/components/shared/Logo";

const EXPLORE = [
  { label: "Home", href: "/" },
  { label: "Browse Services", href: "/services" },
  { label: "Sign In", href: "/sign-in" },
  { label: "Create Account", href: "/sign-up" },
  { label: "Dashboard", href: "/dashboard" },
];

const CATEGORIES = [
  "Photography & Videography",
  "Wedding Venues",
  "Decoration & Florist",
  "Catering Services",
  "Makeup & Styling",
  "Wedding Fashion",
];

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com", icon: FaInstagram },
  { label: "Pinterest", href: "https://pinterest.com", icon: FaPinterestP },
  { label: "Facebook", href: "https://facebook.com", icon: FaFacebookF },
];

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center text-xs font-medium text-muted-foreground transition-all duration-300 hover:gap-2 hover:text-foreground"
    >
      <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-3" />
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/10 bg-background">
      {/* soft glow */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4">
        {/* CTA card */}
        <div className="-translate-y-1/2">
          <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/15 via-background to-primary/5 px-6 py-10 text-center shadow-xl backdrop-blur-md sm:px-12">
            <Heart className="absolute -right-5 -top-5 size-28 rotate-12 text-primary/10" />
            <Heart className="absolute -bottom-6 -left-5 size-24 -rotate-12 text-primary/10" />

            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-primary">
              Your story starts here
            </p>
            <h2 className="mx-auto mt-3 max-w-xl text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
              Let&apos;s plan a day you&apos;ll never forget.
            </h2>

            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/services"
                className="inline-flex h-8 items-center gap-1.5 rounded-md bg-primary px-4 text-xs font-medium text-primary-foreground shadow-[0_0_20px_-4px] shadow-primary/70 transition-transform hover:scale-[1.03]"
              >
                Explore Services
                <ArrowUpRight className="size-3.5" />
              </Link>
              <Link
                href="/sign-up"
                className="inline-flex h-8 items-center rounded-md border border-white/10 px-4 text-xs font-medium transition-colors hover:bg-accent"
              >
                Join as a Vendor
              </Link>
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="-mt-6 grid gap-10 pb-12 lg:grid-cols-12">
          {/* Brand + contact */}
          <div className="space-y-5 lg:col-span-5">
            <Logo />
            <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">
              Curating extraordinary wedding venues, photographers, florists,
              caterers, and bridal stylists so couples can plan unforgettable
              celebrations with confidence.
            </p>

            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Say hello
              </p>
              <a
                href="mailto:concierge@wedora.com"
                className="mt-1 inline-block text-xl font-semibold tracking-tight underline decoration-primary/40 decoration-1 underline-offset-8 transition-colors hover:text-primary sm:text-2xl"
              >
                concierge@wedora.com
              </a>
            </div>

            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex items-center gap-2.5">
                <Phone className="size-3.5 text-primary" />
                <a
                  href="tel:+14158904321"
                  className="transition-colors hover:text-foreground"
                >
                  +8801711223344
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="size-3.5 text-primary" />
                540 Union Square, San Francisco, CA
              </li>
            </ul>

            <div className="flex items-center gap-2">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-8 items-center justify-center rounded-md border border-white/10 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon className="size-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-7 lg:pl-10">
            <div>
              <h3 className="mb-4 text-sm font-semibold">Explore</h3>
              <ul className="space-y-3">
                {EXPLORE.map((l) => (
                  <li key={l.href}>
                    <FooterLink href={l.href}>{l.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold">Categories</h3>
              <ul className="space-y-3">
                {CATEGORIES.map((c) => (
                  <li key={c}>
                    <FooterLink
                      href={`/services?category=${encodeURIComponent(c)}`}
                    >
                      {c}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
          <Heart className="size-3.5 fill-primary text-primary" />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between gap-1.5 py-5 text-center text-[11px] text-muted-foreground sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} Wedora Wedding Planning Platform. All
            rights reserved.
          </p>
          <p>Crafted for couples &amp; verified wedding artisans worldwide.</p>
        </div>
      </div>

      {/* Faded wordmark */}
      <div
        aria-hidden
        className="pointer-events-none select-none overflow-hidden text-center"
      >
        <span className="block bg-gradient-to-b from-foreground/15 to-transparent bg-clip-text text-[20vw] font-bold leading-[0.8] tracking-tight text-transparent lg:text-[11rem]">
          Wedora
        </span>
      </div>
    </footer>
  );
}