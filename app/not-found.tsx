import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl font-bold text-primary">404</p>
      <h1 className="mt-4 text-xl font-semibold">Page not found</h1>
      <p className="mt-2 text-xs text-muted-foreground">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button
        nativeButton={false}
        render={<Link href="/" />}
        className="mt-6 h-9 px-5 text-xs"
      >
        Back to home
      </Button>
    </section>
  );
}