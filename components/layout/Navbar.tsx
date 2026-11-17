"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/shared/Logo";
import { UserMenu } from "@/components/layout/UserMenu";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Browse Services" },
];

export function Navbar() {
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Logo />

        {/* Desktop */}
        <nav className="hidden items-center gap-6 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-xs font-medium transition-colors hover:text-foreground",
                isActive(l.href) ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {l.label}
            </Link>
          ))}

          {isPending ? (
            <div className="h-8 w-28 animate-pulse rounded-md bg-muted" />
          ) : user ? (
            <UserMenu user={user} />
          ) : (
            <>
              <Link
                href="/sign-in"
                className="text-xs font-medium text-primary transition-colors hover:text-primary/80"
              >
                Sign In
              </Link>
              <Button
                asChild
                size="sm"
                className="h-8 rounded-md px-4 text-xs shadow-[0_0_20px_-4px] shadow-primary/70"
              >
                <Link href="/sign-up">Get Started</Link>
              </Button>
            </>
          )}
        </nav>

        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          {!isPending && user && <UserMenu user={user} />}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 px-4">
                {LINKS.map((l) => (
                  <SheetClose asChild key={l.href}>
                    <Link
                      href={l.href}
                      className={cn(
                        "rounded-md px-3 py-2 text-sm",
                        isActive(l.href)
                          ? "bg-accent text-foreground"
                          : "text-muted-foreground hover:bg-accent",
                      )}
                    >
                      {l.label}
                    </Link>
                  </SheetClose>
                ))}
                {!isPending && !user && (
                  <div className="mt-3 flex flex-col gap-2">
                    <SheetClose asChild>
                      <Button asChild variant="outline">
                        <Link href="/sign-in">Sign In</Link>
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button asChild>
                        <Link href="/sign-up">Get Started</Link>
                      </Button>
                    </SheetClose>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}