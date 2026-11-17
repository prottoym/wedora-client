import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`text-xl font-bold tracking-tight ${className}`}>
      <span className="bg-gradient-to-r from-primary to-fuchsia-400 bg-clip-text text-transparent">
        Wedora
      </span>
    </Link>
  );
}